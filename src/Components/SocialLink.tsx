import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { NLView } from "../types";

export const SocialLink: NLView<{
	platform: string;
	user: UserReadPrivateResponse;
}> = ({ children, platform, user }) => {
	return user[platform] ? (
		<a
			href={`https://${platform}.com/${user[platform]}`}
			target="_blank"
			rel="noreferrer"
		>
			{children}
		</a>
	) : (
		<></>
	);
};
