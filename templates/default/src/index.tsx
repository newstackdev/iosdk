import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { App } from "@newcoin-foundation/iosdk";
import reportWebVitals from './reportWebVitals';

// import "antd/dist/antd.dark.less";

import "@newcoin-foundation/iosdk/src/App.less";
import { Link, Route } from 'react-router-dom';
// import Logo from './Icons/LogoIcon';
import { Button } from "antd";
import { useActions, useAppState } from '@newcoin-foundation/iosdk/dist/overmind';
import { firebaseConfig } from '@newcoin-foundation/iosdk/src/config';
import { NLView } from '@newcoin-foundation/iosdk/dist/types';

const HelloIO: NLView = () => {
  const actions = useActions();
  const state = useAppState();

  return <>
    Hello {state.api.auth.user?.username}!
    <div>
      <Button onClick={ () => {
        //@ts-ignore
        actions.app.test()
        //@ts-ignore
      }}>Count: {state.app.counter}</Button>
      <Button
        onClick={() => actions.routing.historyPush({ location: "/goodbye" })}>Goodbye button</Button>
    </div>
  </>
}

const GoodbyeIO: NLView = () => <>
  Goodbye IO!
  <div>
    <Link to="/hello">Hello</Link>
  </div>
</>

// Customize here
const config = {};
// const config = {
//   settings: {
//     firebaseConfig: {
//       apiKey: "AIzaxxxxxxxxx-xxxxxxxxx",
//       appId: "1:1239192837:web:123faed323423d",
//       authDomain: "xxx-project.firebaseapp.com"
//     }
//   },
//   components:
//   {
//     layout:
//     {
//       TopMenu: () => <>Overrides top menu</>,
//       Layout: // override layout completely
//         (({ children }) => <>{children}</>) as NLView
//     }
//   }
// };


ReactDOM.render(
  <React.StrictMode>
    <App config={config}>
      <Route key="hello" exact path="/hello" component={HelloIO} />
      <Route key="goodbye" exact path="/goodbye" component={GoodbyeIO} />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
