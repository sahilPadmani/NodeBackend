import mongoose,{Schema, Types} from "mongoose";

const groupSchema = new Schema(
    {
        Name:{
            type:String,
            unique:true,
            require:true,
            lowecase:true,
            trim : true,
            index :true
        },
        EventId:{
            type : Schema.Types.ObjectId ,
            ref  : "Event"
        },
        AllStudent:[
            {
                type : Schema.Types.ObjectId,
                ref : "Student"
            }
        ]
    },
    {
        timeseries : true
    }
);
export const Group = mongoose.model("Group",groupSchema);