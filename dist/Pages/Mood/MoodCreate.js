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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodCreateModal = exports.MoodCreate = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var form_1 = __importDefault(require("antd/lib/form"));
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lodash_1 = require("lodash");
var overmind_1 = require("../state");
var constants_1 = require("../../constants");
var ProgressButton_1 = require("../../Components/ProgressButton");
var RowCheckbox_1 = require("../../Components/RowCheckbox");
var AddFolder_1 = require("../../Components/Icons/AddFolder");
var MoodCreate = function (_a) {
  var onCreated = _a.onCreated;
  var state = (0, overmind_1.useAppState)();
  var actions = (0, overmind_1.useActions)();
  var history = (0, react_router_dom_1.useHistory)();
  var _b = (0, react_1.useState)(""),
    errMsg = _b[0],
    setErrMsg = _b[1];
  var _c = (0, react_1.useState)(false),
    moodMode = _c[0],
    setMoodMode = _c[1];
  var _d = (0, react_1.useState)([]),
    moods = _d[0],
    setMoods = _d[1];
  var _e = (0, react_1.useState)({}),
    post = _e[0],
    setPost = _e[1];
  (0, react_1.useEffect)(function () {
    actions.routing.setBreadcrumbs([{ text: "post" }, { text: "create" }]);
    (function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var mr;
        var _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [
                4 /*yield*/,
                state.api.client.user.moodsList({
                  id:
                    ((_a = state.api.auth.user) === null || _a === void 0
                      ? void 0
                      : _a.id) || "",
                  page: "0",
                }),
              ];
            case 1:
              mr = _b.sent();
              setMoods(mr.data.value);
              return [2 /*return*/];
          }
        });
      });
    })();
  }, []);
  var onFinish = function (values) {
    return __awaiter(void 0, void 0, void 0, function () {
      var p, ex_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.log("Success:", values);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, actions.api.mood.create({ mood: values })];
          case 2:
            p = _a.sent();
            onCreated && onCreated();
            return [3 /*break*/, 4];
          case 3:
            ex_1 = _a.sent();
            setErrMsg(
              (0, lodash_1.get)(ex_1, "error.errorMessage.details") ||
                (0, lodash_1.get)(ex_1, "message") ||
                "unknown error"
            );
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  var onFinishFailed = function (errorInfo) {
    console.log("Failed:", errorInfo);
  };
  return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {
    children: (0, jsx_runtime_1.jsxs)(
      form_1.default,
      __assign(
        {
          hidden: moodMode,
          name: "basic",
          // labelCol={{ span: 6 }}
          wrapperCol: { span: 24 },
          initialValues: { remember: true },
          onFinish: onFinish,
          onFinishFailed: onFinishFailed,
          autoComplete: "off",
          className: "text-center",
          style: { display: "block" },
        },
        {
          children: [
            (0, jsx_runtime_1.jsx)(
              "h2",
              __assign(
                { className: "text-center header-2" },
                { children: "Create a folder" }
              )
            ),
            errMsg && (0, jsx_runtime_1.jsx)("div", { children: errMsg }),
            (0, jsx_runtime_1.jsx)(
              form_1.default.Item,
              __assign(
                {
                  name: "title",
                  rules: [
                    {
                      required: true,
                      message: "Please input a title",
                    },
                  ],
                },
                {
                  children: (0, jsx_runtime_1.jsx)(antd_1.Input, {
                    placeholder: "title",
                  }),
                }
              )
            ),
            (0, jsx_runtime_1.jsx)(
              form_1.default.Item,
              __assign(
                {
                  required: true,
                  name: "description",
                  rules: [
                    {
                      required: true,
                      message: "A couple of words here please",
                    },
                  ],
                },
                {
                  children: (0, jsx_runtime_1.jsx)(antd_1.Input, {
                    placeholder: "description",
                  }),
                }
              )
            ),
            (0, jsx_runtime_1.jsx)(
              form_1.default.Item,
              __assign(
                { required: false, name: "action" },
                {
                  children: (0, jsx_runtime_1.jsx)(antd_1.Input, {
                    disabled: true,
                    title: "Upcoming feature",
                    placeholder: "action",
                  }),
                }
              )
            ),
            (0, jsx_runtime_1.jsx)(
              form_1.default.Item,
              __assign(
                { name: "doMint", valuePropName: "checked" },
                {
                  children: (0, jsx_runtime_1.jsx)(
                    RowCheckbox_1.RowCheckbox,
                    __assign(
                      { disabled: true, title: "Upcoming feature" },
                      { children: "Create a Newcoin NFT collection" }
                    )
                  ),
                }
              )
            ),
            (0, jsx_runtime_1.jsx)(
              form_1.default.Item,
              __assign(
                {
                  name: "license",
                  rules: [
                    { required: false, message: "Please pick a license" },
                  ],
                },
                {
                  children: (0, jsx_runtime_1.jsx)(
                    antd_1.Select,
                    __assign(
                      { defaultValue: constants_1.LICENSES[0][1] },
                      {
                        children: constants_1.LICENSES.map(function (l) {
                          return (0,
                          jsx_runtime_1.jsx)(antd_1.Select.Option, __assign({ value: l[1] }, { children: l[0] }));
                        }),
                      }
                    )
                  ),
                }
              )
            ),
            (0, jsx_runtime_1.jsx)(
              form_1.default.Item,
              __assign(
                { label: "", className: "text-center" },
                {
                  children: (0, jsx_runtime_1.jsx)(
                    ProgressButton_1.ProgressButton,
                    __assign(
                      {
                        actionName: "api.mood.create",
                        type: "primary",
                        htmlType: "submit",
                      },
                      { children: "Create" }
                    )
                  ),
                }
              )
            ),
          ],
        }
      )
    ),
  });
};
exports.MoodCreate = MoodCreate;
var MoodCreateModal = function () {
  var _a = (0, react_1.useState)(false),
    isOpen = _a[0],
    setIsOpen = _a[1];
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(
        antd_1.Modal,
        __assign(
          {
            visible: isOpen,
            onOk: function () {
              return setIsOpen(false);
            },
            onCancel: function () {
              return setIsOpen(false);
            },
            footer: false,
            className: "nl-white-box-modal",
          },
          {
            children: (0, jsx_runtime_1.jsx)(exports.MoodCreate, {
              onCreated: function () {
                return setIsOpen(false);
              },
            }),
          }
        )
      ),
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)(
            "div",
            __assign(
              { style: { fontSize: "120px" } },
              {
                children: (0, jsx_runtime_1.jsx)(AddFolder_1.AddFolder, {
                  setIsOpen: setIsOpen,
                }),
              }
            )
          ),
          (0, jsx_runtime_1.jsx)(
            "p",
            __assign(
              { className: "paragraph-1r", style: { opacity: 0 } },
              { children: "add folder" }
            )
          ),
        ],
      }),
    ],
  });
};
exports.MoodCreateModal = MoodCreateModal;
//# sourceMappingURL=MoodCreate.js.map
