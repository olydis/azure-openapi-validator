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
const azure_openapi_validator_1 = require("../../../azure-openapi-validator");
const rule_1 = require("../../rule");
const assert = require("assert");
const fs = require('fs');
// run the validator and gather all the messages generated
function CollectTestMessagesFromValidator(filename, openapiDefinitionObject, openapiType = rule_1.OpenApiTypes.arm, mergeState = rule_1.MergeStates.composed) {
    return __awaiter(this, void 0, void 0, function* () {
        let messages = [];
        let getMessages = function (m) {
            messages.push(m);
        };
        yield azure_openapi_validator_1.run(filename, openapiDefinitionObject, getMessages, openapiType, mergeState);
        return messages;
    });
}
exports.CollectTestMessagesFromValidator = CollectTestMessagesFromValidator;
// read the whole file into a string
function ReadFileAsString(file) {
    return fs.readFileSync(file);
}
exports.ReadFileAsString = ReadFileAsString;
// assert whether we have the expected number of validation rules of given type
function AssertValidationRuleCount(messages, validationRule, count) {
    assert.equal(messages.filter(msg => msg.Details.code === validationRule).length, count);
}
exports.AssertValidationRuleCount = AssertValidationRuleCount;
// get all the warning messages generated
function GetWarningMessages(messages) {
    return messages.filter(msg => msg.Channel === 'warning');
}
exports.GetWarningMessages = GetWarningMessages;
// get all the error messages generated
function GetErrorMessages(messages) {
    return messages.filter(msg => msg.Channel === 'error');
}
exports.GetErrorMessages = GetErrorMessages;
// get all the messages of a certain type of rule
function GetMessagesOfType(messages, validationRule) {
    return messages.filter(msg => msg.Details.name === validationRule);
}
exports.GetMessagesOfType = GetMessagesOfType;
