resource "aws_security_group" "public_security_group" {
  name        = var.name
  description = var.description
  vpc_id      = var.vpc_id

  revoke_rules_on_delete = var.revoke_rules_on_delete

  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      from_port   = ingress.value["from_port"]
      to_port     = ingress.value["to_port"]
      protocol    = ingress.value["protocol"]
      cidr_blocks = ingress.value["cidr_blocks"]
    }
  }
}
