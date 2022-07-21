import { useActions, useAppState } from "../overmind/overmind";
import { NLView } from "@newcoin-foundation/iosdk/dist/types";
import { Layout, Row, Col, Button, Menu } from "antd";
import { Link } from "react-router-dom";
import { useOvermindRouting } from "../hooks/useOvermindRouting";

const { Header, Footer, Sider, Content } = Layout;


export const AppLayout: NLView = ({ children }) => {
  const state = useAppState();
  const actions = useActions();
  const user = state.api.auth.user?.username || state.firebase.user?.phoneNumber;
  useOvermindRouting();
  
  return <Layout>
    <Header>
      <Row>
        <Col span={3}>IOSDK</Col>
        <Col span={18}>{state.newcounter.counter}</Col>
        <Col span={3}>
          {
            user ?
              <>
                {user}&nbsp;
                <Button onClick={() => actions.auth.logout()}>Sign out</Button>
              </> :
              <Link to="/auth">Sign In</Link>
          }
        </Col>
      </Row>
    </Header>
    <Layout>
      <Sider>
        <Menu>
          <Menu.Item>
            <Link to="/counter">Counter</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/explore">Explore</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content className="main-content">{children}</Content>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
}