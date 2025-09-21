import React, { useState } from 'react';
import { ViewType } from '../App';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Home, Users, BookOpen, FolderOpen, BarChart3, Settings as SettingsIcon, Wifi, WifiOff, Cloud, CloudOff, User, Bell, Download, Upload, LogOut } from 'lucide-react';

interface SettingsProps {
  navigateTo: (view: ViewType) => void;
  onLogout: () => void;
}

export function Settings({ navigateTo, onLogout }: SettingsProps) {
  const [offlineSync, setOfflineSync] = useState(true);
  const [autoBackup, setAutoBackup] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [wifiSharing, setWifiSharing] = useState(false);

  const sidebarItems = [
    { icon: Home, label: 'Home', view: 'dashboard' as ViewType },
    { icon: Users, label: 'Classes', view: 'dashboard' as ViewType },
    { icon: BookOpen, label: 'Assignments', view: 'dashboard' as ViewType },
    { icon: FolderOpen, label: 'Resources', view: 'dashboard' as ViewType },
    { icon: BarChart3, label: 'Analytics', view: 'analytics' as ViewType },
    { icon: SettingsIcon, label: 'Settings', view: 'settings' as ViewType, active: true },
  ];

  const handleExportData = () => {
    console.log('Exporting data...');
    // Mock export functionality
  };

  const handleImportData = () => {
    console.log('Importing data...');
    // Mock import functionality
  };

  const handleCloudBackup = () => {
    console.log('Starting cloud backup...');
    // Mock cloud backup functionality
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
                <h1 className="text-3xl font-semibold mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your preferences and sync options</p>
              </div>
              <SidebarTrigger className="lg:hidden" />
            </div>

            <div className="max-w-4xl space-y-6">
              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="teacher@school.edu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <Input id="fullname" defaultValue="Sarah Johnson" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school">School Name</Label>
                    <Input id="school" defaultValue="Riverside Elementary School" />
                  </div>
                  <Button>Update Profile</Button>
                </CardContent>
              </Card>

              {/* Offline Sync Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <WifiOff className="h-5 w-5" />
                    Offline Sync Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Enable Offline Mode</Label>
                      <p className="text-sm text-muted-foreground">Allow the app to work without internet connection</p>
                    </div>
                    <Switch checked={offlineSync} onCheckedChange={setOfflineSync} />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Share over Wi-Fi</Label>
                      <p className="text-sm text-muted-foreground">Allow other devices to connect and sync data</p>
                    </div>
                    <Switch checked={wifiSharing} onCheckedChange={setWifiSharing} />
                  </div>

                  {wifiSharing && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Wifi className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Wi-Fi Sharing Active</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-2">Network: ClassroomOffline_SarahJ</p>
                      <p className="text-sm text-blue-700">Password: classroom2024</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Cloud Backup */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5" />
                    Cloud Backup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Auto Backup</Label>
                      <p className="text-sm text-muted-foreground">Automatically backup data when connected to internet</p>
                    </div>
                    <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Last Backup</Label>
                      <p className="text-sm text-muted-foreground">Never backed up</p>
                    </div>
                    <Button onClick={handleCloudBackup} disabled className="w-full">
                      <CloudOff className="h-4 w-4 mr-2" />
                      Backup to Cloud (Coming Soon)
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Data Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" onClick={handleExportData}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" onClick={handleImportData}>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Data
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Storage Used</Label>
                    <div className="bg-gray-200 h-2 rounded-full">
                      <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">124 MB of 500 MB used</p>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for assignments and deadlines</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                </CardContent>
              </Card>

              {/* Logout */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Logout</Label>
                      <p className="text-sm text-muted-foreground">Sign out of your account</p>
                    </div>
                    <Button variant="destructive" onClick={onLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}