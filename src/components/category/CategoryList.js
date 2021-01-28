import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { categoryListAtom } from "../../store/category";
import CategoryService from '../../services/category';


const CategoryList = () => {

  const [categoryList, setCategoryList] = useAtom(categoryListAtom);
  
  useEffect(() => {
    const _fetch = async () => {
      try {
        let data = await CategoryService.list();
        setCategoryList(data);
      } catch (error) {
        console.log(error, "error");
      }
    };
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onDeleteCategory = (id) => {
    const _del = async () => {
      let result = await CategoryService.delete(id);
      if (result === "deleted") {
        let data = categoryList.filter(category=>category.id!==id);
        setCategoryList(data);
      }
    }
    _del();
  }

  return (
    <div>
      <section className="d-flex align-items-center">
        <h1>Categories</h1>
        <Link to="/category/add/" className="ml-auto">Add Category</Link>
      </section>
      <section>
        <ul className="list-group mt-3">
          {categoryList.map(category =>
            <li key={category.id} className="list-group-item d-flex">
              <div>
                <Link to={`/category/${category.id}/`}>{category.name}</Link>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { onDeleteCategory(category.id) }}
                >
                  Delete
                  </button>
              </div>
            </li>
          )}
        </ul>
      </section>
    </div >
  )
};

export default CategoryList;