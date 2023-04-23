import { createSession, signIn, signOut } from "@solid-auth/base/client";
import { Show, Suspense, type VoidComponent } from "solid-js";
import { A } from "solid-start";

const Home: VoidComponent = () => {
  return (
    <main class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#026d56] to-[#152a2c]">
      <div class="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 class="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span class="text-[hsl(88,_77%,_78%)]">JD</span> App
        </h1>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <A
            class="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/superdupersecret"
          >
            <h3 class="text-2xl font-bold">Super Secret →</h3>
            <div class="text-lg">
              Learn more about the super duper secret thing you absolutely can
              not know
            </div>
          </A>
          <A
            class="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://github.com/orjdev/create-jd-app"
            target="_blank"
          >
            <h3 class="text-2xl font-bold">JD End →</h3>
            <div class="text-lg">
              Learn more about Create JD App, the libraries it uses, and how to
              deploy it.
            </div>
          </A>
        </div>
        <Suspense>
          <AuthShowcase />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;

const AuthShowcase: VoidComponent = () => {
  const session = createSession();
  return (
    <div class="flex flex-col items-center justify-center gap-4">
      <Show
        when={session()}
        fallback={
          <button
            onClick={() => signIn("azure-ad", { redirectTo: "/" })}
            class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          >
            Sign in
          </button>
        }
      >
        <span class="text-xl text-white">Welcome {session()?.user?.name}</span>
        <button
          onClick={() => signOut({ redirectTo: "/" })}
          class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        >
          Sign out
        </button>
      </Show>
    </div>
  );
};
