const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
);


const joiAddContactSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  email: Joi.string().required(), 
  phone: Joi.number().required(),
  favorite: Joi.boolean()
});

const joiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
});

const Contact = model("contact", contactSchema);


module.exports = {
  Contact,
  schemas: {
    add: joiAddContactSchema,
    updateFavofite: joiUpdateFavoriteSchema,
  },
};
