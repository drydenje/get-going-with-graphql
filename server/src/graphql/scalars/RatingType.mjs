import { GraphQLScalarType, GraphQLError, Kind } from "graphql";

const isValidRating = (value) => {
  return Number.isInteger(value) && value >= 1 && value <= 5;
};

const RatingType = new GraphQLScalarType({
  name: "Rating",
  description: "An integer representing a user rating from 1 and 5, inclusive.",
  parseValue: (value) => {
    if (isValidRating(value)) {
      return value;
    }
    throw new GraphQLError("Rating must be an integer from 1 to 5", {
      extensions: { code: "BAD_USER_INPUT", argumentName: "rating" },
    });
  },
  serialize: (value) => {
    if (isValidRating(parseInt(value))) {
      return value;
    }
    throw new GraphQLError("Rating must be an integer from 1 to 5", {
      extensions: { code: "BAD_USER_INPUT", argumentName: "rating" },
    });
  },
  parseLiteral: (ast) => {
    const intValue = parseInt(ast.value);
    if (ast.kind === Kind.INT && isValidRating(intValue)) {
      return intValue;
    }
    throw new GraphQLError("Rating must be an integer from 1 to 5", {
      extensions: { code: "BAD_USER_INPUT", argumentName: "rating" },
    });
  },
});

export default RatingType;
