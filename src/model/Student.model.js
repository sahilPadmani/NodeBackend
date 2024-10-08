import mongoose,{Schema, Types} from "mongoose";

const studentSchema = new Schema(
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
    }
);

export const Student = mongoose.model("Student",studentSchema);