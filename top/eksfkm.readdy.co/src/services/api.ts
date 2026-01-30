// API service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Generic API request function
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Contact form submission
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const submitContactForm = async (formData: ContactFormData): Promise<ApiResponse> => {
  return apiRequest('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Donation form submission
export interface DonationFormData {
  amount: string;
  currency: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  paymentMethod: string;
  isRecurring: boolean;
  campaign?: string;
}

export const submitDonation = async (formData: DonationFormData): Promise<ApiResponse> => {
  return apiRequest('/api/donations', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Volunteer form submission
export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  occupation: string;
  skills: string[];
  availability: string;
  motivation: string;
}

export const submitVolunteerForm = async (formData: VolunteerFormData): Promise<ApiResponse> => {
  return apiRequest('/api/volunteers', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Newsletter subscription
export interface NewsletterData {
  email: string;
  name?: string;
}

export const subscribeNewsletter = async (data: NewsletterData): Promise<ApiResponse> => {
  return apiRequest('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Get programs data
export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  impact: string;
  category: string;
}

export const getPrograms = async (): Promise<ApiResponse<Program[]>> => {
  return apiRequest('/api/programs');
};

// Get events data
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  participants?: string;
  raised?: string;
}

export const getEvents = async (): Promise<ApiResponse<Event[]>> => {
  return apiRequest('/api/events');
};

// Get success stories
export interface SuccessStory {
  id: number;
  name: string;
  age: string;
  story: string;
  impact: string;
  category: string;
  image: string;
}

export const getSuccessStories = async (): Promise<ApiResponse<SuccessStory[]>> => {
  return apiRequest('/api/success-stories');
};

// Get financial reports
export interface FinancialReport {
  id: string;
  title: string;
  period: string;
  downloadUrl: string;
  summary: string;
}

export const getFinancialReports = async (): Promise<ApiResponse<FinancialReport[]>> => {
  return apiRequest('/api/financial-reports');
};

// Health check
export const healthCheck = async (): Promise<ApiResponse> => {
  return apiRequest('/api/health');
};

export default {
  submitContactForm,
  submitDonation,
  submitVolunteerForm,
  subscribeNewsletter,
  getPrograms,
  getEvents,
  getSuccessStories,
  getFinancialReports,
  healthCheck,
};
