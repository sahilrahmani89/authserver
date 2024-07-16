import mongoose from "mongoose";
import UserIdInc from "./UserIdCounter.js";

const {Schema} = mongoose

const UserSchema = new Schema({
    userId: { type: String, unique: true },
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    profile: {
        phone: { type: String },
        age: { type: Number },
    }
})

UserSchema.pre('save',async function(next){
    if(this.isNew){
        const sequenceDoc = await UserIdInc.findByIdAndUpdate(
            'userId',
            {$inc:{seq:1}},
            {new:true,upsert:true}
        )
        this.userId = sequenceDoc.seq.toString().padStart(5,'0')
    }
    next()
})

const User=  mongoose.model('USER',UserSchema)

export default User