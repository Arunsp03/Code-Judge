import { Request, Response, Router } from "express";
import multer from "multer";
import CodeExecutionFacade from "../Services/CodeExecutionFacade";
import { sendMessageToQueue } from "../Services/MessageQueue/Send";
import {v4 as uuidv4} from "uuid";
const upload = multer({ dest: "./codefiles/" });
const CodeRouter = Router();

export let requestStore=new Map<string,any>();

CodeRouter.post("/execute", upload.single("file"), async (req, res) => {
  const { problemName, language, sourceCode } = req.body;
  //console.log("language ",language);
  if (
    !problemName ||
    !language ||
    !sourceCode ||
    problemName.trim() == 0 ||
    language.trim() == 0 ||
    sourceCode.trim() == 0
  ) {
    return res.status(404).send("missing parameters");
  }
  try {
    const result = await CodeExecutionFacade.run(
      problemName,
      language,
      sourceCode
    );
    res.json({ result: result });
  } catch (error) {
    console.error("Error saving file:", error);
    res.status(500).send("Error saving file");
  }
});
 
CodeRouter.post("/queuecode",async(req,res)=>{
  try{
    const { problemName, language, sourceCode } = req.body;
  //console.log("language ",language);
  if (
    !problemName ||
    !language ||
    !sourceCode ||
    problemName.trim() == 0 ||
    language.trim() == 0 ||
    sourceCode.trim() == 0
  ) {
    return res.status(404).send("missing parameters");
  }
  const requestId = uuidv4();

    await sendMessageToQueue("CodeExecutionQueue",JSON.stringify({"requestId":requestId,"problemName":problemName,"language":language,"sourceCode":sourceCode}));
    res.json({requestId:requestId});
  }
  catch(err)
  {

    console.error("Error saving file:", err);
    res.status(500).send("Error saving file");
  }
}

)
CodeRouter.get("/request/:requestid",(req,res)=>{
  try{
    const {requestid}=req.params;
    //console.log("received request id",requestid)
   let result:any;
    if(requestStore.has(requestid))
    {
      result=requestStore.get(requestid);
      res.json({"status":"done","result":result})
      requestStore.delete(requestid);
    }
    else{
      res.json({"status":"pending"})      
    }
    
  }
  catch(err)
  {
    console.error(err);
    throw err;
  }
})

export default CodeRouter;
