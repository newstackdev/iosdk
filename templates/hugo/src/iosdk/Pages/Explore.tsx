import { Link } from "react-router-dom";
import { Modal } from "antd";

export const Explore = () => <div>
    <h1>Explore top content and features from here</h1>
    <ul>
        <li>
            <Link to="home">Home</Link>
        </li>
        <li>
            <Link to="counter">Counter</Link>
        </li>
    </ul>
</div>



