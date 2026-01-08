require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function addAuthor(name) {
  try {
    const newlyCreatedAuthor = await prisma.author.create({
      data: {
        name,
      },
    });

    return newlyCreatedAuthor;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function deleteAuthor(id) {
  try {
    const deletedAuthor = await prisma.author.delete({
      where: { id },
      include: { books: true },
    });

    return deletedAuthor;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = { addAuthor, deleteAuthor };
