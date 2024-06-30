import { Router } from 'express'
import searchByQueryController from '../controllers/searchByQueryController.js'

const router = Router()

router.get('/', async (req, res, next) => {
  if (req?.query?.q) {
    const response = await searchByQueryController(req?.query?.q)
    res.send(response)
  } else {
    const error = new Error('Debes ingresar un valor')
    error.status = 400
    next(error)
  }
})

export default router