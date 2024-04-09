import { rule, shield } from "graphql-shield";

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const permissions = shield(
  {
    Query: {
      searchPeople: isAuthenticated,
      user: isAuthenticated,
    },
  },
  { debug: process.env.NODE_ENV === "development" }
);

export default permissions;
