import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Database features will be disabled.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface Database {
  public: {
    Tables: {
      donations: {
        Row: {
          id: string;
          amount: number;
          currency: string;
          donor_name: string;
          donor_email: string;
          donor_phone?: string;
          payment_method: string;
          is_recurring: boolean;
          campaign?: string;
          status: 'pending' | 'completed' | 'failed';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['donations']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['donations']['Insert']>;
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone?: string;
          subject: string;
          message: string;
          status: 'new' | 'in_progress' | 'resolved';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contacts']['Row'], 'id' | 'status' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>;
      };
      volunteers: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          age: string;
          occupation: string;
          skills: string[];
          availability: string;
          motivation: string;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['volunteers']['Row'], 'id' | 'status' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['volunteers']['Insert']>;
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          name?: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['newsletter_subscribers']['Row'], 'id' | 'is_active' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>;
      };
      programs: {
        Row: {
          id: string;
          title: string;
          description: string;
          image: string;
          impact: string;
          category: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['programs']['Row'], 'id' | 'is_active' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['programs']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          date: string;
          location: string;
          image: string;
          participants?: string;
          raised?: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'is_active' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      success_stories: {
        Row: {
          id: string;
          name: string;
          age: string;
          story: string;
          impact: string;
          category: string;
          image: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['success_stories']['Row'], 'id' | 'is_active' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['success_stories']['Insert']>;
      };
    };
  };
}

// Helper functions for database operations
export const dbOperations = {
  // Donations
  async createDonation(donation: Database['public']['Tables']['donations']['Insert']) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('donations')
      .insert(donation)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getDonations() {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // Contacts
  async createContact(contact: Database['public']['Tables']['contacts']['Insert']) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('contacts')
      .insert(contact)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Volunteers
  async createVolunteer(volunteer: Database['public']['Tables']['volunteers']['Insert']) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('volunteers')
      .insert(volunteer)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Newsletter
  async subscribeToNewsletter(subscription: Database['public']['Tables']['newsletter_subscribers']['Insert']) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert(subscription)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Programs
  async getPrograms() {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // Events
  async getEvents() {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('date', { ascending: true });
    if (error) throw error;
    return data;
  },

  // Success Stories
  async getSuccessStories() {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
};

export default supabase;
