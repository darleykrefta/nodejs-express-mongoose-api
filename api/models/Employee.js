const { Schema, model } = require('mongoose')

const EmployeeSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    pis: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = model('employee', EmployeeSchema)
