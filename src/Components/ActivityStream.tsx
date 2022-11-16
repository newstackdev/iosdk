import { Avatar, List } from "antd";
import { Link } from "react-router-dom";
import { NLView } from "../types";
import { json } from "overmind";
import { useAppState } from "../overmind";
import Logo from "./Icons/Logo";

export const ActivityStream: NLView<{ limit?: number }> = (props) => {
  const state = useAppState();
  const _src = json(state.websockets.messages.activityStream);
  const src = props.limit ? _src.slice(0, props.limit) : _src;

  return (
    <List
      header="Activity Stream"
      style={{
        minWidth: 300,
        background: "black",
        padding: 9,
        position: "relative",
      }}
      itemLayout="horizontal"
      dataSource={src}
      className="app-main-full-width"
      renderItem={(item) => {
        return (
          <List.Item>
            <List.Item.Meta
              avatar={
                <span style={{ fontSize: 42 }}>
                  <Logo />
                </span>
                // <Avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKzSURBVHgBzVjtbdswED0b/R91A3aCaINqg3gDZwNnA2uDpBMonSDdQOoETiaQPIHUCa530B1wpkiKAlogDzhIFu/j8Vk80gb4BNhtcUZER5cHsoqsJHNmeCJ7J/sg+7Xb7Tr4l6DiFVmL29CTnYV4EruV4o4uDcwzt+hgnnFP9keese89LBUayGpS5idsBRE4kI3ezE5kRUYsK/fqKfMMW0ABRxPMRJ4ifich9xaSnZ/JuOKSMwlVwM6+zPBjtImcLzl+lvmYIyGr45G4JHzL3LzgSadoQhIGCNeRnCfPT1GFnB9tQo8Q3x8jROpQQlwuayZiX/YWEir08rnA5RveizJVQp0TLnsKx5XiUwfVkKSKY0ChHsMYZSw1XlvCMjlVo7GFXqwKIQiZC+ajw8hyNPWYTPFFnn+X60eMBHU8/mp4f3iTR9w7vhqXQexEdiCbKGaKpOvEj0mWSqI0gyk4Q+pHyIGIHuT2PpGnM/flHm873TukofJOCZ/J811AFFI/t4dtcF6hFNbas+a420riv8AncbfiP8h1fRNaV0tzXPf0/Qwm4BvkJS4wvhvq8yEyDhKrfhdVQl/IB0hjMPcu4qOrIqVEZe6vukR/ywDvdkVifdvVw+35aj6PMPcZXe7RngNzH2EMVGvOiXPPV9ShKJxbe4P5eI7ksbUaf7C1rdQbe4wU0r1jjIzzmL8X2U3RhWYanAXOm44Ws0kqz4dz6JHPJ+MwpYJJZI9hh4CMBd7ugqkjXYXLM0lvScUCC+PIhWLny/CZYN1XcYSVIOcReYqQXVVDfEtPkRpygMujeuPL580wRvTsKVDDFgSIKJnKFLGKORN3xtsVE/3tkksm9J1y0hZvz5I9hpdqixm/R3NVecX4WTJGssrJv+mvASFUwdzieY+wTY1bPbfxji3R+hf4C0R8uaJoGdXoAAAAAElFTkSuQmCC" />
              }
              title={
                <Link to={item.link} className="paragraph-1r">
                  {item.title}
                </Link>
              }
              description={item.description}
              //  + " " + JSON.stringify(item.original)}
              style={{ maxWidth: props.limit ? 300 : "100%" }}
            />
          </List.Item>
        );
      }}
    />
  );
};
