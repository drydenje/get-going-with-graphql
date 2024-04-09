import { RESTDataSource } from "@apollo/datasource-rest";
import { GraphQLError } from "graphql";
import parseLinkHeader from "parse-link-header";
import jwt from "jsonwebtoken";
import validator from "validator";
import { hashPassword, verifyPassword } from "../../utils/passwords.mjs";
class JsonServerApi extends RESTDataSource {
  baseURL = process.env.REST_API_BASE_URL;

  async getAuthorById(id) {
    return this.get(`/authors/${id}`).catch(
      (err) => err.message === "404: Not Found" && null
    );
  }

  async getAuthorBooks(authorId) {
    const items = await this.get(`/authors/${authorId}/books`);
    return items.map((item) => item.book);
  }

  async getAuthors({ limit, page, orderBy = "name_asc" }) {
    const queryString = this.parseParams({
      ...(limit && { limit }),
      ...(page && { page }),
      orderBy,
    });
    const authors = await this.get(`/authors${queryString}`);
    const pageInfo = this.parsePageInfo({ limit, page });

    return { results: authors, pageInfo };
  }

  async getBookById(id) {
    return this.get(`/books/${id}`).catch(
      (err) => err.message === "404: Not Found" && null
    );
  }

  async getBookAuthors(bookId) {
    const items = await this.get(`/books/${bookId}/authors`);
    return items.map((item) => item.author);
  }

  async getBooks({ limit, page, orderBy = "title_asc" }) {
    const queryString = this.parseParams({
      ...(limit && { limit }),
      ...(page && { page }),
      orderBy,
    });
    const books = await this.get(`/books${queryString}`);
    const pageInfo = this.parsePageInfo({ limit, page });

    return { results: books, pageInfo };
  }

  async getBookReviews(bookId, { limit, page, orderBy = "createdAt_desc" }) {
    const queryString = this.parseParams({
      ...(limit && { limit }),
      ...(page && { page }),
      bookId,
      orderBy,
    });

    const reviews = await this.get(`/reviews${queryString}`);
    const pageInfo = this.parsePageInfo({ limit, page });

    return { results: reviews, pageInfo };
  }

  async getReviewById(id) {
    return this.get(`/reviews/${id}`).catch(
      (err) => err.message === "404: Not Found" && null
    );
  }

  async getUserById(id) {
    return this.get(`/users/${id}`).catch(
      (err) => err.message === "404: Not Found" && null
    );
  }

  async getUserLibrary(userId, { limit, page, orderBy = "createdAt_desc" }) {
    const queryString = this.parseParams({
      _expand: "book",
      ...(limit && { limit }),
      ...(page && { page }),
      orderBy,
      userId,
    });
    const items = await this.get(`/userBooks${queryString}`);
    const books = items.map((item) => item.book);
    const pageInfo = this.parsePageInfo({ limit, page });

    return { results: books, pageInfo };
  }

  async getUserReviews(userId, { limit, page, orderBy = "createdAt_desc" }) {
    const queryString = this.parseParams({
      ...(limit && { limit }),
      ...(page && { page }),
      orderBy,
      userId,
    });
    const reviews = await this.get(`/reviews${queryString}`);
    const pageInfo = this.parsePageInfo({ limit, page });

    return { results: reviews, pageInfo };
  }

  async getUser(username) {
    const [user] = await this.get(`/users?username=${username}`);
    return user;
  }

  createAuthor(name) {
    return this.post("/authors", { body: { name } });
  }

  async createBook({ authorIds, cover, genre, summary, title }) {
    const book = await this.post("/books", {
      body: {
        ...(cover && { cover }),
        ...(genre && { genre }),
        ...(summary && { summary }),
        title,
      },
    });

    if (authorIds?.length) {
      await Promise.all(
        authorIds.map((authorId) =>
          this.post("/bookAuthors", {
            body: {
              authorId: parseInt(authorId),
              bookId: book.id,
            },
          })
        )
      );
    }

    return book;
  }

  async createReview({ bookId, rating, reviewerId, text }) {
    const existingReview = await this.get(
      `/reviews?bookId=${bookId}&userId=${reviewerId}`
    );

    if (existingReview.length) {
      throw new GraphQLError("Users can only submit one review per book", {
        extensions: {
          code: "FORBIDDEN",
        },
      });
    }

    return await this.post("/reviews", {
      body: {
        rating,
        ...(text && { text }),
        bookId: parseInt(bookId),
        createdAt: new Date().toISOString(),
        userId: parseInt(reviewerId),
      },
    });
  }

  updateReview({ id, rating, text }) {
    return this.patch(`reviews/${id}`, {
      body: {
        rating,
        ...(text && { text }),
      },
    });
  }

  async deleteReview(id) {
    await this.delete(`/reviews/${id}`);
    return id;
  }

  async checkUniqueUserData(email, username) {
    const res = await Promise.all([
      this.get(`/users?email=${email}`),
      this.get(`/users?username=${username}`),
    ]);
    const [existingEmail, existingUsername] = res;

    if (existingEmail.length) {
      throw new GraphQLError("Email is already in use");
    } else if (existingUsername.length) {
      throw new GraphQLError("Username already in use");
    }
  }

  // After the 'unique' directive
  async signUp({ email, name, password, username }) {
    if (!validator.isStrongPassword(password)) {
      throw new GraphQLError(
        "Password must be a minimum of 8 characters in length and contain 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await this.post("/users", {
      body: {
        email,
        name,
        password: passwordHash,
        username,
      },
    });
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      subject: user.id.toString(),
      expiresIn: "1d",
    });

    return { token, viewer: user };
  }

  async addBooksToLibrary({ bookIds, userId }) {
    const response = await Promise.all(
      bookIds.map((bookId) =>
        this.get(`/userBooks/?userId=${userId}&bookId=${bookId}`)
      )
    );
    const existingUserBooks = response.flat();
    const newBookIds = bookIds.filter(
      (bookId) =>
        !existingUserBooks.find((book) => book.id === parseInt(bookId))
    );

    await Promise.all(
      bookIds.map((bookId) =>
        this.post("/userBooks", {
          body: {
            bookId: parseInt(bookId),
            createdAt: new Date().toISOString(),
            userId: parseInt(userId),
          },
        })
      )
    );

    return this.get(`/users/${userId}`);
  }

  async removeBooksFromLibrary({ bookIds, userId }) {
    const response = await Promise.all(
      bookIds.map((bookId) =>
        this.get(`/userBooks/?userId=${userId}&bookId=${bookId}`)
      )
    );
    const existingUserBooks = response.flat();

    await Promise.all(
      existingUserBooks.map(({ id }) => this.delete(`/userBooks/${id}`))
    );

    return this.get(`/users/${userId}`);
  }

  parseParams({ limit, orderBy, page, ...rest }) {
    if (limit && limit > 100) {
      throw new GraphQLError("Maximum of 100 results per page", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    const paginationParams = [];
    paginationParams.push(`_limit=${limit}`, `_page=${page || "1"}`);

    // parse the 'orderBy' argument into a '_sort' argument
    const [sort, order] = orderBy ? orderBy.split("_") : [];

    // handle other parameters collected in 'rest'
    const otherParams = Object.keys(rest).map((key) => `${key}=${rest[key]}`);

    // return the full-assembled query string
    const queryString = [
      ...(sort ? [`_sort=${sort}`] : []),
      ...(order ? [`_order=${order}`] : []),
      ...paginationParams,
      ...otherParams,
    ].join("&");

    return queryString ? `?${queryString}` : "";
  }

  async fetch(path, incomingRequest = {}) {
    const result = await super.fetch(path, incomingRequest);

    if (result.response.ok) {
      this.linkHeader = result.response.headers.get("Link");
      this.totalCountHeader = result.response.headers.get("X-Total-Count");
      return result;
    } else {
      throw await this.errorFromResponse(response);
    }
  }

  async login({ password, username }) {
    const user = await this.getUser(username);

    if (!user) {
      throw new GraphQLError("User with that username does not exist", {
        extensions: {
          code: "USER_LOGIN_DOES_NOT_EXIST",
        },
      });
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      throw new GraphQLError("Username or password is incorrect", {
        extensions: {
          code: "USER_LOGIN_INCORRECT",
        },
      });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      subject: user.id.toString(),
      expiresIn: "1d",
    });

    return { token, viewer: user };
  }

  parsePageInfo({ limit, page }) {
    if (this.totalCountHeader) {
      let hasNextPage, hasPrevPage;
      if (this.linkHeader) {
        const { next, prev } = parseLinkHeader(this.linkHeader);
        hasNextPage = !!next;
        hasPrevPage = !!prev;
      }
      return {
        hasNextPage: hasNextPage || false,
        hasPrevPage: hasPrevPage || false,
        page: page || 1,
        perPage: limit,
        totalCount: this.totalCountHeader,
      };
    }
    return null;
  }

  async searchPeople({ exact, query, orderBy = "RESULT_ASC" }) {
    const queryString = this.parseParams({
      ...(exact ? { name: query } : { q: query }),
      limit: 50,
    });
    const authors = await this.get(`/authors${queryString}`);
    const users = await this.get(`/users${queryString}`);
    const results = []
      .concat(authors, users)
      .sort((a, b) =>
        orderBy === "RESULT_ASC"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );

    return results;
  }

  async searchBooks({ exact, query, orderBy = "RESULT_ASC" }) {
    const bookQueryString = this.parseParams({
      ...(exact ? { title: query } : { q: query }),
      limit: 50,
    });
    const authorQueryString = this.parseParams({
      ...(exact ? { name: query } : { q: query }),
      limit: 50,
    });

    const authors = await this.get(`/authors${authorQueryString}`);
    const books = await this.get(`/books${bookQueryString}`);
    const results = [].concat(authors, books).sort((a, b) => {
      const aKey = a.hasOwnProperty("title") ? "title" : "name";
      const bKey = b.hasOwnProperty("title") ? "title" : "name";

      return orderBy === "RESULT_ASC"
        ? a[aKey].localeCompare(b[bKey])
        : b[bKey].localeCompare(a[aKey]);
    });

    return results;
  }
}

export default JsonServerApi;
