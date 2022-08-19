import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import OrderScreen from "./pages/OrderScreen";
import NotFound from "./pages/NotFound";
import PrivateRouter from "./PrivateRouter";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search/:keyword" component={Home} />
        <Route exact path="/page/:pagenumber" component={Home} />
        <Route
          exact
          path="/search/:keyword/page/:pageNumber"
          component={Home}
        />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/profile" component={Profile} />
        <Route path="/cart/:id?" component={Cart} />
        <PrivateRouter path="/shipping" component={Shipping} />
        <PrivateRouter path="/payment" component={Payment} />
        <PrivateRouter path="/placeorder" component={PlaceOrder} />
        <PrivateRouter path="/order/:id" component={OrderScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
