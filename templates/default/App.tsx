import logo from './logo.svg';
import './App.css';

import "@newcoin-foundation/iosdk/src/App.less";
import './index.css';

import { App as IOApp } from "@newcoin-foundation/iosdk/dist/App";
import { overmind } from './overmind/overmind';

import { Route } from 'react-router-dom';
import { NewCounter } from './Pages/Counter';

export const App = () =>
      <IOApp overmind={overmind}>
        <Route key="pl" exact path="/counter" component={NewCounter} />
      </IOApp>;

export default App;
