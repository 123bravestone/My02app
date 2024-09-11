import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="authentication" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
