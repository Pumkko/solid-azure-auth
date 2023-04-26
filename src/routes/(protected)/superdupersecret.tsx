import { getSession } from "@solid-auth/base";
import { For } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { authOptions } from "~/server/auth";

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export function routeData() {
  return createServerData$(async (_, event) => {
    const session = await getSession(event.request, authOptions);
    const response = await fetch("https://localhost:44381/WeatherForecast", {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    return (await response.json()) as WeatherForecast[];
  });
}

export default function SuerDuperSecret() {
  const forecasts = useRouteData<typeof routeData>();

  return (
    <div>
      <h1>Those forecasts are secret !</h1>
      <ul>
        <For each={forecasts()}>
          {(forecast) => <li>{forecast.summary}</li>}
        </For>
      </ul>
    </div>
  );
}
