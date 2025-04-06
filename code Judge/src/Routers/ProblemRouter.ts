import { Router } from "express";
import FileService from "../Services/FileService";

export const ProblemRouter = Router();
ProblemRouter.post("/getProblemData", async (req, res) => {
  try {
    const { problemName } = req.body;

    //console.log("problemname ", problemName);
    if (!problemName || problemName.trim() == 0) {
      return res.status(404).send("Missing params");
    }

    const data = await FileService.getProblemDescription(problemName);
    return res.json({ data: data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while getting problem description");
  }
});
ProblemRouter.post("/getBoilerplateCode", async (req, res) => {
  try {
    const { problemName, language } = req.body;
    if (
      !problemName ||
      !language ||
      problemName.trim() == 0 ||
      language.trim() == 0
    ) {
      return res.status(404).send("Missing params");
    }
    //console.log("problemname ",problemName);

    const data = await FileService.getBoilerPlateCode(problemName, language);
    return res.json({ data: data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while getting boiler plate code");
  }
});
