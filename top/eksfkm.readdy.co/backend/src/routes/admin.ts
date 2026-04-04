import { Router, Response } from 'express';
import { body, param } from 'express-validator';
import { SupabaseAuth } from '../middleware/supabaseAuth.js';
import { ApiResponse, AuthenticatedRequest } from '../types/index.js';
import { supabase } from '../lib/supabase.js';

const router = Router();

// Apply admin authentication and authorization to all admin routes
router.use(SupabaseAuth.requireAdmin);
// router.use(SupabaseAuth.requireAdmin);

// Dashboard stats endpoint
router.get('/dashboard/stats', async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Get real stats from database
    const [
      { count: totalPrograms },
      { count: totalNews },
      { count: totalContacts },
      { count: totalDonations },
      { count: totalVolunteers }
    ] = await Promise.all([
      supabase.from('programs').select('*', { count: 'exact', head: true }),
      supabase.from('news').select('*', { count: 'exact', head: true }),
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase.from('donations').select('*', { count: 'exact', head: true }),
      supabase.from('volunteers').select('*', { count: 'exact', head: true })
    ]);

    const stats = {
      totalPrograms: totalPrograms || 0,
      totalNews: totalNews || 0,
      totalContacts: totalContacts || 0,
      totalDonations: totalDonations || 0,
      totalVolunteers: totalVolunteers || 0,
      recentActivity: [] // TODO: Implement activity tracking
    };

    res.json({
      success: true,
      data: stats
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dashboard stats'
    } as ApiResponse);
  }
});

// Programs endpoints
router.get('/programs', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: programs, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data: programs || []
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch programs'
    } as ApiResponse);
  }
});

router.post('/programs', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('impact').notEmpty().withMessage('Impact description is required'),
  body('category').notEmpty().withMessage('Category is required'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, impact, category, image } = req.body;

    // Insert into database
    const { data: newProgram, error } = await supabase
      .from('programs')
      .insert({
        title,
        description,
        impact,
        category,
        image: image || '/images/programs/default.jpg',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.status(201).json({
      success: true,
      data: newProgram
    } as ApiResponse);
  } catch (error) {
    console.error('Create program error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create program'
    } as ApiResponse);
  }
});

router.put('/programs/:id', [
  param('id').notEmpty().withMessage('Program ID is required'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data: updatedProgram, error } = await supabase
      .from('programs')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data: updatedProgram
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update program'
    } as ApiResponse);
  }
});

router.delete('/programs/:id', [
  param('id').notEmpty().withMessage('Program ID is required')
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Soft delete by setting is_active to false
    const { error } = await supabase
      .from('programs')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      data: null
    } as ApiResponse<null>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete program'
    } as ApiResponse);
  }
});

// Events endpoints
router.get('/events', async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log('GET /events request received');
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('Events query result:', { events, error });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: events || []
    } as ApiResponse);
  } catch (error) {
    console.error('Fetch events error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch events'
    } as ApiResponse);
  }
});

router.post('/events', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('event_type').notEmpty().withMessage('Event type is required'),
  body('event_date').notEmpty().withMessage('Event date is required'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log('POST /events request received:', req.body);
    const { title, description, event_type, event_date, location, participants, funds_raised, image, is_featured, status } = req.body;

    // Insert into database
    const { data: newEvent, error } = await supabase
      .from('events')
      .insert({
        title,
        description,
        event_type,
        event_date,
        location: location || '',
        participants: participants || 0,
        funds_raised: funds_raised || 0,
        image: image || '/images/events/default.jpg',
        is_featured: is_featured || false,
        status: status || 'upcoming',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    console.log('Events insert result:', { newEvent, error });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.status(201).json({
      success: true,
      data: newEvent
    } as ApiResponse);
  } catch (error) {
    console.error('Create event error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create event'
    } as ApiResponse);
  }
});

router.put('/events/:id', [
  param('id').notEmpty().withMessage('Event ID is required'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data: updatedEvent, error } = await supabase
      .from('events')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: updatedEvent
    } as ApiResponse);
  } catch (error) {
    console.error('Update event error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update event'
    } as ApiResponse);
  }
});

router.delete('/events/:id', [
  param('id').notEmpty().withMessage('Event ID is required')
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: null
    } as ApiResponse);
  } catch (error) {
    console.error('Delete event error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete event'
    } as ApiResponse);
  }
});

// News endpoints
router.get('/news', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: news, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: news || []
    } as ApiResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch news'
    } as ApiResponse);
  }
});

router.post('/news', [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('status').isIn(['draft', 'published']).withMessage('Status must be draft or published'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, content, excerpt, featured_image, status, published_at } = req.body;

    const { data: newNews, error } = await supabase
      .from('news')
      .insert({
        title,
        content,
        excerpt,
        featured_image: featured_image || '/images/news/default.jpg',
        status,
        published_at: status === 'published' ? (published_at || new Date().toISOString()) : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.status(201).json({
      success: true,
      data: newNews
    } as ApiResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create news'
    } as ApiResponse);
  }
});

// GET individual news item
router.get('/news/:id', [
  param('id').notEmpty().withMessage('News ID is required')
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data: news, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: news
    } as ApiResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch news item'
    } as ApiResponse);
  }
});

// PUT update news item
router.put('/news/:id', [
  param('id').notEmpty().withMessage('News ID is required'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data: updatedNews, error } = await supabase
      .from('news')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
  success: true,
  data: updatedNews
} as ApiResponse);
  } catch (error) {
    return res.status(500).json({
  success: false,
  error: error instanceof Error ? error.message : 'Failed to update news'
} as ApiResponse);
  }
});

// DELETE news item
router.delete('/news/:id', [
  param('id').notEmpty().withMessage('News ID is required')
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
  success: true,
  data: null
} as ApiResponse);
  } catch (error) {
    return res.status(500).json({
  success: false,
  error: error instanceof Error ? error.message : 'Failed to delete news'
} as ApiResponse);
  }
});

// Contacts endpoint
router.get('/contacts', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: contacts || []
    } as ApiResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch contacts'
    } as ApiResponse);
  }
});

router.patch('/contacts/:id/status', [
  param('id').notEmpty().withMessage('Contact ID is required'),
  body('status').isIn(['new', 'in_progress', 'resolved']).withMessage('Invalid status'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data: updatedContact, error } = await supabase
      .from('contacts')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: updatedContact
    } as ApiResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update contact status'
    } as ApiResponse);
  }
});

// School Building endpoints
router.get('/school-building', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: phases, error } = await supabase
      .from('school_building')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: phases || []
    } as ApiResponse);
  } catch (error) {
    console.error('Fetch school building phases error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch school building phases'
    } as ApiResponse);
  }
});

router.post('/school-building', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('phase').notEmpty().withMessage('Phase is required'),
  body('progress_percentage').optional().isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
  body('target_amount').optional().isFloat({ min: 0 }).withMessage('Target amount must be positive'),
  body('raised_amount').optional().isFloat({ min: 0 }).withMessage('Raised amount must be positive'),
  body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, phase, status, start_date, end_date, budget, progress_percentage, target_amount, raised_amount, currency, image } = req.body;

    // Insert into database
    const { data: newPhase, error } = await supabase
      .from('school_building')
      .insert({
        title,
        description,
        phase,
        status: status || 'pending',
        start_date: start_date || null,
        end_date: end_date || null,
        budget: budget || 0,
        progress_percentage: progress_percentage || 0,
        target_amount: target_amount || 0,
        raised_amount: raised_amount || 0,
        currency: currency || 'UGX',
        image: image || '/images/school-building/default.jpg',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.status(201).json({
      success: true,
      data: newPhase
    } as ApiResponse);
  } catch (error) {
    console.error('Create school building phase error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create school building phase'
    } as ApiResponse);
  }
});

router.put('/school-building/:id', [
  param('id').notEmpty().withMessage('School building ID is required'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('progress_percentage').optional().isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
  body('target_amount').optional().isFloat({ min: 0 }).withMessage('Target amount must be positive'),
  body('raised_amount').optional().isFloat({ min: 0 }).withMessage('Raised amount must be positive'),
  body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Transform field names if needed
    const transformedUpdates = {
      ...updates,
      // Ensure progress_percentage is used instead of progress
      progress_percentage: updates.progress_percentage !== undefined ? updates.progress_percentage : updates.progress,
      // Remove progress field if it exists to avoid confusion
      ...(updates.progress !== undefined && { progress: undefined })
    };

    const { data: updatedPhase, error } = await supabase
      .from('school_building')
      .update({
        ...transformedUpdates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: updatedPhase
    } as ApiResponse);
  } catch (error) {
    console.error('Update school building phase error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update school building phase'
    } as ApiResponse);
  }
});

router.delete('/school-building/:id', [
  param('id').notEmpty().withMessage('School building ID is required')
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('school_building')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: null
    } as ApiResponse);
  } catch (error) {
    console.error('Delete school building phase error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete school building phase'
    } as ApiResponse);
  }
});

// Donations endpoint
router.get('/donations', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: donations, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: donations || []
    } as ApiResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch donations'
    } as ApiResponse);
  }
});

// Donation status update endpoint
router.patch('/donations/:id/status', [
  param('id').notEmpty().withMessage('Donation ID is required'),
  body('status').isIn(['pending', 'completed', 'failed', 'refunded']).withMessage('Invalid status'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data: updatedDonation, error } = await supabase
      .from('donations')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
  success: true,
  data: updatedDonation
} as ApiResponse);
  } catch (error) {
    return res.status(500).json({
  success: false,
  error: error instanceof Error ? error.message : 'Failed to update donation status'
} as ApiResponse);
  }
});

// Volunteers endpoint
router.get('/volunteers', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: volunteers, error } = await supabase
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: volunteers || []
    } as ApiResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch volunteers'
    } as ApiResponse);
  }
});

router.patch('/volunteers/:id/status', [
  param('id').notEmpty().withMessage('Volunteer ID is required'),
  body('status').isIn(['pending', 'approved', 'rejected']).withMessage('Invalid status'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data: updatedVolunteer, error } = await supabase
      .from('volunteers')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: updatedVolunteer
    } as ApiResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update volunteer status'
    } as ApiResponse);
  }
});

// Event status update endpoint
router.patch('/events/:id/status', [
  param('id').notEmpty().withMessage('Event ID is required'),
  body('status').isIn(['upcoming', 'ongoing', 'completed', 'cancelled']).withMessage('Invalid status'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data: updatedEvent, error } = await supabase
      .from('events')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: updatedEvent
    } as ApiResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update event status'
    } as ApiResponse);
  }
});

// Success Stories endpoints
router.get('/success-stories', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data: stories, error } = await supabase
      .from('success_stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: stories
    } as ApiResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch success stories'
    } as ApiResponse);
  }
});

router.post('/success-stories', [
  body('student_name').notEmpty().withMessage('Student name is required'),
  body('story').notEmpty().withMessage('Story is required'),
  body('impact').notEmpty().withMessage('Impact is required'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { student_name, age, story, impact, category, image, is_featured } = req.body;

    // Insert into database
    const { data: newStory, error } = await supabase
      .from('success_stories')
      .insert({
        student_name,
        age: age || null,
        story,
        impact,
        category: category || 'education',
        image: image || '/images/success-stories/default.jpg',
        is_featured: is_featured || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.status(201).json({
      success: true,
      data: newStory
    } as ApiResponse);
  } catch (error) {
    console.error('Create success story error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create success story'
    } as ApiResponse);
  }
});

router.put('/success-stories/:id', [
  param('id').notEmpty().withMessage('Success story ID is required'),
  body('student_name').optional().notEmpty().withMessage('Student name cannot be empty'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data: updatedStory, error } = await supabase
      .from('success_stories')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: updatedStory
    } as ApiResponse);
  } catch (error) {
    console.error('Update success story error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update success story'
    } as ApiResponse);
  }
});

router.delete('/success-stories/:id', [
  param('id').notEmpty().withMessage('Success story ID is required')
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('success_stories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: null
    } as ApiResponse);
  } catch (error) {
    console.error('Delete success story error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete success story'
    } as ApiResponse);
  }
});

// Success story status update endpoint
router.patch('/success-stories/:id/status', [
  param('id').notEmpty().withMessage('Success story ID is required'),
  body('status').isIn(['draft', 'published', 'archived']).withMessage('Invalid status'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data: updatedStory, error } = await supabase
      .from('success_stories')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
  success: true,
  data: updatedStory
} as ApiResponse);
  } catch (error) {
    return res.status(500).json({
  success: false,
  error: error instanceof Error ? error.message : 'Failed to update success story status'
} as ApiResponse);
  }
});

// Success story featured toggle endpoint
router.patch('/success-stories/:id/featured', [
  param('id').notEmpty().withMessage('Success story ID is required'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // First get current story to toggle featured status
    const { data: currentStory, error: fetchError } = await supabase
      .from('success_stories')
      .select('is_featured')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Database error:', fetchError);
      return res.status(500).json({
        success: false,
        error: fetchError.message
      } as ApiResponse);
    }

    const { data: updatedStory, error: updateError } = await supabase
      .from('success_stories')
      .update({
        is_featured: !currentStory?.is_featured,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Database error:', updateError);
      return res.status(500).json({
        success: false,
        error: updateError.message
      } as ApiResponse);
    }

    return res.json({
  success: true,
  data: updatedStory
} as ApiResponse);
  } catch (error) {
    return res.status(500).json({
  success: false,
  error: error instanceof Error ? error.message : 'Failed to toggle success story featured status'
} as ApiResponse);
  }
});

// School Building progress update endpoint
router.patch('/school-building/:id/progress', [
  param('id').notEmpty().withMessage('School building ID is required'),
  body('progress_percentage').isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { progress_percentage } = req.body;

    const { data: updatedPhase, error } = await supabase
      .from('school_building')
      .update({
        progress_percentage,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: updatedPhase
    } as ApiResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update school building progress'
    } as ApiResponse);
  }
});

// File upload endpoint
router.post('/upload', async (_req: AuthenticatedRequest, res: Response) => {
  res.status(501).json({
    success: false,
    error: 'File upload is not implemented yet'
  } as ApiResponse);
});

export { router as adminRoutes };
