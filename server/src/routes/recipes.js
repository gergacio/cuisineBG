import express from 'express';
import { RecipesModel } from "../models/Recipes.js";
import mongoose from 'mongoose';
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const result = await RecipesModel.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/", verifyToken,async (req, res) => {
    const recipe = new RecipesModel(req.body);
    try{
        const response = await recipe.save();
        res.json(response);

    } catch (err){
        res.json(err);
    }
  });

  router.put("/", verifyToken,async (req, res) => {

    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);

    user.savedRecipes.push(recipe);
    await user.save();
    res.json({savedRecipes: user.savedRecipes});
    try{
        const response = await recipe.save();
        res.json(response);

    } catch (err){
        res.json(err);
    }
  });

  router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userID);
      res.json({savedRecipes: user?.savedRecipes});
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/savedRecipes/:userID", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userID);
      const savedRecipes = await RecipesModel.find({_id: {$in: user.savedRecipes}});
      res.json({savedRecipes});
    } catch (err) {
      res.status(500).json(err);
    }
  });


  


export {router as recipesRouter};

