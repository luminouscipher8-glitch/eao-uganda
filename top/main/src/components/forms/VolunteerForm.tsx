import { useState } from 'react';
import { toast } from '../common/Toast.tsx';
import { submitVolunteerForm, VolunteerFormData } from '../../services/api.ts';

export default function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormData>({
    name: '',
    email: '',
    phone: '',
    age: '',
    occupation: '',
    skills: [],
    availability: '',
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'skills') {
      const skills = (e.target as HTMLSelectElement).selectedOptions;
      const selectedSkills = Array.from(skills)
        .filter(option => option.selected)
        .map(option => option.value);

      setFormData(prev => ({
        ...prev,
        [name]: selectedSkills
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = formData.name.trim();

    if (!fullName || !formData.email.trim()) {
      toast.error('Validation Error', 'Please fill in all required fields');
      return;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (!formData.age || parseInt(formData.age, 10) < 16 || parseInt(formData.age, 10) > 100) {
      toast.error('Invalid Age', 'Age must be between 16 and 100');
      return;
    }

    if (!formData.skills || formData.skills.length === 0) {
      toast.error('Skills Required', 'Please select at least one skill');
      return;
    }

    if (!formData.phone.trim()) {
      toast.error('Phone Required', 'Please provide your phone number');
      return;
    }

    if (!formData.availability.trim()) {
      toast.error('Availability Required', 'Please select your availability');
      return;
    }

    if (!formData.motivation.trim()) {
      toast.error('Motivation Required', 'Please tell us why you want to volunteer');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitVolunteerForm(formData);
      toast.success(
        'Application Submitted!',
        'Thank you for your interest in volunteering. We will contact you soon.'
      );

      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        occupation: '',
        skills: [],
        availability: '',
        motivation: ''
      });
    } catch (error) {
      console.error('Volunteer application submission error:', error);
      toast.error(
        'Submission Failed',
        'Failed to submit your application. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableSkills = [
    'Teaching',
    'Mentoring',
    'Tutoring',
    'Child Development',
    'Photography',
    'Event Documentation',
    'Social Media',
    'Community Outreach',
    'Fundraising',
    'Event Planning',
    'Translation',
    'Content Creation',
    'Counseling',
    'Girls Empowerment',
    'Home Visits',
    'Needs Assessment',
    'Online Tutoring',
    'English',
    'Mathematics',
    'Science',
    'Computer Skills',
    'Sports Coaching',
    'Art & Music',
    'Health Education',
    'Agriculture',
    'Business Skills',
    'Leadership',
    'Project Management'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="john@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="+256 700 000 000"
        />
      </div>

      {/* Age */}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
          Age <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          min="16"
          max="100"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="25"
        />
      </div>

      {/* Occupation */}
      <div>
        <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
          Occupation
        </label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="Teacher, Student, Professional, etc."
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skills <span className="text-red-500">*</span>
        </label>
        <div className="text-xs text-gray-600 mb-3">
          Select all skills that apply to you (at least one required)
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
          {availableSkills.map((skill) => (
            <label
              key={skill}
              className="flex items-center gap-2 cursor-pointer hover:bg-teal-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={formData.skills.includes(skill)}
                onChange={() => handleSkillToggle(skill)}
                className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
          Availability <span className="text-red-500">*</span>
        </label>
        <select
          id="availability"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          required
        >
          <option value="">Select availability</option>
          <option value="weekdays-morning">Weekday Mornings</option>
          <option value="weekdays-afternoon">Weekday Afternoons</option>
          <option value="weekdays-evening">Weekday Evenings</option>
          <option value="weekends">Weekends</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      {/* Motivation */}
      <div>
        <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
          Why do you want to volunteer with EAO? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="motivation"
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
          placeholder="Share your motivation for volunteering with us..."
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-teal-600 to-amber-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting Application...
            </>
          ) : (
            <>
              <i className="ri-user-heart-line"></i>
              Submit Application
            </>
          )}
        </button>
      </div>
    </form>
  );
}