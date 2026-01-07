const {createUsersTable, insertUser, fetchAllUsers, updateUserInfo, deleteInfo} = require("./concepts/basic-queries")

//test basic queries

async function testBasicQueries() {
    try {
        // await createUsersTable()

        // Insert new users 
        // await insertUser('Yashu Youwaraj','yashu@gamil.com')
        // await insertUser('Aman Kumar','aman@gamil.com')
        // await insertUser('John Kumar','John@gamil.com')
        // await insertUser('Alex Kumari','alex@gamil.com')
        // await insertUser('Travis Mukherjee','travis@gamil.com')

        // console.log("All users");
        // const allUsers = await fetchAllUsers()
        // console.log(allUsers);      
        
        // const updatedUser = await updateUserInfo('Alex Kumari','AlexSimso@gmail.com')
        // console.log(updatedUser);

        // const deletedUser = await deleteInfo('Yashu Youwaraj')
        // console.log(deletedUser);
        

    } catch (e) {
        console.error("Error",e)
    }
}

async function testAllQueries() {
    await testBasicQueries()
}

testAllQueries()