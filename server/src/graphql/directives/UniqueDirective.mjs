import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";

// this was used by graphql-tools
// it was removed a few versions ago
// the documentation isn't great, and it will crash so i can't inspect running code

// import { SchemaDirectiveVisitor, UserInputError } from "@apollo/server";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";

import fetch from "node-fetch";

const baseUrl = process.eng.REST_API_BASE_URL;

function uniqueDirective(directiveName: )

// class UniqueDirective extends SchemaDirectiveVisitor {
//   getMutations(predicate = null) {
//     if (!this._mutations) {
//       this._mutations = Object.values(
//         this.schema.getMutationType().getFields()
//       );
//     }

//     if (!predicate) {
//       return this._mutations || [];
//     }

//     return this._mutations.filter(predicate);
//   }

//   getMutationArgumentValue(fieldName, args) {
//     const argTuples = Object.entries(args);

//     for (let i = 0; i < argTuples.length; i++) {
//       const [key, value] = argTuples[i];

//       if (value !== null && typeof value === "object") {
//         return this.getMutationArgumentValue(fieldName, value);
//       } else if (key === fieldName) {
//         return value;
//       }
//     }

//     return null;
//   }

//   visitInputFieldDefinition(field, { objectType }) {
//     // field validation
//     const { path, key } = this.args;
//     const fieldName = key ? key : field.name;

//     const mutationsForInput = this.getMutations(({ args = [] }) => {
//       return args.find((arg) => arg?.type?.ofType === objectType);
//     });

//     mutationsForInput.forEach((mutation) => {
//       const { resolve = defaultFieldResolver } = mutation;

//       mutation.resolve = async (...args) => {
//         const uniqueValue = this.getMutationArgumentValue(fieldName, args[1]);

//         if (uniqueValue) {
//           const response = await fetch(
//             `${baseUrl}/${path}?${fieldName}=${uniqueValue}`
//           );
//           const results = await response.json();
//           if (results.length) {
//             throw new UserInputError(
//               `Value for ${fieldName} is already in use`
//             );
//           }
//         }

//         return await resolve.apply(this, args);
//       };
//     });
//   }
// }

export default UniqueDirective;
