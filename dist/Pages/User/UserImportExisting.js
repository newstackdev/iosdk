"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInvite = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var Form_1 = require("antd/lib/form/Form");
var ContentLayout_1 = require("../../Components/ContentLayout");
var ProgressButton_1 = require("../../Components/ProgressButton");
var overmind_1 = require("../state");
var UserInvite = function () {
  var form = (0, Form_1.useForm)()[0];
  var actions = (0, overmind_1.useActions)();
  return (0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, {
    children: (0, jsx_runtime_1.jsxs)("div", {
      children: [
        (0, jsx_runtime_1.jsx)(
          "h2",
          __assign(
            { className: "app-main-title-spacing header-2" },
            { children: "Invite a friend" }
          )
        ),
        (0, jsx_runtime_1.jsxs)(
          antd_1.Form,
          __assign(
            {
              name: "basic",
              form: form,
              // labelCol={{ span: 6 }}
              wrapperCol: { span: 24 },
              // value={{ state }}
              onFinish: function (data) {
                return actions.api.user.invite({ userInvite: data });
              },
              // onFinishFailed={onFinishFailed}
              autoComplete: "off",
            },
            {
              children: [
                (0, jsx_runtime_1.jsx)(
                  antd_1.Form.Item,
                  __assign(
                    {
                      name: "phone",
                      rules: [
                        {
                          message: "Please input your username!",
                          required: true,
                        },
                      ],
                    },
                    {
                      children: (0, jsx_runtime_1.jsx)(antd_1.Input, {
                        placeholder: "phone",
                      }),
                    }
                  )
                ),
                (0, jsx_runtime_1.jsx)(
                  antd_1.Form.Item,
                  __assign(
                    {
                      name: "fullName",
                      rules: [
                        {
                          message: "Please input your username!",
                          required: true,
                        },
                      ],
                    },
                    {
                      children: (0, jsx_runtime_1.jsx)(antd_1.Input, {
                        placeholder: "name",
                      }),
                    }
                  )
                ),
                (0, jsx_runtime_1.jsx)(
                  antd_1.Form.Item,
                  __assign(
                    {
                      name: "email",
                      rules: [
                        {
                          message: "",
                        },
                      ],
                    },
                    {
                      children: (0, jsx_runtime_1.jsx)(antd_1.Input, {
                        placeholder: "username",
                      }),
                    }
                  )
                ),
                (0, jsx_runtime_1.jsx)(
                  antd_1.Form.Item,
                  __assign(
                    { wrapperCol: { offset: 8, span: 16 } },
                    {
                      children: (0, jsx_runtime_1.jsx)(
                        ProgressButton_1.ProgressButton,
                        __assign(
                          {
                            actionName: "api.user.invite",
                            type: "primary",
                            htmlType: "submit",
                          },
                          { children: "Submit" }
                        )
                      ),
                    }
                  )
                ),
              ],
            }
          )
        ),
      ],
    }),
  });
};
exports.UserInvite = UserInvite;
//# sourceMappingURL=UserImportExisting.js.map
