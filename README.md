# CosmoCI

## Dockerfile

```bash
docker build --no-cache -t "citest:latest" --build-arg repo="git@github.com:WiskeyTango/sonyc.git" --build-arg branch="citest" .
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
