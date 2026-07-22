import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ycawgqzbognosxscgomc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljYXdncXpib2dub3N4c2Nnb21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NzQ4NTAsImV4cCI6MjEwMDA1MDg1MH0.26Jip9u3nwt0qVVBAlV1zReoUOxyXFomYWhQOZT6S2M';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createDummies() {
  const users = [
    { email: 'manager.hr@demo.com', password: 'password123', data: { full_name: 'Sarah (HR Manager)' } },
    { email: 'staff.it@demo.com', password: 'password123', data: { full_name: 'Budi (IT Staff)' } },
    { email: 'staff.marketing@demo.com', password: 'password123', data: { full_name: 'Citra (Marketing)' } }
  ];

  console.log("Creating dummy accounts...");

  for (const u of users) {
    const { data, error } = await supabase.auth.signUp({
      email: u.email,
      password: u.password,
      options: {
        data: u.data
      }
    });
    if (error) {
      console.error(`[X] Gagal membuat ${u.email}:`, error.message);
    } else {
      console.log(`[V] Berhasil! ${u.email} (Password: ${u.password})`);
    }
  }
}

createDummies();
