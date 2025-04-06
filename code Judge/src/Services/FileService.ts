import { promises as fs } from "fs";
import { stripTypeScriptTypes } from "module";
import { returnExtension } from "../Utils/commonUtils";
class FileService {
  findInputfiles = async (problemName: string) => {
    try {
      problemName = problemName.replace(" ", "");
      const inputFiles = await fs.readdir(`../problems/tests/${problemName}/inputs`);

      return inputFiles;
    } catch (err) {
      console.error("error ", err);
    }
  };
  //gets count of no of output files to be compared
  findOutputfiles = async (problemName: string) => {
    try {
      problemName = problemName.replace(" ", "");
      const outputFiles = await fs.readdir(`../problems/tests/${problemName}/outputs`);

      return outputFiles;
    } catch (err) {
      console.error("error ", err);
    }
  };
  readProblemTestInputs = async (problemName: string, fileName: string) => {
    try {
      problemName = problemName.replace(" ", "");

      const data = await fs.readFile(
        `../problems/tests/${problemName}/inputs/${fileName}`,
        "utf8"
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  readProblemMetaData = async (problemName: string) => {
    try {
      problemName = problemName.replace(" ", "");
      const data = await fs.readFile(
        `../problems/problems-metadata/${problemName}.txt`,
        "utf-8"
      );

      return data;
    } catch (err) {
      console.error("error ", err);
    }
  };

  readProblemTestOutputs = async (problemName: string, fileName: string) => {
    try {
      problemName = problemName.replace(" ", "");
      const data = await fs.readFile(
        `../problems/tests/${problemName}/outputs/${fileName}`,
        "utf-8"
      );
      return data;
    } catch (err) {
      console.error("error ", err);
    }
  };
  async rename(oldFilePath: string, newFilePath: string) {
    try {
        await fs.rename(oldFilePath, newFilePath);
    } catch (error) {
        console.error("Rename error:", error);
        throw new Error("Failed to rename file");
    }
}
 getSourceCode=async(fileName:string)=>{
  try{
    const sourceCode=await fs.readFile(`./codefiles/${fileName}`)
    return sourceCode.toString();
  }
  catch(err)
  {
    console.error(err)

  }
}
getProblemDescription=async(problemName:string)=>{
  try{
   
    
    const data = await fs.readFile(
      `../problems/problems-structure/${problemName}.md`,
      "utf-8"
    );
    console.log("data",data);
    
    return data;
  }
  catch(err)
  {
    console.error(err)

  }
}

getBoilerPlateCode=async(problemName:string,language:string)=>
{
  try{
  //  console.log("language ",language);
    
      const extension=returnExtension(language);
    const data = await fs.readFile(
      `../problems/problems-boilerplate/${problemName}.${extension}`,
      "utf-8"
    );
   // console.log("data",data);
    
    return data;
  }
  catch(err)
  {
    console.error("error ",err);
    
  }
}

}
export default new FileService();
