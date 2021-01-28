import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./layout/Header";
import BookList from "./book/BookList";
import Book from "./book/Book";
import CategoryList from "./category/CategoryList";
import Category from "./category/Category";
import PublisherList from "./publisher/PublisherList";
import Publisher from "./publisher/Publisher";
import AuthorList from "./author/AuthorList";
import Author from "./author/Author";
// import Alerts from "./layout/Alerts";

const App = () => {
  return (
    <>
        <Header />
        <div className="container mt-5">
          <Switch>
            <Route exact path="/" component={BookList} />
            <Route exact path="/book" component={BookList} />
            <Route exact path="/book/add/" component={Book} />
            <Route path="/book/:id/" component={Book} />
            <Route exact path="/category" component={CategoryList} />
            <Route path="/category/add/" component={Category} />
            <Route path="/category/:id/" component={Category} />
            <Route exact path="/author" component={AuthorList} />
            <Route path="/author/add/" component={Author} />
            <Route path="/author/:id/" component={Author} />
            <Route exact path="/publisher" component={PublisherList} />
            <Route path="/publisher/add/" component={Publisher} />
            <Route path="/publisher/:id/" component={Publisher} />
          </Switch>
        </div>
    </>
  );
}

export default App;