import express from "express";
import multer from "multer";
import { celebrate, joi } from "celebrate";
import multerConfig from "./config/multer";

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";
import Joi from "@hapi/joi";

const routes = express.Router();
const upload = multer(multerConfig);
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);
routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        uf: Joi.string().max(2).required(),
        city: Joi.string().required(),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: true,
    }
  ),
  pointsController.create
);

export default routes;
