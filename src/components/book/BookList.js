import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import { useAtom } from "jotai";
import { bookListAtom } from "../../store/book";
import BookService from '../../services/book';

const BookList = () => {

  const [bookList, setBookList] = useAtom(bookListAtom);

  useEffect(() => {
    const _fetch = async () => {
      let data = await BookService.list();
      setBookList(data);
    }
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onDeleteBook = (id) => {
    const _del = async () => {
      let result = await BookService.delete(id);
      if (result === "deleted") {
        let data = bookList.filter(book=>book.id!==id);
        setBookList(data);
      }
    }
    _del();
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Books</h1>
        <Link to="/book/add/" className="ml-auto">Add Book</Link>
      </section>
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>Book</th>
            <th>Category</th>
            <th>Publisher</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookList.map(book =>
            <tr key={book.id}>
              <td>
                <Link to={`/book/${book.id}/`}>{book.title}</Link>
              </td>
              <td>
                {book.categoryName}
              </td>
              <td>
                {book.publisherName}
              </td>
              <td>
                {book.authorFirstName} {book.authorLastName}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { onDeleteBook(book.id) }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
};

export default BookList;