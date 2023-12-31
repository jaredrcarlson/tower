import { Schema } from "mongoose";

export const EventSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

EventSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'eventId',
  count: true,
  ref: 'Ticket'
})