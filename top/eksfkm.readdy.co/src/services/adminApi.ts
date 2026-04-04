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
  impact: string;
  category: string;
  image: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProgramFormData {
  title: string;
  description: string;
  impact: string;
  category: string;
  image?: string;
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
  image: string;
  is_featured: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export interface EventFormData {
  title: string;
  description: string;
  event_type: 'run' | 'celebration' | 'fundraiser' | 'corporate';
  event_date: string;
  location?: string;
  participants?: number;
  funds_raised?: number;
  image?: string;
  is_featured?: boolean;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

// School Building types
export interface SchoolBuilding {
  id: string;
  phase: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  start_date?: string | null;
  end_date?: string | null;
  budget?: number;
  progress_percentage: number;
  target_amount?: number;
  raised_amount?: number;
  currency?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SchoolBuildingFormData {
  phase: string;
  title: string;
  description: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'delayed';
  start_date?: string | null;
  end_date?: string | null;
  budget?: number;
  progress_percentage?: number;
  target_amount?: number;
  raised_amount?: number;
  currency?: string;
  image?: string;
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
  created_at?: string;
  updated_at?: string;
}

export interface SuccessStoryFormData {
  student_name: string;
  age: number;
  story: string;
  impact: string;
  category: 'education' | 'community' | 'volunteer';
  image?: string;
  is_featured?: boolean;
  status?: 'draft' | 'published' | 'archived';
}

export interface SchoolBuilding {
  id: string;
  title: string;
  description: string;
  phase: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  start_date?: string | null;
  end_date?: string | null;
  budget?: number;
  progress?: number;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SchoolBuildingFormData {
  title: string;
  description: string;
  phase: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'delayed';
  start_date?: string | null;
  end_date?: string | null;
  budget?: number;
  progress?: number;
  image?: string;
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

      const isFormData = options.body instanceof FormData;

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
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

  // Events API calls
  async getEvents(): Promise<ApiResponse<Event[]>> {
    return this.request<Event[]>('/api/admin/events');
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

  async updateSchoolBuildingProgress(id: string, progress: number): Promise<ApiResponse<SchoolBuilding>> {
    return this.request<SchoolBuilding>(`/api/admin/school-building/${id}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ progress }),
    });
  }

  // Success Stories API calls
  async getSuccessStories(): Promise<ApiResponse<SuccessStory[]>> {
    return this.request<SuccessStory[]>('/api/admin/success-stories');
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
    });
  }
}

export const adminApi = new AdminApiService();
export default adminApi;