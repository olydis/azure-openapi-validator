import { rules } from "../rule";

rules.push({
  id: "M2055",
  name: "DescriptionMustNotBeNodeName",
  severity: "error",
  category: ["RPCViolation"],

  appliesTo_JsonQuery: "$..*[?(@.description)]",
  run: function* (doc, node, path) {
    if (node.description === undefined) {
      return;
    }
    let msg: string = "Description must not match the name of the node it is supposed to describe"; "; '{0}' Description: '{1}'";
    let nodeName = <any>path[path.length - 1];
    if (!isNaN(nodeName)) {
      if (!('name' in node)) {
        yield { message: JSON.stringify(node), location: path };
      }
      else if ((<string>node.name).toLowerCase() === TrimDescription(node.description)) {
        yield { message: msg + "Node name:'" + node.name + "' " + "Description: '" + node.description + "'", location: path.concat(['description']) };
      }
    }
    else if (nodeName.toLowerCase() === TrimDescription(node.description)) {
      yield { message: msg + "Node name:'" + nodeName + "' " + "Description: '" + node.description + "'", location: path.concat(['description']) };
    } else if (TrimDescription(node.description) === 'description') {
      yield { message: "Description cannot be named as 'Description'", location: path.concat(['description']) };
    }
  }
});

function TrimDescription(description: string): string {
  return description.trim().replace('.', '').toLowerCase();
}