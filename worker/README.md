# SentryCI

## Dockerfile

```bash
# builds the dockerfile
. ./build.sh "git@github.com:WiskeyTango/sonyc.git" citest "npm install" "npm run lint"
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
