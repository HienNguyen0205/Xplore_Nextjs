import { Schema, model, models } from "mongoose"

const tourSchema = new Schema({
    tours: {
        destination: String,
        image: String,
        price: Number,
        rating: {type: Number, min: 0, max: 5},
        slot: [{type: Number, min: 0, max: 20}],
        date: [{
            from: {type: Date, min: Date.now()},
            to: Date,
        }],
        time: Number,
        departure: String,
        title: String,
        comment: [{
            content: String,
            date: Date,
        }],
        status: [Boolean],
    }
})

const tour = models.tour || model('tour', tourSchema)

export default tour