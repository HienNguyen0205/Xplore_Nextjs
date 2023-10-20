import { Schema, model, models } from "mongoose"

const galleryImageSchema = new Schema({
    region: String,
    fullLink: String,
    src: String,
    title: String,
    description: String,
})

const galleryimages = models.galleryimages || model('galleryimages', galleryImageSchema)

export default galleryimages