import express from "express"
import CodeRouter from "./Routers/CodeRouter";
const app=express();
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/code",CodeRouter)
app.listen(3000,()=>{
  console.log("listening on port 3000");
})










