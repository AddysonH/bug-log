import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Bug = new Schema({
    closed: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    title: { type: String, required: true },
    closedDate: { type: Date },
    creatorEmail: { type: String, required: true },


}, { timestamps: true, toJSON: { virtuals: true } })

const Note = new Schema({
    content: { type: String, required: true },
    bug: { type: ObjectId, ref: 'Bug', required: true },
    flagged: { type: String, enum: ["pending", "completed", "rejected"] },
    creatorEmail: { type: String, required: true }
})