export const INITIAL_DATA = [
  { 
    id: 1, 
    service: 'AWS S3', 
    issue: 'Public Read Access', 
    severity: 'Critical', 
    account: 'Prod-01', 
    region: 'us-east-1', 
    command: 'aws s3api put-public-access-block --bucket prod-01-bucket --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"' 
  },
  { 
    id: 2, 
    service: 'Azure VM', 
    issue: 'Port 22 Open', 
    severity: 'High', 
    account: 'Dev-02', 
    region: 'east-us', 
    command: 'az network nsg rule update --resource-group Dev-02 --nsg-name myNsg --name AllowSsh --access Deny' 
  },
  { 
    id: 3, 
    service: 'GCP Storage', 
    issue: 'Unencrypted Bucket', 
    severity: 'Medium', 
    account: 'Stage-01', 
    region: 'us-central1', 
    command: 'gsutil kms encryption -k projects/key/versions/1 gs://stage-bucket' 
  },
  { 
    id: 4, 
    service: 'AWS IAM', 
    issue: 'MFA Not Enabled', 
    severity: 'Critical', 
    account: 'Prod-admin', 
    region: 'global', 
    command: 'aws iam create-virtual-mfa-device --virtual-mfa-device-name console-admin' 
  },
  { 
    id: 5, 
    service: 'AWS EC2', 
    issue: 'Default VPC Used', 
    severity: 'Low', 
    account: 'Sandbox-01', 
    region: 'us-west-2', 
    command: 'aws ec2 create-vpc --cidr-block 10.0.0.0/16' 
  },
  { 
    id: 6, 
    service: 'AWS S3', 
    issue: 'Versioning Disabled', 
    severity: 'Medium', 
    account: 'Prod-01', 
    region: 'us-east-1', 
    command: 'aws s3api put-bucket-versioning --bucket prod-01-bucket --versioning-configuration Status=Enabled' 
  },
];