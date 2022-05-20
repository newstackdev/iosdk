import { Provider } from "overmind-react";
import { overmind } from './overmind/overmind';
import 'antd/dist/antd.css';

import './index.css';
import './App.css';

import { NewCounter } from './Pages/Counter';
import { NLView } from '@newcoin-foundation/iosdk/dist/types';
import { Auth } from '@newcoin-foundation/iosdk/dist/Pages/Auth/Auth';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  Switch
} from "react-router-dom";
import { Explore } from './Pages/Explore';
import { AppLayout } from "./Components/AppLayout";



export const App: NLView = () => {
  return (
    <Provider value={overmind}>
      <Router>
        <AppLayout>
          <Switch>
            <Route key="e" exact path="/explore" component={Explore} />
            <Route key="nc" exact path="/counter" component={NewCounter} />
            <Route key="a" exact path="/auth" component={Auth} />
          </Switch>
        </AppLayout>
      </Router>
    </Provider>
  );
};
export default App;
