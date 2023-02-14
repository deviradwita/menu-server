## Endpoints

List of Available Endpoints:
- `POST/ foods`
- `GET/ foods`
- `GET/ categories`
- `GET/ foods/:id`
- `DELETE / foods/:id`
- `POST /register/admin`
- `POST /login`


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
      "authorId": Integer,
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
      "categoryId": Date,
      "categoryId": Date
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







## 3. GET/ foods/:id

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

