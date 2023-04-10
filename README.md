#=======================================================================================================

Two Refrences:

AWS CodeDeploy Tutorial | AWS CodePipeline | Real World Project
https://youtu.be/-OsKxWO4-Fk

https://blog.devgenius.io/deploy-a-reactjs-application-to-aws-ec2-instance-using-aws-codepipeline-3df5e4157028


#=======================================================================================================

1. Create IAM Role for EC2 and AWS CodeDeploy

EC2RoleForS3
CodeDeployRole

2. Create EC2 Instance and Attach that EC2 role.

and install code depoloy agent

sudo yum update
sudo yum install ruby
sudo yum install wget
wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto


3. aws codepipeline following steps:

Step 1: CodePipeline
Step 2: Code Source (CodeCommit or Github)
Step 3: Skip Build(Feature)
Step 4: Choose Code Depoloy


p


:W

#=======================================================================================================

Appspec.yml file structure:


--------------------
appspec.yml
--------------------

version: 0.0
os: linux
files:
  - source: /
    destination: /home/ec2-user/server
hooks:
  AfterInstall:
    - location: afterinstall.sh
      timeout: 300
  ApplicationStart:
    - location: applicationstart.sh
      timeout: 300

--------------------
afterinstall.sh
--------------------

#!/bin/bash

cd /home/ec2-user/server
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
yum -y install nodejs npm


#Remove Unused Code

rm -rf node_modules
rm -rf build

#Install node_modules & Make Build and install PM2

npm -f install
npm run build
npm install -g pm2


--------------------
applicationstart.sh
--------------------

#!/bin/bash

cd /home/ec2-user/server
sudo pm2 delete Frontend
sudo pm2 start server.js --name Frontend

#=======================================================================================================

