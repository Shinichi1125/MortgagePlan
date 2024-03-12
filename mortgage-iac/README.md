# MortgagePlan Infrastructure
This repository contains the Terraform code to provision the AWS infrastructure for the MortgagePlan application. The infrastructure is modularized into components such as VPC, Subnets, Security Groups, Internet Gateway, Route Tables, and EC2 Instances to provide a scalable and manageable setup.

## Overview
The MortgagePlan infrastructure is designed to host a web application with a Java backend API and an Angular frontend, deployed on AWS. It uses a single VPC with a public subnet for the Angular client and an EC2 instance
that serves both the frontend and the backend.

## Prerequisites
- AWS CLI installed and configured with your credentials.
- Terraform >= 1.2.0
- An existing AWS Key Pair for SSH access to the EC2 instances.

## Modules
The infrastructure is divided into the following modules for better manageability:

- VPC: Sets up the Virtual Private Cloud.
- Subnet: Configures the public subnet.
- Security Group: Manages the security group for the Angular client, allowing web traffic and SSH access.
- Internet Gateway: Provides internet access to instances within the VPC.
- Route Table: Sets up routing for the VPC to direct traffic to the Internet Gateway.
- EC2 Instance: Provisions the EC2 instance for hosting the MortgagePlan application.

## Usage
To deploy the MortgagePlan infrastructure, follow these steps:

- Initialize Terraform
```
terraform init
```

- Plan the Deployment
Review the changes Terraform will make to your AWS environment.
```
terraform plan
```

- Apply the Configuration
Apply the Terraform configuration to provision the infrastructure.
```
terraform apply
```
When prompted, review the plan and approve it to start the provisioning process.

## Variables
You need to provide the following variables either through a terraform.tfvars file or command-line flags:

- ami_id: The AMI ID for the EC2 instance.
- key_name: The Key Name of your AWS Key Pair for SSH access.

### Example terraform.tfvars:
```
ami_id = "ami-1234567890abcdef0"
key_name = "my-aws-key-pair"
```