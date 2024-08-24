import mongoose,{Schema, Types} from "mongoose";

const studentSchema = new Schema(
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
        JoinEvent:{
            type:Boolean,
            default: false
        },
        FoodCount:{
            type:Number,
            default:0
        },
        PastFoodCount:{
            type:Number,
            default:0
        }
    },
    {
        timeseries : true
    }
);

export const Student = mongoose.model("Student",studentSchema);