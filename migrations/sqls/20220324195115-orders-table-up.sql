Create Table orders (
  id Serial Primary Key Not Null Unique,
  quantity Int Not Null,
  user_id INT REFERENCES users(id) Not Null,
  product_id Int References products(id) Not Null
);
