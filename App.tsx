// App.tsx

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createTables } from './src/utils/sqlite';
import { syncUnsyncedData } from './src/utils/sync';
import * as SplashScreen from 'expo-splash-screen';
import * as Network from 'expo-network';
import BottomTabs from './src/navigation/BottomTabs';

// 🧠 Required for Web - SQLite WASM
if (Platform.OS === 'web') {
  (globalThis as any).Module = {
    locateFile: (file: string) => {
      if (file.endsWith('.wasm')) {
        return '/wa-sqlite.wasm';
      }
      return file;
    },
  };
}

// ⛔ Prevent splash screen from auto-hiding until app is ready
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setAppReady] = useState(false);
  const [isOnline, setOnline] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await createTables();

        const netInfo = await Network.getNetworkStateAsync();
        const online = netInfo.isConnected ?? false;
        setOnline(online);

        if (online && Platform.OS !== 'web') {
          await syncUnsyncedData();
        }

      } catch (error) {
        console.error('App initialization failed:', error);
      } finally {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  if (!isAppReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#666" />
        <Text style={styles.loadingText}>Setting things up...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#444',
  },
});
