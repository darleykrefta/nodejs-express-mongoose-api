const config = require('config')
const express = require('express')
const app = express()
const cors = require('cors')

require('./config/connection-db/db')

const { PORT } = config.get('application')

app.use(express.json({ extended: false }))

app.use(cors())

app.use('/api/employee', require('./api/routes/Employee'))

const PORT_CONNECTION = process.env.PORT || PORT

app.listen(PORT_CONNECTION, () => {
  console.log(`Server started on port ${PORT_CONNECTION}`)
})
