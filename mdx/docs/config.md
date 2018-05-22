import LanguagesBreakdown from './components/LanguagesBreakdown'

# Project Configuration

Conjure will only work after you add `.conjure/config.yml` to your project.

## Example

A Node app may have a config like:

```yml
languages:
  node:
    version: 8.6.0

pre:
  - npm install
  - npm run build

port: 3000
```

## Language Support

Conjure has some languages baked in.

You can specify any specific language in your `config.yml`

```yml
languages:
  python:
    version: "3.7.0a1"
```

<LanguagesBreakdown />

Most specific versions of these languages are supported. For example:

```yml
languages:
  node:
    version: 8.1.4
```

## Environment Variables

Environment variables are added using the `environment` attribute.

```yml
environment:
  THIRD_PARTY_KEY: dAwyY3Qxt7YNYczA2WSOTtUt
  NODE_ENV: test
```

## Port

You must specify the port the app runs on.

```yml
port: 3000
```

## Custom Configuration

Need to configure your environment manually? You can run any commands you need to, before your branch is pulled down, via the `pre` steps.

Conjure runs containers in a lightweight Debian OS. You can use `apt-get` to fetch any needed packages.

```yml
pre:
  - apt-get install python-gdal
  - touch ~/.myfile
```

## Manually Setting the Run Command

Conjure will automatically try to use the appropriate start command for you project based on the laguage. For example, in a Node project Conjure will attempt `npm start`.

If you need to, you can override the command used by Conjure when starting up the app.

```yml
run:
  override:
    - DEBUG=* yarn run dev
```
