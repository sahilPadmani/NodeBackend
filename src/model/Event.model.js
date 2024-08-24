import mongoose,{Schema, Types} from "mongoose";

const eventSchema = new Schema(
    {
        Name:{
            type : String,
            require :true,
            lowecase : true,
            trim : true,
            index : true
        },
        Location:{
            type:String,
            require:true,
            lowecase : true,
            trim : true
        },
        TimeLimit:{
            type:Number, // <-- in Day 1d like 
            require:true,
            lowecase:true,
            trim:true,
        },
        Time:{
            type:String,
            require:true,
            lowecase : true,
            trim : true,
        },
        Date:{
            type:String,
            require:true,
            lowecase : true,
            trim : true
        },
        NumberOfTeam:{
            type:Number,
            require:true
        },
        EventHandlerId:{
            type : Schema.Types.ObjectId,
            ref : "EventHandler"
        }
    },
    {
        timeseries : true
    }
);

export const Event = mongoose.model("Event",eventSchema);