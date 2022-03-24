Create Type If not defined mood As Enum ('active', 'complete');

Create Table If Not Exists orders (
  id Serial Primary Key Not Null Unique,
  quantity Int Not Null,
  user_id INT REFERENCES users(id) Not Null,
  product_id Int References products(id) Not Null,
  status mood Not Null
);
