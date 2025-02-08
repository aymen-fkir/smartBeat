import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { VestVisualization } from './vest-visualization';
import { MeasurementsTable } from './measurements-table';
import { Heart } from "lucide-react"

// Simulated data generation
const generateData = (length: number) => {
  return Array.from({ length }, (_, i) => ({
    time: i,
    ecg: Math.sin(i / 10) * 0.5 + Math.sin(i / 5) * 0.3 + Math.random() * 0.2,
    RestingECG:"Normal",
    Oldpeak: Math.random() * 2,
  }))
}

export const Dashboard = () => {
  const [data, setData] = useState(generateData(100))
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [heartState, setHeartState] = useState<string|null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isMonitoring) {
      interval = setInterval(() => {
        setData((prevData) => {
          const newData = [...prevData.slice(1), generateData(1)[0]]
          newData.forEach((d, i) => {
            d.time = i
          })
          return newData
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isMonitoring])

  useEffect(() => {
    const checkHeartState = async () => {
      try {
        const response = await fetch("/api/heartState", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "Age": 45,
            "Sex": "M",
            "ChestPainType": "ATA",
            "RestingBP": 130,
            "RestingECG": "Normal",
            "MaxHR": 170,
            "ExerciseAngina": "N",
            "Oldpeak": 1.5,
            "ST_Slope": "Up"
        }),
        })
        const data = await response.json()
        setHeartState(data.prediction)
      } catch (error) {
        console.error("Error fetching heart state:", error)
        setHeartState("Error")
      }
    }

    checkHeartState()
    const interval = setInterval(checkHeartState, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Medical Monitoring Dashboard</CardTitle>
          <div className={`flex items-center space-x-2 ${heartState === "Danger" ? "text-red-500" : "text-green-500"}`}>
            <Heart className="w-6 h-6" />
            <span className="font-bold">{heartState}</span>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ecg">
            <TabsList>
              <TabsTrigger value="ecg">ECG</TabsTrigger>
              <TabsTrigger value="vest">Vest</TabsTrigger>
            </TabsList>
            <TabsContent value="ecg">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ecg" stroke="#8884d8" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="vest">
              <VestVisualization />
            </TabsContent>
          </Tabs>
          <div className="mt-4">
            <Button onClick={() => setIsMonitoring(!isMonitoring)}>
              {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <MeasurementsTable data={data.slice(-5)} />
    </div>
  )
}
