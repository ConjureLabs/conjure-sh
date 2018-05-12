# Why Conjure?

Most engineers are used to doing peer reviews. A quick code check does a lot of good at keeping problems at bay. But if the product being built is visual, like a web app, then engineers need to see and interact with it to ensure that nothing is broken. 

## The problem

When an engineer begins reviewing pull requests, they need to stop what they're doing, stash any code, check out the branch, and spin it up. There is context switching and wait times for builds to run.

On top of that, other team members usually only see changes after they land. Unless they constantly ping engineers for updates.

## The evolution of Conjure

A couple of years ago I began hacking on a concept for a CI platform where you could easily define automated browser tests. I was frustrated with how long and painful code reviews were, and this tool was supposed to help. But as I focused on the problem I realized I was overloading CI, and the real bottleneck was during the visual review.

I began searching for a tool that gives engineers quick access to containers for each pull request. I found some blog posts and code for spinning up multiple versions of a site, but nothing really easy to use or meant for the problem I had. I talked with some other engineering managers and quickly realized that this was a common issue, with no clear solution, and a lot of demand. So I changed gears and began building out Conjure, an ephemeral staging deployment service.

## A better way to test

The goal of Conjure is to enable teams to review visual changes fast and easily, without the overhead of local instances. This means giving engineers quick access to view changes. And giving product managers, designers, and other team members visibility into active workstreams. Everyone should be able to be part of the review process.

Start using [Conjure](https://conjure.sh) today. View our [docs](https://conjure.sh/docs) to learn how to configure your repo in minutes.
