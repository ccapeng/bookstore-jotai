import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import PublisherService from '../../services/publisher';
import { useAtom } from "jotai";
import { publisherListAtom } from "../../store/publisher";

const PublisherList = () => {

  const [publisherList, setPublisherList] = useAtom(publisherListAtom);
  useEffect(() => {
    const _fetch = async () => {
      let data = await PublisherService.list();
      setPublisherList(data);
    }
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onDeletePublisher = (id) => {
    const _del = async () => {
      let result = await PublisherService.delete(id);
      if (result === "deleted") {
        let data = publisherList.filter(publisher=>publisher.id!==id);
        setPublisherList(data);
      }
    }
    _del();
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Publishers</h1>
        <Link to="/publisher/add/" className="ml-auto">Add Publisher</Link>
      </section>
      <ul className="list-group mt-5">
        {publisherList.map(publisher =>
          <li key={publisher.id} className="list-group-item d-flex">
            <Link to={`/publisher/${publisher.id}/`}>
              {publisher.name}
            </Link>
            <button
              className="btn btn-secondary ml-auto"
              onClick={() => onDeletePublisher(publisher.id)}
            >
              Delete
            </button>
          </li>
        )}
      </ul>
    </>
  )
};

export default PublisherList;