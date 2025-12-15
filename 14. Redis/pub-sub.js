const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

//event listener

client.on("error", (error) =>
  console.log("Redis client error occured!", error)
);

async function testAdditionalFeatures() {
  try {
    await client.connect();
    const subscriber = client.duplicate(); //create a new client -> shares the same connection
    await subscriber.connect(); // connect to redis server for the subscriber

    await subscriber.subscribe("dummy-channel", (message, channel) => {
      console.log(`Received message from ${channel}:${message}`);
    });

    //publish message to the dummy channel
    await client.publish("dummy-channel", "Some dummy data from publiser");
    await client.publish(
      "dummy-channel",
      "some new message again from publiser"
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await subscriber.unsubscribe("dummy-channel");
    await subscriber.quit(); // close the subscriber connection

    //pipelining & transactions
    // const multi = client.multi()
    // multi.set("key-transaction1","valu1")
    // multi.set("key-transaction2","valu2")
    // multi.get("key-transaction1")
    // multi.get("key-transaction2")
    // const results = await multi.exec()
    // console.log(results);

    const pipeline = client.multi()
    pipeline.set("key-pipeline1","valu1")
    pipeline.set("key-pipeline2","valu2")
    pipeline.get("key-pipeline1")
    pipeline.get("key-pipeline2")
    const pipelineresults = await pipeline.exec()
    console.log(pipelineresults);

    // batch data operation ->
    const pipelineOne = client.multi()
    for(let i=0;i<1000;i++){
      pipelineOne.set(`user:${i}:action`,`Action ${i}`)
    }
    const batchresult=await pipelineOne.exec()
    console.log(batchresult);

    const dummyExample = client.multi();

    dummyExample.decrBy("account:1234:balance", 100);
    dummyExample.incrBy("account:0000:balance", 100);

    const finalResult = await dummyExample.exec();
    console.log(finalResult);

    const cartExample = client.multi()
    cartExample.hIncrBy('cart:1234',"item_count",1)
    cartExample.hIncrBy('cart:1234',"total_price",10)
    const cartresult = await cartExample.exec()
    console.log(cartresult);
    
    console.log("Performance test");
    console.time("without pipelining")
    for(let i=0;i<1000;i++){
      await client.set(`user${i}`,`user_value${i}`)
    }
    console.timeEnd("without pipelining")

    console.time("with pipelining")
    const bigPipeline=client.multi()
    for(let i=0;i<1000;i++){
      bigPipeline.set(`user_pipeline_key${i}`, `user_pipeline_value${i}`)
    }
    await bigPipeline.exec()
    console.timeEnd("with pipelining")
    
  } catch (error) {
    console.log(error);
  } finally {
    await client.quit();
  }
}

testAdditionalFeatures();
