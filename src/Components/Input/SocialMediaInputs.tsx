import { Input } from "./Input";
import { NLView } from "../../types";
import { SOCIAL_MEDIA } from "../UserWidget";
import { SocialLink } from "../../Components/SocialLink";
import { Success } from "../Icons/Success";
import { stage } from "../../config";
import { useAppState } from "../../overmind";
import Button from "antd/lib/button";
import Form from "antd/lib/form";

export const SocialMediaInputs: NLView<{ enableVerify?: boolean }> = ({ enableVerify }) => {
  const state = useAppState();

  const onVerifySocial = (provider: string) => {
    window.open(
      `https://api-${stage}.newlife.io/creator/auth/provider/${provider}?token=${state.firebase.token}&redirect_url=${window.location.href}?socialVerify=true`,
      "_self",
    );
  };

  const verify = (provider: string): React.ReactNode => {
    if (provider === "soundcloud" || !enableVerify) {
      return false;
    }

    const sanitizedProvider = provider.replace(/[0-9]/g, "");
    return !isSocialVerified(sanitizedProvider) ? (
      <Button className="secondary-button nl-social-media-verify" onClick={() => onVerifySocial(provider)}>
        <span className="paragraph-2b">Verify</span>
      </Button>
    ) : (
      <Success />
    );
  };

  const getSocialIcon = (social: string) => {
    return <SocialLink user={state.api.auth.user} platform={social} disableLink />;
  };

  const isSocialVerified = (social: string) => {
    return state.api.auth.user.verifiedSocialIds?.includes(social);
  };

  const getSocialMediaInputs = () => {
    return SOCIAL_MEDIA.map((social) => {
      const isVerified = isSocialVerified(social) && enableVerify;
      let cls = `nl-userUpdate-social-input nl-social-input-${social} ${isVerified ? "nl-social-input-verified" : ""} ${
        !enableVerify ? "nl-social-input-invite" : ""
      }`;

      return (
        <Form.Item
          key={social}
          name={social}
          rules={
            social === "instagram" && enableVerify
              ? [
                  {
                    // required: true,
                    message: "Your instagram please",
                  },
                ]
              : undefined
          }
        >
          <Input
            placeholder={social}
            suffix={verify(social === "twitter" || social === "tumblr" ? `${social}2` : social)}
            prefix={getSocialIcon(social)}
            disabled={isVerified}
            className={cls}
          />
        </Form.Item>
      );
    });
  };

  return <>{getSocialMediaInputs()}</>;
};
