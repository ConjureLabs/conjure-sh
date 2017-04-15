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

Then run it

```bash
docker run --cidfile /tmp/asdf.cid -i -t -d asdf <command>
```

This will run the container, using the defined command, and will detach it.

---

Once done, you'll need to spin it down.

```bash
# container id is found in /tmp/asdf.cid
docker kill <container-id>
# need to wipe the old cid file
rm /tmp/asdf.cid
```
