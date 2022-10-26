import { useAppState, useActions } from '../overmind/overmind';
import { Button, Input } from "antd";
import { Link } from "react-router-dom";

export const NewCounter = () => {
    const state = useAppState();
    const actions = useActions();
    return <div className="sparse-vertical-children">
      Counter demo<br />
      <Button onClick={() => actions.newcounter.decrement()}>-</Button>
      &nbsp;&nbsp;
      {state.newcounter.counter}
      &nbsp;&nbsp;
      <Button onClick={() => actions.newcounter.increment()}>+</Button>
    </div>
  }