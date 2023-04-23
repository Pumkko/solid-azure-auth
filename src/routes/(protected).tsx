import { createSession } from "@solid-auth/base/client";
import { Show } from "solid-js";
import { Navigate, Outlet } from "solid-start";

export default function Protected() {
  const session = createSession();

  return (
    <Show when={session()} fallback={<Navigate href={"/forbidden"} />}>
      <Outlet />
    </Show>
  );
}
