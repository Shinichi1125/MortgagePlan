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

resource "aws_vpc" "mortgageplan-vpc" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "mortgageplan-vpc"
  }
}

resource "aws_security_group" "mortgageplan-sg-public" {
  name        = "mortgageplan-sg-public"
  description = "Security group for the Angular client" 
  vpc_id      = aws_vpc.mortgageplan-vpc.id

  revoke_rules_on_delete = false
}

resource "aws_subnet" "mortgageplan-public-subnet" {
  vpc_id     = aws_vpc.mortgageplan-vpc.id
  cidr_block = "10.0.10.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = "mortgageplan-public-subnet"
  }
}

resource "aws_internet_gateway" "mortgageplan-igw" {
  vpc_id = aws_vpc.mortgageplan-vpc.id

  tags = {
    Name = "mortgageplan-igw"
  }
}

resource "aws_route_table" "mortgageplan-public-route" {
  vpc_id = aws_vpc.mortgageplan-vpc.id

  tags = {
    Name = "mortgageplan-public-route"
  }
}

resource "aws_route_table_association" "mortgageplan-public-rta" {
  subnet_id      = aws_subnet.mortgageplan-public-subnet.id
  route_table_id = aws_route_table.mortgageplan-public-route.id
}

resource "aws_route" "mortgageplan_internet_access" {
  route_table_id         = aws_route_table.mortgageplan-public-route.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.mortgageplan-igw.id
}

resource "aws_security_group_rule" "mortgageplan_allow_web_traffic" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.mortgageplan-sg-public.id
}

resource "aws_security_group_rule" "mortgageplan_allow_ssh" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.mortgageplan-sg-public.id
}

variable "ami_id" {
  type        = string
  description = "The AMI ID for the EC2 instance"
}

variable "key_name" {
  type        = string
  description = "The Key Name for the EC2 instance"
}

resource "aws_instance" "mortgage-plan" {
  ami           = var.ami_id
  instance_type = "t3.small"
  subnet_id               = aws_subnet.mortgageplan-public-subnet.id
  vpc_security_group_ids  = [aws_security_group.mortgageplan-sg-public.id]
  key_name                = var.key_name

  tags = {
    Name = "mortgage-plan"
  }
}