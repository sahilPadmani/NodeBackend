import mongoose,{Schema, Types} from "mongoose";

const eventhandlerSchema = new Schema(
    {
        Name:{
            type:String,
            required:true,
            lowercase : true,
            trim : true
        },
        GmailId:{
            type:String,
            required:true,
            unique : true,
            lowercase : true,
            trim : true,
            index :true
        },
        Password:{
            type:String,
            required : [true , 'Password is Required']
        },
        Location:{
            type:String,
            required:true,
            lowercase : true,
            trim : true
        },
        AllEvent:[
            {
                type : Schema.Types.ObjectId,
                ref : "Event"
            }
        ]
    }
);

export const EventHandler = mongoose.model("EventHandler",eventhandlerSchema);