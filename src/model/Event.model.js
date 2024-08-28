import mongoose,{Schema, Types} from "mongoose";

const eventSchema = new Schema(
    {
        Name:{
            type : String,
            required :true,
            lowercase : true,
            trim : true,
            index : true
        },
        Location:{
            type:String,
            required:true,
            lowercase : true,
            trim : true
        },
        TimeLimit:{
            type:Number, // <-- in Day 1d like 
            required:true,
            lowercase:true,
            trim:true,
        },
        Time:{
            type:String,
            required:true,
            lowercase : true,
            trim : true,
        },
        Date:{
            type:String,
            required:true,
            lowercase : true,
            trim : true
        },
        NumberOfTeam:{
            type:Number,
            required:true
        },
        EventHandlerId:{
            type : Schema.Types.ObjectId,
            ref : "EventHandler"
        }
    },
    {
        timestamps : true
    }
);

export const Event = mongoose.model("Event",eventSchema);