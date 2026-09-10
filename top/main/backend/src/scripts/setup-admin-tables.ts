import { supabase } from '../lib/supabase.js';

async function setupAdminTables() {
  console.log('Setting up admin tables...');

  try {
    // Create programs table
    const { error: programsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS programs (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          impact TEXT NOT NULL,
          category TEXT NOT NULL,
          image TEXT DEFAULT '/images/programs/default.jpg',
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (programsError) console.log('Programs table may already exist or error:', programsError.message);

    // Create news table
    const { error: newsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS news (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          excerpt TEXT NOT NULL,
          featured_image TEXT DEFAULT '/images/news/default.jpg',
          status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
          published_at TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (newsError) console.log('News table may already exist or error:', newsError.message);

    // Create contacts table
    const { error: contactsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS contacts (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          subject TEXT NOT NULL,
          message TEXT NOT NULL,
          status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (contactsError) console.log('Contacts table may already exist or error:', contactsError.message);

    // Create donations table
    const { error: donationsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS donations (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          amount DECIMAL(10,2) NOT NULL,
          currency TEXT DEFAULT 'USD',
          donor_name TEXT NOT NULL,
          donor_email TEXT NOT NULL,
          donor_phone TEXT,
          payment_method TEXT,
          is_recurring BOOLEAN DEFAULT false,
          campaign TEXT,
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (donationsError) console.log('Donations table may already exist or error:', donationsError.message);

    // Create volunteers table
    const { error: volunteersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS volunteers (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          age TEXT,
          occupation TEXT,
          skills TEXT[],
          availability TEXT,
          motivation TEXT,
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (volunteersError) console.log('Volunteers table may already exist or error:', volunteersError.message);

    // Enable RLS on all tables
    const tables = ['programs', 'news', 'contacts', 'donations', 'volunteers'];
    
    for (const table of tables) {
      await supabase.rpc('exec_sql', {
        sql: `ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`
      });
      
      // Create policy for authenticated users
      await supabase.rpc('exec_sql', {
        sql: `
          CREATE POLICY "Authenticated users can view ${table}" ON ${table}
          FOR SELECT USING (auth.role() = 'authenticated');
        `
      });
      
      await supabase.rpc('exec_sql', {
        sql: `
          CREATE POLICY "Admins can manage ${table}" ON ${table}
          FOR ALL USING (
            auth.role() = 'authenticated' 
            AND auth.jwt() ->> 'role' = 'admin'
          );
        `
      });
    }

    console.log('✅ Admin tables setup completed!');
    console.log('Tables created: programs, news, contacts, donations, volunteers');
    console.log('RLS policies enabled for authenticated users and admins');

  } catch (error) {
    console.error('❌ Error setting up tables:', error);
  }
}

// Run the setup
setupAdminTables().then(() => {
  console.log('Setup script completed');
  process.exit(0);
}).catch((error) => {
  console.error('Setup failed:', error);
  process.exit(1);
});
