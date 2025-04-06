import { json } from "stream/consumers";

 const getProblems=async ()=>{
    try{
        const response=await fetch("/data.json");
        const data=await response.json();
       return data;
        
        
    }
    catch(err)
    {
        console.log("error");
        
    }
} 
const getProblemDescription=async (problemName:string)=>{
    try{
        const response=await fetch("http://localhost:3000/api/v1/problem/getProblemData",{
            method:"POST",
            headers:{
'content-type':"application/json",
            },
            
            body:JSON.stringify({
                'problemName':problemName
            }),

            
        });
        const data=await response.json();
       return data;
        
        
    }
    catch(err)
    {
        console.log("error");
        
    }
} 
const getProblemBoilerplateCode=async (problemName:string,language :string)=>{
    try{
       // console.log("here");
        
        const response=await fetch("http://localhost:3000/api/v1/problem/getBoilerplateCode",{
            method:"POST",
            headers:{
'content-type':"application/json",
            },
            
            body:JSON.stringify({
                'problemName':problemName,
                language:language
            }),

            
        });
        const data=await response.json();
       // console.log("boiler plate code ",data);
        
       return data;
        
        
    }
    catch(err)
    {
        console.log("error");
        
    }
} 
const submitCode=async (problemName:string,language:string,sourceCode:string)=>{
    try{
       // console.log("here");
        
        const response=await fetch("http://localhost:3000/api/v1/code/execute",{
            method:"POST",
            headers:{
'content-type':"application/json",
            },
            
            body:JSON.stringify({
                'problemName':problemName,
                language:language,
                sourceCode:sourceCode
            }),

            
        });
        const data=await response.json();
       // console.log("boiler plate code ",data);
        
       return data;
        
        
    }
    catch(err)
    {
        console.log("error");
        
    }
} 
export default {getProblems,getProblemDescription,getProblemBoilerplateCode,submitCode} 