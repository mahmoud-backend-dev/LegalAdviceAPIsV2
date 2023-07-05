## Hosted Project
[Legal Adice APIs](https://legal-advice-1572.onrender.com)


#### Setup Basic Express Server

- import express and assign to variable
- setup start port variable (1812) and start function

## Usega
APIs build to the backend for an application specifically designed for lawyers, offering various 
features such as add personal information about the lawyer, their experiences, 
specializations, qualifications, and the ability to add videos, news or questions and chat 
feature allowing communication between the lawyer and the user.
Full REST APIs for Legal Advice App, APIs for User authentication POST request Signup, Login, 
Forget Password, Verify Reset Code and Reset Password, APIs for a lawyer's admin dashboard 
to add(POST request), retrieve(GET request) and update(PATCH request) lawyer-specific data 
such as name, email, and phone number, image , about you (lawyer's admin), specializations, 
qualifications and experiences, as well as APIs to add (POST request) a criminal dictionary, 
retrieve (GET request) a specific criminal dictionary, retrieve (GET request) all criminal 
dictionary and delete (DELETE request) a specific criminal dictionary, also APIs for CRUD 
operations on Videos, as well as APIs for CRUD operations on News, as well as APIs for CRUD 
operations to frequently asked questions in legal advices, APIs for CRUD operations for 
sending legal advices to the lawyer, APIs for CRUD operations for sending order to the lawyer 
at lawyer's office for legal advice, APIs for CRUD operations on Posts, APIs for CRUD 
operations on Comments, Use technology WebSocket (Socket.IO library) for creating chat 
between the client (User in the application) and the admin (Lawyer), API to retrieve (GET 
request) user messages



## :bulb: Built Using

- MongoDB
- Express
- Node.JS
- Javascript
- jsonwebtoken for authentication and authorization
- nodemailer
- Multer
- Cloudinary
- Socket.io

### To Install all the dependencies

```
npm install
```
### Start API

```
npm start
```

## Routes

### Authentication
```
POST   signup user    /api/v1/user/signup
POST   login user    /api/v1/user/login
POST   forget password    /api/v1/user/forgetPassword 
POST   verify reset code   /api/v1/user/verifyResetCode
PUT  reset password   /api/v1/user/resetPassword
DELETE  delete me  /api/v1/user/deleteMe
```

### About Me
```
POST   about me    /api/v1/user/admin/643b4b51f270c6d03747aff0
GET   get about me   /api/v1/user/643b4b51f270c6d03747aff0
PATCH  update about me     /api/v1/user/643b4b51f270c6d03747aff0
PATCH  signup as admin   /api/v1/user/admin/signup
```

### Criminal Dictionary
```
POST   add criminal dictionary    /api/v1/criminalDictionary
GET   get all criminal dictionary   /api/v1/criminalDictionary
GET   get specific criminal dictionary   /api/v1/criminalDictionary/643896cc7d0480c9253224ec
DELETE   remove criminal dictionary   /api/v1/criminalDictionary/643896cc7d0480c9253224ec
```

### Videos
```
POST   add vidoe    /api/v1/videos
GET   get all videos   /api/v1/videos
GET   get specific video   /api/v1/videos/644c148d73c7f9408d48ec5e
DELETE   remove video   /api/v1/videos/644c1431d34a1c835bb37697
```

### News
```
POST   add new    /api/v1/news
GET   get all news   /api/v1/news
GET   get specific new   /api/v1/news/6438ab5604ffd128caca5630
PATCH   update new    /api/v1/news/646fbc41c9170d5bd7bcbeef 
DELETE   remove specific new   /api/v1/news/646fbc41c9170d5bd7bcbeef
```

### Messages
```
POST   send message to lawyer    /api/v1/messages
GET   get all messages   /api/v1/messages
GET   get specific message   /api/v1/messages/64398e031ccaabad706d686d
GET   get my message   /api/v1/messages/me
PATCH   update specific message    /api/v1/messages/64398e031ccaabad706d686d
DELETE    delete specific message    /api/v1/messages/64399c907caeefb8664469ea 
```

### Question
```
POST   add question    /api/v1/questions
GET   get all questions   /api/v1/questions
GET   get specific question   /api/v1/questions/643f256c67c651770730327a
PATCH   update specific question    /api/v1/questions/643f3e456601ed3a0e049de2 
DELETE   remove specific question   /api/v1/questions/643f3e456601ed3a0e049de2
```

### Order
```
POST   add order    /api/v1/orders
GET   get all orders   /api/v1/orders
GET   get specific order   /api/v1/orders/6439ac3a55fa38e099e7e66e
DELETE   remove specific order   /api/v1/orders/6439ac5155fa38e099e7e680
```

### Post
```
POST   add post    /api/v1/posts
GET   get all posts   /api/v1/posts?limit=5&page=1  (With Pagination)
GET   get specific post   /api/v1/posts/646fc238bff13be523f02dab
PATCH   update specific post    /api/v1/posts/643a1a9e9deef6782df77f4a 
DELETE   remove specific post   /api/v1/posts/643a2454be70c03128ba9a7c
POST  add like   /api/v1/posts/643a257b7cbaafadc7905031/likes  (With use socket.io to emit event and listen event for real time app)
GET get all likes   /api/v1/posts/643a257b7cbaafadc7905031/likes
DELETE delete like    /api/v1/posts/643a257b7cbaafadc7905031/likes (With use socket.io to emit event and listen event for real time app)
```

### Comments
```
POST     add comment    /api/v1/posts/6446e3a8345aec8e18cfce80/comments   (With use socket.io to emit event and listen event for real time app)
GET     get all comments on specific post    /api/v1/posts/643a257b7cbaafadc7905031/comments
PATCH     update specific comment   /api/v1/posts/643a257b7cbaafadc7905031/comments/643a2e02a1fe83ff64776586  (With use socket.io to emit event and listen event for real time app)
DELETE   delete specific comment   /api/v1/posts/643a257b7cbaafadc7905031/comments/643a38f14ac1bfabdb8530fd  (With use socket.io to emit event and listen event for real time app)
```

### Chat 
```
GET    get user message    /api/v1/chat/messages/6456316da9cf4a29f13607c2
```

## :man: Project Created & Maintained By -

- **Hey guys, I'm Jayvardhan. Find out more about me** [ here](https://www.linkedin.com/in/mahmoud-hamdi-62bb1223b)
- **Reach out to me at** [mahmoud.backend.dev@gmail.com](mahmoud.backend.dev@gmail.com)

<h3 align="right">Built with :heart: by Mahmoud Hamdi</h3>
