import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Video, 
  Image, 
  Search, 
  Filter,
  Calendar,
  BookOpen,
  Eye,
  Star
} from 'lucide-react';

const StudyMaterials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const studyMaterials = [
    {
      id: 'mat_001',
      title: 'Algebra Fundamentals Guide',
      subject: 'Mathematics',
      type: 'document',
      description: 'Complete guide covering basic algebra concepts and problem-solving techniques.',
      uploadDate: '2024-12-01',
      size: '2.5 MB',
      downloads: 45,
      rating: 4.8,
      teacher: 'Dr. Smith',
      tags: ['algebra', 'fundamentals', 'equations']
    },
    {
      id: 'mat_002',
      title: 'Chemical Reactions Video Tutorial',
      subject: 'Science',
      type: 'video',
      description: 'Interactive video explaining different types of chemical reactions with examples.',
      uploadDate: '2024-11-28',
      size: '125 MB',
      downloads: 32,
      rating: 4.9,
      teacher: 'Ms. Johnson',
      tags: ['chemistry', 'reactions', 'experiments']
    },
    {
      id: 'mat_003',
      title: 'World War II Timeline Infographic',
      subject: 'History',
      type: 'image',
      description: 'Visual timeline showing major events of World War II with key dates and figures.',
      uploadDate: '2024-11-25',
      size: '1.8 MB',
      downloads: 28,
      rating: 4.6,
      teacher: 'Ms. Davis',
      tags: ['ww2', 'timeline', 'history']
    },
    {
      id: 'mat_004',
      title: 'Grammar Rules Handbook',
      subject: 'English',
      type: 'document',
      description: 'Comprehensive handbook covering English grammar rules with examples and exercises.',
      uploadDate: '2024-11-22',
      size: '3.2 MB',
      downloads: 52,
      rating: 4.7,
      teacher: 'Mr. Brown',
      tags: ['grammar', 'rules', 'exercises']
    },
    {
      id: 'mat_005',
      title: 'Climate Zones Presentation',
      subject: 'Geography',
      type: 'document',
      description: 'Detailed presentation about different climate zones around the world.',
      uploadDate: '2024-11-20',
      size: '4.1 MB',
      downloads: 23,
      rating: 4.5,
      teacher: 'Mr. Wilson',
      tags: ['climate', 'geography', 'zones']
    },
    {
      id: 'mat_006',
      title: 'Physical Fitness Training Video',
      subject: 'Physical Education',
      type: 'video',
      description: 'Home workout routines and fitness exercises for students.',
      uploadDate: '2024-11-18',
      size: '95 MB',
      downloads: 38,
      rating: 4.4,
      teacher: 'Coach Taylor',
      tags: ['fitness', 'exercise', 'health']
    }
  ];

  const subjects = ['all', 'Mathematics', 'Science', 'English', 'History', 'Geography', 'Physical Education'];
  const types = ['all', 'document', 'video', 'image'];

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    const matchesType = selectedType === 'all' || material.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="h-6 w-6 text-red-600" />;
      case 'image': return <Image className="h-6 w-6 text-green-600" />;
      default: return <FileText className="h-6 w-6 text-blue-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'image': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const downloadMaterial = (materialId, title) => {
    alert(`Downloading "${title}"...`);
  };

  const previewMaterial = (materialId, title) => {
    alert(`Opening preview for "${title}"...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Study Materials</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div key={material.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getFileIcon(material.type)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(material.type)}`}>
                  {material.type}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600">{material.rating}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{material.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{material.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Subject: {material.subject}</span>
                <span>Size: {material.size}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Teacher: {material.teacher}</span>
                <span>{material.downloads} downloads</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                {new Date(material.uploadDate).toLocaleDateString()}
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              {material.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => previewMaterial(material.id, material.title)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
              <button
                onClick={() => downloadMaterial(material.id, material.title)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}

      {/* Recently Added */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recently Added</h2>
        <div className="space-y-3">
          {studyMaterials
            .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
            .slice(0, 3)
            .map((material) => (
              <div key={material.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                {getFileIcon(material.type)}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{material.title}</h4>
                  <p className="text-sm text-gray-600">{material.subject} • {material.teacher}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(material.uploadDate).toLocaleDateString()}
                </span>
                <button
                  onClick={() => downloadMaterial(material.id, material.title)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;