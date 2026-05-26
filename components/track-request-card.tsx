'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search } from 'lucide-react'

export default function TrackRequestCard() {
  const [selectedType, setSelectedType] = useState('application')
  const [applicationId, setApplicationId] = useState('')

  return (
    <Card className="overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_70px_-34px_rgba(15,76,129,0.22)]">
      <div className="p-5 md:p-6 lg:p-7 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80 mb-2">
            Track request
          </p>
          <h3 className="text-2xl font-bold text-foreground leading-tight">
            Check status in seconds
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Enter your application ID or complaint number to see the latest update.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Request Type
            </label>
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5">
              <button
                type="button"
                onClick={() => setSelectedType('application')}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  selectedType === 'application'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Application
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('complaint')}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  selectedType === 'complaint'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Complaint
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              {selectedType === 'application' ? 'Application ID' : 'Complaint Number'}
            </label>
            <input
              type="text"
              placeholder={selectedType === 'application' ? 'e.g. APP-2026-00123' : 'e.g. CMP-2026-00456'}
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              className="w-full rounded-2xl border border-border bg-slate-50 px-4 py-4 text-foreground placeholder:text-muted-foreground/80 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </div>

          <Button className="w-full h-12 rounded-2xl bg-primary text-white font-semibold shadow-lg shadow-primary/15 hover:bg-primary/90 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Track Request
          </Button>
        </div>
      </div>
    </Card>
  )
}
