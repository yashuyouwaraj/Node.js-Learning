//objects -> handle binary data
//file system operations, cryptography, image processing

const buffOne = Buffer.alloc(10)  //allocate a buffer of 10 bytes -> zeros
console.log(buffOne)

const bufferFromString = Buffer.from("Hello")
console.log(bufferFromString)

const buffFromArrayOfintegers = Buffer.from([1,2,3,4,5,0])
console.log(buffFromArrayOfintegers)

buffOne.write("Node js")
console.log("After writing Node js to buffOne",buffOne.toString());

console.log(bufferFromString[0])
console.log(bufferFromString.slice(0,3))

const concatBuffs = Buffer.concat([buffOne,bufferFromString])
console.log(concatBuffs);

console.log(concatBuffs.toJSON());


