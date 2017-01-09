### Cosmo Web Server

#### Local Development

##### Dependencies

```bash
npm install
npm install -g eslint babel-eslint jscs webpack
brew install nginx
brew services start nginx
```
##### Running Dev

```bash
NODE_ENV=development npm start
```

This will do the following, where any step may be skipped if not needed:

1. Install dependencies
2. Create Docker machine
3. Start Docker machine
4. Compile client build (& watch), and run the app
5. Run Docker instance
6. Connect to Docker
7. Rebuild dependencies (for OS used by Docker instance)

If it dies, and you are within the Docker instance, simply `npm run` again to start it back up.

##### Connecting to the Dev Database

When inside the running Docker instance,

```bash
psql -U cosmo_admin -d cosmo
```

##### NPM Commands

```bash
# starts the app
npm start

# build a new Docker image
npm run build

# run lints
npm run lint

# compile frontend builds
npm run compile

# compile & watch for changes
npm run compile --watch
```

#### Common problems

**Problem**:

```
Cannot connect to the Docker daemon. Is the docker daemon running on this host?
```

**Cause**:

This is due to env variables not set, which are needed for the Docker daemon to work with the Cosmo docker machine.

**Solution**:

```bash
eval "$(docker-machine env cosmo)"
```

---

**Problem**:

```
Error checking TLS connection: Error checking and/or regenerating the certs: There was an error validating certificates for host "192.168.99.100:2376": x509: certificate is valid for 192.168.99.103, not 192.168.99.100
You can attempt to regenerate them using 'docker-machine regenerate-certs [name]'.
Be advised that this will trigger a Docker daemon restart which will stop running containers.
```

**Cause**:

This is usually caused by a faulty docker machine. You can attempt to run `docker-machine regenerate-certs cosmo` as it suggests, but it may fail, saying something along the lines of `Something went wrong running an SSH command!`. So, unfortunately, you must kill the image altogether, and spin a new one up. This usually is caused by changing networks or restarting your computer.

**Solution**:

```bash
docker-machine rm cosmo
npm run build
```

---

**Problem**:

`docker-machine rm soync` hangs, and does not remove the docker image.

**Cause**:

This happens often on OSX. Docker only runs on Linux, and OSX is Unix-based. So, on OSX, Docker is run in a VirtualBox VM. When a VM is running sometimes Docker has trouble telling it to spin down.

**Solution**:

1. Open VirtualBox
2. Verify that the Cosmo VM is in the state `Running` (or else this may be a different problem)
3. Right-click VM and select `Close -> Power Off`
4. Run `docker-machine rm cosmo` - it should work this time around

---

**Problem**:

```
error getting state for host cosmo: machine does not exist
machine does not exist
Error checking TLS connection: Error trying to get host state: machine does not exist
Cannot connect to the Docker daemon. Is the docker daemon running on this host?
```

**Cause**:

You probably removed the VirtualBox machine, but left the docker-machine reference.

**Solution**:

```bash
docker-machine rm cosmo
```

---

**Problem**:

`docker: Error response from daemon: driver failed programming external connectivity on endpoint hungry_turing (bae2212b2db12d47731edf13122104adff2868eb28041aafde148f294f433f6c): Bind for 0.0.0.0:80 failed: port is already allocated.`

**Cause**:

You probably killed a terminal session with your Docker instance, but did not actually end it by a graceful interrupt. This leaves the machine running in the background.

**Solution**:

You can see running machines by `docker-machine ls`. Then:

`docker-machine stop cosmo`
