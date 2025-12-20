import { Stack } from "expo-router";
import HeaderTitle from "../components/Logo";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => <HeaderTitle />,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    />
  );
}
