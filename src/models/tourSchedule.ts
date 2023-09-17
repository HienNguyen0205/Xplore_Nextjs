import mongoose, { Schema, model, models } from "mongoose"

export const tourScheduleSchema = new Schema({
    tourSchedules: {
        slot: {type: Number, min: 0, max: 20},
        departure: String,
        date: {
            from: Date,
            to: Date,
        },
        price: Number,
        rating: {type: Number, min: 0, max: 5},
        time: Number,
        route: String,
        image: String,
        region: String,
        routeId: mongoose.Types.ObjectId,
        status: Boolean,
    }
})

const tourSchedule = models.tourschedules || model('tourschedules', tourScheduleSchema)

export default tourSchedule