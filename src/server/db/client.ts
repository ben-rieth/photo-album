/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";
import type { SupabaseClient } from "@supabase/supabase-js";

import { env } from "../../env/server.mjs";

import { createClient } from '@supabase/supabase-js';
// import { StorageClient } from "@supabase/storage-js";
import type { Database } from '../../types/supabase';

declare global {
  var prisma: PrismaClient | undefined;
  var supabase: SupabaseClient | undefined;
  // var storage: StorageClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

export const supabase = global.supabase ||
  createClient<Database>(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_KEY,
  );

// export const storage = new StorageClient(
//   env.SUPABASE_STORAGE_URL,
//   {
//     apikey: env.SUPABASE_SERVICE_KEY,
//     Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`
//   }
// )

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
  global.supabase = supabase;
  // global.storage = storage;
}
