"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const rule_1 = require("../rule");
rule_1.rules.push({
    id: "M2065",
    name: "DescriptionMustNotBeNodeName",
    severity: "error",
    category: ["RPCViolation"],
    mergeState: rule_1.MergeStates.composed,
    openapiType: rule_1.OpenApiTypes.arm,
    appliesTo_JsonQuery: "$..*[?(@.description)]",
    run: function* (doc, node, path) {
        let msg = "Description must not match the name of the node it is supposed to describe";
        let nodeName = path[path.length - 1];
        if (!isNaN(nodeName)) {
            // if name is a property defined within the node, try and access it.
            if (!('name' in node)) {
                return;
            }
            if (node['name'].toLowerCase() === TrimDescription(node.description)) {
                yield { message: "$(msg) Node name:'${node.name}' Description:'${node.Description}'", location: path.concat(['description']) };
            }
        }
        else if (nodeName.toLowerCase() === TrimDescription(node.description)) {
            yield { message: "$(msg) Node name:'${nodeName}' Description: '${node.description}'", location: path.concat(['description']) };
        }
        else if (TrimDescription(node.description) === 'description') {
            yield { message: "Description cannot be named as 'Description'", location: path.concat(['description']) };
        }
    }
});
function TrimDescription(description) {
    return description.trim().replace(/\./g, '').toLowerCase();
}