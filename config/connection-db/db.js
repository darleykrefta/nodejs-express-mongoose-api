const { connect } = require('mongoose')

const config = require('config')
const { HOST, PORT, DB } = config.get('mongoconnection')

const connection = connect(
  `${HOST}:${PORT}/${DB}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
)
  .then(_ => {
    console.log(`MongoDB connected on port ${PORT}`)
  })
  .catch(err => {
    console.error('Error:' + err.message)
    process.exit(1)
  })

module.exports = connection
