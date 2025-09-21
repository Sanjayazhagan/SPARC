import React from 'react';
import { ViewType } from '../App';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Users, BookOpen, FolderOpen, BarChart3, Settings, Plus, ChevronRight } from 'lucide-react';

interface DashboardProps {
  navigateTo: (view: ViewType, classId?: string) => void;
}

// Mock data
const mockClasses = [
  { id: '1', name: 'Mathematics Grade 5', students: 24, nextAssignment: 'Algebra Basics', color: 'bg-blue-500' },
  { id: '2', name: 'Science Grade 4', students: 19, nextAssignment: 'Plant Life Cycle', color: 'bg-green-500' },
  { id: '3', name: 'English Grade 6', students: 22, nextAssignment: 'Poetry Analysis', color: 'bg-purple-500' },
  { id: '4', name: 'History Grade 5', students: 26, nextAssignment: 'Ancient Civilizations', color: 'bg-orange-500' },
];

const quickStats = [
  { label: 'Total Students', value: '91', trend: '+3 this week' },
  { label: 'Active Classes', value: '4', trend: 'All running' },
  { label: 'Pending Grading', value: '12', trend: '3 overdue' },
  { label: 'Completion Rate', value: '87%', trend: '+5% this month' },
];

export function Dashboard({ navigateTo }: DashboardProps) {
  const sidebarItems = [
    { icon: Home, label: 'Home', view: 'dashboard' as ViewType, active: true },
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
                  <SidebarMenuButton 
                    onClick={() => navigateTo(item.view)}
                    isActive={item.active}
                  >
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening in your classes.</p>
              </div>
              <SidebarTrigger className="lg:hidden" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {quickStats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-xs text-green-600">{stat.trend}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Classes Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Classes</h2>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Class
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockClasses.map((classItem) => (
                  <Card key={classItem.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`w-3 h-3 rounded-full ${classItem.color} mt-1`} />
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Students</span>
                          <span className="font-medium">{classItem.students}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Next: </span>
                          <span className="font-medium">{classItem.nextAssignment}</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        variant="outline"
                        onClick={() => navigateTo('classroom', classItem.id)}
                      >
                        Open Class
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">John Smith submitted "Algebra Basics" assignment</span>
                    <span className="text-xs text-muted-foreground ml-auto">2 minutes ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">New assignment "Poetry Analysis" posted to English Grade 6</span>
                    <span className="text-xs text-muted-foreground ml-auto">1 hour ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-sm">Reminder: "Plant Life Cycle" due tomorrow</span>
                    <span className="text-xs text-muted-foreground ml-auto">3 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}