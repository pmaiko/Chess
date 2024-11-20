#!/bin/bash

cd ./server && npm run build && cd ../front && npm run build

#
#if [[ $VERCEL_ENV == "production"  ]] ; then
#  npm run build
#else
#  npm run start
#fi
