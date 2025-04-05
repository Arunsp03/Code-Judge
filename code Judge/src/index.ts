import express from "express"
import CodeRouter from "./Routers/CodeRouter";
import cors from "cors"
import { ProblemRouter } from "./Routers/ProblemRouter";
import { configDotenv } from "dotenv";
configDotenv();
const app=express();
app.use(express.json()) 
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/code",CodeRouter)
app.use("/api/v1/problem",ProblemRouter)
app.listen(process.env.PORT || 3000,()=>{
  console.log("listening on port 3000");
})










