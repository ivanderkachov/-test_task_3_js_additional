const Joi = require('joi')

const taskSchema = Joi.object({
  task: {
    id: Joi.number().required().unsafe(),
    Name: Joi.string().required(),
    Created: Joi.string().required(),
    Content: Joi.string().required(),
    Dates: Joi.any(),
  },
});

const typeSchema = Joi.object({
  type: Joi.string().required()
})

function validateRequest(req, res, next, schema) {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  })
  if (error) {
    res.status(400).json({
      status: 'error',
      message: `Validation error: ${error.details
        .map((x) => x.message)
        .join(", ")}`
    })
  } else {
    req.body = value
    next()
  }
}

function validateTaskBody(req, res, next) {
  validateRequest(req, res, next, taskSchema)
}
function validateTypeBody(req, res, next) {
  validateRequest(req, res, next, typeSchema)
}

module.exports = { validateTaskBody, validateTypeBody }