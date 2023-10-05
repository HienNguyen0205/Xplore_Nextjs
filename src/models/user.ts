import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
    email: String,
    password: String,
    fullName: String,
    avatar: String,
    tel: { default: '', type: String},
    day: { default: '', type: String},
    month: { default: '', type: String},
    year: { default: '', type: String},
})

const user = models.users || model('users', userSchema)
export default user