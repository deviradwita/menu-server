## Endpoints

List of Available Endpoints:
- `POST/ foods`
- `GET/ foods`
- `GET/ categories`
- `GET/ foods/:id`
- `DELETE / foods/:id`

### POST/ foods
#### Description
- Create a new Food data


#### Request
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



##  GET /foods

Description:
- Get all Foods data from database


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


## 3. GET/ foods/:id

Description:
- Get Food Data By Id


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




### DELETE /foods/:id
#### Description
- Remove a food data based on given id

#### Response
_200 - OK_
- Params
    ```json
    {
      "statusCode": 200,
      "message": "<entity name> success to delete"
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



## GET/ foods/detail

Description:
- Get all data


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

