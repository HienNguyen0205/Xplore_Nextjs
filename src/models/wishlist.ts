import { Schema, model, models } from "mongoose"

const wishlistSchema = new Schema({
    userEmail: String,
    tour: {
        type: Schema.Types.ObjectId,
        ref: 'tourschedules'
    },
})

const wishlists = models.wishlists || model('wishlists', wishlistSchema)
export default wishlists