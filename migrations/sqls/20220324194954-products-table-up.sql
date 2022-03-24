Create Table If Not Exists products (
  id Serial Primary key Not Null,
  name VarChar Not Null,
  price Int Not Null
);