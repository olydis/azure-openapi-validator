import { Message } from '../../../jsonrpc/types';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { AutoRestPluginHost } from "../../../jsonrpc/plugin-host";
import { run } from "../../../azure-openapi-validator";

const fs = require('fs');

export async function CollectTestMessagesFromValidator(openapiDefinitionObject: any): Promise<Message[]> {
  let messages: Message[];
  let file = 'fake-test-file';
  let getMessages = function (m: Message) {
    messages.push(m);
  }

  await run(file, openapiDefinitionObject, getMessages.bind(run));
  return messages;
}


export function ReadFileAsString(file: string): string {
  return fs.readFileSync(file);
}