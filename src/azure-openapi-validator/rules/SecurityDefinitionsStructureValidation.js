"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const rule_1 = require("../rule");
const message = "Every swagger/configuration must have a security definitions section and it must adhere to the structure described in: https://github.com/Azure/autorest/tree/master/docs/developer/validation-rules/security-definitions-structure-validation.md.";
rule_1.rules.push({
    id: "M2054",
    name: "SecurityDefinitionsStructureValidation",
    severity: "error",
    category: ["SDKViolation"],
    run: function* (doc) {
        if (doc.securityDefinitions === undefined) {
            yield { message: message, location: [] };
        }
        else if (!areSecurityDefinitionsValid(doc.securityDefinitions)) {
            yield { message: message, location: ["securityDefinitions"] };
        }
    }
});
function areSecurityDefinitionsValid(securityDefinitions) {
    if (typeof securityDefinitions !== "object") {
        return false;
    }
    const keys = Object.keys(securityDefinitions);
    if (keys.length !== 1 || keys[0] !== "azure_auth") {
        return false;
    }
    return isSecurityDefinitionModelValid(securityDefinitions[keys[0]]);
}
function isSecurityDefinitionModelValid(securityDefinition) {
    return (securityDefinition.type === "oauth2" &&
        securityDefinition.authorizationUrl === "https://login.microsoftonline.com/common/oauth2/authorize" &&
        securityDefinition.flow === "implicit" &&
        !!securityDefinition.description &&
        areSecurityDefinitionScopesValid(securityDefinition.scopes));
}
function areSecurityDefinitionScopesValid(scopes) {
    if (typeof scopes !== "object") {
        return false;
    }
    const keys = Object.keys(scopes);
    if (keys.length !== 1 || keys[0] !== "user_impersonation") {
        return false;
    }
    return !!scopes[keys[0]];
}
