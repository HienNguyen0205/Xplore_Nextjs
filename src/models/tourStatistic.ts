import { Schema, model, models } from "mongoose"

const tourStatisticSchema = new Schema({
    customers: Number,
    tourNumber: Number,
    successTour: Number,
    supportCases: Number
})

const tourStatistic = models.tourstatistic || model('tourstatistic', tourStatisticSchema)

export default tourStatistic