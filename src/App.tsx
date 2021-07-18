import "./styles/App.sass";
import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./routes";


const App: FC = () => {

  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={() => (
                  <route.component />
                )}
              />
            )
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
