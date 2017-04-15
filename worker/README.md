### Voyant Dockerfile Setup

Build the pr branch

```bash
# builds the dockerfile
# . ./build.sh <repo-path> <pr-branch-name> <env-setup-command>
. ./build.sh "git@github.com:WiskeyTango/mock-web-repo.git" pr-branch "npm install"
```

Now run that container in the background

```bash
docker run --name "pr-branch:latest" --rm -i -t bash
```

then run it

```bash
docker run --rm --cidfile /tmp/asdf.cid -i -t asdf <command>
```
