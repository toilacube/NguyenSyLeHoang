## Problem Description

Develop a backend server with ExpressJS. You are required to build a set of CRUD interface that allow a user to interact with the service. You are required to use TypeScript for this task.
1. Interface functionalities:
a. Create a resource.
b. List resources with basic filters.
c. Get details of a resource.
d. Update resource details.
e. Delete a resource.
2. You should connect your backend service with a simple database for data persistence.
3. Provide README.md for the configuration and the way to run application.


## Main components

Since it is a coding challenge so I will create a simple CRUD to store coding challenges.

In a backend application with CRUD, there are some basic components:

- A common Api response structure for every endpoints to ensure RESTful, including:
    - Success response
    - Error resposne (error handling)
- Validating the data recieved

## Configuration

- Database: MySQL
- Node version: v22.12.0
- Server Port: 3000
- Database Port: 3306

## How to run

Make sure you have npm, node and docker installed

1. Create `.env` at the root of the project and copy the `.env.example` to `.env`

2. Install dependencies and build the project:
```bash
npm install
npm run build
```

2. Open terminal and run:
```bash
docker compose up
```
## Testing with curl

- Get alll challenges:

```bash
curl -X GET "http://localhost:3000/api/challenges?page=1&limit=10"
```

- Get all challenges with filter:
```bash
  curl -X GET "http://localhost:3000/api/challenges?difficulty=easy&search=array&isActive=true
```

- Get a challenge:
 ```bash
 curl -X GET http://localhost:3000/api/challenges/1
 ```

- Insert a challenge:
```bash
curl -X POST http://localhost:3000/api/challenges \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Two Sum",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    "difficulty": "easy",
    "tags": ["arrays", "hash-table", "algorithms"],
    "sampleSolution": "function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map[complement] !== undefined) {\n      return [map[complement], i];\n    }\n    map[nums[i]] = i;\n  }\n  return [];\n}",
    "testCases": "[{\"input\":\"[2,7,11,15], 9\",\"output\":\"[0,1]\"}]",
    "isActive": true
  }'
```

- Update a challenge:
```bash
  curl -X PUT http://localhost:3001/api/challenges/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Two Sum Problem",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",
    "difficulty": "easy",
    "tags": ["arrays", "hash-table", "algorithms", "updated"]
  }'
```

- Delete a challenge

```bash
curl -X DELETE http://localhost:3000/api/challenges/1
```