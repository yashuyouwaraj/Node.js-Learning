async function hashingOperations() {
    const password = "123456"
    const hashedPassword = await Bun.password.hash(password)
    console.log("Using Hash: ",hashedPassword);

    const isMatch = await Bun.password.verify(password,hashedPassword)
    console.log("Password matching : ",isMatch);
    
    const argonHashExample = await Bun.password.hash(password, {
        algorithm:"argon2id",
        memoryCost: 4,
        timeCost: 3
    })
    console.log("Using argon2id : ", argonHashExample);
    
    const bcryptHashExample = await Bun.password.hash(password,{
        algorithm:"bcrypt",
        cost:12
    })
    console.log("Using bcrypt: ",bcryptHashExample);
    
}

hashingOperations()