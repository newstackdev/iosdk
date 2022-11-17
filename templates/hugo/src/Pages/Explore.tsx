import { Link } from "react-router-dom";
import { Modal } from "antd";

export const Explore = () => <div>
    <div>Explore top content or features from here</div>
    <ul>
        <li>
            <Link to="home">Home</Link>
        </li>
        <li>
            <Link to="counter">Counter</Link>
        </li>
    </ul>
</div>



