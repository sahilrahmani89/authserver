import mongoose from "mongoose";

const {Schema} = mongoose

const newIdSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
})

const UserIdInc = mongoose.model('ID_COUNTER',newIdSchema)

export default UserIdInc