import { Schema, model, models } from "mongoose";

export const tourScheduleSchema = new Schema({
  region: String,
  destination: String,
  departure: String,
  price: { type: Number, min: 0 },
  rating: { type: Number, min: 0, max: 5 },
  time: Number,
  routeName: String,
  image: String,
  // comment: [{
  //   rating: { type: Number, min: 0, max: 5 },
  //   content: String,
  // }],
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
});

const tourSchedule =
  models.tourschedules || model("tourschedules", tourScheduleSchema);

export default tourSchedule;
