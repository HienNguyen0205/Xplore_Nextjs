import mongoose, { Schema, model, models } from "mongoose"

const wishlistSchema = new Schema({
    userEmail: String,
    routeId: mongoose.Types.ObjectId,
})

const wishlists = models.wishlists || model('wishlists', wishlistSchema)
export default wishlists