import React, { useState } from 'react';
import { ViewType } from '../App';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Home, Users, BookOpen, FolderOpen, BarChart3, Settings, ChevronLeft, Eye, FileText, Clock, CheckCircle, Sparkles } from 'lucide-react';

interface StudentSubmissionsProps {
  assignmentId?: string;
  navigateTo: (view: ViewType, classId?: string) => void;
}

// Mock data
const mockAssignment = {
  id: '1',
  title: 'Algebra Basics',
  dueDate: '2024-01-15',
  totalPoints: 100
};

const mockSubmissions = [
  { 
    id: '1', 
    studentName: 'Alice Johnson', 
    status: 'Submitted', 
    submittedAt: '2024-01-14 10:30 AM', 
    grade: 95, 
    aiSuggestion: 'Excellent work! Strong understanding of algebraic concepts.',
    content: 'x = 5\n\nStep 1: 2x + 5 = 15\nStep 2: 2x = 15 - 5\nStep 3: 2x = 10\nStep 4: x = 10/2\nStep 5: x = 5'
  },
  { 
    id: '2', 
    studentName: 'Bob Smith', 
    status: 'Submitted', 
    submittedAt: '2024-01-15 9:15 AM', 
    grade: null, 
    aiSuggestion: 'Good approach but missing final step. Consider partial credit.',
    content: '2x + 5 = 15\n2x = 10\nAnswer: x = 5 (but work not shown completely)'
  },
  { 
    id: '3', 
    studentName: 'Carol Davis', 
    status: 'Submitted', 
    submittedAt: '2024-01-13 2:45 PM', 
    grade: 88, 
    aiSuggestion: 'Minor calculation error in step 2, but method is correct.',
    content: 'x = 5\n\nShowed all work correctly with clear steps.'
  },
  { 
    id: '4', 
    studentName: 'David Wilson', 
    status: 'Missing', 
    submittedAt: null, 
    grade: null, 
    aiSuggestion: null,
    content: null
  },
];

export function StudentSubmissions({ assignmentId, navigateTo }: StudentSubmissionsProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<typeof mockSubmissions[0] | null>(null);
  const [currentGrade, setCurrentGrade] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const sidebarItems = [
    { icon: Home, label: 'Home', view: 'dashboard' as ViewType },
    { icon: Users, label: 'Classes', view: 'dashboard' as ViewType },
    { icon: BookOpen, label: 'Assignments', view: 'dashboard' as ViewType },
    { icon: FolderOpen, label: 'Resources', view: 'dashboard' as ViewType },
    { icon: BarChart3, label: 'Analytics', view: 'analytics' as ViewType },
    { icon: Settings, label: 'Settings', view: 'settings' as ViewType },
  ];

  const handleViewSubmission = (submission: typeof mockSubmissions[0]) => {
    setSelectedSubmission(submission);
    setCurrentGrade(submission.grade?.toString() || '');
    setFeedback('');
  };

  const handleSaveGrade = () => {
    if (selectedSubmission) {
      console.log('Saving grade:', { submissionId: selectedSubmission.id, grade: currentGrade, feedback });
      setSelectedSubmission(null);
      setCurrentGrade('');
      setFeedback('');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Submitted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Missing':
        return <Clock className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return <Badge variant="default" className="bg-green-100 text-green-800">Submitted</Badge>;
      case 'Missing':
        return <Badge variant="destructive">Missing</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
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
                onClick={() => navigateTo('classroom')}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Class
              </Button>
              <div className="flex-1">
                <h1 className="text-3xl font-semibold mb-2">Student Submissions</h1>
                <p className="text-muted-foreground">{mockAssignment.title} • Due {mockAssignment.dueDate} • {mockAssignment.totalPoints} points</p>
              </div>
              <SidebarTrigger className="lg:hidden" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Submissions List */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Submissions ({mockSubmissions.filter(s => s.status === 'Submitted').length}/{mockSubmissions.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>AI</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockSubmissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(submission.status)}
                                {submission.studentName}
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(submission.status)}
                            </TableCell>
                            <TableCell>
                              {submission.grade ? `${submission.grade}%` : '-'}
                            </TableCell>
                            <TableCell>
                              {submission.aiSuggestion && (
                                <Sparkles className="h-4 w-4 text-purple-500" />
                              )}
                            </TableCell>
                            <TableCell>
                              {submission.status === 'Submitted' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleViewSubmission(submission)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Submission Detail */}
              <div>
                {selectedSubmission ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {selectedSubmission.studentName}'s Submission
                        <Badge variant="outline">{selectedSubmission.submittedAt}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* AI Suggestion */}
                      {selectedSubmission.aiSuggestion && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-800">AI Grading Suggestion</span>
                          </div>
                          <p className="text-sm text-purple-700">{selectedSubmission.aiSuggestion}</p>
                        </div>
                      )}

                      {/* Submission Content */}
                      <div>
                        <label className="text-sm font-medium">Student Answer:</label>
                        <div className="mt-1 p-3 bg-gray-50 rounded border">
                          <pre className="text-sm whitespace-pre-wrap">{selectedSubmission.content}</pre>
                        </div>
                      </div>

                      {/* Grading */}
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Grade (out of {mockAssignment.totalPoints})</label>
                          <Input
                            type="number"
                            min="0"
                            max={mockAssignment.totalPoints}
                            value={currentGrade}
                            onChange={(e) => setCurrentGrade(e.target.value)}
                            placeholder="Enter grade..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Feedback</label>
                          <Textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Enter feedback for the student..."
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleSaveGrade} disabled={!currentGrade}>
                            Save Grade
                          </Button>
                          <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Select a Submission</h3>
                      <p className="text-muted-foreground">Choose a student submission from the list to view and grade it.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}