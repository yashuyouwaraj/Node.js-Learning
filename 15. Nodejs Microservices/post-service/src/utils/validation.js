const Joi = require("joi");

const validateCreatePost = (data) => {
  const schema = Joi.object({
    content: Joi.string().min(3).max(5000).required(),
    mediaId: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.string()
    ).optional(),
    mediaIds: Joi.array().items(
      Joi.string()
    ).optional(),
  }).unknown(false);

  return schema.validate(data);
};

module.exports = { validateCreatePost };