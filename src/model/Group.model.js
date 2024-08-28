import mongoose,{Schema, Types} from "mongoose";

const groupSchema = new Schema(
    {
        Name:{
            type:String,
            unique:true,
            required:true,
            lowercase:true,
            trim : true,
            index :true
        },
        EventId:{
            type : Schema.Types.ObjectId ,
            ref  : "Event"
        },
        Present:{
            type:Boolean,
            default:false
        },
        AllStudent:[
            {
                type : Schema.Types.ObjectId,
                ref : "Student"
            }
        ]
    }
);
export const Group = mongoose.model("Group",groupSchema);