import { Stack } from "expo-router"

import "../globals.css"

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router"

export default function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
        }}
      />
    </Stack>
  )
}
