// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Puxa as variáveis do cofre (.env.local) de forma segura
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cria a conexão única que será reaproveitada no projeto
export const supabase = createClient(supabaseUrl, supabaseKey);