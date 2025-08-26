#!/bin/bash

# Install docker buildx plugin
# mkdir -p ~/.docker/cli-plugins/
# curl -SL https://github.com/docker/buildx/releases/latest/download/buildx-v0.17.1.linux-amd64 -o ~/.docker/cli-plugins/docker-buildx
# chmod +x ~/.docker/cli-plugins/docker-buildx

docker buildx install
docker buildx ls