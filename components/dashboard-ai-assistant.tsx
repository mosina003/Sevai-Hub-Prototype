'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function DashboardAIAssistant() {
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
            🤖
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-1">Need Help?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Ask SevAI Assistant for guidance on services, complaints, or any government-related queries.
            </p>

            <div className="flex gap-2">
              <Input
                placeholder="How can I get an income certificate?"
                className="bg-white border-border"
              />
              <Link href="/dashboard/ai-assistant">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Ask
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
