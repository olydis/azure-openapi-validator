"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// polyfills for language support
require("./polyfill.min.js");
const plugin_host_1 = require("./jsonrpc/plugin-host");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const pluginHost = new plugin_host_1.AutoRestPluginHost();
        pluginHost.Add("azure-openapi-validator", (initiator) => __awaiter(this, void 0, void 0, function* () {
            const randomSetting = yield initiator.GetValue("input-file");
            initiator.Message({
                Channel: "warning",
                Text: `Reflecting back a setting: ${randomSetting[0]}`
            });
        }));
        yield pluginHost.Run();
    });
}
main();
