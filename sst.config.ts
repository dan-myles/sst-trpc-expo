/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "acme",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("AcmeVPC");

    const api = new sst.aws.Function("AcmeTRPC", {
      url: true,
      handler: "apps/api/src/index.handler",
    });

    return {
      vpc,
      api: api.url,
    };
  },
});
