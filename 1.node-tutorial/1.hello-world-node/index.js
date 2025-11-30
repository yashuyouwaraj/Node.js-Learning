console.log('Hello, World! This is my first Node.js application.');

const array=[1, 2, 3, 4, 5];
console.log(array,'array')

setTimeout(()=>{
    console.log('This message is delayed by 2 seconds')
},2000)

console.log('This message is last line of the sync code')