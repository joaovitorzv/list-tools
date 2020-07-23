# List tools 📋

### 🧐 Objective 

This project was made to increase my knowledge about typescript and typeorm, on this project i've learned how to instantiate services, create entities, throw app errors and tests with jest

### Routes

`GET` `/tools` must return all tools registered in the database

`GET` `/tools?tag=typescript` must return only tools that have a tag especified as a query param e.g:
 ```json
  "id": 26,
    "title": "cors",
    "link": "https://cors.com",
    "description": "Protect your application from others sources requests",
    "tags": [
      "javascript",
      "typescript"
    ],
    "created_at": "2020-07-23T00:34:32.657Z",
    "updated_at": "2020-07-23T00:34:32.657Z"
  }
 ```

`POST` `/tools` creates a new tool 

`DELETE` `/tools/:id` delete the tool especified with your id param

### 🔨 This project was made with the following technologies:
  - [Node.js](https://nodejs.org/en/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Typeorm](https://typeorm.io/)
