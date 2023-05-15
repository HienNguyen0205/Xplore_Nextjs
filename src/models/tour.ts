import { Schema, model, models } from "mongoose"

const tourSchema = new Schema({
    tours: {
        destination: String,
        image: String,
        price: Number,
        time: Number,
        rating: Number,
    }
})

const tour = models.tour || model('tour', tourSchema)

export default tour