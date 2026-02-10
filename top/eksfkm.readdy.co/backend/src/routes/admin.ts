import { Router, Response } from 'express';
import { body, param, query } from 'express-validator';
import { SupabaseAuth } from '../middleware/supabaseAuth.js';
import { ApiResponse, AuthenticatedRequest } from '../types/index.js';
import { supabase } from '../lib/supabase.js';

const router = Router();

// Apply admin authentication to all admin routes
router.use(SupabaseAuth.authenticate);

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

// Helper function to format time ago
function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
}

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
router.get('/events', SupabaseAuth.optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
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
], SupabaseAuth.optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
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
    // Mock news data - replace with actual database query
    const news = [
      {
        id: '1',
        title: 'New School Building Completed',
        content: 'We are excited to announce the completion of our new school building...',
        excerpt: 'A new milestone in our educational mission',
        featured_image: '/images/news/school-building.jpg',
        status: 'published',
        published_at: '2024-01-20T10:00:00Z',
        created_at: '2024-01-20T09:00:00Z',
        updated_at: '2024-01-20T09:00:00Z'
      }
    ];

    res.json({
      success: true,
      data: news
    } as ApiResponse<typeof news>);
  } catch (error) {
    res.status(500).json({
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

    const newNews = {
      id: Date.now().toString(),
      title,
      content,
      excerpt,
      featured_image: featured_image || '/images/news/default.jpg',
      status,
      published_at: status === 'published' ? (published_at || new Date().toISOString()) : undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      data: newNews
    } as ApiResponse<typeof newNews>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create news'
    } as ApiResponse);
  }
});

// Contacts endpoint
router.get('/contacts', async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Mock contacts data - replace with actual database query
    const contacts = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+256123456789',
        subject: 'Volunteer Inquiry',
        message: 'I would like to volunteer for your programs...',
        status: 'new',
        created_at: '2024-01-25T10:00:00Z'
      }
    ];

    res.json({
      success: true,
      data: contacts
    } as ApiResponse<typeof contacts>);
  } catch (error) {
    res.status(500).json({
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

    // Mock status update - replace with actual database update
    const updatedContact = {
      id,
      status,
      updated_at: new Date().toISOString()
    };

    res.json({
      success: true,
      data: updatedContact
    } as ApiResponse<typeof updatedContact>);
  } catch (error) {
    res.status(500).json({
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
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, phase, status, start_date, end_date, budget, progress, image } = req.body;

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
        progress: progress || 0,
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
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data: updatedPhase, error } = await supabase
      .from('school_building')
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
    // Mock donations data - replace with actual database query
    const donations = [
      {
        id: '1',
        amount: 250000,
        currency: 'UGX',
        donor_name: 'Jane Smith',
        donor_email: 'jane@example.com',
        donor_phone: '+256123456789',
        payment_method: 'mobile_money',
        is_recurring: false,
        campaign: 'Education Fund',
        status: 'completed',
        created_at: '2024-01-25T10:00:00Z'
      }
    ];

    res.json({
      success: true,
      data: donations
    } as ApiResponse<typeof donations>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch donations'
    } as ApiResponse);
  }
});

// Volunteers endpoint
router.get('/volunteers', async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Mock volunteers data - replace with actual database query
    const volunteers = [
      {
        id: '1',
        name: 'Michael Johnson',
        email: 'michael@example.com',
        phone: '+256123456789',
        age: '28',
        occupation: 'Teacher',
        skills: ['Teaching', 'Mentoring', 'Sports'],
        availability: 'Weekends',
        motivation: 'I want to help children get better education',
        status: 'pending',
        created_at: '2024-01-25T10:00:00Z'
      }
    ];

    res.json({
      success: true,
      data: volunteers
    } as ApiResponse<typeof volunteers>);
  } catch (error) {
    res.status(500).json({
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

    // Mock status update - replace with actual database update
    const updatedVolunteer = {
      id,
      status,
      updated_at: new Date().toISOString()
    };

    res.json({
      success: true,
      data: updatedVolunteer
    } as ApiResponse<typeof updatedVolunteer>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update volunteer status'
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
      data: stories || []
    } as ApiResponse);
  } catch (error) {
    console.error('Fetch success stories error:', error);
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

// File upload endpoint
router.post('/upload', async (req: AuthenticatedRequest, res: Response) => {
  try {
    // This is a placeholder for file upload logic
    // In a real implementation, you'd use multer or similar middleware
    // and upload to Supabase Storage or your preferred file storage
    
    res.json({
      success: true,
      data: {
        url: '/images/uploads/example.jpg'
      }
    } as ApiResponse<{ url: string }>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload file'
    } as ApiResponse);
  }
});

export { router as adminRoutes };
