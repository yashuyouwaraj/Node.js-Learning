
function binaryDataOperations(){
    const buf = new ArrayBuffer(8)
    console.log("ArrayBuffer size: ",buf.byteLength);

    const dv = new DataView(buf)
    dv.setUint8(0,3)
    dv.setUint16(1,513)
    console.log(dv.getUint8(0));
    console.log(dv.getUint16(1));

    const unint8Array = new Uint8Array([0,1,2,3,4,5])
    console.log(unint8Array);

    const nodeBuffer = Buffer.from("Hello Bun JS")
    console.log(nodeBuffer,nodeBuffer.toString());

    const blob = new Blob(["<html>Hello</html>"],{type:"text/html"})
    console.log(blob.size,blob.type);

    const encoder = new TextEncoder()
    const encodedVal = encoder.encode("Hello Bun!")
    console.log(encodedVal);

    const decoder = new TextDecoder()
    const decodedVal = decoder.decode(encodedVal)
    console.log(decodedVal);  
}

binaryDataOperations()