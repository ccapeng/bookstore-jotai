import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useAtom } from "jotai";
import { initialPublisherState, publisherAtom } from "../../store/publisher";
import PublisherService from '../../services/publisher';

const Publisher = props => {

  const [publisher, setPublisher] = useAtom(publisherAtom);

  useEffect(() => {
    const _fetch = async () => {
      let data = await PublisherService.get(publisherId);
      setPublisher({...publisher, ...data});
    }
    let publisherId = props.match.params.id;
    if (typeof (publisherId) !== "undefined") {
      _fetch()
    } else {
      setPublisher(initialPublisherState);
    }
    // eslint-disable-next-line
  }, []);

  const onChangeName = (value) => {
    setPublisher({...publisher, name:value})
  }

  const save = () => {
    const _save = async () => {
      let result = await PublisherService.save(publisher);
      setPublisher({...result, status:"saved"});
    }
    if (publisher.status === "") {
      setPublisher({...publisher, status:"submitting"});
      _save();
    }
  }

  if (publisher.status === "saved") {
    return (<Redirect to="/publisher"></Redirect>);
  }

  return (
    <>
      <section className="d-flex adjust-items-center">
        <h1>Publisher Editor</h1>
        <Link to="/publisher" className="ml-auto">Publishers</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Publisher Name</label>
            <input
              type="text"
              name="publisher"
              className="form-control"
              onChange={(event) => { onChangeName(event.target.value) }}
              value={publisher.name}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input type="hidden" name="publisherId" value={publisher.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )

};

export default Publisher;