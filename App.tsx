import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useMemo } from "react";

import HistoricProvider, { useHistoric } from "./src/context/HistoricProvider";
import OpenAIProvider from "./src/context/OpenAIProvider";
import Chat from "./src/screens/Chat";
import { sortByIsoDate } from "./utils/index";

const Drawer = createDrawerNavigator();

const drawerLabelStyle = {
  color: "#ACABBD",
  marginLeft: -16,
};

const AuthenticatedRoutes = () => {
  const { threads } = useHistoric();

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      drawerLabelStyle,
      drawerIcon: () => <Icon color="#ACABBD" name="forum-outline" size={24} />,
      drawerActiveTintColor: "#b9bde5",
      drawerStyle: {
        backgroundColor: "#2B2C2F",
      },
    }),
    []
  );

  return (
    <Drawer.Navigator screenOptions={screenOptions}>
      {threads
        .sort((a, b) => sortByIsoDate(a.createdAt, b.createdAt))
        .map((thread) => {
          const threadId = thread.id;
          const title = (thread.messages?.[0]?.text as string) || "New chat";

          return (
            <Drawer.Screen
              component={Chat}
              initialParams={{ threadId }}
              key={threadId}
              name={threadId}
              options={{
                title,
              }}
            />
          );
        })}
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <OpenAIProvider>
        <HistoricProvider>
          <AuthenticatedRoutes />
        </HistoricProvider>
      </OpenAIProvider>
    </NavigationContainer>
  );
}
