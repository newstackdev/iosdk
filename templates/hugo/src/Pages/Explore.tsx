import { Link } from "react-router-dom";
import { Modal } from "antd";

export const Explore = () => <div>
    <h2>Explore top content or features from here</h2>
    <ul>
        <li>
            <Link to="home">Home</Link>
        </li>
        <li>
            <Link to="counter">Counter</Link>
        </li>
    </ul>
</div>



