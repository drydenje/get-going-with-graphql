const resolvers = {
  Author: {
    books(author, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthorBooks(author.id);
    },
  },

  AuthorOrderBy: {
    NAME_ASC: "name_asc",
    NAME_DESC: "name_desc",
  },

  Book: {
    authors(book, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookAuthors(book.id);
    },
    reviews(book, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookReviews(book.id, args);
    },
  },

  BookOrderBy: {
    TITLE_ASC: "title_asc",
    TITLE_DESC: "title_desc",
  },

  LibraryOrderBy: {
    ADDED_ON_ASC: "createdAt_asc",
    ADDED_ON_DESC: "createdAt_desc",
  },

  Review: {
    book(review, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookById(review.bookId);
    },
    reviewedOn(review, args, { dataSources }, info) {
      return review.createdAt;
    },
    reviewer(review, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserById(review.userId);
    },
  },

  ReviewOrderBy: {
    REVIEWED_ON_ASC: "createdAt_asc",
    REVIEWED_ON_DESC: "createdAt_desc",
  },

  User: {
    library(user, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserLibrary(user.id);
    },
    reviews(user, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserReviews(user.id, args);
    },
  },

  Person: {
    __resolveType(obj, context, info) {
      if (obj.username) {
        return "User";
      } else {
        return "Author";
      }
    },
  },

  Query: {
    author(root, { id }, { dataSources }, info) {
      // fetch an author by ID
      return dataSources.jsonServerApi.getAuthorById(id);
    },
    authors(root, args, { dataSources }, info) {
      // fetch all authors
      return dataSources.jsonServerApi.getAuthors(args);
    },
    book(root, { id }, { dataSources }, info) {
      // fetch book by ID
      return dataSources.jsonServerApi.getBookById(id);
    },
    books(root, args, { dataSources }, info) {
      // fetch all books
      return dataSources.jsonServerApi.getBooks(args);
    },
    review(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getReviewById(id);
    },
    searchPeople(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.searchPeople(args);
    },
    user(root, { username }, { dataSources }, info) {
      return dataSources.jsonServerApi.getUser(username);
    },
  },

  Mutation: {
    createAuthor(root, { name }, { dataSources }, info) {
      return dataSources.jsonServerApi.createAuthor(name);
    },

    createBook(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.createBook(input);
    },

    createReview(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.createReview(input);
    },

    deleteReview(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.deleteReview(id);
    },

    updateReview(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.updateReview(input);
    },

    signUp(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.signUp(input);
    },

    addBooksToLibrary(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.addBooksToLibrary(input);
    },

    removeBooksFromLibrary(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.removeBooksFromLibrary(input);
    },
  },
};

export default resolvers;
