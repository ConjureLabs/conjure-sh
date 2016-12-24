FROM centos:centos6

MAINTAINER Tim Marshall <timothyjmarshall@gmail.com>

# Enable EPEL for Node.js
RUN yum clean all
RUN yum check
RUN yum update -y
RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN yum install -y tar curl sudo which git wget htop vim-enhanced
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

# node-gyp needs the right setup
RUN wget http://people.centos.org/tru/devtools-2/devtools-2.repo -O /etc/yum.repos.d/devtools-2.repo
RUN yum install -y devtoolset-2-gcc devtoolset-2-binutils
RUN yum install -y devtoolset-2-gcc-c++ devtoolset-2-gcc-gfortran
RUN echo "source /opt/rh/devtoolset-2/enable" >> /root/.bashrc

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
RUN yum -y localinstall http://yum.postgresql.org/9.4/redhat/rhel-7-x86_64/pgdg-centos94-9.4-1.noarch.rpm
RUN yum -y groupinstall "PostgreSQL Database Server 9.4 PGDG"
#RUN chkconfig postgresql-9.4 on
RUN mkdir /usr/local/var
RUN chmod 755 /usr/local/var
RUN mkdir /usr/local/var/postgres
RUN chmod 755 /usr/local/var/postgres
RUN chown postgres /usr/local/var/postgres
# the following line helps avoid error "sudo: sorry, you must have a tty to run sudo"
RUN sed -i -e "s/Defaults    requiretty.*/ #Defaults    requiretty/g" /etc/sudoers
RUN /usr/sbin/update-alternatives --install /usr/bin/initdb pgsql-initdb /usr/pgsql-9.4/bin/initdb 930
RUN /usr/sbin/update-alternatives --install /usr/bin/pg_ctl pgsql-pg_ctl /usr/pgsql-9.4/bin/pg_ctl 930
RUN /usr/sbin/update-alternatives --install /usr/bin/pg_config pgsql-pg_config /usr/pgsql-9.4/bin/pg_config 930
RUN service postgresql-9.4 initdb
RUN echo "bash ./bash/postgres/init-local.sh" >> /root/.bashrc

EXPOSE 3000

# Timezone fix
## Remove localtime
RUN rm /etc/localtime
## Link localtime
RUN ln -sf /usr/share/zoneinfo/US/Pacific /etc/localtime

RUN echo "npm start" >> /root/.bashrc
