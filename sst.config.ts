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
    const BETTER_AUTH_SECRET = new sst.Secret("BETTER_AUTH_SECRET");
    const BASE_URL =
      $app.stage === "prodution"
        ? "projectacme.link"
        : `${$app.stage}.projectacme.link`;

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

    const auth = new sst.aws.Function("AcmeAuth", {
      link: [db],
      url: true,
      handler: "apps/auth/src/index.handler",
      environment: {
        BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
        BETTER_AUTH_URL: `https://${BASE_URL}/api/v1/auth`,
      },
    });

    const router = new sst.aws.Router("AcmeRouter", {
      domain: BASE_URL,
      routes: {
        "/api/v1/trpc/*": trpc.url,
        "/api/v1/auth/*": auth.url,
      },
    });

    new sst.x.DevCommand("AcmeMobile", {
      dev: {
        autostart: true,
        directory: "apps/mobile",
        command: "pnpm start",
      },
      environment: {
        EXPO_PUBLIC_API_URL: BASE_URL,
      },
    });

    new sst.x.DevCommand("DrizzleStudio", {
      link: [db],
      dev: {
        directory: "packages/db",
        command: "pnpm non-tunnel-studio",
      },
    });

    return {
      router: router.url,
      api: trpc.url,
      auth: auth.url,
    };
  },
});
