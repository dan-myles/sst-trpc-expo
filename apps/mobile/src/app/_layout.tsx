import { Stack } from "expo-router"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "~/trpc/api"

import "../globals.css"

export default function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
        }}
      />
    </Stack>
    </QueryClientProvider>
  )
}
