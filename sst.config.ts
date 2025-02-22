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

    const expo = new sst.x.DevCommand("AcmeMobile", {
      dev: {
        autostart: true,
        directory: "apps/mobile",
        command: "pnpm start",
      },
      environment: {
        EXPO_PUBLIC_API_URL: api.url,
      },
    });

    return {
      vpc,
      api: api.url,
    };
  },
});
