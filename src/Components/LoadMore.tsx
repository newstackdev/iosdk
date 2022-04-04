import { Spin } from "../Components/Spin";
import { useEffect } from "react";
import useVisibility from "../hooks/useVisibility";
import { NLView } from "../types";

export const LoadMore : NLView<{ loadMore: () => void }> = ({ loadMore }) => {
    const [isVisible, currentElement] = useVisibility<HTMLDivElement>(200);
	useEffect(() => {
		isVisible && loadMore && loadMore();
	}, [isVisible]);

    return <div ref={currentElement}><Spin /></div>
}