import Request from "./request";

const AuthorService = {
  list: () => {

    let url = "api/author/";
    return Request.get(url);

  },

  get: (authorId) => {

    let url = `api/author/${authorId}/`;
    return Request.get(url);

  },

  save: (author) => {

    if (author.id === 0) {
      const body = JSON.stringify({
        lastName: author.lastName,
        firstName: author.firstName,
      });
      let url = "api/author/";
      return Request.create(url, body);

    } else {

      const body = JSON.stringify(author);
      let url = `api/author/${author.id}/`;
      return Request.update(url, body);

    }

  },

  delete: (authorId) => {

    let url = `api/author/${authorId}/`;
    return Request.delete(url);

  }
}

export default AuthorService;