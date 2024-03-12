output "subnet_id" {
  value       = aws_subnet.public_subnet.id
  description = "The ID of the subnet"
}
