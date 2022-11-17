import { useAppState, useActions } from '../overmind/overmind';
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

export const NewCounter = () => {
  const state = useAppState();
  const actions = useActions();
  return <div>
    <h2 className='text-center'>Counter demo</h2>
    <br />
    <br />
    <br />
    <br />
    <Row className="sparse-vertical-children text-center full-width-focused">
      <Col span={6}>
        <Button onClick={() => actions.newcounter.decrement()}>-</Button>
      </Col>
      <Col span={12} className="text-huge">
        {state.newcounter.counter}
      </Col>
      <Col span={6}>
        <Button onClick={() => actions.newcounter.increment()}>+</Button>
      </Col>
    </Row>
  </div>
}