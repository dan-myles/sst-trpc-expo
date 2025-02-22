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
    const vpc = new sst.aws.Vpc("AcmeVPC", {
      bastion: true,
      nat: "ec2",
    });

    const db = new sst.aws.Postgres("AcmeDB", {
      vpc,
      proxy: true,
    });

    const trpc = new sst.aws.Function("AcmeTRPC", {
      link: [db],
      url: true,
      handler: "apps/api/src/index.handler",
    });

    const router = new sst.aws.Router("AcmeRouter", {
      routes: {
        "/api/v1/trpc/*": trpc.url,
      },
    });

    const expo = new sst.x.DevCommand("AcmeMobile", {
      dev: {
        autostart: true,
        directory: "apps/mobile",
        command: "pnpm start",
      },
      environment: {
        EXPO_PUBLIC_API_URL: router.url,
        EXPO_PUBLIC_TRPC_URL: "/api/v1/trpc/",
      },
    });

    const studio = new sst.x.DevCommand("DrizzleStudio", {
      link: [db],
      dev: {
        directory: "packages/db",
        command: "pnpm non-tunnel-studio",
      },
    });

    return {
      router: router.url,
      api: trpc.url,
    };
  },
});
