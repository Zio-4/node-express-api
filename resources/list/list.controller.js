
export const getAllItems = (req, res) => {
    res.status(200).json({data: 'all items'})
}

export const createItem = (req, res) => {
    res.status(201).json({message: 'Item created'})
}

export const getOneItem = (req, res) => {
    res.status(200).json({data: 'one item'})
}

export const updateOneItem = (req, res) => {
    res.status(202).json({message: 'Item updated'})
}

export const deleteItem = (req, res) => {
    res.status(200).json({message: 'Item succesfully deleted'})
}