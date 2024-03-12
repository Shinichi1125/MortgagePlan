variable "zone_comment" {
  description = "A comment for the Route 53 hosted zone"
  type        = string
}

variable "force_destroy" {
  description = "Whether to destroy all records (including non-Terraform managed ones) in the zone when deleting the zone"
  type        = bool
  default     = false
}

variable "domain_name" {
  description = "The domain name for the hosted zone"
  type        = string
}

variable "ttl" {
  description = "The TTL of the DNS record"
  type        = number
  default     = 300
}

variable "public_ip" {
  description = "The public IP address for the A record"
  type        = string
}
