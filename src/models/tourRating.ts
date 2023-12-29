import { Schema, model, models } from "mongoose";

const ratingSchema = new Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    comment: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref: 'tourschedules'
    }
}, { timestamps: true })

const tourRating = models.tourratings || model('tourratings', ratingSchema)

export default tourRating