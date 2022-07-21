import { Input as AntInput, InputProps } from "antd";
import { NLView } from "../../types";
import { isEmpty } from "lodash";
import { useEffect, useRef, useState } from "react";

export const Input: NLView<InputProps> = (props) => {
  const inputRef = useRef<any>();
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  useEffect(() => {
    setIsInputEmpty(isEmpty(inputRef.current?.state?.value));
  }, []);

  return (
    <AntInput
      {...props}
      ref={inputRef}
      className={`nl-input-default ${props.className} ${isInputEmpty ? "nl-input-empty" : ""}`}
      onChangeCapture={(e) => {
        setIsInputEmpty(isEmpty(e.currentTarget.value));
      }}
    ></AntInput>
  );
};
