import { Router } from "express";
import FileService from "../Services/FileService";
import path from "path";
import multer from "multer";
import CodeExecutionFacade from "../Services/CodeExecutionFacade";
const upload = multer({ dest:  "./codefiles/"},
  
);
const CodeRouter=Router();

CodeRouter.post('/execute', upload.single("file"),async (req, res) => {
   console.log("Received request with body:", req.body);
  console.log("Received file:", req.file);    
  const{filename}=req.file;
  console.log("filename ",filename);
  const filePath=req.file?.path;
  const newFileName = `solution_${Date.now()}.py`; 
  const newFilePath = path.join("./codefiles", newFileName);
  
  if (!req.file) {
      console.log("No file found");
      return res.status(400).send("No file uploaded");
  }

  const { problemName,language } = req.body;
  console.log("language ",language);
  

  try {
      FileService.rename(filePath??"", newFilePath);
      await CodeExecutionFacade.run(problemName, newFileName,language);
      res.send("Executing");
  } catch (error) {
      console.error("Error saving file:", error);
      res.status(500).send("Error saving file");
  }
});

export default CodeRouter