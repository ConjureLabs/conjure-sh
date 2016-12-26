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
ENV NODE_PATH /var/cosmo/web/server/modules
ENV CONTAINER docker
ENV PGDATA /var/lib/pgsql/data

# prepare systemd
# see https://hub.docker.com/_/centos/
RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == \
  systemd-tmpfiles-setup.service ] || rm -f $i; done); \
  rm -f /lib/systemd/system/multi-user.target.wants/*;\
  rm -f /etc/systemd/system/*.wants/*;\
  rm -f /lib/systemd/system/local-fs.target.wants/*; \
  rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
  rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
  rm -f /lib/systemd/system/basic.target.wants/*;\
  rm -f /lib/systemd/system/anaconda.target.wants/*;
VOLUME [ "/sys/fs/cgroup" ]
CMD ["/usr/sbin/init"]

# node-gyp needs the right setup
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

# postgres
# see https://github.com/CentOS/CentOS-Dockerfiles/tree/master/postgres/centos7
RUN yum install -y postgresql-server postgresql postgresql-contrib supervisor pwgen; yum clean all
ADD ./bash/postgres/setup.sh /usr/bin/postgresql-setup
ADD ./server/conf/supervisord.conf /etc/supervisord.conf
ADD ./bash/postgres/start.sh /start_postgres.sh
# the following line helps avoid error "sudo: sorry, you must have a tty to run sudo"
RUN sed -i -e "s/Defaults    requiretty.*/ #Defaults    requiretty/g" /etc/sudoers
RUN chmod +x /usr/bin/postgresql-setup
RUN chmod +x /start_postgres.sh
RUN /usr/bin/postgresql-setup initdb
ADD ./server/conf/postgresql.conf /var/lib/pgsql/data/postgresql.conf
RUN chown -v postgres.postgres /var/lib/pgsql/data/postgresql.conf
RUN echo "host    all             all             0.0.0.0/0               md5" >> /var/lib/pgsql/data/pg_hba.conf
RUN bash /start_postgres.sh
RUN echo "bash ./bash/postgres/init-local.sh" >> /root/.bashrc

EXPOSE 3000

# Timezone fix
## Remove localtime
RUN rm /etc/localtime
## Link localtime
RUN ln -sf /usr/share/zoneinfo/US/Pacific /etc/localtime

RUN echo "npm start" >> /root/.bashrc
