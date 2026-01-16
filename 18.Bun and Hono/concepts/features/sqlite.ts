import {Database} from "bun:sqlite"

async function sqliteDemo() {
    const db = new Database("bundb.sqlite")

    //create table
    db.run(`
        CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `)
    console.log("Table users created successfully");
    
    const insertUser = db.prepare(`
        INSERT INTO users(name,email) VALUES(?,?)
        `) //SQL Injection
        // insertUser.run("John Doe","John@gmail.com")
        // insertUser.run("Jane Smith","Jane@gmail.com")
        // insertUser.run("Alice Johnson","Alice@gmail.com")
    console.log("Sample users inserted successfully");

    const extractAllUsers = db.query("SELECT * FROM users").all()
    console.log(extractAllUsers);

    db.run("UPDATE users SET name = ? WHERE email = ?",["John Rise","John@gmail.com"])

    const getUpdatedUsers = db.query("SELECT * FROM users WHERE email = ?").get("John@gmail.com")
    console.log(getUpdatedUsers);

    // db.run("DELETE FROM users WHERE email = ?",["John@gmail.com"])
    const extractRemainingUsers = db.query("SELECT * FROM users").all()
    console.log("ExtractRemainingUsers",extractRemainingUsers);
    
    
    
}

sqliteDemo()
