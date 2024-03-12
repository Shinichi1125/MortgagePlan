resource "aws_route53_zone" "mortgageplan_zone" {
  comment       = var.zone_comment
  force_destroy = var.force_destroy
  name          = var.domain_name
}

resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.mortgageplan_zone.zone_id
  name    = var.domain_name
  type    = "A"
  ttl     = var.ttl
  records = [var.public_ip]
}
