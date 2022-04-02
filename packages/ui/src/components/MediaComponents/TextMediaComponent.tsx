import { ContentElement } from "./types";

export const TextMediaComponent: ContentElement = ({ content, thumbnail }) => {
    return <div style={thumbnail ? { paddingTop: 50 } : { fontSize: "min(10vh,10vw)", lineHeight: "1em" }} >
        {content}
    </div> 
}