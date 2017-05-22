"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const rule_1 = require("../rule");
rule_1.rules.push({
    id: "SE40",
    name: "ControlCharactersAreNotAllowed",
    severity: "error",
    category: ["SDKViolation"],
    mergeState: rule_1.MergeStates.individual,
    openapiType: rule_1.OpenApiTypes.arm,
    appliesTo_JsonQuery: "$..*",
    run: function* (doc, node, path) {
        let msg = "May not contain control characters: ";
        if (typeof node === "string") {
            let nodeValue = node;
            var controlChars = nodeValue.split('').filter(ch => ch < ' ' && ch !== '\t' && ch !== '\n' && ch !== '\r');
            if (controlChars.length > 0) {
                for (var token in controlChars) {
                    yield { message: "$(msg) Character:'${element}' in:'${nodeValue}'", location: path };
                }
            }
        }
    }
});
function TrimDescription(description) {
    return description.trim().replace(/\./g, '').toLowerCase();
}
