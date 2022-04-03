"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CreatorApi = void 0;
var newlife_creator_client_api_1 = require("@newlife/newlife-creator-client-api");
// import { Context } from "@app/overmind/overmind";
// import  from "@app/overmind";
var CreatorApi = /** @class */ (function (_super) {
    __extends(CreatorApi, _super);
    function CreatorApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreatorApi;
}(newlife_creator_client_api_1.Api));
exports.CreatorApi = CreatorApi;
// export interface UserInfo {
// 	status?: string;
// 	token?: string;
// 	user?: UserReadPrivateResponse;
// 	fbUser?: UserCredential;
// 	loading?: boolean;
// 	signOut: () => void;
// }
