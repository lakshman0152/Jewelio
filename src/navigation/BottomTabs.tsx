// src/navigation/BottomTabs.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import InventoryScreen from '../screens/InventoryScreen';
import CustomerScreen from '../screens/CustomerScreen';
import SalesScreen from '../screens/SalesScreen';
import PurchaseScreen from '../screens/PurchaseScreen';
import AccountScreen from '../screens/AccountScreen';
import Colors from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cube-outline"
              size={24}
              color={focused ? Colors.tabIconActive : Colors.tabIconInactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Customers"
        component={CustomerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="people-alt"
              size={24}
              color={focused ? Colors.tabIconActive : Colors.tabIconInactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sales"
        component={SalesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.middleIconWrapper,
                focused && styles.middleIconActive, // ⬅️ Apply active color if focused
              ]}
            >
              <FontAwesome5 name="shopping-bag" size={30} color="#fff" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Purchases"
        component={PurchaseScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cart-outline"
              size={24}
              color={focused ? Colors.tabIconActive : Colors.tabIconInactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="person-outline"
              size={24}
              color={focused ? Colors.tabIconActive : Colors.tabIconInactive}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 65,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: Colors.tabBarBackground,
    borderTopWidth: 0,
    elevation: 10,
  },
  middleIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.tabIconInactive,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'android' ? 30 : 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 10,
  },
  middleIconActive: {
    backgroundColor: Colors.primary
  },
});
