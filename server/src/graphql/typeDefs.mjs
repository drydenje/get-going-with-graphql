import gql from "graphql-tag";

const typeDefs = gql`
  type Author {
    id: ID!
    books: [Book]
    name: String!
  }

  type Book {
    id: ID!
    authors: [Author]
    cover: String
    reviews: [Review]
    summary: String
    title: String!
  }

  type Review {
    id: ID!
    book: Book
    rating: Int!
    reviewedOn: String!
    reviewer: User!
    text: String
  }

  type User {
    id: ID!
    email: String!
    library: [Book]
    name: String!
    reviews: [Review]
    username: String!
  }

  type Query {
    author(id: ID!): Author
    authors: [Author]
    book(id: ID!): Book
    books: [Book]
    review(id: ID!): Review
    user(username: String!): User
  }

  type Mutation {
    createAuthor(name: String!): Author!
    createBook(input: CreateBookInput!): Book!
    createReview(input: CreateReviewInput!): Review!
  }

  input CreateBookInput {
    authorIds: [ID]
    cover: String
    summary: String
    title: String!
  }

  input CreateReviewInput {
    bookId: ID!
    rating: Int!
    reviewerId: ID!
    text: String
  }
`;

export default typeDefs;
