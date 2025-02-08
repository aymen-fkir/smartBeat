import React from 'react';
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"

interface AuthProps {
  onSwitch: () => void
  onLogin?: () => void
}

export const Login: React.FC<AuthProps> = ({ onSwitch, onLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      onLogin?.()
    } else {
      alert("Please enter both email and password.")
    }
  }

  return (
    <Card className="w-full border-4">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
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
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <p className="text-center">
            Don't have an account?{" "}
            <button type="button" className="text-blue-500 hover:underline" onClick={onSwitch}>
              Sign Up
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export const Signup: React.FC<AuthProps> = ({ onSwitch }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Input type="text" placeholder="Full Name" className="w-full" />
          </div>
          <div>
            <Input type="email" placeholder="Email" className="w-full" />
          </div>
          <div>
            <Input type="password" placeholder="Password" className="w-full" />
          </div>
          <div>
            <Input type="password" placeholder="Confirm Password" className="w-full" />
          </div>
          <Button className="w-full">Sign Up</Button>
          <p className="text-center">
            Already have an account?{" "}
            <button className="text-blue-500 hover:underline" onClick={onSwitch}>
              Sign In
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

