import mongoose, { Schema, model, models } from "mongoose"

const tourScheduleSchema = new Schema({
    tourSchedules: {
        slot: {type: Number, min: 0, max: 20},
        userRegisterId: [mongoose.Types.ObjectId],
        departure: String,
        comments: [{
            content: String,
            date: Date,
        }],
        date: {
            from: Date,
            to: Date,
        },
        price: Number,
        rating: {type: Number, min: 0, max: 5},
        time: Number,
        route: String,
        status: Boolean,
    }
})

const tourSchedule = models.tourschedules || model('tourschedules', tourScheduleSchema)

export default tourSchedule