const express = require('express');
const { getAllPersons, getPersonById, createPerson, updatePerson, deletePerson } = require('../controllers/person');
const Joi = require('joi'); 

const router = express.Router();

const personSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  age: Joi.number().required().messages({
    'number.base': 'Age must be a number',
    'any.required': 'Age is required'
  }),
  hobbies: Joi.array().required().messages({
    'array.base': 'Hobbies must be an array',
    'any.required': 'Hobbies are required'
  })
});

const validatePerson = (req, res, next) => {
  const { error } = personSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

router.get('/', getAllPersons);
router.get('/:id', getPersonById);
router.post('/', validatePerson, createPerson); 
router.put('/:id', validatePerson, updatePerson); 
router.delete('/:id', deletePerson);

module.exports = router;