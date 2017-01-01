FROM centos:centos7

MAINTAINER Tim Marshall <timothyjmarshall@gmail.com>

# Enable EPEL for Node.js
RUN yum clean all
RUN yum check
RUN yum update -y; yum clean all
RUN yum install -y tar curl sudo which git wget htop vim-enhanced epel-release initscripts; yum clean all
# setup vim enhanced
RUN echo "alias vi='/usr/bin/vim'" >> ~/.bashrc
RUN echo "syntax on" >> ~/.vimrc

USER root
ENV HOME /root
ENV PROFILE /root/.profile
ENV NODE_VERSION 4.2.3
ENV NVM_DIR /usr/local/nvm
# Create a profile so we can run NVM
RUN touch $PROFILE
ENV DEBUG cosmo,cosmo:*
ENV IN_DOCKER true
ENV NODE_PATH /var/cosmo/web/modules
ENV CONTAINER docker
ENV PG_VERSION 9.5
ENV PGVERSION 95
ENV PGDATA /var/lib/pgsql/9.5/data

# node-gyp needs the right setup
RUN yum groups mark convert "Development Tools";
RUN yum group install -y "Development Tools"; yum clean all

# Setup the nvm environment
# the last line in this chain exposes the nvm node globally
# have to do this as one chained command since RUN does not carry context between commands
RUN curl --tlsv1 https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash && \
  . ~/.bashrc && \
  cd /root && \
  source $PROFILE && \
  nvm install $NODE_VERSION && \
  n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; cp -r $n/{bin,lib,share} /usr/local

# pointing to any npm registry speeds up npm installs
# see https://github.com/npm/npm/issues/8836#issuecomment-132302605
RUN npm config set registry http://registry.npmjs.org/
# making sure the rest of the build env is ready
RUN npm install -g eslint babel-eslint jscs nodemon

# install postgres and run InitDB
RUN rpm -vih https://download.postgresql.org/pub/repos/yum/$PG_VERSION/redhat/rhel-7-x86_64/pgdg-centos$PGVERSION-$PG_VERSION-2.noarch.rpm && \
  yum update -y && \
  yum install -y sudo \
  pwgen \
  postgresql$PGVERSION \
  postgresql$PGVERSION-server \
  postgresql$PGVERSION-contrib && \
  yum clean all

COPY bash/postgres/setup/setup.sh /usr/pgsql-$PG_VERSION/bin/postgresql$PGVERSION-setup.sh
RUN chmod +x /usr/pgsql-$PG_VERSION/bin/postgresql$PGVERSION-setup.sh
RUN /usr/pgsql-$PG_VERSION/bin/postgresql$PGVERSION-setup.sh initdb
COPY server/conf/postgresql.conf /var/lib/pgsql/$PG_VERSION/data/postgresql.conf
COPY bash/postgres/setup/start.sh /usr/local/bin/postgres-start.sh
RUN chown -R postgres:postgres /var/lib/pgsql/$PG_VERSION/data/* && \
  usermod -G wheel postgres && \
  sed -i 's/.*requiretty$/#Defaults requiretty/' /etc/sudoers && \
  chmod +x /usr/local/bin/postgres-start.sh
RUN echo "bash /usr/local/bin/postgres-start.sh" >> /root/.bashrc

VOLUME ["/var/lib/pgsql"]

EXPOSE 3000

# Timezone fix
## Remove localtime
RUN rm /etc/localtime
## Link localtime
RUN ln -sf /usr/share/zoneinfo/US/Pacific /etc/localtime

RUN echo "npm start" >> /root/.bashrc
