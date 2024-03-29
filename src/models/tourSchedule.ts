import { Schema, model, models } from "mongoose";

export const tourScheduleSchema = new Schema({
  region: String,
  destination: String,
  departure: String,
  price: { type: Number, min: 0 },
  time: Number,
  routeName: String,
  image: String,
  schedule: [
    {
      type: Schema.Types.ObjectId,
      ref: 'schedules',
    }
  ],
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "wishlists",
    },
  ],
  rating: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tourratings'
    }
  ]
});

const tourSchedule =
  models.tourschedules || model("tourschedules", tourScheduleSchema);

export default tourSchedule;