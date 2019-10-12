const express = require("express");
const Joi = require("joi");
const ObjectId = require("mongoose").Types.ObjectId;
const Thief = require("../models/thief");

const router = express.Router();

router.get("/", (req, res, next) => {
  Thief.find((err, docs) => {
    if (!err) res.send(docs);
  });
});

//Get single data
router.get("/:id", (req, res, next) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(`No record found with given id : ${req.params.id}`);

  Thief.findById(req.params.id, (err, docs) => {
    if (docs) res.send(docs);
    else
      res
        .status(400)
        .send(
          "Error in retriving Thief : " + JSON.stringify(err, undefined, 2)
        );
  });
});

//Create new data
router.post("/create", (req, res, next) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  const newThief = new Thief({
    name: req.body.name,
    gender: req.body.gender,
    height: req.body.height,
    op_area: req.body.op_area,
    age: req.body.age
  });

  newThief.save((err, docs) => {
    if (docs)
      res.status(201).json({
        message: "Successfully created!",
        data: docs
      });
    else
      res
        .status(400)
        .send("Error in creating Thief : " + JSON.stringify(err, undefined, 2));
  });
});

//Update Thief
router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record found with id : ${req.params.id}`);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedThief = {
    name: req.body.name,
    gender: req.body.gender,
    height: req.body.height,
    op_area: req.body.op_area,
    age: req.body.age
  };

  Thief.findByIdAndUpdate(
    req.params.id,
    { $set: updatedThief },
    { new: true },
    (err, docs) => {
      if (docs)
        res.status(201).json({
          message: "Updated successfully!",
          data: docs
        });
      else
        res
          .status(400)
          .send(
            "Error in updating Thiefs : " + JSON.stringify(err, undefined, 2)
          );
    }
  );
});

//Delete Thief
router.delete("/:id", (req, res, next) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record found with id : ${req.params.id}`);

  Thief.findByIdAndDelete(req.params.id, (err, docs) => {
    if (docs)
      res.status(201).json({
        message: "Successfully deleted!"
      });
    else
      res
        .status(400)
        .send("Error in deleting Thief : " + JSON.stringify(err, undefined, 2));
  });
});

function validate(thief) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    gender: Joi.string()
      .min(3)
      .required(),
    height: Joi.number().required(),
    op_area: Joi.string()
      .min(3)
      .required(),
    age: Joi.number()
      .min(2)
      .required()
  };
  return Joi.validate(thief, schema);
}

module.exports = router;
