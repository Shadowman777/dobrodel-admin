import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import AuthRoute from './components/AuthRoute'

import routes from './routes'

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" component={routes.Dashboard} exact />
        <PrivateRoute path="/units" component={routes.Units} exact />
        <PrivateRoute path="/categories" component={routes.Categories} exact />
        <PrivateRoute path="/users" component={routes.Users} exact />
        <PrivateRoute path="/products" component={routes.Products} exact />
        <PrivateRoute path="/stock" component={routes.Stock} exact />
        <AuthRoute path="/auth" component={routes.Auth} exact />
        <PrivateRoute path="/points" component={routes.Points} exact />
        <PrivateRoute path="/reports" component={routes.Reports} exact />
        <PrivateRoute path="/orders" component={routes.Orders} exact />
        <PrivateRoute path="/orders/:id" component={routes.OrderDetail} exact />
        <PrivateRoute path="/promocodes" component={routes.Promocodes} exact />
        <PrivateRoute path="/news" component={routes.News} exact />
        <PrivateRoute path="/purchase" component={routes.Purchase} exact />
        <PrivateRoute
          path="/purchase/:id"
          component={routes.PurchaseDetail}
          exact
        />
        <PrivateRoute
          path="/purchase/:idPurchase/:idOrder"
          component={routes.PurchaseOrder}
          exact
        />
        <Route path="/driver/order" component={routes.DriverOrder} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
