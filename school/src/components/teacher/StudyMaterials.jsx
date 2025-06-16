import React, { useState } from 'react';
import { Upload, FileText, Video, Image, Download, Eye, Trash2, Plus, Search } from 'lucide-react';

const StudyMate = () => {
  const [materials, setMaterials] = useState([
    {
      id: 'MAT001',
      title: 'Algebra Fundamentals Guide',
      type: 'document',
      subject: 'Mathematics',
      class: 'Class 10A',
      size: '2.5 MB',
      uploadDate: '2024-01-08',
      downloads: 45,
      description: 'Complete guide covering basic algebra concepts and problem-solving techniques.',
      tags: ['algebra', 'fundamentals', 'equations']
    },
    {
      id: 'MAT002',
      title: 'Physics Lab Experiment Videos',
      type: 'video',
      subject: 'Physics',
      class: 'Class 9B',
      size: '125 MB',
      uploadDate: '2024-01-05',
      downloads: 32,
      description: 'Video demonstrations of key physics experiments for better understanding.',
      tags: ['physics', 'experiments', 'lab']
    },
    {
      id: 'MAT003',
      title: 'Mathematical Formulas Reference',
      type: 'image',
      subject: 'Mathematics',
      class: 'Class 10A',
      size: '1.8 MB',
      uploadDate: '2024-01-03',
      downloads: 28,
      description: 'Visual reference sheet with important mathematical formulas.',
      tags: ['formulas', 'reference', 'mathematics']
    }
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'document',
    subject: '',
    class: '',
    description: '',
    tags: '',
    file: null
  });

  const classes = ['Class 10A', 'Class 9B'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const materialTypes = [
    { value: 'document', label: 'Document', icon: FileText, color: 'text-blue-500' },
    { value: 'video', label: 'Video', icon: Video, color: 'text-red-500' },
    { value: 'image', label: 'Image', icon: Image, color: 'text-green-500' }
  ];

  const handleUpload = () => {
    if (newMaterial.title && newMaterial.subject && newMaterial.class && newMaterial.file) {
      const material = {
        id: `MAT${String(materials.length + 1).padStart(3, '0')}`,
        ...newMaterial,
        size: `${(Math.random() * 10 + 1).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0,
        tags: newMaterial.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      
      setMaterials([...materials, material]);
      setNewMaterial({
        title: '',
        type: 'document',
        subject: '',
        class: '',
        description: '',
        tags: '',
        file: null
      });
      setShowUploadForm(false);
    }
  };

  const handleDelete = (materialId) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter(material => material.id !== materialId));
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || material.type === filterType;
    const matchesSubject = filterSubject === 'all' || material.subject === filterSubject;
    
    return matchesSearch && matchesType && matchesSubject;
  });

  const getTypeIcon = (type) => {
    const typeObj = materialTypes.find(t => t.value === type);
    return typeObj ? typeObj.icon : FileText;
  };

  const getTypeColor = (type) => {
    const typeObj = materialTypes.find(t => t.value === type);
    return typeObj ? typeObj.color : 'text-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Study Materials</h2>
          <p className="text-gray-600 mt-1">Upload and manage study materials for your students</p>
        </div>
        <button
          onClick={() => setShowUploadForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Materials</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{materials.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Documents</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {materials.filter(m => m.type === 'document').length}
              </p>
            </div>
            <FileText className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Videos</p>
              <p className="text-2xl font-bold text-red-900 mt-1">
                {materials.filter(m => m.type === 'video').length}
              </p>
            </div>
            <Video className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Total Downloads</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {materials.reduce((sum, m) => sum + m.downloads, 0)}
              </p>
            </div>
            <Download className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {materialTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterSubject('all');
              }}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => {
          const TypeIcon = getTypeIcon(material.type);
          return (
            <div key={material.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  material.type === 'document' ? 'bg-blue-100' :
                  material.type === 'video' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <TypeIcon className={`w-6 h-6 ${getTypeColor(material.type)}`} />
                </div>
                <div className="flex space-x-1">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(material.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{material.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{material.description}</p>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Subject:</span>
                  <span className="font-medium">{material.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span>Class:</span>
                  <span className="font-medium">{material.class}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="font-medium">{material.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Downloads:</span>
                  <span className="font-medium">{material.downloads}</span>
                </div>
              </div>

              {material.tags && material.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {material.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                    {material.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        +{material.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  {new Date(material.uploadDate).toLocaleDateString()}
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No materials found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Upload Study Material</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter material title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {materialTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={newMaterial.subject}
                    onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select
                    value={newMaterial.class}
                    onChange={(e) => setNewMaterial({ ...newMaterial, class: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    {classes.map(className => (
                      <option key={className} value={className}>{className}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter material description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newMaterial.tags}
                  onChange={(e) => setNewMaterial({ ...newMaterial, tags: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., algebra, equations, practice"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                <input
                  type="file"
                  onChange={(e) => setNewMaterial({ ...newMaterial, file: e.target.files[0] })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  accept={
                    newMaterial.type === 'video' ? 'video/*' :
                    newMaterial.type === 'image' ? 'image/*' :
                    '.pdf,.doc,.docx,.ppt,.pptx'
                  }
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={handleUpload}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Material</span>
              </button>
              <button
                onClick={() => setShowUploadForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyMate;