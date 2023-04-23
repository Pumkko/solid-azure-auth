import Azure from "@auth/core/providers/azure-ad";
import { type SolidAuthConfig } from "@solid-auth/base";
import { serverEnv } from "~/env/server";

declare module "@auth/core/types" {
  export interface Session {
    user?: DefaultSession["user"];
  }
}

export const authOptions: SolidAuthConfig = {
  providers: [
    Azure({
      clientId: serverEnv.AZURE_AD_CLIENT_ID,
      clientSecret: serverEnv.AZURE_AD_CLIENT_SECRET,
      tenantId: serverEnv.AZURE_AD_TENANT_ID,
    }),
  ],
  debug: false,
};
