# Open-Sourcing Conjure

Recently [I tweeted that I would open-source Conjure](https://twitter.com/timothymarshall/status/1011315206406881283). Today I'm happy to announce that Conjure is fully open. I started Conjure to solve a common problem I had with development testing workflows. I solved a problem for myself, more than anyone else. But as others [are coming out with the same type of service](https://zeit.co/blog/now-for-github), I've grown more confident that this is a tool that anyone dealing with web apps can benefit from.

## Going Forward

Credit goes to [Ghost](https://ghost.org/) inspiring me to open the project, while offering a paid hosted version. [Conjure.sh](https://conjure.sh) will remain as a paid service, while anyone is welcome to spin up their own clone for free.

## Repos

[conjure-sh](https://github.com/ConjureLabs/conjure-sh) provides the client web app for the app. This repo uses [Next.js](https://github.com/zeit/next.js/) to render the client, with some custom stuff sprinkled in.

[conjure-api](https://github.com/ConjureLabs/conjure-api) houses the REST api. Route directory paths [define their url paths](https://github.com/ConjureLabs/route).

[conjure-worker](https://github.com/ConjureLabs/conjure-worker) runs async jobs. Jobs use [Kue](https://github.com/Automattic/kue) with Redis. It originally used RabbitMQ, but was moved to Kue for flexibly around weights.

[conjure-core](https://github.com/ConjureLabs/conjure-core) contains various shared modules, classes, and configs.

## Getting Started

1. Clone `conjure-sh`, `conjure-api`, `conjure-worker` and `conjure-core`
2. Create [a GitHub app](https://developer.github.com/apps/building-github-apps/creating-a-github-app/)
3. Generate an app Private Key. Place the pem file outside the project directories
4. Follow the steps in each repo's readme
5. Update `CONJURE_GITHUB_APP_PEM_PATH` to the pem file path
6. Run ngrok (see [the api readme](https://github.com/ConjureLabs/conjure-api/blob/master/README.md)) and copy the domain name to `CONJURE_API_PUBLIC_HOST`
7. in each app repo, run `npm run dev`
