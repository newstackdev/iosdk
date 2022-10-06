import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Col, Input, Row, Tooltip } from "antd";
import { Info } from "../../Components/Icons/Info";
import { Link } from "react-router-dom";
import { PictureWallFormItem } from "../../Components/PicturesWall";
import { useAppState } from "../../overmind";
import { useCachedDaoProposals } from "../../hooks/useCached";
import { useContentImageUrl } from "../../Components/MediaComponents/ImageMediaComponent";
import Form from "antd/lib/form";
import SupportBox from "../../Components/SupportBox";
const UserUpdateHeader = () => {
    const state = useAppState();
    const daoOwner = state.api.auth.user?.username || state.config.settings.newcoin.daoDomain;
    const daoProposals = useCachedDaoProposals({ daoOwner });
    const profilePicture = useContentImageUrl({
        id: state.api.auth.user.id,
        contentUrl: state.api.auth.user.contentUrl,
    });
    return (_jsxs("div", { className: "post-create-header-wrapper", children: [_jsx("div", { className: "post-back-arrow", style: { padding: "0px 20px" } }), _jsxs(Row, { style: {
                    flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "column",
                }, children: [_jsxs(Row, { style: { flexDirection: "column" }, children: [_jsx("h2", { className: "text-center header-5", style: { marginBottom: 20, textAlign: "left" }, children: "Edit Profile" }), _jsx(Row, { justify: "center", className: "full-width-only", children: _jsx(Col, { span: 18, children: _jsx(Form.Item
                                    // label="Avatar"
                                    , { 
                                        // label="Avatar"
                                        name: "file", children: _jsx(PictureWallFormItem, { uploadText: "Upload avatar", placeholderImgSrc: profilePicture }) }) }) }), _jsxs(Row, { style: {
                                    marginBottom: "10px",
                                }, children: [_jsx("p", { className: "header-5", style: { lineHeight: "32px", marginRight: 10 }, children: "Domain" }), _jsx(Tooltip, { placement: "rightTop", title: "This is your Newcoin blockchain name, aka your domain. You cannot edit this domain name!", children: _jsx("span", { style: { height: 30 }, children: _jsx(Info, { color: "#FCFCF3" }) }) })] }), _jsx(Form.Item, { children: _jsx(Input, { disabled: true, placeholder: "your domain", style: { marginLeft: 10, width: "calc(100% - 10px)" } }) }), _jsx(Row, { style: {
                                    marginBottom: "10px",
                                }, children: _jsx("p", { className: "header-5", children: "Name" }) }), _jsx(Form.Item, { name: "displayName", rules: [
                                    {
                                        required: true,
                                        message: "Display name must start with a letter, be 3 - 9 chars or longer and contain only latin letters, digits and dots.",
                                    },
                                ], children: _jsx(Input, { placeholder: "display name", style: { marginLeft: 10, width: "calc(100% - 10px)" } }) }), _jsx(Row, { style: {
                                    marginBottom: "10px",
                                }, children: _jsx("p", { className: "header-5", children: "Bio" }) }), _jsx(Form.Item, { name: "description", children: _jsx(Input.TextArea, { placeholder: "bio", style: { marginLeft: 10, width: "calc(100% - 10px)" } }) }), _jsx(Row, { style: {
                                    marginBottom: "10px",
                                }, children: _jsx("p", { className: "header-5", children: "Email" }) }), _jsx(Form.Item, { name: "email", required: false, rules: [
                                    {
                                        required: false,
                                        // message: "Please enter your email",
                                    },
                                ], children: _jsx(Input, { placeholder: "email", style: { marginLeft: 10, width: "calc(100% - 10px)" } }) }), !daoProposals.dao_id && (_jsx(Form.Item, { children: _jsx(Row, { children: _jsx(Link, { to: "/dao/create", children: _jsx(Button, { className: "u-dao-view-btn u-margin-right-medium", children: _jsx("span", { className: "paragraph-2b", children: "Create DAO" }) }) }) }) }))] }), _jsx(Row, { style: { flex: 1, flexDirection: "column" }, children: _jsx(SupportBox, { style: { marginLeft: 10, width: "calc(100% - 10px)" } }) }), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), _jsx("br", {})] })] }));
};
export default UserUpdateHeader;
//# sourceMappingURL=UserUpdateHeader.js.map