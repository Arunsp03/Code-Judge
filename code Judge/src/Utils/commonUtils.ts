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
  
  }
  