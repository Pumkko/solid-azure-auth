This project was created using [Create JD App](https://github.com/OrJDev/create-jd-app) And it's quite nice what he did !

# WHAT DID I LEARN

## Auth

I need to fully qualify the scope when I request it in `auth.js`

```typescript
authorization: {
	params: {
		scope:
			"email openid profile api://4ae28650-387e-4240-abed-6da9362c8b55/Forecasts.Read",
	},
},
```

here if `api://` is missing then azure will never find the scope and you will get an error like :

> The application 'solid-azure-auth' asked for scope 'Forecasts.Read' that doesn't exist on the resource '00000003-0000-0000-c000-000000000000

The GUID `00000003-0000-0000-c000-000000000000` being the Guid of Microsoft Graph (according to [this](https://github.com/MicrosoftDocs/azure-docs/issues/68540#issuecomment-756112758) reply)

Also it's critical to keep `openid` in the list (duh) but also email and profile are nice to have to get at least a couple of info about the user.

## AuthJS Callbacks

Since we need the token to then contact an API, the session object must have it, for that we can use those two callbacks provided by Auth.JS
Those callbacks are nice but they will be invoked multiple times with different values, it is therefore most important to make sure that we only set the token if it is valid. JWT may be called multiple times, the first time with an undefined account, the second time with an undefined token...

```typescript
callbacks: {
	async  jwt(params) {
		if (params.account && params.account.access_token) {
			params.token.accessToken = params.account.access_token;
		}

		return  params.token;
	},
	async  session(params) {
		if (params.token.accessToken) {
			params.session.accessToken = params.token.accessToken  as  string;
		}
		return  params.session;
	},
},
```

## SolidStart

### Routing

I can use the following folder structure to protect some components from being accessed by an unauthorized user

- (protected)
  - SuperDuperSecret.tsx
- (protected).tsx

the code for `(protected).tsx` is simple using [OrJDev](https://github.com/OrJDev) `createSession` function

```typescript
export default function Protected() {
  const session = createSession();
  return (
    <Show when={session()} fallback={<Navigate href={"/forbidden"} />}>
      <Outlet />
    </Show>
  );
}
```

### Debugging

To be fair debugging server side code is note easy, really not easy, I should probably join their Discord and ask around about that. Because I really lost a lot of time trying to understand why did my auth not work, why was my access_token empty...
