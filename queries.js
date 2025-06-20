// 1. Find all books in a specific genre (e.g. "Fiction")
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year (e.g. after 1950)
db.books.find({ published_year: { $gt: 1950 } });

// 3. Find books by a specific author (e.g. "George Orwell")
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book (e.g. "The Hobbit" to 16.99)
db.books.updateOne({ title: "The Hobbit" }, { $set: { price: 16.99 } });

// 5. Delete a book by its title (e.g. "Animal Farm")
db.books.deleteOne({ title: "Animal Farm" });

// Advanced queries

// 6. Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 },
});

// 7. Use projection to return only title, author, and price fields (hide _id)
db.books.find(
  {},
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1,
  }
);

// 8. Sort books by price in ascending order
db.books.find().sort({ price: 1 });

// 9. Sort books by price in descending order
db.books.find().sort({ price: -1 });

// 10. Pagination – Page 1 (first 5 books)
db.books.find().skip(0).limit(5);

// 11. Pagination – Page 2 (next 5 books)
db.books.find().skip(5).limit(5);

// AGGREGATION PIPELINES 

// 12. Calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" }
    }
  }
]);


// 13. Find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      total_books: { $sum: 1 }
    }
  },
  { $sort: { total_books: -1 } },
  { $limit: 1 }
]);


// 14. Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $substr: [{ $toString: "$published_year" }, 0, 3] },
          "0s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);
