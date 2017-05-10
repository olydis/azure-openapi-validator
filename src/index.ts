// polyfills for language support
require("./polyfill.min.js");

import { AutoRestPluginHost } from "./jsonrpc/plugin-host";

async function main() {
  const pluginHost = new AutoRestPluginHost();
  pluginHost.Add("azure-openapi-validator", async initiator => {
    const randomSetting: string = await initiator.GetValue("input-file");
    initiator.Message({
      Channel: "warning",
      Text: `Reflecting back a setting: ${randomSetting[0]}`
    });
  });

  await pluginHost.Run();
}

main();