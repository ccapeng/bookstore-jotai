import Request from "./request";

const BookService = {
  list: () => {
    let url = "api/book/";
    return Request.get(url);
  },
  get: (bookId) => {
    let url = `api/book/${bookId}/`;
    return Request.get(url);
  },
  save: (book) => {
    if (book.category === 0) {
      book.category = "";
    }
    if (book.publisher === 0) {
      book.publisher = "";
    }
    if (book.author === 0) {
      book.author = "";
    }
    if (book.id === 0) {
      book.id = "";
      const body = JSON.stringify(book);
      let url = "api/book/";
      return Request.create(url, body);
    } else {
      const body = JSON.stringify(book);
      let url = `api/book/${book.id}/`;
      return Request.update(url, body);
    }
  },
  delete: (bookId) => {
    let url = `api/book/${bookId}/`;
    return Request.delete(url);
  }
}

export default BookService;