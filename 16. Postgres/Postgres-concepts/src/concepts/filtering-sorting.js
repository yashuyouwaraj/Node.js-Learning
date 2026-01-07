const db = require("../db/db")

//WHERE clause

async function getUsersWhere(condition) {
    const getUsersQuery = `
    SELECT * FROM users
    WHERE ${condition}
    `
    try {
        const res = await db.query(getUsersQuery)
        if(res.rows.length > 0){
            return res.rows;
        } else{
            console.log("No user found with the given condition.");
            return null;
        }
    } catch (error) {
        console.error("Error while fetching users with condition", error);
    }
}

async function getSortedUsers(column,order = 'ASC') {
    const getSortedUsersQuery = `
    SELECT * FROM users
    ORDER BY ${column} ${order}
    `
    try {
        const res = await db.query(getSortedUsersQuery)

        return res.rows
    } catch (error) {
        console.error("Error while fetching sorted users", error);
    }
}

async function getPaginatedUsers(limit,offset) {
    const getPaginatedQuery = `
    SELECT * FROM users
    LIMIT $1 OFFSET $2
    `

    try {
        const res = await db.query(getPaginatedQuery,[limit,offset])
        return res.rows
    } catch (error) {
        console.error("Error while fetching paginated users", error);
    }
}

module.exports = {getUsersWhere, getSortedUsers, getPaginatedUsers}