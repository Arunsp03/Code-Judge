import { promises as fs } from "fs";
import { stripTypeScriptTypes } from "module";
class FileService {
  findInputfiles = async (problemName: string) => {
    try {
      problemName = problemName.replace(" ", "");
      const inputFiles = await fs.readdir(`./tests/${problemName}/inputs`);

      return inputFiles;
    } catch (err) {
      console.log("error ", err);
    }
  };
  //gets count of no of output files to be compared
  findOutputfiles = async (problemName: string) => {
    try {
      problemName = problemName.replace(" ", "");
      const outputFiles = await fs.readdir(`./tests/${problemName}/outputs`);

      return outputFiles;
    } catch (err) {
      console.log("error ", err);
    }
  };
  readProblemTestInputs = async (problemName: string, fileName: string) => {
    try {
      problemName = problemName.replace(" ", "");

      const data = await fs.readFile(
        `./tests/${problemName}/inputs/${fileName}`,
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
        `./problems-metadata/${problemName}.txt`,
        "utf-8"
      );

      return data;
    } catch (err) {
      console.log("error ", err);
    }
  };

  readProblemTestOutputs = async (problemName: string, fileName: string) => {
    try {
      problemName = problemName.replace(" ", "");
      const data = await fs.readFile(
        `./tests/${problemName}/outputs/${fileName}`,
        "utf-8"
      );
      return data;
    } catch (err) {
      console.log("error ", err);
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

}
export default new FileService();
