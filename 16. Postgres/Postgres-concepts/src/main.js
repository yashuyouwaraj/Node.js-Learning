const {createUsersTable, insertUser, fetchAllUsers, updateUserInfo, deleteInfo} = require("./concepts/basic-queries")
const { getUsersWhere, getSortedUsers, getPaginatedUsers } = require("./concepts/filtering-sorting")

//test basic queries

async function testBasicQueries() {
    try {
        await createUsersTable()

        // Insert new users 
        await insertUser('Yashu Youwaraj','yashu@gamil.com')
        await insertUser('Aman Kumar','aman@gamil.com')
        await insertUser('John Kumar','John@gamil.com')
        await insertUser('Alex Kumari','alex@gamil.com')
        await insertUser('Travis Mukherjee','travis@gamil.com')

        console.log("All users");
        const allUsers = await fetchAllUsers()
        console.log(allUsers);      
        
        const updatedUser = await updateUserInfo('Alex Kumari','AlexSimso@gmail.com')
        console.log(updatedUser);

        const deletedUser = await deleteInfo('Yashu Youwaraj')
        console.log(deletedUser);
        

    } catch (e) {
        console.error("Error",e)
    }
}

async function testFilterAndSortQueries() {
    try {
        //get users with a username whose username starting with z
        // const userStartingWith= await getUsersWhere("username LIKE 'A%'")
        // console.log(userStartingWith);

        // const sortedUsers = await getSortedUsers("created_at","DESC")
        // console.log(sortedUsers);

        const paginatedUsers = await getPaginatedUsers(2,1)
        console.log(paginatedUsers);
        
    } catch (error) {
        console.error("Error in filtering and sorting queries",error)
    }
}

async function testAllQueries() {
    // await testBasicQueries()
    testFilterAndSortQueries()
}

testAllQueries()