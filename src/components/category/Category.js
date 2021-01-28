import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";

import { useAtom } from "jotai";
import { categoryAtom, initialCategoryState } from "../../store/category";
import CategoryService from '../../services/category';

const Category = props => {

  const [category, setCategory] = useAtom(categoryAtom);

  useEffect(() => {
    const _fetch = async () => {
      let categoryId = props.match.params.id;
      console.log("categoryId", categoryId);
      if (typeof (categoryId) !== "undefined") {
        try {
          let data = await CategoryService.get(categoryId);
          setCategory({...category, ...data});
        } catch (error) {
          console.log(error);
        }
      } else {
        setCategory(initialCategoryState);
      }
    }
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onChangeName = (value) => {
    setCategory({...category, name:value})
  }

  const save = () => {
    const _save = async () => {
      let result = await CategoryService.save(category);
      setCategory({...result, status:"saved"});
    }
    if (category.status === "") {
      setCategory({...category, status:"submitting"});
      _save();
    }
  }

  if (category.status === "saved") {
    return (<Redirect to="/category" />);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Category Editor</h1>
        <Link to="/category" className="ml-auto">Categories</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="category"
              className="form-control"
              onChange={(event) => { onChangeName(event.target.value) }}
              value={category.name}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input type="hidden" name="categoryId" value={category.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Category;