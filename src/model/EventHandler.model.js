import mongoose,{Schema, Types} from "mongoose";

const eventhandlerSchema = new Schema(
    {
        Name:{
            type:String,
            require:true,
            lowecase : true,
            trim : true
        },
        GmailId:{
            type:String,
            require:true,
            unique : true,
            lowecase : true,
            trim : true,
            index :true
        },
        Password:{
            type:String,
            required : [true , 'Password is Required']
        },
        Location:{
            type:String,
            require:true,
            lowecase : true,
            trim : true
        },
        AllEvent:[
            {
                type : Schema.Types.ObjectId,
                ref : "Event"
            }
        ]
    },
    {
        timeseries : true
    }
);

export const EventHandler = mongoose.model("EventHandler",eventhandlerSchema);