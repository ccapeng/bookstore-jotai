import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useAtom } from "jotai";
import { bookAtom, initialBookState } from "../../store/book";
import { categoryListAtom } from "../../store/category";
import { publisherListAtom } from "../../store/publisher";
import { authorListAtom } from "../../store/author";
import BookService from '../../services/book';
import CategoryService from '../../services/category';
import PublisherService from '../../services/publisher';
import AuthorService from '../../services/author';

const Book = props => {

  const [book, setBook] = useAtom(bookAtom);
  const [categoryList, setCategoryList] = useAtom(categoryListAtom);
  const [publisherList, setPublisherList] = useAtom(publisherListAtom);
  const [authorList, setAuthorList] = useAtom(authorListAtom);

  useEffect(() => {
    const _fetch = async () => {
      let data = await BookService.get(bookId);
      setBook({...book, ...data});
    }
    let bookId = props.match.params.id;
    if (typeof (bookId) !== "undefined") {
      _fetch();
    } else {
      setBook(initialBookState);
    }
    // eslint-disable-next-line
  }, []);

  const onChangeBook = (key, value) => {
    setBook({...book, [key]:value});
  }

  const save = () => {
    const _save = async () => {
      try {
        let result = await BookService.save(book);
        setBook({ ...result, status:"saved"});
      } catch (error) {
        console.log("save error", error);
      }
    }
    if (book.status === "") {
      setBook({ ...book, status:"submitting"});
      _save();
    }
  }

  useEffect(() => {
    const _fetch = async () => {
      let data = await CategoryService.list();
      setCategoryList(data);
    }
    _fetch()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const _fetch = async () => {
      let data = await PublisherService.list();
      setPublisherList(data);
    }
    _fetch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const _fetch = async () => {
      let data = await AuthorService.list();
      setAuthorList(data);
    }
    _fetch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => { //unmount
    return () => { setBook(initialBookState); }
    // eslint-disable-next-line
  }, []);

  if (book.status === "saved") {
    return (<Redirect to="/book" />);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Book Editor</h1>
        <Link to="/book/" className="ml-auto">Books</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              onChange={event => onChangeBook(event.target.name, event.target.value)}
              value={book.title}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              onChange={event => onChangeBook(event.target.name, event.target.value)}
              value={book.category}
            >
              <option value="0"> --- </option>
              {categoryList.map(category =>
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Publisher</label>
            <select
              name="publisher"
              className="form-control"
              onChange={event => onChangeBook(event.target.name, event.target.value)}
              value={book.publisher}
            >
              <option value="0"> --- </option>
              {publisherList.map(publisher =>
                <option value={publisher.id} key={publisher.id}>
                  {publisher.name}
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label>Author</label>
            <select
              name="author"
              className="form-control"
              value={book.author}
              onChange={event => onChangeBook(event.target.name, event.target.value)}
            >
              <option value="0"> --- </option>
              {authorList.map(author =>
                <option value={author.id} key={author.id}>
                  {author.lastName}, {author.firstName}
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <input type="hidden" name="bookId" value={book.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Book;