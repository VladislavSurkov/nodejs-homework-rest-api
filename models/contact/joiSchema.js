const Joi = require("joi");
const { ValidationError } = require("../../helpers/error");

const createValid = (req, res, next) => {
  const schemaCreate = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "ca", "uk"] },
      })
      .required(),
    favorite: Joi.boolean().optional(),
  });

  const { error } = schemaCreate.validate(req.body);
  if (error) {
    next(new ValidationError(error.message, 400));
  }
  next();
};

const updateValid = (req, res, next) => {
  const schemaUptade = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    phone: Joi.string().optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "ca", "uk"] },
      })
      .optional(),
    favorite: Joi.boolean().optional(),
  });

  const { error } = schemaUptade.validate(req.body);
  if (error) {
    next(new ValidationError(error.message, 400));
  }
  next();
};

module.exports = {
  createValid,
  updateValid,
};
