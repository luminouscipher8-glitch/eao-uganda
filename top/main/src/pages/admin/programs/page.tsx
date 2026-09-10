  import { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { 
    Plus, 
    Edit, 
    Trash2, 
    Eye, 
    Search, 
    Calendar,
    Users,
    TrendingUp,
    BookOpen,
    Award,
    Building,
    MoreVertical
  } from 'lucide-react';
  import AdminLayout from '../../../components/admin/AdminLayout.js';
import { ProtectedRoute } from '../../../components/admin/ProtectedRoute.js';
import EventModal from '../../../components/admin/EventModal.js';
import SchoolBuildingModal from '../../../components/admin/SchoolBuildingModal.js';
import SuccessStoryModal from '../../../components/admin/SuccessStoryModal.js';
import ProgramModal from '../../../components/admin/ProgramModal.js';
import { useAdminApi } from '../../../hooks/useAdminApi.js';
  import { 
    Program, 
    Event, 
    SchoolBuilding, 
    SuccessStory 
  } from '../../../services/adminApi.ts';

  type TabType = 'programs' | 'events' | 'school-building' | 'success-stories';

  export default function AdminProgramsAndEvents() {
    const [activeTab, setActiveTab] = useState<TabType>('programs');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
    
    // Modal states
    const [showEventModal, setShowEventModal] = useState(false);
    const [showSchoolBuildingModal, setShowSchoolBuildingModal] = useState(false);
    const [showSuccessStoryModal, setShowSuccessStoryModal] = useState(false);
    const [showProgramModal, setShowProgramModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    
    const { 
      programs: programsApi, 
      events: eventsApi,
      schoolBuilding: schoolBuildingApi,
      successStories: successStoriesApi
    } = useAdminApi();

    // Data states
    const [programs, setPrograms] = useState<Program[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [schoolBuilding, setSchoolBuilding] = useState<SchoolBuilding[]>([]);
    const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchAllData();
    }, []);

    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        const [programsRes, eventsRes, schoolBuildingRes, successStoriesRes] = await Promise.all([
          programsApi.getPrograms(),
          eventsApi.getEvents(),
          schoolBuildingApi.getSchoolBuilding(),
          successStoriesApi.getSuccessStories()
        ]);

        if (programsRes.success) setPrograms(programsRes.data || []);
        if (eventsRes.success) setEvents(eventsRes.data || []);
        if (schoolBuildingRes.success) setSchoolBuilding(schoolBuildingRes.data || []);
        if (successStoriesRes.success) setSuccessStories(successStoriesRes.data || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleDelete = async (type: TabType, item: any) => {
      try {
        let response;
        switch (type) {
          case 'programs':
            response = await programsApi.deleteProgram(item.id);
            break;
          case 'events':
            response = await eventsApi.deleteEvent(item.id);
            break;
          case 'school-building':
            response = await schoolBuildingApi.deleteSchoolBuildingPhase(item.id);
            break;
          case 'success-stories':
            response = await successStoriesApi.deleteSuccessStory(item.id);
            break;
        }

        if (response?.success) {
          // Refresh data
          fetchAllData();
          setShowDeleteModal(false);
          setItemToDelete(null);
          setShowActionMenu(null);
        }
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    };

    const handleCreateNew = () => {
      setEditingItem(null);
      switch (activeTab) {
        case 'programs':
          setShowProgramModal(true);
          break;
        case 'events':
          setShowEventModal(true);
          break;
        case 'school-building':
          setShowSchoolBuildingModal(true);
          break;
        case 'success-stories':
          setShowSuccessStoryModal(true);
          break;
      }
    };

    const handleEdit = (item: any) => {
      setEditingItem(item);
      switch (activeTab) {
        case 'programs':
          setShowProgramModal(true);
          break;
        case 'events':
          setShowEventModal(true);
          break;
        case 'school-building':
          setShowSchoolBuildingModal(true);
          break;
        case 'success-stories':
          setShowSuccessStoryModal(true);
          break;
      }
    };

    const handleModalSuccess = () => {
      fetchAllData();
      setShowEventModal(false);
      setShowSchoolBuildingModal(false);
      setShowSuccessStoryModal(false);
      setShowProgramModal(false);
      setEditingItem(null);
    };

    const filteredData = () => {
      let data: any[] = [];
      switch (activeTab) {
        case 'programs':
          data = programs.filter(program => 
            program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        case 'events':
          data = events.filter(event => 
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        case 'school-building':
          data = schoolBuilding.filter(phase => 
            phase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            phase.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        case 'success-stories':
          data = successStories.filter(story => 
            story.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.story.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        default:
          data = [];
      }

      if (filterCategory !== 'all' && activeTab === 'programs') {
        data = data.filter((item: any) => item.category === filterCategory);
      }

      return data;
    };

    const tabs = [
      { 
        id: 'programs' as TabType, 
        label: 'Programs', 
        icon: BookOpen,
        count: programs.length,
        color: 'teal'
      },
      { 
        id: 'events' as TabType, 
        label: 'Events', 
        icon: Calendar,
        count: events.length,
        color: 'blue'
      },
      { 
        id: 'school-building' as TabType, 
        label: 'School Building', 
        icon: Building,
        count: schoolBuilding.length,
        color: 'amber'
      },
      { 
        id: 'success-stories' as TabType, 
        label: 'Success Stories', 
        icon: Award,
        count: successStories.length,
        color: 'purple'
      }
    ];

    if (loading) {
      return (
        <ProtectedRoute>
          <AdminLayout>
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading Programs & Events...</p>
                </div>
              </div>
            </div>
          </AdminLayout>
        </ProtectedRoute>
      );
    }

    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="sm:flex sm:items-center mb-8">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-semibold text-gray-900">Programs & Events Management</h1>
                <p className="mt-2 text-sm text-gray-700">
                  Manage educational programs, fundraising events, school construction, and success stories.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  onClick={handleCreateNew}
                  className="block rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                  <Plus className="inline h-4 w-4 mr-2" />
                  Add New {activeTab === 'school-building' ? 'Phase' : activeTab === 'success-stories' ? 'Story' : activeTab.slice(0, -1)}
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                          ${activeTab === tab.id
                            ? `border-${tab.color}-500 text-${tab.color}-600`
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }
                        `}
                      >
                        <Icon className="mr-2 h-5 w-5" />
                        {tab.label}
                        <span className={`
                          ml-2 px-2 py-1 text-xs rounded-full
                          ${activeTab === tab.id
                            ? `bg-${tab.color}-100 text-${tab.color}-700`
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                          }
                        `}>
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab === 'school-building' ? 'phases' : activeTab === 'success-stories' ? 'stories' : activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>
              {activeTab === 'programs' && (
                <div className="sm:w-48">
    <label htmlFor="filter-category" className="sr-only">
      Filter by category
    </label>
    <select
      id="filter-category"
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
    >
      <option value="all">All Categories</option>
      <option value="education">Education</option>
      <option value="healthcare">Healthcare</option>
      <option value="community">Community</option>
    </select>
  </div>
              )}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData().map((item: any) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Card Header */}
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
                    <img
                      src={item.image || '/images/default.jpg'}
                      alt={item.title || item.student_name || item.phase}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/default.jpg';
                      }}
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      {activeTab === 'programs' && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.is_active ? 'Active' : 'Inactive'}
                        </span>
                      )}
                      {activeTab === 'events' && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === 'completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                          item.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      )}
                      {activeTab === 'school-building' && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === 'completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          item.status === 'delayed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status.replace('_', ' ')}
                        </span>
                      )}
                      {activeTab === 'success-stories' && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.is_featured 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.is_featured ? 'Featured' : 'Standard'}
                        </span>
                      )}
                    </div>

                    {/* Action Menu */}
                    <div className="absolute top-2 left-2">
                      <button
                        onClick={() => setShowActionMenu(showActionMenu === item.id ? null : item.id)}
                        className="p-1 bg-white/90 rounded-md shadow-sm hover:bg-white transition-colors"
                        aria-label="More options"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </button>
                      
                      {showActionMenu === item.id && (
                        <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <Link
                              to={`/admin/${activeTab}/${item.id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setShowActionMenu(null)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                            <button
                              onClick={() => {
                                setShowActionMenu(null);
                                handleEdit(item);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              aria-label="Edit item"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setItemToDelete(item);
                                setShowDeleteModal(true);
                                setShowActionMenu(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              aria-label="Delete item"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {item.title || item.student_name || item.phase}
                        </h3>
                        {activeTab === 'programs' && (
                          <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                        )}
                        {activeTab === 'events' && (
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.event_date).toLocaleDateString()}
                          </div>
                        )}
                        {activeTab === 'success-stories' && (
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                              {item.category}
                            </span>
                            <span>Age {item.age}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-2 mb-4">
                      {item.description || item.story || item.impact}
                    </p>

                    {/* Specific Metrics */}
                    {activeTab === 'programs' && (
                      <div className="text-xs text-teal-600 font-medium">
                        {item.impact}
                      </div>
                    )}
                    
                    {activeTab === 'events' && (
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {item.participants} participants
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {item.currency} {item.funds_raised?.toLocaleString()}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'school-building' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Progress</span>
                          <span className="font-medium">{item.progress_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.progress_percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {item.currency} {item.raised_amount?.toLocaleString()} / {item.target_amount?.toLocaleString()}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'success-stories' && (
                      <div className="text-xs text-purple-600 font-medium">
                        {item.impact}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredData().length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  {activeTab === 'programs' && <BookOpen className="h-12 w-12 mx-auto" />}
                  {activeTab === 'events' && <Calendar className="h-12 w-12 mx-auto" />}
                  {activeTab === 'school-building' && <Building className="h-12 w-12 mx-auto" />}
                  {activeTab === 'success-stories' && <Award className="h-12 w-12 mx-auto" />}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab === 'school-building' ? 'phases' : activeTab === 'success-stories' ? 'stories' : activeTab} found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? 'Try adjusting your search terms'
                    : `Get started by creating your first ${activeTab === 'school-building' ? 'phase' : activeTab === 'success-stories' ? 'story' : activeTab.slice(0, -1)}`
                  }
                </p>
                <button 
                  onClick={handleCreateNew}
                  className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add {activeTab === 'school-building' ? 'Phase' : activeTab === 'success-stories' ? 'Story' : activeTab.slice(0, -1)}
                </button>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && itemToDelete && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-md w-full p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <Trash2 className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Delete {activeTab === 'school-building' ? 'Phase' : activeTab === 'success-stories' ? 'Story' : activeTab.slice(0, -1)}</h3>
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete "{itemToDelete.title || itemToDelete.student_name || itemToDelete.phase}"? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setShowDeleteModal(false);
                        setItemToDelete(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(activeTab, itemToDelete)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modals */}
            <ProgramModal
              isOpen={showProgramModal}
              onClose={() => setShowProgramModal(false)}
              programId={editingItem?.id}
              onSuccess={handleModalSuccess}
            />
            
            <EventModal
              isOpen={showEventModal}
              onClose={() => setShowEventModal(false)}
              eventId={editingItem?.id}
              onSuccess={handleModalSuccess}
            />
            
            <SchoolBuildingModal
              isOpen={showSchoolBuildingModal}
              onClose={() => setShowSchoolBuildingModal(false)}
              buildingId={editingItem?.id}
              onSuccess={handleModalSuccess}
            />
            
            <SuccessStoryModal
              isOpen={showSuccessStoryModal}
              onClose={() => setShowSuccessStoryModal(false)}
              storyId={editingItem?.id}
              onSuccess={handleModalSuccess}
            />
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }
