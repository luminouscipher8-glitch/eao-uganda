import { supabase } from '../lib/supabase.js';

async function seedAdminData() {
  console.log('Seeding admin data...');

  try {
    // Sample programs
    const programs = [
      {
        title: 'Education Support Program',
        description: 'Providing educational materials, school fees, and tutoring support to orphaned children in Uganda. This program ensures that vulnerable children have access to quality education and the resources they need to succeed academically.',
        impact: 'Helped 500+ children with school supplies and tuition support',
        category: 'Education',
        image: '/images/programs/education.jpg',
        is_active: true
      },
      {
        title: 'Nutrition Program',
        description: 'Daily meals and nutrition support for vulnerable children. Our nutrition program provides balanced meals to ensure children receive the proper nutrition needed for healthy growth and development.',
        impact: 'Provided 10,000+ meals this year to children in need',
        category: 'Nutrition',
        image: '/images/programs/nutrition.jpg',
        is_active: true
      },
      {
        title: 'Youth Mentorship',
        description: 'Connecting orphaned youth with mentors who provide guidance, support, and positive role models. This program focuses on building confidence, life skills, and future planning.',
        impact: 'Matched 150+ youth with dedicated mentors',
        category: 'Youth Development',
        image: '/images/programs/mentorship.jpg',
        is_active: true
      },
      {
        title: 'Healthcare Support',
        description: 'Providing basic healthcare services, medical check-ups, and health education to orphaned children. This includes vaccinations, treatment of common illnesses, and health awareness programs.',
        impact: 'Conducted 200+ health check-ups and provided essential medical care',
        category: 'Health',
        image: '/images/programs/healthcare.jpg',
        is_active: true
      }
    ];

    // Insert programs
    for (const program of programs) {
      const { error } = await supabase
        .from('programs')
        .insert(program);
      
      if (error) {
        console.log('Program may already exist or error:', error.message);
      } else {
        console.log(`✅ Created program: ${program.title}`);
      }
    }

    // Sample news articles
    const news = [
      {
        title: 'New School Library Opens in Kampala',
        content: 'We are excited to announce the opening of our new school library in Kampala, providing access to over 2,000 books for orphaned children in our education program. This facility will serve as a learning hub and study space for children who previously had limited access to reading materials.',
        excerpt: 'New library provides educational resources for over 200 children',
        featured_image: '/images/news/library.jpg',
        status: 'published',
        published_at: new Date().toISOString()
      },
      {
        title: 'Annual Fundraising Gala Success',
        content: 'Our annual fundraising gala was a tremendous success, raising over $50,000 to support our education and nutrition programs. We want to thank all our donors and supporters who made this event possible and continue to believe in our mission.',
        excerpt: 'Community support raises $50,000 for children\'s programs',
        featured_image: '/images/news/gala.jpg',
        status: 'published',
        published_at: new Date().toISOString()
      },
      {
        title: 'Volunteer Training Program Launch',
        content: 'We are launching a comprehensive volunteer training program to ensure our volunteers are well-equipped to support the children in our programs. The training covers child development, trauma-informed care, and educational support techniques.',
        excerpt: 'New training program enhances volunteer support capabilities',
        featured_image: '/images/news/training.jpg',
        status: 'draft',
        published_at: null
      }
    ];

    // Insert news
    for (const article of news) {
      const { error } = await supabase
        .from('news')
        .insert(article);
      
      if (error) {
        console.log('News article may already exist or error:', error.message);
      } else {
        console.log(`✅ Created news: ${article.title}`);
      }
    }

    // Sample contacts
    const contacts = [
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1-555-0123',
        subject: 'Volunteer Opportunity',
        message: 'I would like to volunteer as a tutor for your education program. I have experience teaching mathematics and science to middle school students.',
        status: 'new'
      },
      {
        name: 'Michael Chen',
        email: 'm.chen@company.com',
        phone: '+1-555-0124',
        subject: 'Corporate Sponsorship',
        message: 'Our company would like to discuss potential sponsorship opportunities for your nutrition program. Please let me know the best way to proceed.',
        status: 'in_progress'
      },
      {
        name: 'Emily Rodriguez',
        email: 'emily.r@email.com',
        phone: '+1-555-0125',
        subject: 'Donation Inquiry',
        message: 'I would like to make a monthly donation to support your programs. Could you provide information about recurring donation options?',
        status: 'resolved'
      }
    ];

    // Insert contacts
    for (const contact of contacts) {
      const { error } = await supabase
        .from('contacts')
        .insert(contact);
      
      if (error) {
        console.log('Contact may already exist or error:', error.message);
      } else {
        console.log(`✅ Created contact: ${contact.name}`);
      }
    }

    // Sample donations
    const donations = [
      {
        amount: 250.00,
        currency: 'USD',
        donor_name: 'David Wilson',
        donor_email: 'david.w@email.com',
        donor_phone: '+1-555-0126',
        payment_method: 'credit_card',
        is_recurring: false,
        campaign: 'Education Support',
        status: 'completed'
      },
      {
        amount: 100.00,
        currency: 'USD',
        donor_name: 'Lisa Anderson',
        donor_email: 'lisa.a@email.com',
        donor_phone: '+1-555-0127',
        payment_method: 'paypal',
        is_recurring: true,
        campaign: 'General Support',
        status: 'completed'
      },
      {
        amount: 500.00,
        currency: 'USD',
        donor_name: 'Robert Taylor',
        donor_email: 'r.taylor@business.com',
        donor_phone: '+1-555-0128',
        payment_method: 'bank_transfer',
        is_recurring: false,
        campaign: 'Nutrition Program',
        status: 'completed'
      }
    ];

    // Insert donations
    for (const donation of donations) {
      const { error } = await supabase
        .from('donations')
        .insert(donation);
      
      if (error) {
        console.log('Donation may already exist or error:', error.message);
      } else {
        console.log(`✅ Created donation: $${donation.amount} from ${donation.donor_name}`);
      }
    }

    // Sample volunteers
    const volunteers = [
      {
        name: 'Jennifer Martinez',
        email: 'j.martinez@email.com',
        phone: '+1-555-0129',
        age: '28',
        occupation: 'Teacher',
        skills: ['Teaching', 'Mathematics', 'Science', 'Child Development'],
        availability: 'Weekends',
        motivation: 'I want to use my teaching skills to help children who need educational support.',
        status: 'approved'
      },
      {
        name: 'James Thompson',
        email: 'j.thompson@email.com',
        phone: '+1-555-0130',
        age: '35',
        occupation: 'Healthcare Worker',
        skills: ['Healthcare', 'First Aid', 'Nutrition', 'Child Care'],
        availability: 'Evenings',
        motivation: 'I believe every child deserves proper healthcare and nutrition support.',
        status: 'pending'
      },
      {
        name: 'Maria Garcia',
        email: 'm.garcia@email.com',
        phone: '+1-555-0131',
        age: '24',
        occupation: 'Student',
        skills: ['Mentoring', 'Arts & Crafts', 'Sports', 'Academic Support'],
        availability: 'Flexible',
        motivation: 'I want to make a positive impact on children\'s lives while gaining experience.',
        status: 'approved'
      }
    ];

    // Insert volunteers
    for (const volunteer of volunteers) {
      const { error } = await supabase
        .from('volunteers')
        .insert(volunteer);
      
      if (error) {
        console.log('Volunteer may already exist or error:', error.message);
      } else {
        console.log(`✅ Created volunteer: ${volunteer.name}`);
      }
    }

    console.log('✅ Admin data seeding completed!');
    console.log('Summary:');
    console.log('- Programs: 4');
    console.log('- News articles: 3');
    console.log('- Contacts: 3');
    console.log('- Donations: 3');
    console.log('- Volunteers: 3');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

// Run the seeding
seedAdminData().then(() => {
  console.log('Seeding script completed');
  process.exit(0);
}).catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
