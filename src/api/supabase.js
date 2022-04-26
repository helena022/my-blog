import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLIC_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, { localStorage: AsyncStorage });

export { supabase };
