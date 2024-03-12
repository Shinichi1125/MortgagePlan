variable "name" {
  description = "The name of the security group"
  type        = string
}

variable "description" {
  description = "The description of the security group"
  type        = string
}

variable "vpc_id" {
  description = "The VPC ID"
  type        = string
}

variable "revoke_rules_on_delete" {
  description = "Whether rules should be revoked when deleted"
  type        = bool
  default     = true
}

variable "ingress_rules" {
  description = "A list of maps containing ingress rule definitions"
  type = list(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))
  default     = []
}
