import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";

const DB_PATH = `${process.cwd()}/database.sqlite`;

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const billingConfig = {
  "My Shopify One-Time Charge": {
    // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
    amount: 5.0,
    currencyCode: "USD",
    interval: BillingInterval.OneTime,
  },
};

const PORT = 8081;

const shopify = shopifyApp({
  api: {
    apiVersion: '2023-04',
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
    apiKey: 'a83d9a1af3cbccb4882ef8d59bbcb341',
    apiSecretKey: '148772bfe3dc77aa4fea531a431383f6',
    scopes: ['read_products','write_products','read_customers','write_customers'],
    hostScheme: 'http',
    hostName: `localhost:${PORT}`,

  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },

  // This should be replaced with your preferred storage strategy
  sessionStorage: new SQLiteSessionStorage(DB_PATH),
});

export default shopify;
