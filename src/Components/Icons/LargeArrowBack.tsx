import { useActions } from "../../overmind";

export const LargeArrowBack = (props: { href?: string }) => {
  const actions = useActions();

  return (
    <svg
      width="26"
      height="29"
      viewBox="0 0 26 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
      onClick={
        () => (props.href ? actions.routing.historyPush({ location: props.href }) : actions.routing.goBack())
        // actions.routing.historyPush({ location: "/explore" })
      }
    >
      <g clipPath="url(#clip0_5609_341032)">
        <path
          d="M25.2242 28.7258H23.2242V12.9258H1.82422V10.9258H23.2242C23.7547 10.9258 24.2634 11.1365 24.6384 11.5116C25.0135 11.8866 25.2242 12.3953 25.2242 12.9258V28.7258Z"
          fill="#ffffff"
        />
        <path
          d="M12.3241 23.8256L0.414062 11.9256L12.3241 0.015625L13.7341 1.42562L3.24406 11.9256L13.7341 22.4156L12.3241 23.8256Z"
          fill="#ffffff"
        />
      </g>
      <defs>
        <clipPath id="clip0_5609_341032">
          <rect width="24.81" height="28.71" fill="white" transform="translate(0.414062 0.015625)" />
        </clipPath>
      </defs>
    </svg>
  );
};
