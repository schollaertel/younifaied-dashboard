// src/lib/supabase.js

import { createClient } from '@supabase/supabase-js'

// Vite env vars (make sure .env has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// initialize client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// default + named export
export default supabase
export { supabase }
