const db = require('../db/db')

async function countPostsByUser() {
    const countPostsByUserQuery= `
    SELECT users.username, COUNT(posts.id) AS post_count
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    GROUP BY users.id, users.username
    `

    try {
        const res = await db.query(countPostsByUserQuery)
        return res.rows
    } catch (e) {
        console.log("Error in countPostsByUser",e);
    }
}

async function averagePostsPerUser() {
    const averagePostsPerUserQuery= `
        SELECT AVG(post_count) AS average_posts
        FROM(
        SELECT COUNT(posts.id) AS post_count
        FROM users
        LEFT JOIN posts ON users.id = posts.user_id
        GROUP BY users.id
        ) as user_per_counts
        `
    try {
        const res = await db.query(averagePostsPerUserQuery)
        return res.rows
    } catch (e) {
        log("Error in averagePostsPerUser",e);
    }
}

module.exports= {countPostsByUser,averagePostsPerUser}