import { createClient } from '@supabase/supabase-js';

// Cria uma única instância do cliente Supabase para ser usada no app todo
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);