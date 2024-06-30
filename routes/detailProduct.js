import { Router } from 'express'
import detailProductController from '../controllers/detailProductController.js'

const router = Router()

router.get('/:id', async (req, res, next) => {
  if (req?.params?.id) {
    const response = await detailProductController(req?.params?.id)
    res.send(response)
  } else {
    const error = new Error('Debes ingresar un valor')
    error.status = 400
    next(error)
  }
})

export default router