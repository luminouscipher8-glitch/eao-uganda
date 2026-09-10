import { supabase } from '../lib/supabase.js';
import dotenv from 'dotenv';

dotenv.config();

async function createTables() {
  console.log('🏗️  Creating database tables...');

  try {
    // Create programs table
    console.log('📋 Creating programs table...');
    const { error: programsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.programs (
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
        
        -- Enable RLS
        ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for authenticated users to read programs
        CREATE POLICY "Authenticated users can view programs" ON public.programs
          FOR SELECT USING (auth.role() = 'authenticated');
        
        -- Create policy for admin users to insert programs
        CREATE POLICY "Admin users can insert programs" ON public.programs
          FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin');
        
        -- Create policy for admin users to update programs
        CREATE POLICY "Admin users can update programs" ON public.programs
          FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');
        
        -- Create policy for admin users to delete programs
        CREATE POLICY "Admin users can delete programs" ON public.programs
          FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');
        
        -- Create index for better performance
        CREATE INDEX IF NOT EXISTS idx_programs_category ON public.programs(category);
        CREATE INDEX IF NOT EXISTS idx_programs_is_active ON public.programs(is_active);
        CREATE INDEX IF NOT EXISTS idx_programs_created_at ON public.programs(created_at DESC);
      `
    });

    if (programsError) {
      console.error('❌ Error creating programs table:', programsError);
    } else {
      console.log('✅ Programs table created successfully!');
    }

    // Create news table
    console.log('📰 Creating news table...');
    const { error: newsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.news (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          excerpt TEXT,
          image TEXT DEFAULT '/images/news/default.jpg',
          author TEXT DEFAULT 'EAO Team',
          is_published BOOLEAN DEFAULT false,
          published_at TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for authenticated users to read published news
        CREATE POLICY "Authenticated users can view published news" ON public.news
          FOR SELECT USING (auth.role() = 'authenticated' AND is_published = true);
        
        -- Create policy for admin users to manage news
        CREATE POLICY "Admin users can manage news" ON public.news
          FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
        
        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_news_is_published ON public.news(is_published);
        CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news(published_at DESC);
        CREATE INDEX IF NOT EXISTS idx_news_created_at ON public.news(created_at DESC);
      `
    });

    if (newsError) {
      console.error('❌ Error creating news table:', newsError);
    } else {
      console.log('✅ News table created successfully!');
    }

    // Create contacts table
    console.log('📧 Creating contacts table...');
    const { error: contactsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.contacts (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          message TEXT NOT NULL,
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'responded')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for anyone to submit contact forms
        CREATE POLICY "Anyone can create contacts" ON public.contacts
          FOR INSERT WITH CHECK (true);
        
        -- Create policy for admin users to manage contacts
        CREATE POLICY "Admin users can manage contacts" ON public.contacts
          FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
        
        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
        CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);
      `
    });

    if (contactsError) {
      console.error('❌ Error creating contacts table:', contactsError);
    } else {
      console.log('✅ Contacts table created successfully!');
    }

    // Create donations table
    console.log('💰 Creating donations table...');
    const { error: donationsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.donations (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          amount DECIMAL(12,2) NOT NULL,
          currency TEXT DEFAULT 'UGX' NOT NULL,
          donor_name TEXT NOT NULL,
          donor_email TEXT NOT NULL,
          donor_phone TEXT,
          payment_method TEXT DEFAULT 'mobile_money',
          is_recurring BOOLEAN DEFAULT false,
          campaign TEXT DEFAULT 'general',
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for authenticated users to view their own donations
        CREATE POLICY "Users can view own donations" ON public.donations
          FOR SELECT USING (auth.email() = donor_email);
        
        -- Create policy for admin users to manage donations
        CREATE POLICY "Admin users can manage donations" ON public.donations
          FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
        
        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations(status);
        CREATE INDEX IF NOT EXISTS idx_donations_donor_email ON public.donations(donor_email);
        CREATE INDEX IF NOT EXISTS idx_donations_created_at ON public.donations(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_donations_campaign ON public.donations(campaign);
      `
    });

    if (donationsError) {
      console.error('❌ Error creating donations table:', donationsError);
    } else {
      console.log('✅ Donations table created successfully!');
    }

    // Create volunteers table
    console.log('🤝 Creating volunteers table...');
    const { error: volunteersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.volunteers (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          skills TEXT[],
          availability TEXT,
          motivation TEXT,
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for authenticated users to view their own applications
        CREATE POLICY "Users can view own volunteer applications" ON public.volunteers
          FOR SELECT USING (auth.email() = email);
        
        -- Create policy for admin users to manage volunteers
        CREATE POLICY "Admin users can manage volunteers" ON public.volunteers
          FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
        
        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_volunteers_status ON public.volunteers(status);
        CREATE INDEX IF NOT EXISTS idx_volunteers_email ON public.volunteers(email);
        CREATE INDEX IF NOT EXISTS idx_volunteers_created_at ON public.volunteers(created_at DESC);
      `
    });

    if (volunteersError) {
      console.error('❌ Error creating volunteers table:', volunteersError);
    } else {
      console.log('✅ Volunteers table created successfully!');
    }

    console.log('🎉 All tables created successfully!');
    console.log('📊 Database is now ready for real data!');

  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
}

createTables();
