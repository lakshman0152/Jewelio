// sqlite.ts

import { openDatabaseSync } from 'expo-sqlite';
import { Platform } from 'react-native';

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

export const db = openDatabaseSync('jewelio.db');

export const createTables = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS Inventory (
      itemId TEXT PRIMARY KEY,
      inventoryId TEXT UNIQUE,
      itemName TEXT,
      category TEXT,
      netWeight REAL,
      grossWeight REAL,
      karatPurity TEXT,
      status TEXT,
      purchaseDate TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isSynced INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS Customers (
      customerId TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      profileImage TEXT,
      contactNumber TEXT,
      address TEXT,
      gender TEXT,
      age INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isSynced INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS Schemes (
      schemeId TEXT PRIMARY KEY,
      schemeName TEXT NOT NULL,
      description TEXT,
      startDate TEXT,
      endDate TEXT,
      discountRate REAL,
      minPurchaseAmount REAL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isSynced INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS Sales (
      salesId TEXT PRIMARY KEY,
      itemId TEXT,
      customerId TEXT,
      schemeId TEXT,
      saleDate TEXT,
      status TEXT,
      quantity INTEGER,
      totalAmount REAL,
      vastage REAL,
      makingCharges REAL,
      hallmarkCharges REAL,
      discount REAL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isSynced INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS Purchases (
      purchaseId TEXT PRIMARY KEY,
      inventoryId TEXT,
      purchasedFrom TEXT,
      purchaseDate TEXT,
      quantity INTEGER,
      purchaseItemName TEXT,
      totalAmount REAL,
      netWeight REAL,
      grossWeight REAL,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isSynced INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS Profile (
      profileId TEXT PRIMARY KEY,
      businessName TEXT,
      ownerName TEXT,
      address TEXT,
      subscription TEXT,
      contactNumber TEXT,
      gstNumber TEXT,
      userId TEXT,
      password TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isSynced INTEGER DEFAULT 0
    );
  `);
};
