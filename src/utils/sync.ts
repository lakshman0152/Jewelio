// src/utils/sync.ts

import { db } from './sqlite';
import { supabase } from '../utils/supabase';
import { Platform } from 'react-native';

type TableName =
  | 'Inventory'
  | 'Customers'
  | 'Schemes'
  | 'Sales'
  | 'Purchases'
  | 'Profile';

const tablePrimaryKeys: Record<TableName, string> = {
  Inventory: 'itemId',
  Customers: 'customerId',
  Schemes: 'schemeId',
  Sales: 'salesId',
  Purchases: 'purchaseId',
  Profile: 'profileId'
};

// Fetch unsynced rows from a table
const getUnsyncedRows = async (table: TableName): Promise<any[]> => {
  const result = await db.getAllAsync(`SELECT * FROM ${table} WHERE isSynced = 0`);
  return result;
};

// Mark rows as synced
const markRowsAsSynced = async (table: TableName, ids: string[]) => {
  if (ids.length === 0) return;

  const primaryKey = tablePrimaryKeys[table];
  const placeholders = ids.map(() => '?').join(',');
  await db.runAsync(
    `UPDATE ${table} SET isSynced = 1 WHERE ${primaryKey} IN (${placeholders})`,
    ids
  );
};

// Upload rows to Supabase
const uploadToSupabase = async (table: TableName, rows: any[]) => {
  const { error } = await supabase.from(table).upsert(rows, { onConflict: tablePrimaryKeys[table] });
  return error;
};

// Sync a single table
const syncTableData = async (table: TableName) => {
  try {
    const unsyncedRows = await getUnsyncedRows(table);

    if (unsyncedRows.length === 0) {
      console.log(`✅ ${table}: No unsynced rows`);
      return;
    }

    const error = await uploadToSupabase(table, unsyncedRows);

    if (!error) {
      const ids = unsyncedRows.map((row) => row[tablePrimaryKeys[table]]);
      await markRowsAsSynced(table, ids);
      console.log(`✅ ${table}: Synced ${ids.length} rows`);
    } else {
      console.error(`❌ ${table}: Failed to sync`, error.message);
    }
  } catch (err) {
    console.error(`❌ ${table}: Unexpected error during sync`, err);
  }
};

// Master sync function
export const syncUnsyncedData = async () => {
  if (Platform.OS === 'web') {
    console.warn('🛑 Sync not supported on web (SQLite not supported)');
    return;
  }

  const tables: TableName[] = [
    'Inventory',
    'Customers',
    'Schemes',
    'Sales',
    'Purchases',
    'Profile'
  ];

  for (const table of tables) {
    await syncTableData(table);
  }
};
