import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
    email: String,
    password: String,
    username: String,
    address: String,
    tel: String,
})

const user = models.user || model('user', userSchema)
export default user