#!/bin/bash

npm install &> /dev/null
echo -ne "Uploading file..\r" 
scp -r build __scripts__ package.json src ibmuser@sandbox-wazi.techgym:/web/nodejs_example_db2
echo -e "Uploading files.. OK"