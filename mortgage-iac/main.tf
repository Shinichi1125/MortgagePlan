terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "eu-north-1"
}

module "vpc" {
  source = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
  name       = "mortgageplan-vpc"
}

module "security_group" {
  source      = "./modules/security-group"
  name        = "mortgageplan-sg-public"
  description = "Security group for the Angular client"
  vpc_id      = module.vpc.vpc_id

  revoke_rules_on_delete = false

  ingress_rules = [
    {
      from_port   = 80,
      to_port     = 80,
      protocol    = "tcp",
      cidr_blocks = ["0.0.0.0/0"],
    },
    {
      from_port   = 22,
      to_port     = 22,
      protocol    = "tcp",
      cidr_blocks = ["0.0.0.0/0"],
    },
    {
      from_port   = 443,
      to_port     = 443,
      protocol    = "tcp",
      cidr_blocks = ["0.0.0.0/0"],
    }
  ]
}

module "public_subnet" {
  source              = "./modules/subnet"
  vpc_id              = module.vpc.vpc_id
  cidr_block          = "10.0.10.0/24"
  map_public_ip_on_launch = true
  availability_zone   = "eu-north-1a"
  name                = "mortgageplan-public-subnet"
}

module "internet_gateway" {
  source = "./modules/internet-gateway"
  vpc_id = module.vpc.vpc_id
  name   = "mortgageplan-igw"
}

module "route_table" {
  source     = "./modules/route-table"
  vpc_id     = module.vpc.vpc_id
  subnet_id  = module.public_subnet.subnet_id
  igw_id     = module.internet_gateway.igw_id
  name       = "mortgageplan-public-route"
}

resource "aws_instance" "mortgage-plan" {
  ami           = var.ami_id
  instance_type = "t3.small"
  subnet_id      = module.public_subnet.subnet_id
  vpc_security_group_ids = [module.security_group.security_group_id]
  key_name                = var.key_name

  tags = {
    Name = "mortgage-plan"
  }
}