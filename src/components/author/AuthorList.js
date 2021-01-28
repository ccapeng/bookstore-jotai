import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import AuthorService from '../../services/author';
import { useAtom } from "jotai";
import { authorListAtom } from "../../store/author";


const Author = () => {

  const [authorList, setAuthorList] = useAtom(authorListAtom);

  useEffect(() => {
    const _fetch = async () => {
      let data = await AuthorService.list();
      setAuthorList(data);
    }
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onDeleteAuthor = (id) => {
    const _del = async () => {
      let result = await AuthorService.delete(id);
      if (result === "deleted") {
        let data = authorList.filter(author=>author.id!==id);
        setAuthorList(data);
      }
    }
    _del();
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Author List</h1>
        <Link to="/author/add/" className="ml-auto">Add Author</Link>
      </section>
      <ul className="list-group mt-5">
        {authorList.map(author =>
          <li key={author.id} className="list-group-item d-flex">
            <div>
              <Link to={`/author/${author.id}/`}>{author.lastName}, {author.firstName}</Link>
            </div>
            <button
              className="btn btn-secondary ml-auto"
              onClick={() => onDeleteAuthor(author.id)}
            >
              Delete
              </button>
          </li>
        )}
      </ul>
    </>
  )

};

export default Author;