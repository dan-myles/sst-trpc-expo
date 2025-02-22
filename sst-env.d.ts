/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */

declare module "sst" {
  export interface Resource {
    "AcmeDB": {
      "database": string
      "host": string
      "password": string
      "port": number
      "type": "sst.aws.Postgres"
      "username": string
    }
    "AcmeRouter": {
      "type": "sst.aws.Router"
      "url": string
    }
    "AcmeTRPC": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "AcmeVPC": {
      "bastion": string
      "type": "sst.aws.Vpc"
    }
  }
}
/// <reference path="sst-env.d.ts" />

import "sst"
export {}