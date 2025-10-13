'use client';

import { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, Trash2, GripVertical, Edit, Save, X } from 'lucide-react';
import ImageUploadField from './ImageUploadField';

interface Section {
  id: string;
  type: string;
  data: Record<string, any>;
  order: number;
}

interface TabbedSectionEditorProps {
  sections: Section[];
  onChange: (sections: Section[]) => void;
}

const SECTION_TYPES = [
  { value: 'AboutUsHeader', label: 'About Us Header', icon: '📄' },
  { value: 'TaglineSection', label: 'Tagline', icon: '💬' },
  { value: 'GroupPhotoSection', label: 'Group Photo', icon: '📷' },
  { value: 'AboutTSDSection', label: 'About TSD', icon: 'ℹ️' },
  { value: 'VisionMissionSection', label: 'Vision & Mission', icon: '🎯' },
  { value: 'CoreValuesSection', label: 'Core Values', icon: '⭐' },
  { value: 'LeadershipSection', label: 'Leadership', icon: '👥' },
  { value: 'TargetGroupSection', label: 'Target Groups', icon: '🎯' },
  { value: 'OperationRegionsSection', label: 'Operation Regions', icon: '🗺️' },
  { value: 'ContentSection', label: 'Content Block', icon: '📝' },
];

export default function TabbedSectionEditor({ sections, onChange }: TabbedSectionEditorProps) {
  const [activeTab, setActiveTab] = useState<string | null>(sections[0]?.id || null);
  const [showAddModal, setShowAddModal] = useState(false);

  const addSection = (type: string) => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      data: getDefaultDataForType(type),
      order: sections.length,
    };
    onChange([...sections, newSection]);
    setShowAddModal(false);
    setActiveTab(newSection.id);
  };

  const removeSection = (id: string) => {
    if (confirm('Remove this section?')) {
      const newSections = sections.filter(s => s.id !== id);
      onChange(newSections.map((s, i) => ({ ...s, order: i })));
      if (activeTab === id) {
        setActiveTab(newSections[0]?.id || null);
      }
    }
  };

  const moveSection = (id: string, direction: 'left' | 'right') => {
    const index = sections.findIndex(s => s.id === id);
    if (index === -1) return;
    if (direction === 'left' && index === 0) return;
    if (direction === 'right' && index === sections.length - 1) return;

    const newSections = [...sections];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    onChange(newSections.map((s, i) => ({ ...s, order: i })));
  };

  const updateSectionData = (id: string, data: Record<string, any>) => {
    onChange(sections.map(s => s.id === id ? { ...s, data } : s));
  };

  const getLabel = (type: string) => {
    return SECTION_TYPES.find(t => t.value === type)?.label || type;
  };

  const getIcon = (type: string) => {
    return SECTION_TYPES.find(t => t.value === type)?.icon || '📄';
  };

  return (
    <div className="space-y-6">
      {/* Tabs Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Page Sections</h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-3 py-1.5 bg-primary-green text-white rounded-lg hover:bg-green-700 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Section</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          {sections.map((section, index) => (
            <div
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveTab(section.id);
                }
              }}
              className={`group relative flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === section.id
                  ? 'border-primary-green bg-white dark:bg-gray-800 text-primary-green'
                  : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <GripVertical className="w-4 h-4 opacity-50" />
              <span className="text-lg">{getIcon(section.type)}</span>
              <span className="font-medium text-sm">{getLabel(section.type)}</span>

              {/* Reorder & Delete (on hover) */}
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSection(section.id, 'left');
                  }}
                  disabled={index === 0}
                  className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move left"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSection(section.id, 'right');
                  }}
                  disabled={index === sections.length - 1}
                  className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move right"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSection(section.id);
                  }}
                  className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  title="Remove"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Active Tab Content */}
        {activeTab && (
          <div className="p-6">
            {sections.map(section => (
              section.id === activeTab && (
                <div key={section.id}>
                  <SectionEditor
                    type={section.type}
                    data={section.data}
                    onChange={(data) => updateSectionData(section.id, data)}
                  />
                </div>
              )
            ))}
          </div>
        )}

        {sections.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No sections added yet</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-primary-green hover:underline"
            >
              Add your first section
            </button>
          </div>
        )}
      </div>

      {/* Add Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Section</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {SECTION_TYPES.map(type => (
                <button
                  key={type.value}
                  onClick={() => addSection(type.value)}
                  className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <span className="text-3xl">{type.icon}</span>
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Section Editor Component (same as before but extracted)
function SectionEditor({ type, data, onChange }: { type: string; data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

  switch (type) {
    case 'OperationRegionsSection':
      return <OperationRegionsManager data={data} onChange={onChange} />;

    case 'TaglineSection':
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">💬 Tagline Settings</h4>
          <div>
            <label className={labelClass}>Tagline</label>
            <input type="text" value={data.tagline || ''} onChange={(e) => updateField('tagline', e.target.value)} className={inputClass} placeholder="Your organization tagline..." />
          </div>
        </div>
      );

    case 'GroupPhotoSection':
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📷 Group Photo Settings</h4>
          <ImageUploadField label="Group Photo" value={data.imageSrc || ''} onChange={(url) => updateField('imageSrc', url)} placeholder="Team photo" />
          <div>
            <label className={labelClass}>Alt Text</label>
            <input type="text" value={data.altText || ''} onChange={(e) => updateField('altText', e.target.value)} className={inputClass} placeholder="Describe the image..." />
          </div>
        </div>
      );

    case 'AboutTSDSection':
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ℹ️ About TSD Settings</h4>
          <div>
            <label className={labelClass}>Description</label>
            <textarea value={data.description || ''} onChange={(e) => updateField('description', e.target.value)} rows={6} className={inputClass + ' resize-none'} placeholder="About your organization..." />
          </div>
          <ImageUploadField label="Background Image" value={data.backImageSrc || ''} onChange={(url) => updateField('backImageSrc', url)} />
          <ImageUploadField label="Foreground Image" value={data.frontImageSrc || ''} onChange={(url) => updateField('frontImageSrc', url)} />
        </div>
      );

    case 'VisionMissionSection':
      return (
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🎯 Vision & Mission Settings</h4>
          <div className="space-y-4">
            <h5 className="font-medium text-gray-900 dark:text-white">Vision</h5>
            <ImageUploadField label="Vision Image" value={data.visionImage || ''} onChange={(url) => updateField('visionImage', url)} />
            <div>
              <label className={labelClass}>Vision Statement</label>
              <textarea value={data.visionText || ''} onChange={(e) => updateField('visionText', e.target.value)} rows={3} className={inputClass + ' resize-none'} />
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="font-medium text-gray-900 dark:text-white">Mission</h5>
            <ImageUploadField label="Mission Image" value={data.missionImage || ''} onChange={(url) => updateField('missionImage', url)} />
            <div>
              <label className={labelClass}>Mission Statement</label>
              <textarea value={data.missionText || ''} onChange={(e) => updateField('missionText', e.target.value)} rows={3} className={inputClass + ' resize-none'} />
            </div>
          </div>
        </div>
      );

    case 'ContentSection':
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📝 Content Block Settings</h4>
          <div>
            <label className={labelClass}>Title</label>
            <input type="text" value={data.title || ''} onChange={(e) => updateField('title', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Content</label>
            <textarea value={data.content || ''} onChange={(e) => updateField('content', e.target.value)} rows={8} className={inputClass + ' resize-none'} />
          </div>
          <ImageUploadField label="Image (Optional)" value={data.image || ''} onChange={(url) => updateField('image', url)} />
        </div>
      );

    case 'LeadershipSection':
      return <LeadershipManager data={data} onChange={onChange} />;

    case 'TargetGroupSection':
      return <TargetGroupManager data={data} onChange={onChange} />;

    case 'CoreValuesSection':
    case 'AboutUsHeader':
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{type.replace('Section', '')} Settings</h4>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">This section pulls data from Site Settings automatically.</p>
          </div>
          <div>
            <label className={labelClass}>Section Title (Optional)</label>
            <input type="text" value={data.sectionTitle || ''} onChange={(e) => updateField('sectionTitle', e.target.value)} className={inputClass} />
          </div>
        </div>
      );

    default:
      return (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Section type: {type}</p>
        </div>
      );
  }
}

function getDefaultDataForType(type: string): Record<string, any> {
  switch (type) {
    case 'OperationRegionsSection': return { mapImageSrc: '/images/Objects.png', mapLayerSrc: '', regions: [] };
    case 'TaglineSection': return { tagline: '' };
    case 'GroupPhotoSection': return { imageSrc: '', altText: '' };
    case 'AboutTSDSection': return { description: '', backImageSrc: '', frontImageSrc: '' };
    case 'VisionMissionSection': return { visionImage: '', visionText: '', missionImage: '', missionText: '' };
    case 'ContentSection': return { title: '', content: '', image: '' };
    case 'LeadershipSection': return { members: [] };
    case 'TargetGroupSection': return { headerImage: '', groups: [] };
    default: return {};
  }
}

// Leadership Manager Component - Embedded in Tab
function LeadershipManager({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    photo: '',
    order: 0,
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/leadership');
      const data = await response.json();
      
      if (data.success) {
        setMembers(data.data);
      }
    } catch (error) {
      console.error('Error fetching leadership members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setFormData(member);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingMember(null);
    setFormData({
      name: '',
      position: '',
      bio: '',
      photo: '',
      order: members.length,
      email: '',
      phone: '',
    });
  };

  const handleCancel = () => {
    setEditingMember(null);
    setIsAddingNew(false);
    setFormData({
      name: '',
      position: '',
      bio: '',
      photo: '',
      order: 0,
      email: '',
      phone: '',
    });
  };

  const handleSave = async () => {
    try {
      const url = editingMember 
        ? `/api/admin/leadership/${editingMember._id}`
        : '/api/admin/leadership';
      
      const method = editingMember ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(editingMember ? 'Member updated!' : 'Member added!');
        fetchMembers();
        handleCancel();
      } else {
        alert(data.error || 'Failed to save member');
      }
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Failed to save member');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this member?')) return;

    try {
      const response = await fetch(`/api/admin/leadership/${id}`, { method: 'DELETE' });
      const data = await response.json();

      if (data.success) {
        alert('Member removed!');
        fetchMembers();
      } else {
        alert(data.error || 'Failed to delete member');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">👥 Manage Leadership Team</h4>
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 px-3 py-1.5 bg-primary-green text-white rounded-lg hover:bg-green-700 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Edit/Add Form */}
      {(editingMember || isAddingNew) && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 border-primary-green">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-bold text-gray-900 dark:text-white">
              {isAddingNew ? 'Add New Member' : 'Edit Member'}
            </h5>
            <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <ImageUploadField
                label="Photo"
                value={formData.photo || ''}
                onChange={(url) => setFormData(prev => ({ ...prev, photo: url }))}
                placeholder="Upload photo..."
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="CEO"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Biography</label>
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  disabled={!formData.name || !formData.position}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-primary-green text-white rounded-lg hover:bg-green-700 text-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAddingNew ? 'Add' : 'Save'}</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1.5 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Members Grid */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green mx-auto"></div>
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          <p>No team members yet</p>
          <button onClick={handleAddNew} className="mt-2 text-primary-green hover:underline text-sm">
            Add your first team member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <div key={member._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              {member.photo && (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-primary-green"
                />
              )}
              <div className="text-center mb-3">
                <h5 className="font-bold text-gray-900 dark:text-white text-sm">{member.name}</h5>
                <p className="text-xs text-primary-green font-medium">{member.position}</p>
                {member.bio && <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{member.bio}</p>}
              </div>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                >
                  <Edit className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => member._id && handleDelete(member._id)}
                  className="flex items-center space-x-1 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Target Group Manager Component - Embedded in Tab
function TargetGroupManager({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGroup, setEditingGroup] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', icon: '' });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/target-groups');
      const data = await response.json();
      if (data.success) setGroups(data.data);
    } catch (error) {
      console.error('Error fetching target groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (group: any) => {
    setEditingGroup(group);
    setFormData(group);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingGroup(null);
    setFormData({ name: '', description: '', icon: '' });
  };

  const handleCancel = () => {
    setEditingGroup(null);
    setIsAddingNew(false);
    setFormData({ name: '', description: '', icon: '' });
  };

  const handleSave = async () => {
    try {
      const url = editingGroup ? `/api/admin/target-groups/${editingGroup._id}` : '/api/admin/target-groups';
      const method = editingGroup ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert(editingGroup ? 'Target group updated!' : 'Target group added!');
        fetchGroups();
        handleCancel();
      } else {
        alert(data.error || 'Failed to save');
      }
    } catch (error) {
      alert('Failed to save target group');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this target group?')) return;
    try {
      const response = await fetch(`/api/admin/target-groups/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        alert('Target group removed!');
        fetchGroups();
      }
    } catch (error) {
      alert('Failed to delete target group');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🎯 Manage Target Groups</h4>
        <button onClick={handleAddNew} className="flex items-center space-x-2 px-3 py-1.5 bg-primary-green text-white rounded-lg hover:bg-green-700 text-sm">
          <Plus className="w-4 h-4" />
          <span>Add Group</span>
        </button>
      </div>

      <ImageUploadField label="Section Header Image" value={data.headerImage || ''} onChange={(url) => onChange({ ...data, headerImage: url })} placeholder="Header image" />

      {(editingGroup || isAddingNew) && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 border-primary-green">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-bold text-gray-900 dark:text-white">{isAddingNew ? 'Add New Target Group' : 'Edit Target Group'}</h5>
            <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" placeholder="Youth, Women, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Icon/Emoji</label>
              <input type="text" value={formData.icon || ''} onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" placeholder="👥" />
            </div>
            <div className="flex space-x-2">
              <button onClick={handleSave} disabled={!formData.name || !formData.description} className="flex items-center space-x-1 px-3 py-1.5 bg-primary-green text-white rounded-lg hover:bg-green-700 text-sm disabled:opacity-50">
                <Save className="w-4 h-4" />
                <span>{isAddingNew ? 'Add' : 'Save'}</span>
              </button>
              <button onClick={handleCancel} className="px-3 py-1.5 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green mx-auto"></div></div>
      ) : groups.length === 0 ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          <p>No target groups yet</p>
          <button onClick={handleAddNew} className="mt-2 text-primary-green hover:underline text-sm">Add your first target group</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div key={group._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {group.icon && <span className="text-2xl">{group.icon}</span>}
                  <h5 className="font-bold text-gray-900 dark:text-white">{group.name}</h5>
                </div>
                <div className="flex space-x-1">
                  <button onClick={() => handleEdit(group)} className="p-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"><Edit className="w-3 h-3" /></button>
                  <button onClick={() => group._id && handleDelete(group._id)} className="p-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{group.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Operation Regions Manager Component - Embedded in Tab
function OperationRegionsManager({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [regions, setRegions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRegion, setEditingRegion] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', position: { x: '50%', y: '50%' } });
  const [showMapPicker, setShowMapPicker] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/operation-regions');
      const data = await response.json();
      if (data.success) setRegions(data.data);
    } catch (error) {
      console.error('Error fetching operation regions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (region: any) => {
    setEditingRegion(region);
    setFormData({
      name: region.name,
      description: region.description,
      position: region.position || { x: '50%', y: '50%' }
    });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingRegion(null);
    setFormData({ name: '', description: '', position: { x: '50%', y: '50%' } });
  };

  const handleCancel = () => {
    setEditingRegion(null);
    setIsAddingNew(false);
    setFormData({ name: '', description: '', position: { x: '50%', y: '50%' } });
    setShowMapPicker(false);
  };

  const handleSave = async () => {
    try {
      const url = editingRegion ? `/api/admin/operation-regions/${editingRegion._id}` : '/api/admin/operation-regions';
      const method = editingRegion ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert(editingRegion ? 'Region updated!' : 'Region added!');
        fetchRegions();
        handleCancel();
      } else {
        alert(data.error || 'Failed to save');
      }
    } catch (error) {
      alert('Failed to save operation region');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this region?')) return;
    try {
      const response = await fetch(`/api/admin/operation-regions/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        alert('Region removed!');
        fetchRegions();
      }
    } catch (error) {
      alert('Failed to delete region');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🗺️ Manage Operation Regions</h4>
        <button onClick={handleAddNew} className="flex items-center space-x-2 px-3 py-1.5 bg-primary-green text-white rounded-lg hover:bg-green-700 text-sm">
          <Plus className="w-4 h-4" />
          <span>Add Region</span>
        </button>
      </div>

      <div className="space-y-4">
        <ImageUploadField label="Map Background Image" value={data.mapImageSrc || ''} onChange={(url) => onChange({ ...data, mapImageSrc: url })} placeholder="Main map image" />
        <ImageUploadField label="Map Layer Overlay" value={data.mapLayerSrc || ''} onChange={(url) => onChange({ ...data, mapLayerSrc: url })} placeholder="Map overlay/layer" />
      </div>

      {(editingRegion || isAddingNew) && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 border-primary-green">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-bold text-gray-900 dark:text-white">{isAddingNew ? 'Add New Region' : 'Edit Region'}</h5>
            <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Region Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" placeholder="Addis Ababa, Oromia, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none" placeholder="Details about operations in this region..." />
            </div>

            {/* Pin Position on Map */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">Pin Location on Map</label>
                <button
                  type="button"
                  onClick={() => setShowMapPicker(!showMapPicker)}
                  className="text-xs text-primary-green hover:underline"
                >
                  {showMapPicker ? 'Hide Map' : 'Click on Map to Place Pin'}
                </button>
              </div>

              {/* Visual Map Picker */}
              {showMapPicker && data.mapImageSrc && (
                <div className="border-2 border-primary-green rounded-lg p-2 bg-white dark:bg-gray-800">
                  <div
                    className="relative w-full h-64 bg-gray-100 dark:bg-gray-600 rounded cursor-crosshair overflow-hidden"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%';
                      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%';
                      setFormData(prev => ({ ...prev, position: { x, y } }));
                    }}
                  >
                    <img
                      src={data.mapImageSrc}
                      alt="Map"
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Show all existing pins */}
                    {regions.map((region, idx) => (
                      region.position && (
                        <div
                          key={idx}
                          className="absolute"
                          style={{
                            left: region.position.x,
                            top: region.position.y,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                        </div>
                      )
                    ))}

                    {/* Show current editing pin */}
                    {formData.position && (
                      <div
                        className="absolute animate-bounce"
                        style={{
                          left: formData.position.x,
                          top: formData.position.y,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <svg className="w-8 h-8 text-[#FF9700] drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs font-bold text-orange-600 whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
                          {formData.name || 'Click to place'}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                    Click anywhere on the map to place the pin for this region
                  </p>
                </div>
              )}

              {/* Manual Position Input */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium mb-1">X Position (%)</label>
                  <input
                    type="text"
                    value={formData.position.x}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: { ...prev.position, x: e.target.value } }))}
                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs"
                    placeholder="50%"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Y Position (%)</label>
                  <input
                    type="text"
                    value={formData.position.y}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: { ...prev.position, y: e.target.value } }))}
                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs"
                    placeholder="50%"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button onClick={handleSave} disabled={!formData.name} className="flex items-center space-x-1 px-3 py-1.5 bg-primary-green text-white rounded-lg hover:bg-green-700 text-sm disabled:opacity-50">
                <Save className="w-4 h-4" />
                <span>{isAddingNew ? 'Add' : 'Save'}</span>
              </button>
              <button onClick={handleCancel} className="px-3 py-1.5 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green mx-auto"></div></div>
      ) : regions.length === 0 ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          <p>No operation regions yet</p>
          <button onClick={handleAddNew} className="mt-2 text-primary-green hover:underline text-sm">Add your first region</button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Map Preview with All Pins */}
          {data.mapImageSrc && (
            <div className="border-2 border-gray-200 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800">
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Map Preview</h5>
              <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-600 rounded overflow-hidden">
                <img src={data.mapImageSrc} alt="Map" className="w-full h-full object-contain" />
                {regions.map((region, idx) => (
                  region.position && (
                    <div
                      key={idx}
                      className="absolute group"
                      style={{
                        left: region.position.x,
                        top: region.position.y,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <svg className="w-6 h-6 text-[#FF9700] hover:scale-125 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs font-bold text-orange-600 whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                        {region.name}
                      </span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Regions List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regions.map((region) => (
              <div key={region._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-white">{region.name}</h5>
                    {region.position && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        📍 Position: {region.position.x}, {region.position.y}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <button onClick={() => handleEdit(region)} className="p-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"><Edit className="w-3 h-3" /></button>
                    <button onClick={() => region._id && handleDelete(region._id)} className="p-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
                {region.description && <p className="text-sm text-gray-600 dark:text-gray-400">{region.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

