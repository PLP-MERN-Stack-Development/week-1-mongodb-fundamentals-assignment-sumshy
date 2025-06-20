require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

// Database and Collection names
const dbName = "plp_bookstore";
const collectionName = "books";

// Sample book documents
const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: "J. B. Lippincott & Co.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: "Secker & Warburg",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: "Charles Scribner's Sons",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    published_year: 1932,
    price: 11.5,
    in_stock: false,
    pages: 311,
    publisher: "Chatto & Windus",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: "George Allen & Unwin",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: "Little, Brown and Company",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: "T. Egerton, Whitehall",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: "Allen & Unwin",
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    published_year: 1945,
    price: 8.5,
    in_stock: false,
    pages: 112,
    publisher: "Secker & Warburg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: "HarperOne",
  },
];

// === Function to insert books ===
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB Atlas
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Optional cleanup if running multiple times
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(
        `⚠️ ${existingCount} existing documents found. Dropping collection...`
      );
      await collection.drop();
      console.log(" Collection dropped.");
    }

    // Insert book documents
    const result = await collection.insertMany(books);
    console.log(`Successfully inserted ${result.insertedCount} books.`);

    // List inserted books
    const inserted = await collection.find().toArray();
    console.log("\n Inserted Books:");
    inserted.forEach((book, index) => {
      console.log(
        `${index + 1}. "${book.title}" by ${book.author} (${
          book.published_year
        })`
      );
    });
  } catch (err) {
    console.error("Error during insertion:", err);
  } finally {
    await client.close();
    console.log("🔌 Connection to MongoDB closed");
  }
}

// Run the script
insertBooks();
