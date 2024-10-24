
## Endpoints

### 1. Get All Persons
- **URL:** `/`
- **Method:** `GET`
- **Description:** Retrieves a list of all persons.
- **Response:**
  - **200 OK**
    ```json
    [
      {
        "id": "1",
        "name": "Sam",
        "age": 26,
        "hobbies": []
      }
    ]
    ```

### 2. Get Person by ID
- **URL:** `/:id`
- **Method:** `GET`
- **Description:** Retrieves a person by their ID.
- **URL Params:**
  - `id=[string]` - The ID of the person to retrieve.
- **Response:**
  - **200 OK**
    ```json
    {
      "id": "1",
      "name": "Sam",
      "age": 26,
      "hobbies": []
    }
    ```
  - **404 Not Found**
    ```json
    {
      "message": "Resource not found"
    }
    ```

### 3. Create a New Person
- **URL:** `/`
- **Method:** `POST`
- **Description:** Creates a new person.
- **Body Params:**
  - `name=[string]` - The name of the person.
  - `age=[number]` - The age of the person.
  - `hobbies=[array]` - An array of hobbies.
- **Response:**
  - **201 Created**
    ```json
    {
      "id": "2",
      "name": "John",
      "age": 30,
      "hobbies": []
    }
    ```

### 4. Update a Person
- **URL:** `/:id`
- **Method:** `PUT`
- **Description:** Updates an existing person by ID.
- **URL Params:**
  - `id=[string]` - The ID of the person to update.
- **Body Params:**
  - `name=[string]` - The new name of the person.
  - `age=[number]` - The new age of the person.
  - `hobbies=[array]` - The new array of hobbies.
- **Response:**
  - **200 OK**
    ```json
    {
      "id": "1",
      "name": "Sam",
      "age": 27,
      "hobbies": ["reading"]
    }
    ```

### 5. Delete a Person
- **URL:** `/:id`
- **Method:** `DELETE`
- **Description:** Deletes a person by ID.
- **URL Params:**
  - `id=[string]` - The ID of the person to delete.
- **Response:**
  - **204 No Content**

## Error Handling
- **404 Not Found**
  - Returned when the requested resource does not exist.
  ```json
  {
    "message": "Resource not found"
  }
  ```

- **500 Internal Server Error**
  - Returned when there is an internal server error.
  ```json
  {
    "message": "Internal server error"
  }
  ```

