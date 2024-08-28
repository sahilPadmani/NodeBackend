import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../model/Event.model.js";
import { Student } from "../model/Student.model.js";
import { Group } from "../model/Group.model.js";

const SaveGroup = asyncHandler(async(req,res)=>{
    const {Name,EventId,AllStudent} = req.body;

    if([Name,EventId].some((element)=>element?.trim()==="") || !AllStudent || AllStudent.length === 0){
        throw new ApiError(400 , "Data not Present");
    }

    const studentsToUpdate = [];
    const allStudentIds = [];

    // Check if the group already exists
    const existingGroup = await Group.findOne({ Name: Name });
    if (existingGroup) {
        throw new ApiError(400, "Group with this name already exists");
    }

    try {
        await Promise.all(AllStudent.map(async (gmailId) => {
            const student = await Student.findOne({ GmailId: gmailId });

            if (!student) {
                throw new ApiError(404, `${gmailId} not found`);
            }

            if (student.JoinEvent) {
                throw new ApiError(409, `${gmailId} is already in another group`);
            }

            student.JoinEvent = true;
            student.FoodCount = 0;
            student.PastFoodCount = 0;

            studentsToUpdate.push(student);
            allStudentIds.push(student._id);
        }));

        // Update all students
        await Promise.all(studentsToUpdate.map(student => student.save()));

        // Create the new group
        const group = await Group.create({
            Name,
            EventId,
            AllStudent: allStudentIds,
        });

        res.status(201).json(new ApiResponse(200,group,"Group created successfully"));

    } catch (error) {
        // Rollback student updates in case of error
        if (studentsToUpdate.length > 0) {
            await Promise.all(studentsToUpdate.map(student =>
                Student.findByIdAndUpdate(student._id, { JoinEvent: false, FoodCount: 0, PastFoodCount: 0 })
            ));
        }
        throw error;
    }

    
});


// const 

export { SaveGroup };