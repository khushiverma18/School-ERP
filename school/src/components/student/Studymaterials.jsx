import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, BookOpen, FileText, Video, Headphones, Eye, Calendar, User } from "lucide-react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function StudentMaterials({ isOpen, toggleSidebar }) {
  const studyMaterials = {
    notes: [
      {
        id: 1,
        title: "Quadratic Equations - Complete Guide",
        subject: "Mathematics",
        teacher: "Mr. Ahmed",
        uploadDate: "2024-03-15",
        fileType: "PDF",
        fileSize: "2.5 MB",
        description: "Comprehensive notes covering all types of quadratic equations",
        downloads: 142,
        type: "notes"
      },
      {
        id: 2,
        title: "English Grammar Rules",
        subject: "English",
        teacher: "Ms. Sarah",
        uploadDate: "2024-03-12",
        fileType: "PDF",
        fileSize: "1.8 MB",
        description: "Essential grammar rules with examples",
        downloads: 98,
        type: "notes"
      },
      {
        id: 3,
        title: "Organic Chemistry Basics",
        subject: "Chemistry",
        teacher: "Ms. Fatima",
        uploadDate: "2024-03-10",
        fileType: "PDF",
        fileSize: "3.2 MB",
        description: "Introduction to organic chemistry concepts",
        downloads: 156,
        type: "notes"
      }
    ],
    videos: [
      {
        id: 4,
        title: "Physics - Laws of Motion Explained",
        subject: "Physics",
        teacher: "Dr. Rahman",
        uploadDate: "2024-03-14",
        fileType: "MP4",
        fileSize: "125 MB",
        duration: "45 minutes",
        description: "Visual explanation of Newton's laws with examples",
        views: 234,
        type: "video"
      },
      {
        id: 5,
        title: "Cell Division Process",
        subject: "Biology",
        teacher: "Mr. Hasan",
        uploadDate: "2024-03-13",
        fileType: "MP4",
        fileSize: "98 MB",
        duration: "32 minutes",
        description: "Step-by-step process of mitosis and meiosis",
        views: 187,
        type: "video"
      }
    ],
    assignments: [
      {
        id: 6,
        title: "Mathematics Practice Problems",
        subject: "Mathematics",
        teacher: "Mr. Ahmed",
        uploadDate: "2024-03-16",
        fileType: "PDF",
        fileSize: "1.2 MB",
        description: "Practice problems for upcoming exam",
        downloads: 89,
        type: "assignment"
      },
      {
        id: 7,
        title: "Chemistry Lab Manual",
        subject: "Chemistry",
        teacher: "Ms. Fatima",
        uploadDate: "2024-03-11",
        fileType: "PDF",
        fileSize: "4.1 MB",
        description: "Complete lab procedures and safety guidelines",
        downloads: 67,
        type: "assignment"
      }
    ],
    audioBooks: [
      {
        id: 8,
        title: "Bangla Literature Audio Book",
        subject: "Bangla",
        teacher: "Ms. Rashida",
        uploadDate: "2024-03-09",
        fileType: "MP3",
        fileSize: "78 MB",
        duration: "2 hours 15 minutes",
        description: "Audio narration of selected poems",
        downloads: 45,
        type: "audio"
      }
    ]
  };

  const getFileIcon = (type) => {
    const icons = {
      "notes": FileText,
      "video": Video,
      "assignment": BookOpen,
      "audio": Headphones
    };
    return icons[type] || FileText;
  };

  const getFileTypeColor = (type) => {
    const colors = {
      "PDF": "bg-red-100 text-red-800",
      "MP4": "bg-blue-100 text-blue-800",
      "MP3": "bg-green-100 text-green-800",
      "DOCX": "bg-blue-100 text-blue-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getSubjectColor = (subject) => {
    const colors = {
      "Mathematics": "bg-blue-500",
      "English": "bg-green-500",
      "Physics": "bg-purple-500",
      "Chemistry": "bg-orange-500",
      "Biology": "bg-teal-500",
      "Bangla": "bg-pink-500"
    };
    return colors[subject] || "bg-gray-500";
  };

  const allMaterials = [
    ...studyMaterials.notes,
    ...studyMaterials.videos,
    ...studyMaterials.assignments,
    ...studyMaterials.audioBooks
  ].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

  const MaterialCard = ({ material }) => {
    const IconComponent = getFileIcon(material.type);
    
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3 flex-1">
              <div className={`p-3 rounded-lg ${getSubjectColor(material.subject)} bg-opacity-10`}>
                <IconComponent className={`h-6 w-6 ${getSubjectColor(material.subject).replace('bg-', 'text-')}`} />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                  {material.title}
                </CardTitle>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getSubjectColor(material.subject)} text-white`}>
                    {material.subject}
                  </Badge>
                  <Badge className={getFileTypeColor(material.fileType)}>
                    {material.fileType}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm">{material.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{material.teacher}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{material.uploadDate}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Size:</span>
              <span className="text-gray-600 ml-1">{material.fileSize}</span>
            </div>
            <div>
              {material.duration && (
                <>
                  <span className="font-medium text-gray-700">Duration:</span>
                  <span className="text-gray-600 ml-1">{material.duration}</span>
                </>
              )}
              {material.downloads !== undefined && (
                <>
                  <span className="font-medium text-gray-700">Downloads:</span>
                  <span className="text-gray-600 ml-1">{material.downloads}</span>
                </>
              )}
              {material.views && (
                <>
                  <span className="font-medium text-gray-700">Views:</span>
                  <span className="text-gray-600 ml-1">{material.views}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            {material.type === 'video' && (
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                <Eye className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 min-h-screen">
      <div className="flex items-center gap-4">
         <button
    onClick={toggleSidebar}
    className="p-2 rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors"
  >
    {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
  </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Studymaterials 📚
            </h1>
          </div>
        </div>
      {/* Search and Filter */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search study materials..." 
                className="pl-10 border-purple-200 focus:border-purple-400"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                Filter by Subject
              </Button>
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                Filter by Type
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <FileText className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Notes</h3>
                <p className="text-3xl font-bold">{studyMaterials.notes.length}</p>
                <p className="text-sm text-blue-100">study guides</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Video className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Videos</h3>
                <p className="text-3xl font-bold">{studyMaterials.videos.length}</p>
                <p className="text-sm text-red-100">lectures</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <BookOpen className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Assignments</h3>
                <p className="text-3xl font-bold">{studyMaterials.assignments.length}</p>
                <p className="text-sm text-green-100">practice sets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Headphones className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Audio</h3>
                <p className="text-3xl font-bold">{studyMaterials.audioBooks.length}</p>
                <p className="text-sm text-purple-100">books</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All Materials
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Notes
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Audio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allMaterials.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyMaterials.notes.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyMaterials.videos.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyMaterials.assignments.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyMaterials.audioBooks.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
