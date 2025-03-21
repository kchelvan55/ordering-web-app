'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface TestData {
  id: number
  testtext: string
}

export default function Home() {
  const [message, setMessage] = useState<string>('Fetching data...')
  const [testData, setTestData] = useState<TestData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('test')
          .select('id, testtext')
        
        if (error) throw error
        
        setTestData(data || [])
        setMessage('Successfully connected to Supabase!')
      } catch (error) {
        setMessage('Error connecting to Supabase: ' + (error as Error).message)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Supabase Connection Test</h1>
        <div className="bg-white/30 p-8 rounded-lg shadow-lg">
          <p className="text-xl text-center mb-4">{message}</p>
          
          {testData.length > 0 && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-2">Test Data:</h2>
              <ul className="space-y-2">
                {testData.map((item) => (
                  <li key={item.id} className="p-2 bg-white/20 rounded">
                    ID: {item.id} - Text: {item.testtext}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
