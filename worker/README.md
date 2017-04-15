# Voyant

## Dockerfile

```bash
# builds the dockerfile
. ./build.sh "git@github.com:WiskeyTango/mock-web-repo.git" pr-branch "npm install"
```

then

```bash
docker run -t "citest:latest"
```

and check for error (non-zero)

## todo

- web ui
- env support (not just node)
- generate dockerfile dynamically
- dockerfile image caching (at specific steps?)
