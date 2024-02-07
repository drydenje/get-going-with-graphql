const resolvers = {
  Author: {
    books(author, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthorBooks(author.id);
    },
  },
  Book: {
    authors(book, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookAuthors(book.id);
    },
    reviews(book, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookReviews(book.id);
    },
  },
  Review: {
    book(review, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookById(review.bookId);
    },
    reviewedOn(review, args, { dataSources }, info) {
      return review.createdAt;
    },
  },
  Query: {
    author(root, { id }, { dataSources }, info) {
      // fetch an author by ID
      return dataSources.jsonServerApi.getAuthorById(id);
    },
    authors(root, args, { dataSources }, info) {
      // fetch all authors
      return dataSources.jsonServerApi.getAuthors();
    },
    book(root, { id }, { dataSources }, info) {
      // fetch book by ID
      return dataSources.jsonServerApi.getBookById(id);
    },
    books(root, args, { dataSources }, info) {
      // fetch all books
      return dataSources.jsonServerApi.getBooks();
    },
    review(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getReviewById(id);
    },
  },
};

export default resolvers;
