import Azure from "@auth/core/providers/azure-ad";
import { type SolidAuthConfig } from "@solid-auth/base";

import { serverEnv } from "~/env/server";

declare module "@auth/core/types" {
  export interface Session {
    user?: DefaultSession["user"];
    accessToken: string;
  }
}

export const authOptions: SolidAuthConfig = {
  callbacks: {
    async jwt(params) {
      debugger;
      if (params.account && params.account.access_token) {
        params.token.accessToken = params.account.access_token;
      }

      return params.token;
    },
    async session(params) {
      if (params.token.accessToken) {
        params.session.accessToken = params.token.accessToken as string;
      }
      return params.session;
    },
  },
  providers: [
    Azure({
      clientId: serverEnv.AZURE_AD_CLIENT_ID,
      clientSecret: serverEnv.AZURE_AD_CLIENT_SECRET,
      tenantId: serverEnv.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope:
            "openid profile api://4ae28650-387e-4240-abed-6da9362c8b55/Forecasts.Read",
        },
      },
    }),
  ],
  debug: true,
};
