import React from 'react';
import { ViewType } from '../App';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Home, Users, BookOpen, FolderOpen, BarChart3, Settings, TrendingUp, AlertTriangle, Sparkles } from 'lucide-react';

interface AnalyticsProps {
  navigateTo: (view: ViewType) => void;
}

// Mock data
const performanceData = [
  { month: 'Sep', average: 78, submissions: 85 },
  { month: 'Oct', average: 82, submissions: 88 },
  { month: 'Nov', average: 79, submissions: 82 },
  { month: 'Dec', average: 85, submissions: 90 },
  { month: 'Jan', average: 87, submissions: 92 },
];

const classPerformance = [
  { class: 'Math Grade 5', average: 87, completion: 92 },
  { class: 'Science Grade 4', average: 82, completion: 88 },
  { class: 'English Grade 6', average: 85, completion: 90 },
  { class: 'History Grade 5', average: 79, completion: 85 },
];

const studentPerformance = [
  { name: 'Alice Johnson', grade: 'A', completion: 95, trend: 'up' },
  { name: 'Bob Smith', grade: 'B+', completion: 87, trend: 'stable' },
  { name: 'Carol Davis', grade: 'A-', completion: 92, trend: 'up' },
  { name: 'David Wilson', grade: 'B', completion: 78, trend: 'down' },
  { name: 'Emma Brown', grade: 'A', completion: 94, trend: 'up' },
  { name: 'Frank Miller', grade: 'C+', completion: 72, trend: 'down' },
  { name: 'Grace Lee', grade: 'B+', completion: 89, trend: 'stable' },
  { name: 'Henry Clark', grade: 'B-', completion: 83, trend: 'up' },
];

export function Analytics({ navigateTo }: AnalyticsProps) {
  const sidebarItems = [
    { icon: Home, label: 'Home', view: 'dashboard' as ViewType },
    { icon: Users, label: 'Classes', view: 'dashboard' as ViewType },
    { icon: BookOpen, label: 'Assignments', view: 'dashboard' as ViewType },
    { icon: FolderOpen, label: 'Resources', view: 'dashboard' as ViewType },
    { icon: BarChart3, label: 'Analytics', view: 'analytics' as ViewType, active: true },
    { icon: Settings, label: 'Settings', view: 'settings' as ViewType },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getGradeBadge = (grade: string) => {
    const color = grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                  grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800';
    return <Badge className={color}>{grade}</Badge>;
  };

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
                <h1 className="text-3xl font-semibold mb-2">Analytics</h1>
                <p className="text-muted-foreground">Track student performance and identify areas for improvement</p>
              </div>
              <SidebarTrigger className="lg:hidden" />
            </div>

            {/* AI Insights */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Improving</span>
                    </div>
                    <p className="text-sm text-green-700">Math Grade 5 showing 8% improvement this month</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Needs Attention</span>
                    </div>
                    <p className="text-sm text-orange-700">3 students need extra help with algebra concepts</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Recommendation</span>
                    </div>
                    <p className="text-sm text-blue-700">Consider group activities for collaborative learning</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} name="Average Grade" />
                      <Line type="monotone" dataKey="submissions" stroke="#10b981" strokeWidth={2} name="Submission Rate" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Class Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={classPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="class" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="average" fill="#3b82f6" name="Average Grade" />
                      <Bar dataKey="completion" fill="#10b981" name="Completion Rate" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Student Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Student Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Current Grade</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentPerformance.map((student) => (
                      <TableRow key={student.name}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{getGradeBadge(student.grade)}</TableCell>
                        <TableCell>{student.completion}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(student.trend)}
                            <span className="text-sm capitalize">{student.trend}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {student.completion < 80 ? (
                            <Badge variant="destructive">Needs Support</Badge>
                          ) : student.completion > 90 ? (
                            <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                          ) : (
                            <Badge variant="secondary">Good</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}