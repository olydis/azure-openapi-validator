import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { safeLoad } from "js-yaml";
import { AutoRestPluginHost } from "../../jsonrpc/plugin-host";
import { run } from "../../azure-openapi-validator";
import { ReadFileAsString, CollectTestMessagesFromValidator } from "./utilities/tests-helper";

@suite class CompositeAzureTest {
  @test @timeout(120000) async "description should not be parameter name"() {
    const file = 'src/azure-openapi-validator/tests/resources/incomplete-descriptions.json';
    const openapiDefinitionDocument = ReadFileAsString(file);
    const openapiDefinitionObject = safeLoad(openapiDefinitionDocument);
    let messages = CollectTestMessagesFromValidator(openapiDefinitionObject);
    console.log(JSON.stringify(messages));
  }
}