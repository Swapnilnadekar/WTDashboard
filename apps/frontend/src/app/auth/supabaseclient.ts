import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oyxwpkznmawsavvqhgxl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95eHdwa3pubWF3c2F2dnFoZ3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3NzE0ODUsImV4cCI6MjAyNDM0NzQ4NX0.SD1ZiGx2r9u3m6lY6iC7MMKEgvxW4NT5AvyT7qlZzfw';
export const supabase = createClient(supabaseUrl, supabaseKey);
