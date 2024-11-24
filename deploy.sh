#!/bin/bash

cd ./server && npm ci && npm run build && cd ../front && npm ci && npm run build
