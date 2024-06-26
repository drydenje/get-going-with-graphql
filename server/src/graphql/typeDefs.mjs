import gql from "graphql-tag";
// import { gql } from "apollo-server-express";

const typeDefs = gql`
  directive @unique(
    "The resource path name from the REST endpoint."
    path: String!
    """
    The database key name upon which to force uniqueness.

    If not provided, then the GraphQL schema field will be used.
    """
    key: String
  ) on INPUT_FIELD_DEFINITION

  """
  Literary genres that classify books.
  """
  enum Genre {
    ADVENTURE
    CHILDREN
    CLASSICS
    COMIC_GRAPHIC_NOVEL
    COOKBOOK
    DETECTIVE_MYSTERY
    DYSTOPIA
    FANTASY
    HORROR
    HUMOR
    NON_FICTION
    SCIENCE_FICTION
    ROMANCE
    THRILLER
    WESTERN
  }

  """
  An ISO 8601-encoded UTC date string.
  """
  scalar DateTime

  """
  An integer-based rating from 1 (low) to 5 (high)
  """
  scalar Rating

  """
  Sorting options for search results.
  """
  enum SearchOrderBy {
    RESULTS_ASC
    RESULTS_DESC
  }

  """
  Specifies fields shared by people (including authors and users).
  """
  interface Person {
    "The unique ID of the person."
    id: ID!

    "The full name of the person."
    name: String!
  }

  """
  Types that can be returned from book-related search results.
  """
  union BookResult = Book | Author

  """
  An author is a person who wrote one or more books.
  """
  type Author implements Person {
    "The unique ID of the author."
    id: ID!

    "Books that were authored or co-authored by this person."
    books: [Book]

    "The full name of the author."
    name: String!
  }

  """
  A list of author results with pagination information.
  """
  type Authors {
    "A list of author results."
    results: [Author]

    "Information to assist with pagination."
    pageInfo: PageInfo
  }

  """
  Sorting options for authors.
  """
  enum AuthorOrderBy {
    NAME_ASC
    NAME_DESC
  }

  """
  A written work that can be attributed to one or more authors and can be reviewed by users.
  """
  type Book {
    "The unique ID of the book."
    id: ID!

    "The author(s) who wrote the book."
    authors: [Author]

    "The URL of the book's cover image."
    cover: String

    "A literary genre to which the book can be assigned."
    genre: Genre

    """
    User-submitted reviews of the book.

    Default sort order is REVIEWED_ON_DESC
    """
    reviews(limit: Int = 20, orderBy: ReviewOrderBy, page: Int): Reviews

    "A brief description of the book's content."
    summary: String

    "The title of the book."
    title: String!
  }

  """
  A list of book results with pagination information.
  """
  type Books {
    "A list of book results."
    results: [Book]

    "Information to assist with paginaion."
    pageInfo: PageInfo
  }

  """
  Sorting options for books.
  """
  enum BookOrderBy {
    TITLE_ASC
    TITLE_DESC
  }

  """
  A user-submitted assessment of a book that may include a numerical rating.
  """
  type Review {
    "The unique ID of the review."
    id: ID!

    "The book to which the review applies."
    book: Book

    "The user's integer-based rating of the book (from 1 to 5)"
    rating: Rating!

    "The date and time the review was created."
    reviewedOn: DateTime!

    "The user who submitted the book review."
    reviewer: User!

    "The text-based content of the review."
    text: String
  }

  """
  A list of review results with pagination information.
  """
  type Reviews {
    "A list of review results."
    results: [Review]
    "Information to assist with paginaion."
    pageInfo: PageInfo
  }

  """
  Sorting options for reviews.
  """
  enum ReviewOrderBy {
    REVIEWED_ON_ASC
    REVIEWED_ON_DESC
  }

  """
  Sorting options for books in a users library.
  """
  enum LibraryOrderBy {
    ADDED_ON_ASC
    ADDED_ON_DESC
  }

  """
  Contains information about the current page of results.
  """
  type PageInfo {
    "Whether there are items to retrieve on a subsequent page."
    hasNextPage: Boolean

    "Whether there are items to retrieve on a preceding page."
    hasPrevPage: Boolean

    "The current page number."
    page: Int

    "The number of items retrieved per page."
    perPage: Int

    "The total item count across all pages."
    totalCount: Int
  }

  """
  A user account provides authentication and library details.
  """
  type User implements Person {
    "The unique ID of the user."
    id: ID!
    "The email address of the user (must be unique)."
    email: String!

    """
    A list of books the user has added to their library.

    Default sort order is ADDED_ON_DESC.
    """
    library(limit: Int = 20, orderBy: LibraryOrderBy, page: Int): Books

    "The full name of the user."
    name: String!

    """
    A list of book reviews created by the user.

    Default sort order is REVIEWED_ON_DESC.
    """
    reviews(limit: Int = 20, orderBy: ReviewOrderBy, page: Int): Reviews
    "The user's chosen username (must be unique)."
    username: String!
  }

  type Query {
    "Retrieves the currently authenticated user."
    viewer: User

    "Retrieves a single author by ID."
    author(id: ID!): Author

    """
    Retrives a list of authors with pagination information.

    Default sort order is NAME_ASC.
    """
    authors(limit: Int = 20, orderBy: AuthorOrderBy, page: Int): Authors
    "Retrieves a single book by ID."
    book(id: ID!): Book

    """
    Retrieves a list of books with pagination information.

    Default sort order is TITLE_ASC.
    """
    books(limit: Int = 20, orderBy: BookOrderBy, page: Int): Books
    "Retrieves a single book by ID."
    review(id: ID!): Review

    """
    Performs a search of book titles and author names.

    Default sort order is RESULTS_ASC
    """
    searchBooks(
      exact: Boolean = false
      orderBy: SearchOrderBy
      query: String!
    ): [BookResult]

    """
    Performs a search of author and user names.

    Default sort order is RESULTS_ASC.
    """
    searchPeople(
      exact: Boolean = false
      orderBy: SearchOrderBy
      query: String!
    ): [Person]

    "Retrieves a single user by username."
    user(username: String!): User
  }

  """
  A currently authenticated user and their valid JWT
  """
  type AuthPayload {
    "The logged-in user."
    viewer: User
    "A JWT issued at the time of the user's most recent authentication."
    token: String
  }

  type Mutation {
    "Adds books to user's library."
    addBooksToLibrary(input: UpdateLibraryBooksInput!): User!

    "Creates a new author."
    createAuthor(name: String!): Author!

    "Creates a new book."
    createBook(input: CreateBookInput!): Book!

    "Creates a new review."
    createReview(input: CreateReviewInput!): Review!

    "Deletes a review."
    deleteReview(id: ID!): ID!

    "Auhenticates an existing user."
    login(password: String!, username: String!): AuthPayload!

    "Remove books currently in a user's library."
    removeBooksFromLibrary(input: UpdateLibraryBooksInput!): User!

    "Creates a new user."
    signUp(input: SignUpInput!): AuthPayload!

    "Updates a review."
    updateReview(input: UpdateReviewInput!): Review!
  }

  """
  Provides data to create a book.
  """
  input CreateBookInput {
    "The IDs of the authors who wrote the book."
    authorIds: [ID]
    """
    The URL of the book's cover image. Covers available via the Open Library Covers API:

    https://openlibrary.org/dev/docs/api/covers
    """
    cover: String
    "A literary genre to which the book can be assigned."
    genre: Genre
    "A short summary of the book's content."
    summary: String
    "The title of the book."
    title: String!
  }

  """
  Provides data to create a review.
  """
  input CreateReviewInput {
    "The unique ID of the book a user is reviewing."
    bookId: ID!

    "The user's integer-based rating of the book (from 1 to 5)"
    rating: Rating!

    "The ID of the user submitting the review."
    reviewerId: ID!

    "The text-based content of the review."
    text: String
  }

  """
  Provides data to create a user.
  """
  input SignUpInput {
    "The email address of the user (must be unique)"
    email: String! @unique(path: "users")

    "The full name of the user."
    name: String!

    "The user's chosen username (must be unique)"
    username: String! @unique(path: "users")

    """
    The user's chosen password.

    It must be a minimum of 8 characters in length and contain 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.
    """
    password: String!
  }

  """
  Provides data to add or remove books from a users library.
  """
  input UpdateLibraryBooksInput {
    "The IDs of the books to ad or remove from the user's library"
    bookIds: [ID!]!

    "The ID of the user whose library should be updated"
    userId: ID!
  }

  """
  Provides data to update a review.
  """
  input UpdateReviewInput {
    "The unique ID of the review a user is updating."
    id: ID!

    "The user's integer-based rating of the book (from 1 to 5)"
    rating: Rating!

    "The text-based content of the review."
    text: String
  }
`;

export default typeDefs;
