/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Message } from '../../../jsonrpc/types';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { AutoRestPluginHost } from "../../../jsonrpc/plugin-host";
import { run } from "../../../azure-openapi-validator";
import * as assert from "assert";

const fs = require('fs');

export async function CollectTestMessagesFromValidator(filename: string, openapiDefinitionObject: any): Promise<Message[]> {
  let messages: Message[] = [];
  let getMessages = function (m: Message) {
    messages.push(m);
  }

  await run(filename, openapiDefinitionObject, getMessages);
  return messages;
}

// read the whole file into a string
export function ReadFileAsString(file: string): string {
  return fs.readFileSync(file);
}

export function AssertValidationRuleCount(messages: Message[], validationRule: string, count: number): void {
  assert.equal(messages.filter(msg => msg.Details.code === validationRule).length, count);
}

export function GetWarningMessages(messages: Message[]): Message[] {
  return messages.filter(msg => msg.Channel === 'warning');
}

export function GetErrorMessages(messages: Message[]): Message[] {
  return messages.filter(msg => msg.Channel === 'error');
}

export function GetMessagesOfType(messages: Message[], validationRule: string): Message[] {
  return messages.filter(msg => msg.Details.name === validationRule);
}