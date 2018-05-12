# Why Conjure?

I spent years working at several early-stage startups, leading teams, and often being the first engineer on the team. That meant building out process and procedure. A common pattern was to enforce peer reviews on every pull request.

## The problem

When teams move fast, that means more frequent reviews. GitHub is great for reviewing code changes, but engineers still need to spin up the branch locally if they want to see visual changes. That means stashing ongoing changes, and context switching. All too often engineers will not review visual changes, and only look at code.

On top of that, other team members can only see working changes if they hover over their shoulder, or ask for an image. Design teams have tools to show changes, get feedback, and involve others, while engineers work in a black box.

## The evolution of Conjure

A couple of years ago I began hacking on a concept for a CI platform. The idea was to build CI where you could open the site, and record macros for browser automation tests. Then those would be run alongside your unit tests. As I built it up, and talked with friends, I realized that the ability to pull up the site was a huge leap. Slowly the project evolved into Conjure, an ephemeral staging deployment service.

As the idea took shape, I talked more about it with other engineers. I realized that every team I've been on needed something like this. More often than I expected I would talk to people, from companies of all sizes, who were actively building out similar solutions in-house. I've heard of dozens of teams building custom platforms just to share an ephemeral link, or to give engineers quicker access.

## A better way to test

The goal of Conjure is to enable teams to review changes faster, without the overhead of local environments. This means giving engineers quick access to view changes, and giving product managers, designers, and other team members an easy way to see active workstreams. Giving anyone the chance to be part of the review process.

Start using [Conjure](https://conjure.sh) today. View our [docs](https://conjure.sh/docs) to learn how to configure your repo in minutes.
