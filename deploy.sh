#!/bin/bash

npm install &> /dev/null
rm -rf build
echo -ne "Typescript Build..\r" 
npm run build &> /dev/null
echo -e "Typescript Build.. OK"
echo -ne "Uploading file..\r" 
scp -r build __scripts__ package.json ibmuser@sandbox-wazi.techgym:/web/nodejs_example_db2
echo -e "Uploading files.. OK"