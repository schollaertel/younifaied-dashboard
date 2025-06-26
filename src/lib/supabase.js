<<<<<<< HEAD
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kugyztiwixrsbtjpewrd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1Z3l6dGl3aXhyc2J0anBld3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTAxMDMsImV4cCI6MjA2NTgyNjEwM30.SgKuehmL7L_4ApdHU9aE786lDGYAZFYr-wk01MqK-Wc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

=======
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
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
