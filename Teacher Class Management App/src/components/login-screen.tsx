import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BookOpen, Wifi } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      onLogin();
    }
  };



  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">ClassroomOffline</CardTitle>
          <p className="text-muted-foreground">Manage your classes anywhere, anytime</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (username && password) {
                    handleLogin();
                  }
                }
              }}
            />
          </div>
          <div className="space-y-3">
            <Button 
              onClick={handleLogin} 
              className="w-full"
              disabled={!username || !password}
            >
              Login
            </Button>

            <Button 
              variant="ghost" 
              className="w-full text-muted-foreground"
              disabled
            >
              <Wifi className="h-4 w-4 mr-2" />
              Sync with Cloud
              <span className="text-xs ml-2">(Coming Soon)</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}