import { ForbiddenError } from "apollo-server";
import { RESTDataSource } from "@apollo/datasource-rest";

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

  async createBook({ authorIds, cover, summary, title }) {
    const book = await this.post("/books", {
      body: {
        ...(cover && { cover }),
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
}

export default JsonServerApi;
