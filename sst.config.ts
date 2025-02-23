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

    /**
     * VPC
     * Most cloud resources we create are going to be hosted in our VPC.
     * This makes it easy to tunnel to the VPC and access our resources.
     */
    const vpc = new sst.aws.Vpc("AcmeVPC", {
      bastion: true,
      nat: "ec2",
    });

    /**
     * Database
     * This is just a simple relational Postgres database that we'll use for our
     * application. It needs to be hosted in a VPC so that it can be accessed from
     * our APIs. Also, so we can tunnel to it from our local machine.
     */
    const db = new sst.aws.Postgres("AcmeDB", {
      vpc,
      proxy: true,
    });

    /**
     * TRPC API
     * This is our main RPC API that we'll use for most functionality of our application.
     * Every function/service that needs to be able to use the "Auth" API needs to have
     * these environment variables set.
     */
    const trpc = new sst.aws.Function("AcmeTRPC", {
      link: [db],
      url: true,
      handler: "apps/api/src/index.handler",
      environment: {
        BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
        BETTER_AUTH_URL: `https://${BASE_URL}/api/v1/auth`,
      },
    });

    /**
     * Auth API
     * This is our secondary API that we'll use for authentication and authorization.
     * This is a separate small service that handles callbacks & syncing user
     * state with our database.
     */
    const auth = new sst.aws.Function("AcmeAuth", {
      link: [db],
      url: true,
      handler: "apps/auth/src/index.handler",
      environment: {
        BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
        BETTER_AUTH_URL: `https://${BASE_URL}/api/v1/auth`,
      },
    });

    /**
     * Router
     * This is our "API Gateway" that we'll use to route traffic to our APIs.
     */
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
