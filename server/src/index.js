import * as dotenv from 'dotenv';
import express from "express" //node framework to create API
import cors from 'cors'; //allows you to set up rules between back and front
import mongoose from 'mongoose'; //Node.js ODM library for Mongo (allows us to get schema), queries to db in simple way

import {userRouter} from './routes/users.js';
import {recipesRouter} from './routes/recipes.js';

const PORT = process.env.PORT || 8082;

const app = express();

//middleware
app.use(express.json()); //get data from front we convert in json
app.use(cors()); 
dotenv.config();

//generate connection towords our server
//use env variables for password

  //start server
  //use nodemon to restart the server after we made changes
app.listen(PORT, () => {
  mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASS}@recipes.dtob3ti.mongodb.net/recipes?retryWrites=true&w=majority`,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
  console.log("Connected successfully to mongodb");
});

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);


console.log("server is successfully running on ", PORT);
});


//We done with server go and set up MongoDB database 
//we use cloud base MongoDB service called Atlas (create and run db)
//https://cloud.mongodb.com/v2/645b454dc221da7fa56e6fe7#/clusters
//we use mongoose to conect to our db

//create model - describe how our collection will looks like
//we use Compas (to access our database in nice way) (connect Compas with Atlas project (our db))
//so we use Compas to cretae db (mac or terminal)

//So we have <models>  - how our data will look like 
//also we have <route> - separate our endpoints in different routes
//we will have two routes - users route and recipe route