import Joi from 'joi'

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false});
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

