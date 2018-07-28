# Open-Sourcing Conjure

Recently [I tweeted](https://twitter.com/timothymarshall/status/1011315206406881283) that I would open-source Conjure. Today I'm happy to announce that that promise has been kept, and Conjure is now open. I started this project to solve a common problem I had with testing pull requests, specifically for web apps. I solved for myself, but began to hear from others how they've wanted something similar. Shortly after launching the service, others began releasing [the same type of service](https://zeit.co/blog/now-for-github), which I see as more validation.

## Going Forward

I spent a lot of time building this out, and hope others will benefit from it. I kept thinking of how [Ghost](https://ghost.org/) open-sourced their project while providing a paid hosted service. Based on the same setup, [Conjure.sh](https://conjure.sh) will remain as a paid service, while anyone is welcome to clone the repos and spin them up for free.

## Repos

[conjure-sh](https://github.com/ConjureLabs/conjure-sh) provides the client web app for the app. This repo uses [Next.js](https://github.com/zeit/next.js/) to render the client, with some custom stuff sprinkled in.

[conjure-api](https://github.com/ConjureLabs/conjure-api) houses the REST api. Route directory paths [define their url paths](https://github.com/ConjureLabs/route).

[conjure-worker](https://github.com/ConjureLabs/conjure-worker) runs async jobs. It's using [Kue](https://github.com/Automattic/kue) with Redis. It started with RabbitMQ, but was moved to Kue for flexibly around weighted jobs. When a pull request is opened, a job will kick off to create a docker image and push it to [AWS Fargate](https://aws.amazon.com/fargate/).

[conjure-core](https://github.com/ConjureLabs/conjure-core) contains various shared modules, classes, and configs.

## Getting Started

The various repos have documentation, but the general gist of how to get going is:

1. Clone `conjure-sh`, `conjure-api`, `conjure-worker` and `conjure-core`
2. Create [a GitHub app](https://developer.github.com/apps/building-github-apps/creating-a-github-app/)
3. Generate an app Private Key. Place the pem file outside the project directories
4. Follow the steps in each repo's readme
5. Update `CONJURE_GITHUB_APP_PEM_PATH` to the pem file path
6. Run ngrok (see [the api readme](https://github.com/ConjureLabs/conjure-api/blob/master/README.md)) and copy the domain name to `CONJURE_API_PUBLIC_HOST`
7. in each app repo, run `npm run dev`
