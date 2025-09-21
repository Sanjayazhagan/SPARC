import React, { useState } from 'react';
import { ViewType } from '../App';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Home, Users, BookOpen, FolderOpen, BarChart3, Settings, Plus, FileText, Calendar, User, ChevronLeft } from 'lucide-react';

interface ClassroomViewProps {
  classId?: string;
  navigateTo: (view: ViewType, classId?: string, assignmentId?: string) => void;
}

// Mock data
const mockClass = {
  id: '1',
  name: 'Mathematics Grade 5',
  students: 24,
  description: 'Advanced mathematics concepts for 5th grade students including algebra, geometry, and problem-solving.'
};

const mockAssignments = [
  { id: '1', title: 'Algebra Basics', status: 'Published', dueDate: '2024-01-15', submissions: 18, total: 24 },
  { id: '2', title: 'Geometry Shapes', status: 'Draft', dueDate: '2024-01-20', submissions: 0, total: 24 },
  { id: '3', title: 'Word Problems', status: 'Published', dueDate: '2024-01-10', submissions: 24, total: 24 },
];

const mockStudents = [
  { id: '1', name: 'Alice Johnson', grade: 'A', completion: 95, lastActive: '2 hours ago' },
  { id: '2', name: 'Bob Smith', grade: 'B+', completion: 87, lastActive: '1 day ago' },
  { id: '3', name: 'Carol Davis', grade: 'A-', completion: 92, lastActive: '3 hours ago' },
  { id: '4', name: 'David Wilson', grade: 'B', completion: 78, lastActive: '2 days ago' },
];

const mockResources = [
  { id: '1', name: 'Math Worksheet Template', type: 'PDF', size: '2.1 MB' },
  { id: '2', name: 'Algebra Reference Guide', type: 'PDF', size: '1.8 MB' },
  { id: '3', name: 'Practice Problems Set', type: 'DOC', size: '875 KB' },
];

export function ClassroomView({ classId, navigateTo }: ClassroomViewProps) {
  const [activeTab, setActiveTab] = useState('stream');

  const sidebarItems = [
    { icon: Home, label: 'Home', view: 'dashboard' as ViewType },
    { icon: Users, label: 'Classes', view: 'dashboard' as ViewType },
    { icon: BookOpen, label: 'Assignments', view: 'dashboard' as ViewType },
    { icon: FolderOpen, label: 'Resources', view: 'dashboard' as ViewType },
    { icon: BarChart3, label: 'Analytics', view: 'analytics' as ViewType },
    { icon: Settings, label: 'Settings', view: 'settings' as ViewType },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold">ClassroomOffline</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton onClick={() => navigateTo(item.view)}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigateTo('dashboard')}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Button>
              <div className="flex-1">
                <h1 className="text-3xl font-semibold mb-2">{mockClass.name}</h1>
                <p className="text-muted-foreground">{mockClass.students} students • {mockClass.description}</p>
              </div>
              <SidebarTrigger className="lg:hidden" />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="stream">Stream</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
              </TabsList>

              <TabsContent value="stream" className="mt-6">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-500 p-2 rounded-full">
                          <FileText className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">New assignment posted</h3>
                          <p className="text-sm text-muted-foreground">Algebra Basics - Due January 15th</p>
                          <span className="text-xs text-muted-foreground">Posted 2 hours ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-500 p-2 rounded-full">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Student submissions</h3>
                          <p className="text-sm text-muted-foreground">18 students have submitted Word Problems assignment</p>
                          <span className="text-xs text-muted-foreground">Updated 1 hour ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="assignments" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Assignments</h2>
                  <Button onClick={() => navigateTo('assignment-create', classId)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>
                <div className="space-y-4">
                  {mockAssignments.map((assignment) => (
                    <Card key={assignment.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium">{assignment.title}</h3>
                              <Badge variant={assignment.status === 'Published' ? 'default' : 'secondary'}>
                                {assignment.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Due {assignment.dueDate}
                              </span>
                              <span>{assignment.submissions}/{assignment.total} submitted</span>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigateTo('submissions', classId, assignment.id)}
                          >
                            View Submissions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Resources</h2>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Resource
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockResources.map((resource) => (
                    <Card key={resource.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-100 p-2 rounded">
                            <FileText className="h-6 w-6 text-slate-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{resource.name}</h3>
                            <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="students" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Students ({mockStudents.length})</h2>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockStudents.map((student) => (
                    <Card key={student.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-500 p-2 rounded-full">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">Grade: {student.grade}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Completion</span>
                            <span className="font-medium">{student.completion}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Active</span>
                            <span className="font-medium">{student.lastActive}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}