# OS & initial setup
FROM centos:centos7
ARG repo
ARG branch="master"
ARG test="npm test"
ENV COSMOCI_REPO=$repo
ENV COSMOCI_BRANCH=$branch
ENV COSMOCI_TEST=$test

# assuming env is node
RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN yum install -y tar curl sudo which wget htop vim-enhanced xz
RUN wget -O ~/node-v6.9.0-linux-x64.tar.xz https://nodejs.org/dist/v6.9.0/node-v6.9.0-linux-x64.tar.xz && \
  tar -C /usr/local --strip-components 1 -xJf ~/node-v6.9.0-linux-x64.tar.xz

# user & env setup
USER root
ENV HOME /root
ENV PROFILE /root/.profile
ENV NODE_PATH /var/cosmo/code
RUN mkdir -p /root/.ssh
ADD id_rsa* /root/.ssh/
ADD known_hosts /root/.ssh/
WORKDIR /var/cosmo/code

# basics
# RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# RUN yum install -y tar curl sudo which git wget htop vim-enhanced xz
RUN yum install -y git
# RUN echo "alias vi='/usr/bin/vim'" >> ~/.bashrc
# RUN echo "syntax on" >> ~/.vimrc

# pull codebase & branch
RUN git clone $repo ./
RUN git checkout $branch

# actual test
CMD ["/usr/bin/bash", $test]
