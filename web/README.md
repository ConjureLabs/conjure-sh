### Voyant Web Server

#### Local Development

##### Dependencies

```bash
npm install
npm install -g eslint babel-eslint jscs webpack
```
##### Running Dev

```bash
NODE_ENV=development npm start
```

##### NPM Commands

```bash
# starts the app
npm start

# run lints
npm run lint

# compile frontend builds
npm run compile

# compile & watch for changes
npm run compile --watch
```

##### Running with ngrok

GitHub needs public URLs. You can use ngrok to make your localhost public.

1. download ngrok
2. place ngrok executable at `~/ngrok`
3. run `~/ngrok http 3000`
4. copy the forwarded (non-https) domain name (without the protocol) into `.profile`
5. keep ngrok running while you develop
6. restart the app
