const express = require("express");
const createError = require("http-errors");
const { authenticate } = require("../../middlewares");

const { Contact, schemas } = require("../../models/contact");
const Joi = require("joi");
// const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await Contact.find({ owner: _id }).populate("owner");
    res.json({ result });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new createError(400, "Missing required name field");
    }

    const { name, email, phone } = req.body;
    const data = { ...req.body, owner: req.user._id };
    const result = await Contact.create(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw new createError(404, "Id not valid");
    }
    const { name, email, phone } = req.body;
    const result = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = schemas.updateFavofite.validate(req.body);
    if (error) {
      throw new createError(400, "Missing field favorite");
    }
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw new createError(404, "Id not valid");
    }
    const { name, email, phone } = req.body;
    const result = await Contact.findByIdAndUpdate(id, name, email, phone, {
      new: true,
    });
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
