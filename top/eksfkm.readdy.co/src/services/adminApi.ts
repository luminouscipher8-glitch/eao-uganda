import { supabase } from '../contexts/AuthContext';

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Dashboard stats types
export interface DashboardStats {
  totalPrograms: number;
  totalNews: number;
  totalContacts: number;
  totalDonations: number;
  totalVolunteers: number;
  totalVisitors: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'donation' | 'contact' | 'volunteer' | 'program';
  message: string;
  time: string;
  icon: string;
}

// Program types
export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  impact: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

export interface ProgramFormData {
  title: string;
  description: string;
  image: string;
  impact: string;
  category: string;
}

// News types
export interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  status: 'draft' | 'published';
  published_at?: string;
}

export interface NewsFormData {
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  status: 'draft' | 'published';
  published_at?: string;
}

// Contact types
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  created_at: string;
}

// Donation types
export interface Donation {
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
}

// Volunteer types
export interface Volunteer {
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
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  event_type: 'run' | 'celebration' | 'fundraiser' | 'corporate';
  event_date: string;
  location?: string;
  participants: number;
  funds_raised: number;
  currency: string;
  image: string;
  is_featured: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_at: string;
}

export interface EventFormData {
  title: string;
  description: string;
  event_type: 'run' | 'celebration' | 'fundraiser' | 'corporate';
  event_date: string;
  location?: string;
  participants?: number;
  funds_raised?: number;
  image: string;
  is_featured?: boolean;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

// School Building types
export interface SchoolBuilding {
  id: string;
  phase: string;
  title: string;
  description: string;
  progress_percentage: number;
  target_amount: number;
  raised_amount: number;
  currency: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  image: string;
  completion_date?: string;
  is_featured?: boolean;
  created_at: string;
}

export interface SchoolBuildingFormData {
  phase: string;
  title: string;
  description: string;
  progress_percentage?: number;
  target_amount: number;
  raised_amount?: number;
  currency?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'delayed';
  image: string;
  completion_date?: string;
  is_featured?: boolean;
}

// Success Story types
export interface SuccessStory {
  id: string;
  student_name: string;
  age: number;
  story: string;
  impact: string;
  category: 'education' | 'community' | 'volunteer';
  image: string;
  is_featured: boolean;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
}

export interface SuccessStoryFormData {
  student_name: string;
  age: number;
  story: string;
  impact: string;
  category: 'education' | 'community' | 'volunteer';
  image: string;
  is_featured?: boolean;
  status?: 'draft' | 'published' | 'archived';
}

// Admin API Service
class AdminApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  }

  // Generic request method with authentication
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const session = await supabase.auth.getSession();
      const token = session?.data.session?.access_token;

      if (!token) {
        return {
          success: false,
          error: 'Authentication required. Please log in.',
        };
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data: data.data || data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Dashboard API calls
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.request<DashboardStats>('/api/admin/dashboard/stats');
  }

  // Programs API calls
  async getPrograms(): Promise<ApiResponse<Program[]>> {
    return this.request<Program[]>('/api/admin/programs');
  }

  async getProgram(id: string): Promise<ApiResponse<Program>> {
    return this.request<Program>(`/api/admin/programs/${id}`);
  }

  async createProgram(program: ProgramFormData): Promise<ApiResponse<Program>> {
    return this.request<Program>('/api/admin/programs', {
      method: 'POST',
      body: JSON.stringify(program),
    });
  }

  async updateProgram(id: string, program: Partial<ProgramFormData>): Promise<ApiResponse<Program>> {
    return this.request<Program>(`/api/admin/programs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(program),
    });
  }

  async deleteProgram(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/admin/programs/${id}`, {
      method: 'DELETE',
    });
  }

  // News API calls
  async getNews(): Promise<ApiResponse<News[]>> {
    return this.request<News[]>('/api/admin/news');
  }

  async getNewsItem(id: string): Promise<ApiResponse<News>> {
    return this.request<News>(`/api/admin/news/${id}`);
  }

  async createNews(news: NewsFormData): Promise<ApiResponse<News>> {
    return this.request<News>('/api/admin/news', {
      method: 'POST',
      body: JSON.stringify(news),
    });
  }

  async updateNews(id: string, news: Partial<NewsFormData>): Promise<ApiResponse<News>> {
    return this.request<News>(`/api/admin/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(news),
    });
  }

  async deleteNews(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/admin/news/${id}`, {
      method: 'DELETE',
    });
  }

  // Contacts API calls
  async getContacts(): Promise<ApiResponse<Contact[]>> {
    return this.request<Contact[]>('/api/admin/contacts');
  }

  async updateContactStatus(id: string, status: Contact['status']): Promise<ApiResponse<Contact>> {
    return this.request<Contact>(`/api/admin/contacts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteContact(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/admin/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Donations API calls
  async getDonations(): Promise<ApiResponse<Donation[]>> {
    return this.request<Donation[]>('/api/admin/donations');
  }

  async updateDonationStatus(id: string, status: Donation['status']): Promise<ApiResponse<Donation>> {
    return this.request<Donation>(`/api/admin/donations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Volunteers API calls
  async getVolunteers(): Promise<ApiResponse<Volunteer[]>> {
    return this.request<Volunteer[]>('/api/admin/volunteers');
  }

  async updateVolunteerStatus(id: string, status: Volunteer['status']): Promise<ApiResponse<Volunteer>> {
    return this.request<Volunteer>(`/api/admin/volunteers/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Events API calls
  async getEvents(): Promise<ApiResponse<Event[]>> {
    return this.request<Event[]>('/api/admin/events');
  }

  async getEvent(id: string): Promise<ApiResponse<Event>> {
    return this.request<Event>(`/api/admin/events/${id}`);
  }

  async createEvent(event: EventFormData): Promise<ApiResponse<Event>> {
    return this.request<Event>('/api/admin/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async updateEvent(id: string, event: Partial<EventFormData>): Promise<ApiResponse<Event>> {
    return this.request<Event>(`/api/admin/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(event),
    });
  }

  async deleteEvent(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/admin/events/${id}`, {
      method: 'DELETE',
    });
  }

  async updateEventStatus(id: string, status: Event['status']): Promise<ApiResponse<Event>> {
    return this.request<Event>(`/api/admin/events/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // School Building API calls
  async getSchoolBuilding(): Promise<ApiResponse<SchoolBuilding[]>> {
    return this.request<SchoolBuilding[]>('/api/admin/school-building');
  }

  async getSchoolBuildingPhase(id: string): Promise<ApiResponse<SchoolBuilding>> {
    return this.request<SchoolBuilding>(`/api/admin/school-building/${id}`);
  }

  async createSchoolBuildingPhase(phase: SchoolBuildingFormData): Promise<ApiResponse<SchoolBuilding>> {
    return this.request<SchoolBuilding>('/api/admin/school-building', {
      method: 'POST',
      body: JSON.stringify(phase),
    });
  }

  async updateSchoolBuildingPhase(id: string, phase: Partial<SchoolBuildingFormData>): Promise<ApiResponse<SchoolBuilding>> {
    return this.request<SchoolBuilding>(`/api/admin/school-building/${id}`, {
      method: 'PUT',
      body: JSON.stringify(phase),
    });
  }

  async deleteSchoolBuildingPhase(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/admin/school-building/${id}`, {
      method: 'DELETE',
    });
  }

  async updateSchoolBuildingProgress(id: string, progress_percentage: number): Promise<ApiResponse<SchoolBuilding>> {
    return this.request<SchoolBuilding>(`/api/admin/school-building/${id}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ progress_percentage }),
    });
  }

  // Success Stories API calls
  async getSuccessStories(): Promise<ApiResponse<SuccessStory[]>> {
    return this.request<SuccessStory[]>('/api/admin/success-stories');
  }

  async getSuccessStory(id: string): Promise<ApiResponse<SuccessStory>> {
    return this.request<SuccessStory>(`/api/admin/success-stories/${id}`);
  }

  async createSuccessStory(story: SuccessStoryFormData): Promise<ApiResponse<SuccessStory>> {
    return this.request<SuccessStory>('/api/admin/success-stories', {
      method: 'POST',
      body: JSON.stringify(story),
    });
  }

  async updateSuccessStory(id: string, story: Partial<SuccessStoryFormData>): Promise<ApiResponse<SuccessStory>> {
    return this.request<SuccessStory>(`/api/admin/success-stories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(story),
    });
  }

  async deleteSuccessStory(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/admin/success-stories/${id}`, {
      method: 'DELETE',
    });
  }

  async updateSuccessStoryStatus(id: string, status: SuccessStory['status']): Promise<ApiResponse<SuccessStory>> {
    return this.request<SuccessStory>(`/api/admin/success-stories/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async toggleSuccessStoryFeatured(id: string): Promise<ApiResponse<SuccessStory>> {
    return this.request<SuccessStory>(`/api/admin/success-stories/${id}/featured`, {
      method: 'PATCH',
    });
  }

  // File upload API
  async uploadFile(file: File, folder: string = 'uploads'): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return this.request<{ url: string }>('/api/admin/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  // Analytics API
  async getAnalytics(period: 'week' | 'month' | 'year' = 'month'): Promise<ApiResponse<any>> {
    return this.request<any>(`/api/admin/analytics?period=${period}`);
  }
}

export const adminApi = new AdminApiService();
export default adminApi;
