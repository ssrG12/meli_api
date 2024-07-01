import cors from 'cors'
import express from 'express'
import searchByQuery from './routes/searchByQuery.js'
import detailProduct from './routes/detailProduct.js'

const port = 3001
const app = express()

app.use(cors())

app.use('/api/items', searchByQuery)
app.use('/api/items', detailProduct)


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  })
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})