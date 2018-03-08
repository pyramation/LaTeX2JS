#!/bin/bash

for x in $(ls core)
do
  cd core/$x
  yarn
  yarn build
  cd ../../
done

for x in $(ls libs)
do
  cd libs/$x
  yarn
  yarn build
  cd ../../
done

cd libs/latex2html5
yarn bundle
cd ../../

cd site
yarn build
cd ../
