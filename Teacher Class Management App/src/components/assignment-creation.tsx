import React, { useState } from 'react';
import { ViewType } from '../App';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { Home, Users, BookOpen, FolderOpen, BarChart3, Settings, ChevronLeft, Calendar as CalendarIcon, Upload, Sparkles } from 'lucide-react';

interface AssignmentCreationProps {
  classId?: string;
  navigateTo: (view: ViewType, classId?: string) => void;
}

export function AssignmentCreation({ classId, navigateTo }: AssignmentCreationProps) {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState<Date>();
  const [files, setFiles] = useState<string[]>([]);

  const sidebarItems = [
    { icon: Home, label: 'Home', view: 'dashboard' as ViewType },
    { icon: Users, label: 'Classes', view: 'dashboard' as ViewType },
    { icon: BookOpen, label: 'Assignments', view: 'dashboard' as ViewType },
    { icon: FolderOpen, label: 'Resources', view: 'dashboard' as ViewType },
    { icon: BarChart3, label: 'Analytics', view: 'analytics' as ViewType },
    { icon: Settings, label: 'Settings', view: 'settings' as ViewType },
  ];

  const handleSaveDraft = () => {
    // Mock save draft functionality
    console.log('Saving draft...', { title, instructions, dueDate, files });
    navigateTo('classroom', classId);
  };

  const handlePostAssignment = () => {
    // Mock post assignment functionality
    console.log('Posting assignment...', { title, instructions, dueDate, files });
    navigateTo('classroom', classId);
  };

  const handleGenerateQuestions = () => {
    // Mock AI question generation
    const sampleQuestions = `1. Solve for x: 2x + 5 = 15

2. Calculate the area of a rectangle with length 8 cm and width 6 cm.

3. If Sarah has 24 apples and gives away 1/3 of them, how many apples does she have left?

4. Convert the fraction 3/4 to a decimal.

5. Find the perimeter of a triangle with sides 5 cm, 7 cm, and 9 cm.`;
    
    setInstructions(prev => prev + (prev ? '\n\n' : '') + sampleQuestions);
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
                onClick={() => navigateTo('classroom', classId)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Class
              </Button>
              <div className="flex-1">
                <h1 className="text-3xl font-semibold mb-2">Create Assignment</h1>
                <p className="text-muted-foreground">Mathematics Grade 5</p>
              </div>
              <SidebarTrigger className="lg:hidden" />
            </div>

            <div className="max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assignment Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter assignment title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="instructions">Instructions</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleGenerateQuestions}
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      >
                        <Sparkles className="h-4 w-4 mr-1" />
                        Generate Questions
                      </Button>
                    </div>
                    <Textarea
                      id="instructions"
                      placeholder="Enter assignment instructions and questions..."
                      className="min-h-[200px]"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dueDate ? format(dueDate, 'PPP') : 'Select due date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dueDate}
                          onSelect={setDueDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Attachments</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                      <Button variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">Attached files:</p>
                        <ul className="text-sm">
                          {files.map((file, index) => (
                            <li key={index} className="text-blue-600">{file}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={handleSaveDraft}>
                  Save Draft
                </Button>
                <Button 
                  onClick={handlePostAssignment}
                  disabled={!title || !instructions}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Post Assignment
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}