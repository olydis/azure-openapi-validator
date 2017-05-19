/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { rules } from "../rule";

rules.push({
  id: "SE40",
  name: "NoControlCharacters",
  severity: "error",
  category: ["SDKViolation"],

  appliesTo_JsonQuery: "$..*",
  run: function* (doc, node, path) {
    let msg: string = "May not contain control characters: ";
    if (typeof node === "string") {
      let nodeValue: string = <string>node;
      var controlChars = nodeValue.split('').filter(ch => ch < ' ' && ch !== '\t' && ch !== '\n' && ch !== '\r');
      if (controlChars.length > 0) {
        for (var token in controlChars) {
          yield { message: "$(msg) Character:'${element}' in:'${nodeValue}'", location: path };
        }
      }
    }
  }
});

function TrimDescription(description: string): string {
  return description.trim().replace(/\./g, '').toLowerCase();
}