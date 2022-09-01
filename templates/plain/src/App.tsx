import { Provider } from "overmind-react";
import { overmind } from './overmind/overmind';
import 'antd/dist/antd.css';

import './index.css';
import './App.css';

import { NewCounter } from './Pages/Counter';
import { NLView } from '@newstackdev/iosdk/dist/types';
import { Auth } from '@newstackdev/iosdk/dist/Pages/Auth/Auth';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  Switch
} from "react-router-dom";
import { Explore } from './Pages/Explore';
import { AppLayout } from "./Components/AppLayout";
import { Home } from "./Pages/Home";
import { SignOut } from "./Pages/SignOut";


const om = overmind();


export const App: NLView = () => {
  return (
    <Provider value={om}>
      <Router>
        <AppLayout>
        <Switch>
            <Route key="h" exact path="/home" component={Home} />
            <Route key="e" exact path="/explore" component={Explore} />
            <Route key="nc" exact path="/counter" component={NewCounter} />
            <Route key="a" exact path="/signout" component={SignOut} />
          </Switch>
        </AppLayout>
      </Router>
    </Provider>
  );
};
export default App;
