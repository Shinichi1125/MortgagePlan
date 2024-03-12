variable "ami_id" {
  type        = string
  description = "The AMI ID for the EC2 instance"
}

variable "key_name" {
  type        = string
  description = "The Key Name for the EC2 instance"
}

variable "public_ip" {
  type        = string
  description = "The public IP address of the EC2 instance"
}