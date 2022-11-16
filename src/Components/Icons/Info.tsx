import { NLView } from "../../types";

export const Info: NLView<{ color: string }> = ({ color }) => (
  <svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5984 10.6548H16.4096V7.944H13.5984V10.6548ZM13.6988 22H16.3092V11.96H13.6988V22Z" fill={color} />
    <circle cx="15" cy="15.1875" r="13.5" stroke={color} strokeWidth="3" />
  </svg>
);
