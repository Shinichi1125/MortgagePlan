output "hosted_zone_id" {
  value = aws_route53_zone.mortgageplan_zone.zone_id
}

output "record_name" {
  value = aws_route53_record.root.name
}
