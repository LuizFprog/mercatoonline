Microsserviços que estão em funcionamento

Microsserviço user-service, product-service e order-service.

Order-service precisa receber uma resposta assincrona do microsserviço payment-service. Para criar a order-service.

No microsserviço User-service/prisma/data tem dois arquivos ".csv". 
Um para as cidades brasileiras e outro para os Estados brasileiros. 

ORDERS MICROSERVICE

Cadastrar uma order:
http://localhost:4001/orders
{
  "userId": 2,
  "addressId": 2,
  "paymentId": 1,
  "orderProducts": [  
    {
      "productId": 3,
      "amount": 2,
      "price": 2.35
    }
  ]
}

USERS MICROSERVICE

Cadastrar um usuário:

http://localhost:4001/users

{
  "name": "Novo Usuário de Teste",
  "email": "sucesso@email.com",
  "cpf": "98765432110",
  "typeUser": 1,
  "phone": "81123456789",
  "password": "umaSenhaSuperSegura123!",
  "address": {
    "street": "Avenida Boa Viagem",
    "number": 2024,
    "complement": "Apto 101",
    "cep": "51020-000",
    "cityId": 2611606
  }
}
x
Atualizar usuário:
http://localhost:4001/users/5
{
  "password":"123123"
}


PRODUCTS MICROSERVICE

Cadastrar um produto:
http://localhost:4001/products
{
  "name": "Caneta Cinza",
  "price": 16.50,
  "image": "http://example.com/caneta.png",
  "brand": "SuperBIC",
  "batch":"11111OAL6",
  "validity":"15/06/2030",
  "categoryId": 1 
}

Atualizar um produto:
http://localhost:4001/products/1
{
  "batch":"11111OAL6",
  "validity":"15/06/2030"
}

Pesquisar por preço:
http://localhost:4001/products
{
  "price1":0.50,
  "price2":10.00
}
CATEGORIAS:

Cadastrar uma categoria:

http://localhost:4001/categories
{
  "name": "Papelaria"
}

