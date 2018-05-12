# Why Conjure?

Most engineers are used to doing peer reviews. A quick code check does a lot of good at keeping problems at bay. But if the product being built is visual, like a web app, then engineers need to see and interact with it to ensure that nothing is broken, there are no regressions, and styles are correct. 

## The problem

In order for an engineer to properly review changes, their code needs to be stashed, and the branch being reviewed needs to be checked out and spun up. There is context switching and wait times for builds to run.

On top of that, other team members can only see working changes if they hover over the engineer or explicitly ask for an image. Design teams, on the other hand, have tools to show changes, get feedback, and involve others, while engineers work in a black box.

## The evolution of Conjure

A couple of years ago I began hacking on a concept for a CI platform where you could easily define automated browser tests. I was frustrated with how long and painful code reviews were, and this tool was supposed to lower the burden of the review process, while speeding up the time between request and merge. But as I built up the platform I realized I was overloading CI, and the real problem was a human problem.

I began searching for a tool that gives engineers quick access to containers for each pull request. I found some blog posts and code for spinning up multiple versions of a site, but nothing really easy to use or for the purpose I had. I talked with some other engineering managers and quickly realized that this was a common problem, with no clear solution, and a lot of demand. So I changed gears and began building out Conjure, an ephemeral staging deployment service.

## A better way to test

The goal of Conjure is to enable teams to review visual changes fast and easily, without the overhead of local instances. This means giving engineers quick access to view changes, and giving product managers, designers, and other team members an easy way to see active workstreams. Giving anyone the chance to be part of the review process.

Start using [Conjure](https://conjure.sh) today. View our [docs](https://conjure.sh/docs) to learn how to configure your repo in minutes.
