import { NLView } from "../../types";

export const Wave: NLView<{ waveColor?: string; backgroundColor?: string }> = ({ waveColor, backgroundColor }) => (
  <svg
    id="visual"
    viewBox="0 0 960 540"
    width="960"
    height="540"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style={{ width: "100%" }}
  >
    <rect x="0" y="0" width="960" height="540" fill={backgroundColor ?? "#ffffff"}></rect>
    <path
      d="M0 216L53.3 215.5C106.7 215 213.3 214 320 191C426.7 168 533.3 123 640 96.3C746.7 69.7 853.3 61.3 906.7 57.2L960 53"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="miter"
      stroke={waveColor ?? "#000000"}
      strokeWidth="1"
    ></path>
  </svg>
);
