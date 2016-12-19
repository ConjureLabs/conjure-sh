# OS
FROM centos:centos7

# basics
RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN yum install -y tar curl sudo which git wget htop vim-enhanced xz
RUN echo "alias vi='/usr/bin/vim'" >> ~/.bashrc
RUN echo "syntax on" >> ~/.vimrc

# user & env setup
USER root
ENV HOME /root
ENV PROFILE /root/.profile
ENV NODE_PATH /var/cosmo/code
WORKDIR /var/cosmo/code

# pull codebase & branch
RUN git clone https://github.com/WiskeyTango/sonyc ./
RUN git checkout citest

# actual test
CMD npm test
