import { Schema, model, models } from "mongoose"

const galleryImageSchema = new Schema({
    region: String,
    imageList: [String],
})

const galleryimages = models.galleryimages || model('galleryimages', galleryImageSchema)

export default galleryimages