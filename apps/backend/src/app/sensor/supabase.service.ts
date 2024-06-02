// supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://oyxwpkznmawsavvqhgxl.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95eHdwa3pubWF3c2F2dnFoZ3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3NzE0ODUsImV4cCI6MjAyNDM0NzQ4NX0.SD1ZiGx2r9u3m6lY6iC7MMKEgvxW4NT5AvyT7qlZzfw'
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}

export default SupabaseService ; // Export the SupabaseService
