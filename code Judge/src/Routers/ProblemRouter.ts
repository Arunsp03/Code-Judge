import { Router } from "express";
import FileService from "../Services/FileService";

export const ProblemRouter=Router();
ProblemRouter.post('/getProblemData',async(req,res)=>{
    const { problemName } = req.body;
   
    
    console.log("problemname ",problemName);
    
const data=await FileService.getProblemDescription(problemName);
return res.json({data:data});

})
