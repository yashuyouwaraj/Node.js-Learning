// module.exports
// require

const firstModule=require('./first-module')

console.log(firstModule.add(10,20))
console.log(firstModule.sub(100,20))

try {
    // console.log('trying to divide by zero')
    let result=firstModule.divide(0,10)
    console.log(result)
} catch (error) {
    console.log('Caught an error',error)
}

//module wrapper function
// (
//     function(exports,require,module,__filename,__dirname){
//         //your module code goes here
//     }
// )