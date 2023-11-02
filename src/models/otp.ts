import { Schema, model, models } from "mongoose";

const otpSchema = new Schema({
    code: String,
    email: String,
    createAt: {
        type: Date,
        expires: 120,
        default: Date.now()
    }
})

const otp = models.otps || model('otps', otpSchema)

export default otp