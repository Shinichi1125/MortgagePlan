resource "aws_route_table" "public_route" {
  vpc_id = var.vpc_id

  tags = {
    Name = var.name
  }
}

resource "aws_route_table_association" "public_rta" {
  subnet_id      = var.subnet_id
  route_table_id = aws_route_table.public_route.id
}

resource "aws_route" "internet_access" {
  route_table_id         = aws_route_table.public_route.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = var.igw_id
}
