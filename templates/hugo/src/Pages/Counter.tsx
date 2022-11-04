import { useAppState, useActions } from '../overmind/overmind';
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

export const NewCounter = () => {
  const state = useAppState();
  const actions = useActions();
  return <>
    <h1>Counter demo</h1><br />
    <Row className="sparse-vertical-children" align='middle'>
      <Col span={4}>
        <Button onClick={() => actions.newcounter.decrement()} className="ant-col">-</Button>
      </Col>
      <Col span={4}>
        <div className='text-center text-huge'>{state.newcounter.counter}</div>
      </Col>
      &nbsp;&nbsp;
      <Col span={4}>
        <Button onClick={() => actions.newcounter.increment()} className="ant-col">+</Button>
      </Col>
    </Row>
  </>
}