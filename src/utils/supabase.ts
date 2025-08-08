// FILE: supabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jvwvlzyqslctrfrqfhba.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2d3Zsenlxc2xjdHJmcnFmaGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NzE0ODgsImV4cCI6MjA3MDE0NzQ4OH0.muZNUuVgWhVjq44qwNnhf-6DJDVE6w6ULn5J6H1_8-E"
export const supabase = createClient(supabaseUrl, supabaseKey);

// Add a new record to any table
export const addRecord = async <T>(table: string, data: T) => {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select(); // to return inserted data
  return { result, error };
};

// Fetch all records from any table
export const fetchRecords = async <T>(table: string) => {
  const { data, error } = await supabase
    .from(table)
    .select('*');
  return { data, error };
};

// Update a record in any table by ID
export const updateRecord = async <T>(table: string, id: string, updates: Partial<T>) => {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq('id', id)
    .select(); // return updated data
  return { data, error };
};

// Delete a record from any table by ID
export const deleteRecord = async (table: string, id: string) => {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
  return { data, error };
};