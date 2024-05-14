import mongoose, { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videofile: {
        type: String, // cloudinary url
        required: true
    },
    thumnail: {
        type: String, // cloudinary url
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    view: {
        type: Number,
        default: 0
    },
    isPublished : {
        type : Boolean,
        default :true
    }

}, { timestamps: true })


videoSchema.plugin(mongooseAggregatePaginate)

export const Video = model("Video", videoSchema)