#!/bin/bash

DIR=$(pwd)

yarn build

cd packages/latex2html5
yarn bundle
cd $DIR

cd website/latex2js.com
yarn build
yarn copy
cd $DIR
