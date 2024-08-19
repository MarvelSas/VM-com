

# Produkt

#### All products
GET `/api/v1/products/getAll`

###### Access permission
`User`

###### Params
```
null
```

###### Response
```
200 OK
{
  "status": "success",
  "data": {
    "items": [
      {
	      "status": "success",
	      "data": {
	      "id": 1234,
	      "name": "Nazwa produktu",
	      "description": "Opis produktu",
	      "price": 19.99,
	      "amount": 5,
	      "photos": ["photo1.jpg", "photo2.jpg", "photo3.jpg"]
	      "productCategory": {
		      "id": 1,
		      "name": "Kategoria 1"
	      }
	      "created_at": "2024-08-19T12:34:56Z",
	      "updated_at": "2024-08-19T12:34:56Z"
	  }
},
      {
	      "status": "success",
	      "data": {
	      "id": 4321,
	      "name": "Nazwa produktu",
	      "description": "Opis produktu",
	      "price": 19.99,
	      "amount": 5,
	      "photos": ["photo1.jpg", "photo2.jpg", "photo3.jpg"]
	      "productCategory": {
		      "id": 2,
		      "name": "Kategoria 2"
	      }
	      "created_at": "2024-08-19T12:34:56Z",
	      "updated_at": "2024-08-19T12:34:56Z"
	  }
    ],
    "total_items": 100,
  }
}
```


---
#### Pageable products
###### Endpoint
GET `/api/v1/products/pageable`

###### Access permission
`User`

###### Params
```
sortBy=price,asc
pageNumber=1
pageSize=10
```

###### Request
```
null
```

###### Response
```

200 OK
{
  "status": "success",
  "data": {
    "items": [
      {
	      "status": "success",
	      "data": {
	      "id": 1234,
	      "name": "Nazwa produktu",
	      "description": "Opis produktu",
	      "price": 19.99,
	      "amount": 5,
	      "photos": ["photo1.jpg", "photo2.jpg", "photo3.jpg"]
	      "productCategory": {
		      "id": 1,
		      "name": "Kategoria 1"
	      }
	      "created_at": "2024-08-19T12:34:56Z",
	      "updated_at": "2024-08-19T12:34:56Z"
	  }
},
      {
	      "status": "success",
	      "data": {
	      "id": 4321,
	      "name": "Nazwa produktu",
	      "description": "Opis produktu",
	      "price": 19.99,
	      "amount": 5,
	      "photos": ["photo1.jpg", "photo2.jpg", "photo3.jpg"]
	      "productCategory": {
		      "id": 2,
		      "name": "Kategoria 2"
	      }
	      "created_at": "2024-08-19T12:34:56Z",
	      "updated_at": "2024-08-19T12:34:56Z"
	  }
    ],
    "page": 1,
    "size": 10,
    "total_items": 100,
    "total_pages": 10
  }
}


400 Bad Request
{
  "status": "error",
  "message": "Invalid pagination parameters."
}



```

---
#### Product by ID
Produkt by ID
GET `/api/v1/products/{id}`

###### Access permission
`User`

###### Params
```
null
```

###### Request
```
null
```

###### Response
```

200 Ok
{
  "status": "success",
  "data": {
    "id": 1234,
	"name": "Nazwa produktu",
	"description": "Opis produktu",
	"price": 19.99,
	"amount": 5,
	"photos": ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
	"productCategory": {
		"id": 1,
		"name": "Kategoria 1"
	}
    "created_at": "2024-08-19T12:34:56Z",
    "updated_at": "2024-08-19T12:34:56Z"
  }
}

```

---
#### Add product
POST `/api/v1/products`

###### Access permission
`Admin`

Params
```
null
```

###### Request
```

{
	"name": "Nazwa produktu",
	"description": "Opis produktu",
	"price": 19.99,
	"amount": 5,
	"photos": ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
	"productCategory": {
		"id": 1,
		"name": "Kategoria 1"
	}
}

```

###### Response
```

201 Created
{
  "status": "success",
  "message": "Product has been successfully created.",
  "data": {
    "id": 1234,
	"name": "Nazwa produktu",
	"description": "Opis produktu",
	"price": 19.99,
	"amount": 5,
	"photos": ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
	"productCategory": {
		"id": 1,
		"name": "Kategoria 1"
	}
    "created_at": "2024-08-19T12:34:56Z",
    "updated_at": "2024-08-19T12:34:56Z"
  }
}

400 Bad Request
{
  "status": "error",
  "message": "Invalid input data. The 'name' field is required."
}

401 Unauthorized
{
  "status": "error",
  "message": "You are not authorized to create a new product."
}

```

Być może zwrotnie w nagłówek Location z adresem utworzonego produktu.
`Location: https://sklep.com/api/v1/product/1234`

---
#### Update product by ID
PUT `/api/v1/products/{id}`
###### Access permission
`Admin`

###### Params
```
null
```

###### Request
```

{
	"id": 1234,
	"name": "Nazwa produktu",
	"description": "Opis produktu",
	"price": 19.99,
	"amount": 5,
	"photos": ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
	"productCategory": {
		"id": 1,
		"name": "Kategoria 1"
	}
}

```

###### Response
```

200 OK
{
  "status": "success",
  "message": "Product with ID 1234 has been successfully updated.",
  "data": {
    "id": 1234,
	"name": "Nazwa produktu",
	"description": "Opis produktu",
	"price": 19.99,
	"amount": 5,
	"photos": ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
	"productCategory": {
		"id": 1,
		"name": "Kategoria 1"
	}
    "updated_at": "2024-08-19T12:34:56Z"
  }
}


400 Bad Request
{
  "status": "error",
  "message": "Invalid request data. The price must be a positive number."
}


401 Unauthorized
{
	"status": "error",
	"message": "You are not authorized to update this product."
}

```

---
#### Delete product by ID
DELETE `/api/v1/products/{id}`

###### Access permission
`Admin`

###### Params
```
null
```

###### Request
```
null
```

###### Response
```

200 OK
{
	"status": "success",
	"message": "Product with ID {id} has been successfully deleted."
}

404 Not Found
{
	"status": "error",
	"message": "Product with ID {id} could not be deleted because it does not exist."
}

403 Forbidden
{
	"status": "error",
	"message": "You do not have permission to delete this product."
}

```

---
#### Add photo

---

#### Delete photo by ID

---

