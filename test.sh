#!/bin/sh
cd /task/client
npm install 
npm install husky
mkdir .husky 
npx husky add .husky/pre-commit "npm test"
