import { Button, Modal } from "antd";
import { CrossCircle } from "../../../Components/Icons/CrossCircle";
import { IOView } from "../../../types";
import { useState } from "react";

export const UnsuccessfulLoginModal: IOView<{ redirect: ({ location: string }) => void }> = ({ redirect }) => {
  const [isVisible, setIsVisible] = useState(window.localStorage.getItem("isSigningUserUknown") === "true");
  const clearIsSigningUserUknown = () => {
    window.localStorage.removeItem("isSigningUserUknown");
  };
  return (
    <Modal
      closeIcon={<CrossCircle />}
      visible={isVisible}
      okText="Yes"
      cancelText="No"
      onCancel={() => {
        clearIsSigningUserUknown();
        setIsVisible(false);
      }}
      footer={false}
      className="nl-white-box-modal"
    >
      <div className="text-left">
        <h2 className="header-1b">Oops!</h2>
        <p className="u-margin-top-large paragraph-1r">Looks like this phone number is not registered.</p>
        <p className="u-margin-top-medium u-margin-bottom-medium  paragraph-1r">
          You will need to be an existing member from the mobile app, or have an invite to sign up.
        </p>
        <p className="u-margin-bottom-mega paragraph-1r">
          Import your account if you are registered on newlife mobile, or please sign up with your invite code.
        </p>
      </div>

      <Button
        className="nl-button-primary"
        onClick={() => {
          clearIsSigningUserUknown();
          redirect({ location: "/auth/newlife-members" });
        }}
      >
        <p className="paragraph-1b">I have a mobile account</p>
      </Button>
      <Button
        className="nl-button-primary"
        onClick={() => {
          clearIsSigningUserUknown();
          setIsVisible(false);
        }}
      >
        <p className="paragraph-1b">Sign up</p>
      </Button>
    </Modal>
  );
};
