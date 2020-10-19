import * as mongoose from 'mongoose'

export const CardSchema = new mongoose.Schema({
    name: String,
    description: String,
    class: String,
    type: String,
    level: String
})