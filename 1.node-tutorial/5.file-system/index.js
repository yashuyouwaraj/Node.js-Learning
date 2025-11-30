const fs=require("fs")
const path=require("path")

const dataFolder=path.join(__dirname,"data")
if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder)
    console.log("data folder created")
}

//sync way of creating the file
const filePath=path.join(dataFolder,"example.txt")
fs.writeFileSync(filePath,"Hello from node.js")
console.log("file created successfully")

const readContentFromFile=fs.readFileSync(filePath,"utf-8")
console.log("File content:",readContentFromFile)

fs.appendFileSync(filePath,"\nThis is the new line")
console.log("new file content added")


//async way of creating the file
const asyncFilePath=path.join(dataFolder,"async-example.txt")
fs.writeFile(asyncFilePath,"Hello, Async node js",(err)=>{
    if(err) throw err
    console.log("Aysnc file created successfully")

    fs.readFile(asyncFilePath,"utf-8",(err,data)=>{
        if(err) throw err
        console.log("Aysnc file content: ",data)

        fs.appendFile(asyncFilePath,"\nThis is another line added",(err)=>{
            if(err) throw err
            console.log("New line added to async file")

            fs.readFile(asyncFilePath,"utf-8",(err,updateddata)=>{
                if(err) throw err
                console.log("Updated file content",updateddata)
            })
        })
    })
})