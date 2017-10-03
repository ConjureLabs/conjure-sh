<p align="center">
  <kbd>⎔</kbd>
</p>

### Conjure Web

Easily test branches, without altering your local.

#### Branding

Using [U+2394 ⎔](https://unicode-table.com/en/#2394) as the service icon.

Can be used as a window into the experience.

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

dnsmasq needs some extra config. It allows you to use any `.dev` domain (`conjure.dev`, `abc.view.conjure.dev`, etc), which is needed for viewing running containers.

See [this guide](https://passingcuriosity.com/2013/dnsmasq-dev-osx/) for instructions.

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
# starts the app
yarn start

# run lints
yarn run lint
```

###### Additional Options

```bash
# starts the app, but preserves existing db
KEEP_DB=true yarn start
```
