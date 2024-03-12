variable "vpc_id" {
  description = "The ID of the VPC where the subnet will be created"
  type        = string
}

variable "cidr_block" {
  description = "The CIDR block for the subnet"
  type        = string
}

variable "map_public_ip_on_launch" {
  description = "Whether instances launched in this subnet should be assigned a public IP"
  type        = bool
  default     = true
}

variable "availability_zone" {
  description = "The availability zone where the subnet will be located"
  type        = string
}

variable "name" {
  description = "The name of the subnet"
  type        = string
}
