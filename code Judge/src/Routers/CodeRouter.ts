import { Router } from "express";
import FileService from "../Services/FileService";
import path from "path";
import multer from "multer";
import CodeExecutionFacade from "../Services/CodeExecutionFacade";

const upload = multer({ dest: "./codefiles/" });
const CodeRouter = Router();

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

export default CodeRouter;
