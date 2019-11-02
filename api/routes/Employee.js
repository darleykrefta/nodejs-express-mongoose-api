const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Employee = require('../models/Employee')

// @route GET api/employee/all
// @description get all rows
// @access public
router.get('/all', (_, res) => {
  Employee.find()
    .then(data => res.json(data))
    .catch(err => res.status(500).send(`Server error! ${err.message}`))
})

// @route GET api/employee/:id
// @desc get an employee by id
// @access public
router.get('/:id', (req, res) => {
  Employee.findOne({ _id: req.params.id })
    .then(data => res.json(data ? data : {}))
    .catch(err => res.status(500).send(`Server error! ${err.message}`))
})

// @route POST api/employee
// @descption insert a new employee registry
// @access public
router.post(
  '/',
  [
    check('name', 'Name is required!')
      .not()
      .isEmpty(),
    check('name', 'Name must be at least 2 chars long!').isLength({ min: 2 }),
    check('name', 'Name must be at most 30 chars long!').isLength({ max: 30 }),
    check('lastname', 'Last name is required!')
      .not()
      .isEmpty(),
    check('lastname', 'Last name must be at least 2 chars long!').isLength({ min: 2 }),
    check('lastname', 'Last name must be at most 30 chars long').isLength({ max: 30 }),
    check('email', 'E-mail is required!')
      .not()
      .isEmpty(),
    check('email', 'Invalid e-mail!').isEmail(),
    check('pis', 'PIS is required!')
      .not()
      .isEmpty(),
    check('pis', 'PIS is required!')
      .matches(/^[0-9]*$/)
      .withMessage('PIS must contain only numbers!')
  ],
  (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, lastname, email, pis } = req.body

    const employee = new Employee({ name, lastname, email, pis })

    employee
      .save()
      .then(data => res.send(data))
      .catch(err => res.status(500).send(`Server error! ${err.message}`))
  }
)

// @route PUT api/employee/:id
// @desc update an employee registry
// @access public
router.put(
  '/:id',
  [
    check('name', 'Name is required!')
      .not()
      .isEmpty(),
    check('name', 'Name must be at least 2 chars long!').isLength({ min: 2 }),
    check('name', 'Name must be at most 30 chars long!').isLength({ max: 30 }),
    check('lastname', 'Last name is required!')
      .not()
      .isEmpty(),
    check('lastname', 'Last name must be at least 2 chars long!').isLength({ min: 2 }),
    check('lastname', 'Last name must be at most 30 chars long').isLength({ max: 30 }),
    check('email', 'E-mail is required!')
      .not()
      .isEmpty(),
    check('email', 'Invalid e-mail!').isEmail(),
    check('pis', 'PIS is required!')
      .not()
      .isEmpty(),
    check('pis', 'PIS is required!')
      .matches(/^[0-9]*$/)
      .withMessage('PIS must contain only numbers!')
  ],
  (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, lastname, email, pis } = req.body

    Employee.findByIdAndUpdate(req.params.id, { name, lastname, email, pis }, { new: true })
      .then(data => res.json(data))
      .catch(err => res.status(500).send(`Server error! ${err.message}`))
  }
)

// @route DELETE api/employee/:id
// @desc delete an employee registry
// @access public
router.delete('/:id', (req, res) => {
  Employee.findOneAndRemove({ _id: req.params.id })
    .then(data => res.json({ msg: 'Employee registry deleted!', deleted: data }))
    .catch(err => res.status(500).send(`Server error! ${err.message}`))
})

module.exports = router
