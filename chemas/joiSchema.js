const Joi = require("joi");

const schemaCreate = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ca", "uk"] },
    })
    .required(),
});


const schemaUptade = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.string().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ca", "uk"] },
    })
    .optional(),
});

module.exports = {
  schemaCreate,
  schemaUptade,
};
