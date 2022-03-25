// import React from 'react';
// import logo from './logo.svg';
// import './App.less';
// import history from "./history";
import { PartialConfiguration } from "./config";

import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory} from "react-router-dom";
import { Auth } from './Pages/Auth';
import { DomainPresale } from './Pages/DomainPresale/DomainPresale';
import { NLView } from "./types";
import { UserCreate } from './Pages/User/UserCreate';
import { About } from './Pages/About';
import { Explore } from './Pages/Explore/Explore';
import { Provider } from 'overmind-react';
import { overmind, useActions, useAppState } from './overmind';
import { Post } from './Pages/Post/Post';
import { Mood } from './Pages/Mood/Mood';
import { User } from './Pages/User/User';
import { PostCreate } from './Pages/Post/PostCreate';
import SearchCreative from './Pages/SearchCreative';
import { Product } from './Pages/Store/Product';
import { UserStake } from './Pages/User/UserStake';
import MyMoods from './Pages/Mood/MyMoods';
import { MoodCreate } from './Pages/Mood/MoodCreate';
import { UserUpdate } from './Pages/User/UserUpdate';
import { UserTop } from './Pages/User/Top';
import { UserInvite } from './Pages/User/UserInvite';
import { JoinDao } from './Pages/JoinDao';
import Creators from './Components/Creators';
import TopFolders from './Components/TopFolders';
import { LegacyImport } from './Pages/User/LegacyImport';
import Spotlights from './Components/Spotlights';
import { SearchCreativePost } from './Pages/SearchCreativePost';
import CommunityHistory from "./Pages/NewlifeDao/CommunityHistory"
import { Notifications } from './Pages/Notifications/Notifications';
import { SelectMoodForm } from './Components/SelectMood';
import { Header } from 'antd/lib/layout/layout';
import { Row } from 'antd';
import { TOS } from "./Pages/TOS";
import { Privacy } from './Pages/Privacy';
import { useEffect } from 'react';

// history.js

const View: NLView = (props) => <div {...props}>{props.children}</div>;
const Topics = () => <h3>Topics</h3>;

const Home = () => {
  return <>
    <h3>Welcome to Newlife Web</h3>
    <Link to="/login">Login</Link> to get in
  </>
};


type HostDef = {
  hosts: string[],
  components: {
    Explore: NLView,
    Root: NLView
  }
};

const UnknownHost: HostDef = {
  hosts: [],
  components: {
    Root: () => <>UnknownHost</>,
    Explore: () => <></>
  }
};

const testDomain = window.location.host;

const HostToDomain: HostDef[] = [
  {
    hosts: [
      "newlink.page"
    ],
    components: {
      Root: DomainPresale,
      Explore: UserTop
    }
  },
  {
    hosts: [
      "localhost",
      "www.newlife.io",
      "web.newlife.io",
      "web-dev.newlife.io",
      "share.newlife.io"
    ],
    components: {
      Root: DomainPresale,
      Explore: Explore
    }
  },
  {
    hosts: [
      "unsid.org",
      "web-dev.unsid.org"
    ],
    components: {
      Root: DomainPresale,
      Explore: () => <>
        You are good to go.<br />Use your UNSID to access the apps in the Newcoin ecosystem:
        <br />
        <br />
        <ul>
          <li>
            <a href="https://web.newlife.io">newlife.IO</a>
          </li>
          <li>
            <a href="https://web.newlife.io">newthis.IO</a>
          </li>
          <li>
            <a href="https://web.newlife.io">newthat.OI</a>
          </li>
        </ul>
      </>
    }
  }
];

// const isNewlink = /newlink.page/.test(window.location.host)

const currentHost = window.location.host.replace(/:\d+/, "");
const HostBasedComponents = HostToDomain.find(htd => htd.hosts.find(h => h === currentHost))?.components || UnknownHost.components;

// const DomainBasedExplore = //isNewlink ? UserTop : Explore;

const DEFAULT_ROUTES = [
  <Route key="a" exact path="/auth" component={Auth} />,
  <Route key="h" exact path="/" component={HostBasedComponents.Root} />,
  <Route key="dj" exact path="/dao/join" component={JoinDao} />,
  <Route key="tc" exact path="/top/creators" component={Creators} />,
  <Route key="tf" exact path="/top/folders" component={TopFolders} />,
  <Route key="tp" exact path="/top/posts" component={Creators} />,
  <Route key="np" exact path="/newlink.page" component={UserTop} />,
  <Route key="c" exact path="/user-create" component={UserCreate} />,
  <Route key="u" exact path="/my/profile" component={User} />,
  <Route key="u" exact path="/my/profile/update" component={UserUpdate} />,
  <Route key="d" exact path="/my/profile/notifications" component={Notifications} />,
  // <Route key="d" exact path="/notifications" component={Notifications} />,
  <Route key="e" path="/explore" component={HostBasedComponents.Explore} />,
  <Route key="mm" path="/my/folders" component={MyMoods} />,
  <Route key="t" path="/topics" component={Topics} />,
  <Route key="b" path="/about" component={About} />,
  <Route key="p" path="/post/:id" component={Post} />,
  <Route key="pc" path="/post-create" component={PostCreate} />,
  <Route key="mc" path="/mood-create" component={MoodCreate} />,
  <Route key="sc" exact path="/search-creative" component={SearchCreative} />,
  <Route key="scv" exact path="/search-creative/vote" component={SearchCreativePost} />,
  <Route key="mpo" exact path="/mood/:moodId/:postId" component={Post} />,
  <Route key="mo" exact path="/mood/:moodId" component={Mood} />,
  <Route key="mp" exact path="/folder/:moodId/:postId" component={Post} />,
  <Route key="m" exact path="/folder/:moodId" component={Mood} />,
  <Route key="us" path="/user/stake/:id" component={UserStake} />,
  <Route key="v" exact path="/user/:username" component={User} />,
  <Route key="ui" exact path="/user/invite" component={UserInvite} />,
  <Route key="s" exact path="/payment/subscription" component={Product} />,
  <Route key="ue" exact path="/auth/legacy" component={LegacyImport} />,
  <Route key="sp" exact path="/spotlights" component={Spotlights} />,
  <Route key="sa" exact path="/save-folder" component={SelectMoodForm} />,
  <Route key="sa" exact path="/terms_of_service" component={TOS} />,
  <Route key="sa" exact path="/privacy_policy" component={Privacy} />,
  <Route key="ds" exact path="/newlife-dao" component={CommunityHistory} />

];


/* <Route key="sp" exact path="/dao/proposal/:id" component={DaoProposal} /> */
// const HelloIO: NLView = () => <>Hello IO!</>
// const helloRoute = <Route key="hello" exact path="/hello" component={HelloIO} />;


const AppShell: NLView = ({ children }) => {
  const state = useAppState();
	const history = useHistory();
  const actions = useActions();

	useEffect(() => {
		// setTimeout(() => {
		const cancel = history.listen((location) =>
			actions.routing.onRouteChange({ location: location })
		);
		actions.routing.onRouteChange({ location: window.location });
		actions.routing.setHistory({ history });
		// })
		return cancel;
	}, []);

  return <><Header key="h" className="logo" style={{ padding: 0 }}>
    <Row
      justify="space-around"
      gutter={0}
    >
      <div className="header" style={{ width: "100%", padding: "0 20px" }}>
        <state.config.components.layout.TopMenu />
      </div>
    </Row>
  </Header>
    <div className="App app-layout-wrapper">
      {/* [AUTH]
      <pre>
        state.auth.status: {state.auth.status} <br />
        state.api.auth.user.id: {state.api.auth.user?.id} <br />
        state.api.auth.status: {state.api.auth.status} <br />
        state.api.auth.user.status: {state.api.auth.user?.status} <br />
      </pre> */}
      <state.config.components.layout.Layout>
        {children}
      </state.config.components.layout.Layout>
    </div>
  </>
}

const overmindSampleCustomConfig = {
  components: {
    icons: {
      Logo: () => <>THIS IS THE LOGO DUDE</>
    },
    layout: {
      TopMenu: () => <div>Custom top menu!</div>,
      Layout: () => <div>Custom layout</div>
    }
  }
};

export const App: NLView<{ config?: PartialConfiguration, custom?: any }> = ({ config: cfg, children, custom }) => {
  return (

    <Provider value={overmind(cfg)}>
      <Router>
        <AppShell>
          {DEFAULT_ROUTES}
          <>{children || []}</>
        </AppShell>
        {/* <Header key="h" className="logo" style={{ padding: 0 }}>
          <Row
            justify="space-around"
            gutter={0}
          >
            <div className="header" style={{ width: "100%", padding: "0 20px" }}>
              <TopMenu />
            </div>
          </Row>
        </Header>
        <div className="App app-layout-wrapper">
          <Layout>
            {DEFAULT_ROUTES}
            <>{cfg.children || []}</>
          </Layout>
        </div> */}

      </Router>
    </Provider>
  )
}


export default App;
