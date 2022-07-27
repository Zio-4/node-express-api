import { Router } from 'express'
import { getAllItems, createItem, getOneItem, updateOneItem, deleteItem } from './item.controller.js'

const itemRouter = Router()

itemRouter.route('/')
    .get(getAllItems)
    .post(createItem)

    itemRouter.route('/:id')
    .get(getOneItem)
    .put(updateOneItem)
    .delete(deleteItem)

export default itemRouter