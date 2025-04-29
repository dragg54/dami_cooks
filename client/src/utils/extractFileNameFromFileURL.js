export const extractFileNameFromFileURL = (fileURL) =>{
     const fileArr = fileURL?.split("/")
     return fileArr?.at(-1)
}