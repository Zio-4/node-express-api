import { Router } from 'express'
import { getAllItems, createItem, getOneItem, updateOneItem, deleteItem } from './list.controller.js'

const router = Router()

// /api/list
router.route('/')
    .get(getAllItems)
    .post(createItem)

router.route('/:id')
    .get(getOneItem)
    .put(updateOneItem)
    .delete(deleteItem)

export default router