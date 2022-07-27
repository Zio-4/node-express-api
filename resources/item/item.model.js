import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }, 
    status: {
        type: String,
        required: true,
        enum: ['active', 'complete', 'pastdue'],
        default: 'active'
    },
    notes: String,
    due: Date,
    createdBy: {
        // Uses the id from the user model
        type: mongoose.SchemaTypes.ObjectId,
        // What table does the id belong to
        ref: 'user',
        required: true
    },
    list: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'list',
        required: true
    }

}, { timestamps: true })
// items in lists that belong to a user have to be unique
// the 1's are for sorting the index
itemSchema.index({list: 1, name: 1}, {unique: true})

export const Item = mongoose.model('item', itemSchema)