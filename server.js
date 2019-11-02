const express = require('express')
const app = express()

app.use(express.json({ extended: false }))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Servidor iniciado em: ${PORT}`)
})
