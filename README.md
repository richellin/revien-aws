# revien-aws
This is a project to repeat [Naver Daily English Conversation](http://m.wordbook.naver.com/conversation#/endic/20170105).

## Requirement
+ NodeJS
+ npm
+ phantomjs
+ aws-cli
+ python
+ brew
+ etc..

### Preparation
```
# MAC
brew install python
pip install --upgrade setuptools
pip install --upgrade pip

# install awscli
pip install awscli
aws configure
AWS Access Key ID [None]: XXXX
AWS Secret Access Key [None]: XXXXXXXX
Default region name [None]: ap-northeast-1
Default output format [None]: text

# check your setting file
ls -la ~/.aws
```

### Use
```
# Download source code
git clone git@github.com:richellin/revien-aws.git
cd revien-aws

#module install
cd revien-lambda-put
npm install
cd ..

# Start SAM
cd revien-sam

# create your s3 bucket
# aws s3 mb s3://<bucket-name> --region <region>
aws s3 mb s3://revien-sam --region ap-northeast-1

# check your s3 bucket
aws s3 ls

# setup sam
# package : upload file to s3 and output template file
aws cloudformation package \
   --template-file template.yaml \
   --output-template-file serverless-output.yaml \
   --s3-bucket revien-sam

# deploy and set stack name (ex:revien-sam-stack)
aws cloudformation deploy \
   --template-file serverless-output.yaml \
   --stack-name revien-sam-stack \
   --capabilities CAPABILITY_IAM

# Check your AWS services
Cloud Formation
Lambda
API Gateway
DynamoDB
etc..
```

### Licence
```
MIT
```
