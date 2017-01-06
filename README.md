#revien-aws
This is a project to repeat daily Naver English conversation.

##Requirement
+ NodeJS
+ aws-cli
+ python
+ brew
+ etc..

##Preparation
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

##Use
```
git clone git@github.com:richellin/revien-aws.git
cd revien-aws

cd revien-sam
# create your s3 bucket
aws s3 mb s3://<bucket-name> --region <region>

//todo


#module install
cd revien-lambda-put
npm install

//todo

```

##Note
```
You need lambda Environment variables `TABLE_NAME`
```
