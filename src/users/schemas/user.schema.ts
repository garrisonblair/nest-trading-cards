import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }]
})

module.exports = mongoose.model('User', UserSchema)