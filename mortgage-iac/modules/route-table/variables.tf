variable "vpc_id" {
  description = "The ID of the VPC for the route table"
  type        = string
}

variable "subnet_id" {
  description = "The ID of the subnet to associate with the route table"
  type        = string
}

variable "igw_id" {
  description = "The ID of the Internet Gateway for the route"
  type        = string
}

variable "name" {
  description = "The name of the route table"
  type        = string
}
