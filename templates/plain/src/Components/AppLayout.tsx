import { useActions, useAppState } from "../overmind/overmind";
import { NLView } from "@newstackdev/iosdk/dist/types";
import { NewsafeAuth } from "@newstackdev/iosdk/dist/Components/NewsafeAuth";

import { Layout, Row, Col, Spin, Menu } from "antd";
import { Link } from "react-router-dom";
import { useOvermindRouting } from "../hooks/useOvermindRouting";

const { Header, Footer, Sider, Content } = Layout;


export const AppLayout: NLView = ({ children }) => {
  const state = useAppState();
  const actions = useActions();
  useOvermindRouting();

  const loggedIn = state.api.auth.user?.username;

  return <Layout>
    <Header>
      <Row>
        <Col span={3}>{state.config.settings.app.name}</Col>
        <Col span={18}></Col>
        <Col span={3}>
          {loggedIn || "not authenticated"}
        </Col>
      </Row>
    </Header>
    <Layout>
      <Sider>
        <Menu>
          <Menu.Item>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/explore">Explore</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/counter">Counter</Link>
          </Menu.Item>
          {loggedIn && <Menu.Item>
            <Link to="/signout">Sign Out</Link>
          </Menu.Item>}
        </Menu>
      </Sider>
      <Content className="main-content">
        {
          state.indicators.specific["newgraphApplication.authWithUnsid"]
            ?
            <Spin /> :
            loggedIn ?
              children :
              <NewsafeAuth />
        }
      </Content>
    </Layout>
    <Footer>This application is based on <a href="https://github.com/newstackdev/iosdk" target="_blank">iosdk</a>.</Footer>
  </Layout>
}