import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../styles.css";


export default function RootLayout() {
  return (
          <SafeAreaProvider>
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#f472b6",
                },
              }}
            />
            <StatusBar />
          </SafeAreaProvider>
  );
}
