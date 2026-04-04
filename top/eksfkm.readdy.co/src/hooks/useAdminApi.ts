import { useState, useEffect, useCallback } from 'react';
import { adminApi, ApiResponse } from '../services/adminApi';

// Generic hook for API calls with loading and error states
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Specific hooks for supported data types
export function useDashboardStats() {
  return useApi(() => adminApi.getDashboardStats());
}

export function usePrograms() {
  return useApi(() => adminApi.getPrograms());
}

export function useEvents() {
  return useApi(() => adminApi.getEvents());
}

export function useSchoolBuilding() {
  return useApi(() => adminApi.getSchoolBuilding());
}

export function useSuccessStories() {
  return useApi(() => adminApi.getSuccessStories());
}

// Hook for mutations (create, update, delete)
export function useMutation<T, P = any>(
  mutationCall: (params: P) => Promise<ApiResponse<T>>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: P): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationCall(params);

      if (result.success && result.data) {
        return result.data;
      } else {
        setError(result.error || 'Operation failed');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, [mutationCall]);

  const reset = useCallback(() => {
    setError(null);
    setLoading(false);
  }, []);

  return { mutate, loading, error, reset };
}

// Program mutations
export function useCreateProgram() {
  return useMutation((program: Parameters<typeof adminApi.createProgram>[0]) =>
    adminApi.createProgram(program)
  );
}

export function useUpdateProgram() {
  return useMutation(
    ({ id, program }: { id: string; program: Parameters<typeof adminApi.updateProgram>[1] }) =>
      adminApi.updateProgram(id, program)
  );
}

export function useDeleteProgram() {
  return useMutation((id: string) => adminApi.deleteProgram(id));
}

// Event mutations
export function useCreateEvent() {
  return useMutation((event: Parameters<typeof adminApi.createEvent>[0]) =>
    adminApi.createEvent(event)
  );
}

export function useUpdateEvent() {
  return useMutation(
    ({ id, event }: { id: string; event: Parameters<typeof adminApi.updateEvent>[1] }) =>
      adminApi.updateEvent(id, event)
  );
}

export function useDeleteEvent() {
  return useMutation((id: string) => adminApi.deleteEvent(id));
}

export function useUpdateEventStatus() {
  return useMutation(
    ({ id, status }: { id: string; status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled' }) =>
      adminApi.updateEventStatus(id, status)
  );
}

// School Building mutations
export function useCreateSchoolBuildingPhase() {
  return useMutation((phase: Parameters<typeof adminApi.createSchoolBuildingPhase>[0]) =>
    adminApi.createSchoolBuildingPhase(phase)
  );
}

export function useUpdateSchoolBuildingPhase() {
  return useMutation(
    ({ id, phase }: { id: string; phase: Parameters<typeof adminApi.updateSchoolBuildingPhase>[1] }) =>
      adminApi.updateSchoolBuildingPhase(id, phase)
  );
}

export function useDeleteSchoolBuildingPhase() {
  return useMutation((id: string) => adminApi.deleteSchoolBuildingPhase(id));
}

export function useUpdateSchoolBuildingProgress() {
  return useMutation(
    ({ id, progress }: { id: string; progress: number }) =>
      adminApi.updateSchoolBuildingProgress(id, progress)
  );
}

// Success Stories mutations
export function useCreateSuccessStory() {
  return useMutation((story: Parameters<typeof adminApi.createSuccessStory>[0]) =>
    adminApi.createSuccessStory(story)
  );
}

export function useUpdateSuccessStory() {
  return useMutation(
    ({ id, story }: { id: string; story: Parameters<typeof adminApi.updateSuccessStory>[1] }) =>
      adminApi.updateSuccessStory(id, story)
  );
}

export function useDeleteSuccessStory() {
  return useMutation((id: string) => adminApi.deleteSuccessStory(id));
}

export function useUpdateSuccessStoryStatus() {
  return useMutation(
    ({ id, status }: { id: string; status: 'draft' | 'published' | 'archived' }) =>
      adminApi.updateSuccessStoryStatus(id, status)
  );
}

export function useToggleSuccessStoryFeatured() {
  return useMutation((id: string) => adminApi.toggleSuccessStoryFeatured(id));
}

export function useFileUpload() {
  return useMutation(
    ({ file, folder }: { file: File; folder?: string }) =>
      adminApi.uploadFile(file, folder)
  );
}

// Combined hook for supported admin API operations
export function useAdminApi() {
  return {
    programs: {
      getPrograms: () => adminApi.getPrograms(),
      createProgram: (data: any) => adminApi.createProgram(data),
      updateProgram: (id: string, data: any) => adminApi.updateProgram(id, data),
      deleteProgram: (id: string) => adminApi.deleteProgram(id),
    },
    events: {
      getEvents: () => adminApi.getEvents(),
      createEvent: (data: any) => adminApi.createEvent(data),
      updateEvent: (id: string, data: any) => adminApi.updateEvent(id, data),
      deleteEvent: (id: string) => adminApi.deleteEvent(id),
      updateEventStatus: (id: string, status: any) => adminApi.updateEventStatus(id, status),
    },
    schoolBuilding: {
      getSchoolBuilding: () => adminApi.getSchoolBuilding(),
      createSchoolBuildingPhase: (data: any) => adminApi.createSchoolBuildingPhase(data),
      updateSchoolBuildingPhase: (id: string, data: any) => adminApi.updateSchoolBuildingPhase(id, data),
      deleteSchoolBuildingPhase: (id: string) => adminApi.deleteSchoolBuildingPhase(id),
      updateSchoolBuildingProgress: (id: string, progress: number) =>
        adminApi.updateSchoolBuildingProgress(id, progress),
    },
    successStories: {
      getSuccessStories: () => adminApi.getSuccessStories(),
      createSuccessStory: (data: any) => adminApi.createSuccessStory(data),
      updateSuccessStory: (id: string, data: any) => adminApi.updateSuccessStory(id, data),
      deleteSuccessStory: (id: string) => adminApi.deleteSuccessStory(id),
      updateSuccessStoryStatus: (id: string, status: any) =>
        adminApi.updateSuccessStoryStatus(id, status),
      toggleSuccessStoryFeatured: (id: string) =>
        adminApi.toggleSuccessStoryFeatured(id),
    },
    dashboard: {
      getStats: () => adminApi.getDashboardStats(),
    },
  };
}