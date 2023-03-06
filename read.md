## Endpoints

List of Available Endpoints:
- `POST/ foods`
- `GET/ foods`
- `GET/ categories`
- `GET/ foods/:id`
- `DELETE/ foods/:id`
- `POST/ register/admin`
- `POST/ login`
- `DELETE/ categories/:id`
- `GET/ histories`
- `PUT/ foods/:id`
- `PUT/ categories/:id`
- `PATCH/ foods/:id`
- `PUT/ foods/:id`
- `GET/ categories/:id`

- `POST/ public/login`
- `POST/ public/register`
- `GET/ public/foods`
- `GET/ public/foods/:id`
- `GET/ public/categories`
- `GET/ public/bookmarks`
- `POST/ public/bookmarks/:foodId`







### POST/ foods
#### Description
- Create a new Food data


#### Request


- headers: 

```json
{
  "access_token": "string"
}
```
- Body
    ```json
    {
      "name": String,
      "description": String,
      "price": Integer,
      "imgUrl": String,
      "categoryId": Integer
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,
      "data": {
      "name": String,
      "description": String,
      "price": Integer,
      "imgUrl": String,
      "authorId": Integer,
      "categoryId": Integer,
      "updatedAt": Date,
      "createdAt": Date
      }
    }
    ```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is Required."
}
OR
{
  "message": "Description is Required."
}
OR
{
  "message": "Price is Required."
}
OR
{
  "message": "Minumum price is Rp.10.000"
}
OR
{
  "message": "ImgUrl is Required."
}



```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token",
}
```


### POST/ Categories
#### Description
- Create a new Categories data


#### Request


- headers: 

```json
{
  "access_token": "string"
}
```
- Body
    ```json
    {
      "name": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,
      "data": {
      "name": String
      }
    }
    ```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is Required."
}



```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token",
}
```



##  GET /foods

Description:
- Get all Foods data from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```
_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Dimsum",
        "description": "Delicious Dimsum with prawn",
        "price": 20000,
        "imgUrl": "https://tinyurl.com/4hydhj2e",
        "authorId": 3,
        "categoryId": 2,
        "createdAt": "2023-02-13T10:52:59.047Z",
        "updatedAt": "2023-02-13T10:52:59.047Z"
    },
    {
    "id": 2,
    "name": "CheeseBurger",
    "description": "Burger with Cheese",
    "price": 25000,
    "imgUrl": "https://tinyurl.com/27p8pv7w",
    "authorId": 3,
    "categoryId": 1,
    "updatedAt": "2023-02-13T11:14:10.034Z",
    "createdAt": "2023-02-13T11:14:10.034Z"
    }
]
```

_Response 500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Internal Server Error"
      }
    }
    ```


_Response (401 - Unauthorized)_
 ```json
{
  "message": "Invalid Token",
}
 ```


##  GET /categories

Description:
- Get all Categories data from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```
_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Western Food",
        "createdAt": "2023-02-28T15:45:21.736Z",
        "updatedAt": "2023-02-28T15:45:21.736Z"
    },
    {
        "id": 2,
        "name": "Chinese Food",
        "createdAt": "2023-02-28T15:45:21.736Z",
        "updatedAt": "2023-02-28T15:45:21.736Z"
    },
    {
        "id": 3,
        "name": "Indonesian Food",
        "createdAt": "2023-02-28T15:45:21.736Z",
        "updatedAt": "2023-02-28T15:45:21.736Z"
    },
    {
        "id": 4,
        "name": "Indian Food",
        "createdAt": "2023-02-28T15:45:21.736Z",
        "updatedAt": "2023-02-28T15:45:21.736Z"
    },
    {
        "id": 5,
        "name": "Korean Food",
        "createdAt": "2023-03-03T14:29:49.971Z",
        "updatedAt": "2023-03-03T14:29:49.971Z"
    }
]
```

_Response 500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Internal Server Error"
      }
    }
    ```


_Response (401 - Unauthorized)_
 ```json
{
  "message": "Invalid Token",
}
 ```






##  GET/ foods/:id

Description:
- Get Food Data By Id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
- Params
```json
{
    "id": 1,
    "name": "Dimsum",
    "description": "Delicious Dimsum with prawn",
    "price": 20000,
    "imgUrl": "https://tinyurl.com/4hydhj2e",
    "authorId": 3,
    "categoryId": 2,
    "createdAt": "2023-02-13T10:52:59.047Z",
    "updatedAt": "2023-02-13T10:52:59.047Z"
}
```




_Response (401 - Unauthorized)_
- Body
 ```json
{
  "message": "Invalid Token",
}
 ```
_Response 404 - Not Found_

    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Error not found"
      }
    }
    ```

  




### DELETE /foods/:id
#### Description
- Remove a food data based on given id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

#### Response
_200 - OK_
- Params
    ```json
    {
      "statusCode": 200,
      "message": "<entity name> success to delete"
    }
    ```

 _Response (401 - Unauthorized)_
 ```json
{
  "message": "Invalid Token",
}
 ```


_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Error not found"
      }
    }
    ```

_Response (403 - Forbidden)_
 ```json
{
  "message": "Not Allowed",
}
 ```



## GET/ foods/detail

Description:
- Get all data

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Western Food",
        "createdAt": "2023-02-13T10:50:53.320Z",
        "updatedAt": "2023-02-13T10:50:53.320Z"
    },
    {
        "id": 2,
        "name": "Chinese Food",
        "createdAt": "2023-02-13T10:50:53.320Z",
        "updatedAt": "2023-02-13T10:50:53.320Z"
    },
    {
        "id": 3,
        "name": "Indonesian Food",
        "createdAt": "2023-02-13T10:50:53.320Z",
        "updatedAt": "2023-02-13T10:50:53.320Z"
    },
    {
        "id": 4,
        "name": "Indian Food",
        "createdAt": "2023-02-13T10:50:53.320Z",
        "updatedAt": "2023-02-13T10:50:53.320Z"
    }
]
```

 _Response (401 - Unauthorized)_
 ```json
{
  "message": "Invalid Token",
}
 ```

_Response 404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Error not found"
      }
    }
    ```


### POST /register/admin
#### Description
- Create a new account for admin


#### Request
- Body
    ```json
    {
      "username": String,
      "email": String,
      "password": String,
      "phoneNumber": String,
      "address": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {message : {id, email } }
    ```

_Response (400 - Bad Request)_

```json
{
  "message": "Email already been used."
}
OR
{
  "message": "Email is Required"
}
OR
{
  "message": "input must be email format"
}
OR
{
  "message": "Password is Required"
}

```

### DELETE /categories/:id
#### Description
- Remove a category data based on given id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

#### Response
_200 - OK_
- Params
    ```json
    {
      "statusCode": 200,
      "message": "<entity name> success to delete"
    }
    ```

 _Response (401 - Unauthorized)_
 ```json
{
  "message": "Invalid Token",
}
 ```


_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Error not found"
      }
    }
    ```




 ## GET/ histories

Description:
- Get all logs data

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
      {
        "id": 2,
        "title": "Burger",
        "description": "Food status with ID 1 has been update from Active to Inactive",
        "updatedBy": "test",
        "createdAt": "2023-02-26T04:06:15.329Z",
        "updatedAt": "2023-02-26T04:06:15.329Z"
    },
    {
        "id": 1,
        "title": "Burger",
        "description": "New Food - Burger with ID 1 added",
        "updatedBy": "Devira Dwita Rizkiningrum",
        "createdAt": "2023-02-26T03:54:28.555Z",
        "updatedAt": "2023-02-26T03:54:28.555Z"
    }

]
```

 _Response (401 - Unauthorized)_
 ```json
{
  "message": "Invalid Token",
}
 ```

_Response 404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Error not found"
      }
    }
    ```






### POST /login
#### Description
- login for user and admin


#### Request
- Body
    ```json
    {
      "email": String,
      "password": String,
    }
    ```
#### Response
_200 - Ok_
Request:
- body:

```json
{
  "access_token": "string"
}
```

 

_Response (400 - Bad Request)_


```json
{
  "message": "Email or Password required"
}
```

_401 - Unauthorized _
```json
{
  "message": "Wrong Email or Password"
}
```

### PUT /foods/:id
#### Description
- edit a food data based on given id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

#### Response
_200 - OK_
- Params
    ```json
    {
      "statusCode": 200,
      "message": "<entity name> success to edit"
    }
    ```

 _Response (401 - Unauthorized)_
 ```json
{
  "message": "Invalid Token",
}
 ```


_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Error not found"
      }
    }
    ```




### PUT /categories/:id
#### Description
- edit a category data based on given id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

#### Response
_200 - OK_
- Params
    ```json
    {
      "statusCode": 200,
      "message": "<entity name> success to edit"
    }
    ```

 _Response (401 - Unauthorized)_
 ```json
{
  "message": "Invalid Token",
}
 ```


_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Error not found"
      }
    }
    ```



 ### PATCH /foods/:id
#### Description
- edit a food status data based on given id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

#### Response
_200 - OK_
- Params
    ```json
    {
      "statusCode": 200,
      "message": "food status successfully change from active to inactive
    }
    ```

 _Response (401 - Unauthorized)_
 ```json
{
  "message": "Invalid Token",
}
 ```


_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Error not found"
      }
    }
    ```

_Response (403 - Forbidden)_
 ```json
{
  "message": "Not Allowed",
}
 ```

 ##  GET/ categories/:id

Description:
- Get category Data By Id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
- Params
```json
{
    "id": 1,
    "name": "Indonesian Food",
    "createdAt": "2023-02-13T10:52:59.047Z",
    "updatedAt": "2023-02-13T10:52:59.047Z"
}
```


_Response (401 - Unauthorized)_
- Body
 ```json
{
  "message": "Invalid Token",
}
 ```
_Response 404 - Not Found_

    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Error not found"
      }
    }
    ```


### POST /public/login
#### Description
- login for customer


#### Request
- Body
    ```json
    {
      "email": String,
      "password": String,
    }
    ```
#### Response
_200 - Ok_
Request:
- body:

```json
{
  "access_token": "string"
}
```

 

_Response (400 - Bad Request)_


```json
{
  "message": "Email or Password required"
}
```

_401 - Unauthorized _
```json
{
  "message": "Wrong Email or Password"
}
```


### POST /public/register
#### Description
- Create a new account for customer


#### Request
- Body
    ```json
    {
      "username": String,
      "email": String,
      "password": String,
      "phoneNumber": String,
      "address": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {message : {id, email } }
    ```

_Response (400 - Bad Request)_

```json
{
  "message": "Email already been used."
}
OR
{
  "message": "Email is Required"
}
OR
{
  "message": "input must be email format"
}
OR
{
  "message": "Password is Required"
}

```

##  GET /public/foods

Description:
- Get all Foods data from database for customer

Request:

_Response (200 - OK)_

```json
{
    "totalItems": 10,
    "totalPages": 2,
    "currentPage": 1,
    "listFoods": [
        {
            "id": 9,
            "name": "Topokki",
            "description": "Korean hot and spicy rice cake",
            "price": 55000,
            "imgUrl": "https://iamafoodblog.b-cdn.net/wp-content/uploads/2021/07/tteokbokki-4592.jpg",
            "authorId": 5,
            "categoryId": 5,
            "status": "Active",
            "createdAt": "2023-02-28T17:09:31.372Z",
            "updatedAt": "2023-02-28T17:09:31.372Z",
            "User": {
                "id": 5,
                "username": "rose",
                "email": "rose@mail.com"
            }
        },
        {
            "id": 4,
            "name": "Tikka masala",
            "description": " roasted marinated chicken chunks (chicken tikka) in a spiced sauce",
            "price": 125000,
            "imgUrl": "https://asset.kompas.com/crops/BxSdnP4SOnMJIjNreMuIWhVSRbE=/0x0:1000x667/750x500/data/photo/2021/07/31/61053292cd265.jpg",
            "authorId": 5,
            "categoryId": 4,
            "status": "Active",
            "createdAt": "2023-02-28T17:08:57.932Z",
            "updatedAt": "2023-02-28T17:08:57.932Z",
            "User": {
                "id": 5,
                "username": "rose",
                "email": "rose@mail.com"
            }
        },
        {
            "id": 5,
            "name": "Chicken gojuchang",
            "description": " Juicy, tender chicken bites in sweet, spicy, savoury gochujang sauce.",
            "price": 100000,
            "imgUrl": "https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Korean-Fried-Chicken-square-FS-New-7377.jpg",
            "authorId": 5,
            "categoryId": 5,
            "status": "Active",
            "createdAt": "2023-02-28T17:09:05.060Z",
            "updatedAt": "2023-02-28T17:09:05.060Z",
            "User": {
                "id": 5,
                "username": "rose",
                "email": "rose@mail.com"
            }
        },
        {
            "id": 6,
            "name": "Indomie",
            "description": "fried noodles with chicken, egg, and melted cheese",
            "price": 40000,
            "imgUrl": "https://www.nibble.id/uploads/indomie_ropang_plus_plus_7ae81a3873.jpg",
            "authorId": 5,
            "categoryId": 3,
            "status": "Active",
            "createdAt": "2023-02-28T17:09:15.073Z",
            "updatedAt": "2023-02-28T17:09:15.073Z",
            "User": {
                "id": 5,
                "username": "rose",
                "email": "rose@mail.com"
            }
        },
        {
            "id": 8,
            "name": "Chicken Kofta",
            "description": "delicious dish of fried balls of chicken and paneer in a rich and creamy mild gravy made with sweet onions and tomatoes",
            "price": 65000,
            "imgUrl": "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Fragrant-lamb-kofta-curry-0821ac7.jpg",
            "authorId": 5,
            "categoryId": 4,
            "status": "Active",
            "createdAt": "2023-02-28T17:09:27.216Z",
            "updatedAt": "2023-02-28T17:09:27.216Z",
            "User": {
                "id": 5,
                "username": "rose",
                "email": "rose@mail.com"
            }
        },
        {
            "id": 2,
            "name": "Cimol",
            "description": "street Indonesian snack, it’s fried tapioca starch/flour batter served with salt and chili powder",
            "price": 25000,
            "imgUrl": "https://img.kurio.network/z5rkJFORTpyTwquMGEHyS5EfGEk=/320x320/filters:quality(80)/https://kurio-img.kurioapps.com/21/12/02/33794e21-7b89-4777-b4eb-d9f7716c1f7d.jpe",
            "authorId": 5,
            "categoryId": 3,
            "status": "Active",
            "createdAt": "2023-02-28T17:08:45.605Z",
            "updatedAt": "2023-02-28T17:08:45.605Z",
            "User": {
                "id": 5,
                "username": "rose",
                "email": "rose@mail.com"
            }
        }
    ]
}
```

_Response 500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Internal Server Error"
      }
    }
    ```







##  GET/ public/foods/:id

Description:
- Get Food Data By Id for customer

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
- Params
```json
{
    "id": 1,
    "name": "Dimsum",
    "description": "Delicious Dimsum with prawn",
    "price": 20000,
    "imgUrl": "https://tinyurl.com/4hydhj2e",
    "authorId": 3,
    "categoryId": 2,
    "createdAt": "2023-02-13T10:52:59.047Z",
    "updatedAt": "2023-02-13T10:52:59.047Z"
}
```




_Response (401 - Unauthorized)_
- Body
 ```json
{
  "message": "Invalid Token",
}
 ```
_Response 404 - Not Found_

    ```json
    {
      "statusCode": 404,
      "error": {
        "message": "Error not found"
      }
    }
    ```


##  GET /public/categories

Description:
- Get all Categories data from database for customer

Request:

- headers: 

```json
{
  "access_token": "string"
}
```
_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Western Food",
        "createdAt": "2023-02-28T15:45:21.736Z",
        "updatedAt": "2023-02-28T15:45:21.736Z"
    },
    {
        "id": 2,
        "name": "Chinese Food",
        "createdAt": "2023-02-28T15:45:21.736Z",
        "updatedAt": "2023-02-28T15:45:21.736Z"
    },
    {
        "id": 3,
        "name": "Indonesian Food",
        "createdAt": "2023-02-28T15:45:21.736Z",
        "updatedAt": "2023-02-28T15:45:21.736Z"
    },
    {
        "id": 4,
        "name": "Indian Food",
        "createdAt": "2023-02-28T15:45:21.736Z",
        "updatedAt": "2023-02-28T15:45:21.736Z"
    },
    {
        "id": 5,
        "name": "Korean Food",
        "createdAt": "2023-03-03T14:29:49.971Z",
        "updatedAt": "2023-03-03T14:29:49.971Z"
    }
]
```

_Response 500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Internal Server Error"
      }
    }
    ```


_Response (401 - Unauthorized)_
 ```json
{
  "message": "Invalid Token",
}
 ```


 ##  GET /public/bookmarks

Description:
- Get all bookmark data from database by id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```
_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "UserId": 5,
        "FoodId": 1,
        "createdAt": "2023-03-01T08:09:14.709Z",
        "updatedAt": "2023-03-01T08:09:14.709Z",
        "Food": {
            "id": 1,
            "name": "Burger",
            "description": "High quality beef medium to well with cheese and bacon on a multigrain bun.",
            "price": 45000,
            "imgUrl": "https://tinyurl.com/27p8pv7w",
            "authorId": 5,
            "categoryId": 1,
            "status": "Active",
            "createdAt": "2023-02-28T16:57:16.292Z",
            "updatedAt": "2023-02-28T16:57:16.292Z"
        }
    },
    {
        "id": 2,
        "UserId": 5,
        "FoodId": 4,
        "createdAt": "2023-03-01T08:09:30.075Z",
        "updatedAt": "2023-03-01T08:09:30.075Z",
        "Food": {
            "id": 4,
            "name": "Tikka masala",
            "description": " roasted marinated chicken chunks (chicken tikka) in a spiced sauce",
            "price": 125000,
            "imgUrl": "https://asset.kompas.com/crops/BxSdnP4SOnMJIjNreMuIWhVSRbE=/0x0:1000x667/750x500/data/photo/2021/07/31/61053292cd265.jpg",
            "authorId": 5,
            "categoryId": 4,
            "status": "Active",
            "createdAt": "2023-02-28T17:08:57.932Z",
            "updatedAt": "2023-02-28T17:08:57.932Z"
        }
    },
    {
        "id": 10,
        "UserId": 5,
        "FoodId": 9,
        "createdAt": "2023-03-03T19:09:56.342Z",
        "updatedAt": "2023-03-03T19:09:56.342Z",
        "Food": {
            "id": 9,
            "name": "Topokki",
            "description": "Korean hot and spicy rice cake",
            "price": 55000,
            "imgUrl": "https://iamafoodblog.b-cdn.net/wp-content/uploads/2021/07/tteokbokki-4592.jpg",
            "authorId": 5,
            "categoryId": 5,
            "status": "Active",
            "createdAt": "2023-02-28T17:09:31.372Z",
            "updatedAt": "2023-02-28T17:09:31.372Z"
        }
    },
    {
        "id": 11,
        "UserId": 5,
        "FoodId": 6,
        "createdAt": "2023-03-03T19:11:02.769Z",
        "updatedAt": "2023-03-03T19:11:02.769Z",
        "Food": {
            "id": 6,
            "name": "Indomie",
            "description": "fried noodles with chicken, egg, and melted cheese",
            "price": 40000,
            "imgUrl": "https://www.nibble.id/uploads/indomie_ropang_plus_plus_7ae81a3873.jpg",
            "authorId": 5,
            "categoryId": 3,
            "status": "Active",
            "createdAt": "2023-02-28T17:09:15.073Z",
            "updatedAt": "2023-02-28T17:09:15.073Z"
        }
    },
    {
        "id": 12,
        "UserId": 5,
        "FoodId": 5,
        "createdAt": "2023-03-03T19:12:22.532Z",
        "updatedAt": "2023-03-03T19:12:22.532Z",
        "Food": {
            "id": 5,
            "name": "Chicken gojuchang",
            "description": " Juicy, tender chicken bites in sweet, spicy, savoury gochujang sauce.",
            "price": 100000,
            "imgUrl": "https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Korean-Fried-Chicken-square-FS-New-7377.jpg",
            "authorId": 5,
            "categoryId": 5,
            "status": "Active",
            "createdAt": "2023-02-28T17:09:05.060Z",
            "updatedAt": "2023-02-28T17:09:05.060Z"
        }
    }
]
```

_Response 500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Internal Server Error"
      }
    }
    ```


_Response (401 - Unauthorized)_
 ```json
{
  "message": "Invalid Token",
}
 ```


 ### POST/ public/bookmarks/:foodId
#### Description
- Create a new bookmark data


#### Request


- headers: 

```json
{
  "access_token": "string"
}
```
- params
    ```json
    {
      "FoodId": Integer
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,
      "data": {
      "name": String
      }
    }
    ```

_Response (400 - Bad Request)_

```json
{
  "message": "Not found."
}
or
{
  "message": "You Already Love This Food"
}




```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token",
}
```







## Global Error


_Response (500 - Internal Server Error)_

```json
 {
      "statusCode": 500,
      "error": {
        "message": "Internal Server Error"
      }
  }
```

