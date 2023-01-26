import * as Joi from 'joi';

export const CreateRequestSchema = Joi.object({
  name: Joi.string().required().min(1).max(5),
  description: Joi.string().min(1).max(1000),
});
