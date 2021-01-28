import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useAtom } from "jotai";
import { authorAtom, initialAuthorState } from "../../store/author";
import AuthorService from '../../services/author';

const Author = props => {

  const [author, setAuthor] = useAtom(authorAtom);

  useEffect(() => {
    const _fetch = async () => {
      let authorId = props.match.params.id;
      if (typeof (authorId) !== "undefined") {
        let data = await AuthorService.get(authorId);
        setAuthor({...author, ...data});
      } else {
        setAuthor(initialAuthorState);
      }
    };
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onChangeAuthor = (key, value) => {
    setAuthor({...author, [key]:value});
  }

  const save = () => {
    const _save = async () => {
      try {
        let result = await AuthorService.save(author);
        setAuthor({ ...result, status:"saved"});
      } catch (error) {
        console.log("save error", error);
      }
    }
    if (author.status === "") {
      setAuthor({ ...author, status:"submitting"});
      _save();
    }
  }

  if (author.status === "saved") {
    return (<Redirect to="/author" />);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Author Editor</h1>
        <Link to="/author" className="ml-auto">Author List</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              onChange={(event) => { onChangeAuthor(event.target.name, event.target.value) }}
              value={author.lastName}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              onChange={(event) => { onChangeAuthor(event.target.name, event.target.value) }}
              value={author.firstName}
            />
          </div>
          <div className="form-group">
            <input type="hidden" name="authorId" value={author.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Author;