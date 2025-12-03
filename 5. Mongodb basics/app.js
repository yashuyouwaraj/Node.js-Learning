const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://<db-username>:<db-password>@cluster0.ofafujx.mongodb.net/")
  .then(() => console.log("database connected successfully"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

//create user model
const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    //create a new document
    const newUser = await User.create({
      name: "Updated User",
      email: "update@gmail.com",
      age: "22",
      isActive: "true",
      tags: ["Developer"],
    });

    // const newUser = new User({
    //   name: "Aman Kumar Gupta",
    //   email: "Destoryer@gmail.com",
    //   age: "30",
    //   isActive: "true",
    //   tags: ["Developer","SDE","Full Stack"],
    // });
    // await newUser.save()

    console.log("Created new user",newUser)

    // const allUsers=await User.find({})
    // console.log(allUsers)

    // const getUserOfActiveeFalse = await User.find({isActive : false})
    // console.log(getUserOfActiveeFalse)

    // const getFirstKimUser= await User.findOne({name: "Kim Kardasin"})
    // console.log(getKimUser)

    // const getLastCreatedUserByUserId=await User.findById(newUser._id)
    // console.log(getLastCreatedUserByUserId)

    // const selectedFields=await User.find().select("name email -_id")
    // console.log(selectedFields)

    // const limitedUsers= await User.find().limit(5).skip(1)
    // console.log(limitedUsers)

    // const sortedUsers= await User.find().sort({age:1})
    // console.log(sortedUsers)

    // const countUsers=await User.countDocuments({isActive:true})
    // console.log(countUsers)

    // const deletedUser = await User.findByIdAndDelete(newUser._id)
    // console.log("deleted user ->",deletedUser)

    const updateUser= await User.findByIdAndUpdate(newUser._id,{
      $set: {age:100},
      $push: {tags: "updated"}
    },{new: true})
    console.log("Updated user",updateUser)

  } catch (e) {
    console.log("Error->", e);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
