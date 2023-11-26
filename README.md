# Backend TypeORM

# Setup

- Run ```npm i ``` on terminal
- Set your database on Data-Source.ts
- Set Cloudinary on config.ts 
- Run ```npm run migration:generate```
- Run ```npm run migration:run```
- Run ```npm run start``` to start the server

## Folder

- Controller
- Entity
- Middleware
- Migrations
- Models
- Route
- Service
- Uploads
- Utils

>Make sure that everything is installed correctly.

# Authentication (USER)
## 1. Read
- ```http://localhost:5000/api/v1/users```
- Method ```GET```
- Require Token : No
- Response Body
```sh
     {
        "id": 1,
        "fullname": "Mugiwara No Luffy",
        "email": "luffy@gmail.com",
        "password": "$2b$10$djzN2CbtC1Ewo5VjkP5eKuhOECKeJzfU/PGltzHlLacgnnzbnua0q",
        "role": "Yonko",
        "posted_at": "2023-11-24T04:22:29.000Z"
    }
```

## 2. Register
- ```http://localhost:5000/api/v1/register```
- Method ```POST```
- Require Token : No
- Request Body
```sh
{
    "fullname": "Mugiwara No Luffy",
    "email": "luffy@gmail.com",
    "password": "clanD",
    "role": "Yonko"
}
```
- Response Body
```sh
{
    "fullname": "Mugiwara No Luffy",
    "email": "luffy@gmail.com",
    "password": "$2b$10$djzN2CbtC1Ewo5VjkP5eKuhOECKeJzfU/PGltzHlLacgnnzbnua0q",
    "id": 1,
    "posted_at": "2023-11-24T04:22:29.000Z"
}
```

## 3. Login
- ```http://localhost:5000/api/v1/loginr```
- Method ```POST```
- Require Token : No
- Request Body
```sh
{
    "email": "luffy@gmail.com",
    "password": "clanD"
}
```
- Response Body
```sh
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjo1LCJmdWxsbmFtZSI6Ik11Z2l3YXJhIE5vIEx1ZmZ5In0sImlhdCI6MTcwMDc5OTgzNiwiZXhwIjoxNzEwNzk5ODM1fQ.-ZKvE7WKp7n9sxD0yiO5i2rRHfvfjoKvMHHcSpR4RLI"
```

# Pasangan Calon (PASLON)
## 1. Read
- ```http://localhost:5000/api/v1/paslon```
- Method ```GET```
- Require Token : Yes
- Response Body
```sh
{
        "id": 1,
        "nama": "Zoro",
        "nourut": "1",
        "visimisi": "Menjadi Pengguna Pedang Terkuat",
        "foto": "https://res.cloudinary.com/dttyggbfa/image/upload/v1700800520/paslon/akahmyosyjtsx0wygoov.jpg",
        "posted_at": "2023-11-24T04:35:19.000Z",
        "partai": [
            {
                "id": 1,
                "namapartai": "Straw Hat Pirates",
                "ketuaumum": "Luffy",
                "visimisipartai": "Become the Pirate King",
                "lambang": "https://res.cloudinary.com/dttyggbfa/image/upload/v1700800502/partai/rwrv8jzbgvhjimasg5bm.jpg",
                "alamatpartai": "Grand Line",
                "posted_at": "2023-11-24T04:35:01.000Z"
            }
        ]
}
```

## 2. Read By Id
- ```http://localhost:5000/api/v1/paslon/1```
- Method ```GET```
- Require Token : Yes
- Response Body
``` sh
{
        "id": 1,
        "nama": "Zoro",
        "nourut": "1",
        "visimisi": "Menjadi Pengguna Pedang Terkuat",
        "foto": "https://res.cloudinary.com/dttyggbfa/image/upload/v1700800520/paslon/akahmyosyjtsx0wygoov.jpg",
        "posted_at": "2023-11-24T04:35:19.000Z",
        "partai": [
            {
                "id": 1,
                "namapartai": "Straw Hat Pirates",
                "ketuaumum": "Luffy",
                "visimisipartai": "Become the Pirate King",
                "lambang": "https://res.cloudinary.com/dttyggbfa/image/upload/v1700800502/partai/rwrv8jzbgvhjimasg5bm.jpg",
                "alamatpartai": "Grand Line",
                "posted_at": "2023-11-24T04:35:01.000Z"
            }
        ]
}
```

## 3. Add Paslon
- ```http://localhost:5000/api/v1/addpaslon```
- Method ```POST```
- Require Token : Yes
- Request Body
```sh
{
        "nama": "Zoro",
        "nourut": "1",
        "visimisi": "Menjadi Pengguna Pedang Terkuat",
        "foto": "https://res.cloudinary.com/dttyggbfa/image/upload/v1700800520/paslon/akahmyosyjtsx0wygoov.jpg",
        "partai": "Straw Hat Pirates"
}
```

- Response Body
```sh
{
    "nama": "Zoro",
    "nourut": "1",
    "visimisi": "Menjadi Pengguna Pedang Terkuat",
    "foto": "https://res.cloudinary.com/dttyggbfa/image/upload/v1700800520/paslon/akahmyosyjtsx0wygoov.jpg",
    "partai": [
        {
            "id": 1,
            "namapartai": "Straw Hat Pirates",
            "ketuaumum": "Luffy",
            "visimisipartai": "Become the Pirate King",
            "lambang": "https://res.cloudinary.com/dttyggbfa/image/upload/v1700800502/partai/rwrv8jzbgvhjimasg5bm.jpg",
            "alamatpartai": "Grand Line",
            "posted_at": "2023-11-24T04:35:01.000Z"
        }
    ],
    "id": 1,
    "posted_at": "2023-11-24T04:35:19.000Z"
}
```

## 4. Update Paslon
- ```http://localhost:5000/api/v1/addpaslon```
- Method ```POST```
- Require Token : Yes
- Request Body
```sh
{
        "nama": "Sanji",
        "nourut": "1",
        "visimisi": "Mencari All Blue",
        "foto": "https://res.cloudinary.com/dttyggbfa/image/upload/v1700800520/paslon/akahmyosyjtsx0wygoov.jpg",
        "partai": "GERMA 666"
}
```

- Response Body
```sh
{
    "nama": "Sanji",
    "nourut": "1",
    "visimisi": "Mencari All Blue",
    "foto": "https://res.cloudinary.com/dttyggbfa/image/upload/v1700800520/paslon/akahmyosyjtsx0wygoov.jpg",
    "partai": [
        {
            "id": 2,
            "namapartai": "GERMA 666",
            "ketuaumum": "Vinsmoke Judge",
            "visimisipartai": "ALCHEMIST BODY IS EVERYTHING'S",
            "lambang": "https://res.cloudinary.com/dttyggbfa/image/upload/v1700800502/partai/rwrv8jzbgvhjimasg5bm.jpg",
            "alamatpartai": "North Blue",
            "posted_at": "2023-11-24T04:35:01.000Z"
        }
    ],
    "id": 1,
    "posted_at": "2023-11-24T04:35:19.000Z"
}
```

## 5. Delete Paslon
- ```http://localhost:5000/api/v1/deletepaslon/1```
- Method ```POST```
- Require Token : Yes
- Response Body
```sh
{
    "message": "Paslon deleted successfully"
}
```
# Addition
> The application of the api for all services is the same, you can adjust it yourself according to your needs, there are three testing apis that you can try, namely Artikel, Partai, and Voter. #KeepSmile :)

