// polyfills for language support
require("./polyfill.min.js");

import { safeLoad } from "js-yaml";
import { AutoRestPluginHost } from "./jsonrpc/plugin-host";
import { run } from "./azure-openapi-validator";

async function main() {
  const pluginHost = new AutoRestPluginHost();
  pluginHost.Add("azure-openapi-validator", async initiator => {
    const files = await initiator.ListInputs();
    for (const file of files) {
      initiator.Message({
        Channel: "verbose",
        Text: `Validating '${file}'`
      });

      const openapiDefinitionDocument = await initiator.ReadFile(file);
      const openapiDefinitionObject = safeLoad(openapiDefinitionDocument);
      await run(file, openapiDefinitionObject, initiator.Message.bind(initiator));
    }
  });

  await pluginHost.Run();
}

main();