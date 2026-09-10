import { Router, Response } from 'express';
import { ApiResponse } from '../types/index.js';
import { supabase } from '../lib/supabase.js';

const router = Router();

router.get('/programs', async (_req, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('id,title,description,image,impact,category')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: data || [],
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch programs',
    } as ApiResponse);
  }
});

router.get('/events', async (_req, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('id,title,description,event_date,location,image,participants,funds_raised')
      .order('event_date', { ascending: true });

    if (error) throw error;

    const mapped = (data || []).map((event: any) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.event_date,
      location: event.location,
      image: event.image,
      participants: event.participants != null ? String(event.participants) : undefined,
      raised: event.funds_raised != null ? String(event.funds_raised) : undefined,
    }));

    res.json({
      success: true,
      data: mapped,
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch events',
    } as ApiResponse);
  }
});

router.get('/success-stories', async (_req, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('success_stories')
      .select('id,student_name,age,story,impact,category,image')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const mapped = (data || []).map((story: any) => ({
      id: story.id,
      name: story.student_name,
      age: story.age != null ? String(story.age) : '',
      story: story.story,
      impact: story.impact,
      category: story.category,
      image: story.image,
    }));

    res.json({
      success: true,
      data: mapped,
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch success stories',
    } as ApiResponse);
  }
});

export { router as publicRoutes };