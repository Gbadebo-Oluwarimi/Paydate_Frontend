import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://pndvgskdnbtnuljcwcoc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZHZnc2tkbmJ0bnVsamN3Y29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2MTY1NjYsImV4cCI6MjAyODE5MjU2Nn0.5Y9nn4LyKmSNYEM7t4sk2zKliMiwXuxQ5W9O8zp0F-U"
);
