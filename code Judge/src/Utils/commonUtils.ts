export  function capitalizeWords(sentence: string): string {
    return sentence
        .split(" ")
        .map(word => capitalize(word))
        .join(" ");
  }
export  function capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  export  enum Languages{
    "python"=71,
    "node"=93,
    "javascript"=93
  
  }
  export enum Extension{
    "python"="py",
    "node"="js"
  }
  

  export const returnLanguage=(language:string):Languages|undefined=>{
    switch(language){
      case 'python':return Languages.python;
      break;
      case 'node':return Languages.node;
      case 'javascript':return Languages.node;
      default :return undefined;
    }}
    export const returnExtension=(language:string):Extension|undefined=>{
      switch(language){
        case 'python':return Extension.python;
        break;
        case 'javascript':return Extension.node;
        default :return undefined;
      }
  }