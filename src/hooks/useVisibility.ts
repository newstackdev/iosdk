import { MutableRefObject, useState, useRef, useEffect } from "react"

/**
 * Check if an element is in viewport
 * @param {number} offset - Number of pixels up to the observable element from the top
 */
export default function useVisibility<T extends HTMLElement>(
  offset = 0,
): [boolean, React.RefObject<T>] {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const currentElement = useRef<T>(null)

  const onScroll = () => {
    if (!currentElement.current) {
      setIsVisible(false)
      return
    }
    const top = currentElement?.current?.getBoundingClientRect().top || 0;
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight)
  }

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true)
    // onScroll();
    return () => document.removeEventListener('scroll', onScroll, true)
  }, [])

  useEffect(() => {
    setIsVisible(currentElement.current?.offsetParent !== null)
  }, [currentElement.current])

  return [isVisible, currentElement]
}

export function useVisibilityOnce<T extends HTMLElement>(
  offset = 0,
): [boolean, React.RefObject<T>] {
  const [isVisible, setIsVisible] = useState(false)
  const currentElement = useRef<T>(null)

  const onScroll = () => {
    if(isVisible)
      return console.log("onScrollOnce is already visible");
    // console.log("onScroll")
    if (!currentElement.current) {
      setIsVisible(false)
      console.log("onScroll setting isVisible to false since no parent")
      return
    }

    const top = currentElement?.current?.getBoundingClientRect().top || 0;
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight)
  }

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true)
  }, [])

  useEffect(() => {
    if(isVisible)
      return;
    onScroll();
    setIsVisible(currentElement.current?.offsetParent !== null)
  }, [currentElement.current])

  return [isVisible, currentElement]
}