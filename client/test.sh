#!/usr/bin/bash
cd /task/client
npm install 
npm install husky
sudo mkdir .husky 
npx husky add .husky/pre-commit "npm test"
