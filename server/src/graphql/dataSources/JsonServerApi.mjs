import { RESTDataSource } from "@apollo/datasource-rest";
import { GraphQLError } from "graphql";

class JsonServerApi extends RESTDataSource {
  baseURL = process.env.REST_API_BASE_URL;

  getAuthorById(id) {
    return this.get(`/authors/${id}`).catch(
      (err) => err.message === "404: Not Found" && null
    );
  }

  async getAuthorBooks(authorId) {
    const items = await this.get(`/authors/${authorId}/books`);
    return items.map((item) => item.book);
  }

  getAuthors() {
    return this.get(`/authors`);
  }

  getBookById(id) {
    return this.get(`/books/${id}`).catch(
      (err) => err.message === "404: Not Found" && null
    );
  }

  async getBookAuthors(bookId) {
    const items = await this.get(`/books/${bookId}/authors`);
    return items.map((item) => item.author);
  }

  getBooks() {
    return this.get(`/books`);
  }

  getBookReviews(bookId) {
    return this.get(`/reviews?bookId=${bookId}`);
  }

  getReviewById(id) {
    return this.get(`/reviews/${id}`).catch(
      (err) => err.message === "404: Not Found" && null
    );
  }

  getUserById(id) {
    return this.get(`/users/${id}`).catch(
      (err) => err.message === "404: Not Found" && null
    );
  }

  async getUserLibrary(userId) {
    const items = await this.get(`/users/${userId}/books`);
    return items.map((item) => item.book);
  }

  getUserReviews(userId) {
    return this.get(`/reviews?userId=${userId}`);
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

  async signUp({ email, name, username }) {
    await this.checkUniqueUserData(email, username);
    return this.post("/users", {
      body: {
        email,
        name,
        username,
      },
    });
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

  // parseParams({ limit, orderBy, page, ...rest }) {
  //   if (limit && limit > 100) {
  //     throw new GraphQLError("Maximum of 100 results per page", {
  //       extensions: {
  //         code: "BAD_USER_INPUT",
  //       },
  //     });
  //   }

  // const paginationParams = [];
  // paginationParams.push(`_limit=${limit}`, `_page=${page || "1"}`);

  // // parse the 'orderBy' argument into a '_sort' argument
  // const [sort, order] = orderBy ? orderBy.split("_") : [];

  // // handle other parameters collected in 'rest'
  // const otherParams = Object.keys(rest).map((key) => `${key}=${rest[key]}`);

  // // return the full-assembled query string
  // const queryString = [
  //   ...(sort ? [`_sort=${sort}`] : []),
  //   ...(order ? [`_order=${order}`] : []),
  //   ...paginationParams,
  //   ...otherParams,
  // ].join("&");

  // console.log("QS:", queryString);

  // return queryString ? `?${queryString}` : "";
  // }
}

export default JsonServerApi;
