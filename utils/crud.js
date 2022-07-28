
export const getOne = model => async (req, res) => {
    const resourceId = req.params.id
    const userId = req.user._id

    try {
        // exec() is called to make the mongoose query a real promise
        const resource = await model.findOne({_id: resourceId, createdBy: userId}).exec()
        if (resource) res.status(200).json({data: resource})
    } catch (e) {
        console.error('error:', e)
        res.status(404).json({message: 'Resource not found'})
    }

}

export const getMany = model => async (req, res) => {
    const userId = req.user._id

    const resources = await model.find({createdBy: userId}).exec()
    res.status(200).json({data: resources})

}

export const createOne = model => async (req, res) => {
    const userId = req.user._id
    const body = req.body

   const resource = await model.create({...body, createdBy: userId}).exec()
   res.status(201).json({data: resource})
}

export const updateOne = model => async (req, res) => {
    const resourceId = req.params.id
    const userId = req.user._id
    const body = req.body

    const updatedResource = await model.findOneAndUpdate(
        {_id: resourceId, 
        createdBy: userId}, 
        body, 
        { new: true }
        ).exec()

    if (!updatedResource) res.status(400).json({message: "Could not find resource"})
    
    res.status(200).json({data: updatedResource})

}

export const removeOne = model => async (req, res) => {
    const resourceId = req.params.id
    const userId = req.user._id

    const deletedResource = await model.findOneAndRemove({
        _id: resourceId,
        createdBy: userId
    }).exec()

    if (!deletedResource) res.status(400).end()

    res.status(200).json({data: deletedResource})
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})