*This project is no longer in development. A newer version of Conjure is in active development.*

<p align="center">
  <kbd>w e b</kbd>
</p>

### Conjure Web

Easily test branches, without altering your local.

#### Env Vars

Any sensitive keys should be set in `.hob/.env`, which is applied before running the Docker instance.

Local dev should pull `../conjure-core/.hob/.env`

#### Local Development

##### Dependencies

```bash
brew install yarn
brew install dnsmasq
yarn global add eslint babel-eslint jscs webpack
yarn install
```

###### Dnsmasq

dnsmasq needs some extra config. It allows you to use any `.test` domain (`conjure.test`, `abc.view.conjure.test`, etc), which is needed for viewing running containers.

See [this guide](https://passingcuriosity.com/2013/dnsmasq-dev-osx/) for instructions (but replace `dev` with `test`, since Chrome now hijacks the `.dev` domain).

##### Database Setup

This needs to be done for running the app. Though only needs to be done once, on a machine.

On staging or production you would want to set a password...

```bash
# this example has no password (-W)
# this example sets the user as a superuser (-s)
createuser -W -D -s conjure_admin
```

Or, on local, do:

```bash
createuser --createdb --adduser --no-password conjure_admin
```

Then, in sql:

```sql
CREATE DATABASE conjure OWNER conjure_admin;
```

##### Running Dev

```bash
NODE_ENV=development yarn start
```

##### yarn Commands

```bash
# starts the dev app
npm run dev

# run lints
npm run lint

# re-compiles client assets
npm run compile

# starts the dev app,
# and resets the db first
npm run dev:fresh-db
```

###### Additional Options

```bash
# starts the app, but preserves existing db
KEEP_DB=true npm start
```

#### Deployment

```bash
npm run build
```

#### Fresh server setup

Must be an Ubuntu EC2

When done, add it to a LB

1. `ssh-keygen` _(do not do this on your local...)_
2. save public key as a deploy key on repo, on github
3. `git clone git@github.com:ConjureLabs/conjure-web.git`
4. `sudo apt update`
5. `sudo apt-get install postgresql postgresql-contrib redis-tools`
6. `curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -`
7. `sudo apt-get install -y nodejs`
8. `sudo -E npm i -g pm2`
9. `sudo -E npm i -g next`
10. `sudo chown -R $USER:$(id -gn $USER) /home/ubuntu/.config `
11. in proj dir, save `.hob/.env` (make sure `NODE_PATH` is set to the right dir)
12. in proj dir, `npm install`
13. in proj dir, `npm run compile`
14. in proj dir, `npm run build`
15. in proj dir, `pm2 start ./bash/pm2/conjure-web.sh --name "conjure-web"`
