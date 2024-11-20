#!/bin/bash

cd ./server && npm run build & npm run start && cd ../front && npm run build
