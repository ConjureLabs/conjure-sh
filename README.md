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
yarn global add eslint babel-eslint jscs webpack
yarn install
```

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

# compile frontend builds
yarn run compile

# compile & watch for changes
YARN_CONFIG_WATCH=yes yarn run compile
```

##### Running with ngrok

GitHub needs public URLs. You can use ngrok to make your localhost public.

1. download ngrok
2. place ngrok executable at `~/ngrok`
3. run `~/ngrok http 3000`
4. copy the forwarded (non-https) domain name (without the protocol) into `.profile`
5. keep ngrok running while you develop
6. restart the app
