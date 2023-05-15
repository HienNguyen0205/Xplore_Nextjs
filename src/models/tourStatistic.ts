import { Schema, model, models } from "mongoose"

const tourStatisticSchema = new Schema({
    customers: Number,
    tourNumber: Number,
    successTour: Number,
    supportCases: Number
})

const tourStatistic = models.tourStatistic || model('tourStatistic', tourStatisticSchema)

export default tourStatistic