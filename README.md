<p align="center">
  <kbd>w e b</kbd>
</p>

### Conjure Web

Easily test branches, without altering your local.

#### Env Vars

Any sensitive keys should be set in `./.profile`, which is applied before running the Docker instance.

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
# starts the (dev) app
yarn run dev

# run lints
yarn run lint
```

###### Additional Options

```bash
# starts the app, but preserves existing db
KEEP_DB=true yarn start
```
