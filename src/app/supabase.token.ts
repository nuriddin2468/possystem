import { InjectionToken } from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import { environment } from '../environments/environment';

export const SUPABASE = new InjectionToken<SupabaseClient>('supabaseClient', {
  providedIn: 'root',
  factory: () => createClient(environment.supabaseUrl, environment.supabaseKey),
});
