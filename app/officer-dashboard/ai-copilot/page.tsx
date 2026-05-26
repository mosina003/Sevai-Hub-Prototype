'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Bot,
  Send,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  BarChart3,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Brain,
  Sparkles,
  MessageSquare,
  Download,
  RefreshCw,
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface CaseContext {
  caseId: string
  citizen: string
  service: string
  priority: string
  status: string
}

const suggestedPrompts = [
  {
    icon: <Lightbulb size={18} />,
    title: 'Summarize Case',
    description: 'Get a quick summary of this application',
    prompt: 'Please summarize the key details of this application and highlight any critical issues.',
  },
  {
    icon: <MessageSquare size={18} />,
    title: 'Draft Response',
    description: 'Generate a professional response letter',
    prompt: 'Help me draft a professional response to the citizen regarding their application status.',
  },
  {
    icon: <AlertTriangle size={18} />,
    title: 'Risk Assessment',
    description: 'Identify potential issues or risks',
    prompt: 'Analyze this case and identify any potential risks, compliance issues, or bottlenecks.',
  },
  {
    icon: <BarChart3 size={18} />,
    title: 'Next Steps',
    description: 'Recommend actions to resolve',
    prompt: 'What are the recommended next steps to expedite this application?',
  },
]

const aiResponses: { [key: string]: string } = {
  'summarize': `**Application Summary**

**Applicant:** Arun S (Citizen ID: SVH2026001)
**Service:** Income Certificate
**Application ID:** APP-1045
**Submitted:** 23 May 2026
**Due Date:** 24 May 2026 (SLA: 1 Day)
**Current Status:** Pending Verification

**Key Details:**
- Income Range: ₹3,00,000 - ₹5,00,000
- Financial Year: 2024-25
- Purpose: Educational scholarship application
- Documents Submitted: Aadhaar, Bank Statements, Salary Certificate

**Status:** All required documents received and verified. Pending final income validation against tax records. Expected completion within 2 hours.

**Notes:** Urgent case - SLA deadline today. Recommend immediate processing.`,

  'draft': `**DRAFT RESPONSE LETTER**

---

Dear Arun S,

**RE: Your Income Certificate Application (APP-1045)**

Thank you for submitting your application for Income Certificate dated 23 May 2026.

We are pleased to inform you that your application is being processed on priority basis. Our team has received and verified all required documents including:
- Aadhaar Card
- Bank Statements (Last 3 months)
- Salary Certificate

**Current Status:** Your application is currently undergoing final income validation against official tax records. This is the final step in the verification process.

**Expected Completion:** 24 May 2026 (within today)

**Next Steps:** 
Once verification is complete, your Income Certificate will be generated and made available for download through your SevaiHub dashboard. You will receive a notification at your registered mobile and email.

Should you have any queries, please visit our AI Assistant or contact our citizen support team at 1800-SEVAI-HELP.

Regards,
**Revenue Department Officer**
Officer ID: OFF-CHN-1045
Chennai District`,

  'risk': `**RISK ASSESSMENT & COMPLIANCE CHECK**

**Priority Level:** ⚠️ HIGH

**Identified Issues:**
1. **SLA Alert** (🔴 CRITICAL)
   - Application due: 24 May 2026 (TODAY)
   - Remaining time: 4 hours
   - Risk: SLA breach if not processed immediately
   - Recommendation: Escalate to supervisor for immediate approval

2. **Document Verification** (🟡 WARNING)
   - Bank statements show irregular transactions
   - Salary certificate matches bank deposits
   - Recommendation: Flag for compliance review

3. **Identity Verification** (🟢 CLEAR)
   - Aadhaar verified against database
   - No discrepancies found
   - Status: Cleared

**Compliance Checks:**
✅ All required documents present
✅ Applicant information matches official records
⚠️ Income validation pending
✅ No fraud indicators detected
✅ Citizenship verified

**Recommended Action:** Process immediately to meet SLA deadline. Assign to senior officer if additional review needed.`,

  'next': `**RECOMMENDED ACTION PLAN**

**Immediate Actions (Next 30 minutes):**
1. Finalize income validation against tax records
2. Generate Income Certificate
3. Send notification to citizen

**Short-term (Today):**
1. Citizen can download certificate from dashboard
2. Update case status to "Completed"
3. Record completion time for SLA tracking

**Follow-up (Optional):**
1. Send satisfaction survey to citizen
2. Archive case documentation
3. Update performance metrics

**Key Milestones:**
- ⏰ 14:30 - Income validation complete
- ⏰ 14:45 - Certificate generated
- ⏰ 15:00 - Citizen notified
- ⏰ 15:15 - Case closed

**Resource Allocation:**
- Income Validation: 15 minutes
- Certificate Generation: 10 minutes
- Notification: 5 minutes
- Total Time: 30 minutes

This case is on track to meet SLA requirements with 3.5 hours buffer.`,
}

export default function OfficerAICopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI Copilot. I can help you summarize cases, draft responses, assess risks, and recommend actions. Select a suggested task or type your query below.',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedCase, setSelectedCase] = useState<CaseContext>({
    caseId: 'APP-1045',
    citizen: 'Arun S',
    service: 'Income Certificate',
    priority: 'High',
    status: 'Pending Verification',
  })
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue
    if (!messageText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      let responseText = ''

      if (
        messageText.toLowerCase().includes('summarize') ||
        messageText.toLowerCase().includes('summary')
      ) {
        responseText = aiResponses['summarize']
      } else if (
        messageText.toLowerCase().includes('draft') ||
        messageText.toLowerCase().includes('response')
      ) {
        responseText = aiResponses['draft']
      } else if (
        messageText.toLowerCase().includes('risk') ||
        messageText.toLowerCase().includes('issue')
      ) {
        responseText = aiResponses['risk']
      } else if (
        messageText.toLowerCase().includes('next') ||
        messageText.toLowerCase().includes('action')
      ) {
        responseText = aiResponses['next']
      } else {
        responseText = `I understand you're asking about "${messageText}". For this case (${selectedCase.caseId}), I can help you with:\n\n1. **Summarizing** - Get a quick overview of the application\n2. **Drafting** - Create professional correspondence\n3. **Risk Assessment** - Identify potential issues\n4. **Action Planning** - Recommend next steps\n\nPlease select one of the suggested prompts or ask me a specific question.`
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responseText,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(messageId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Officer AI Copilot</h1>
        <p className="text-muted-foreground">
          Leverage AI to summarize cases, draft responses, assess risks, and optimize decisions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Chat Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Case Context */}
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <FileText size={18} />
                  Current Case Context
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Case ID</p>
                    <p className="font-mono font-semibold text-foreground">{selectedCase.caseId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Citizen</p>
                    <p className="font-semibold text-foreground">{selectedCase.citizen}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Service</p>
                    <p className="font-semibold text-foreground">{selectedCase.service}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Priority</p>
                    <Badge className="bg-red-100 text-red-800 border-red-300">{selectedCase.priority}</Badge>
                  </div>
                </div>
              </div>
              <Sparkles size={32} className="text-blue-600" />
            </div>
          </Card>

          {/* Chat Messages */}
          <Card className="bg-white h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs lg:max-w-md rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-100 text-foreground rounded-bl-none'
                  }`}
                >
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot size={16} />
                      <span className="text-sm font-semibold">AI Copilot</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.type === 'assistant' && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className={message.type === 'assistant' ? 'border-slate-300 text-foreground' : ''}
                      >
                        {copiedId === message.id ? '✓ Copied' : <Copy size={14} />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={message.type === 'assistant' ? 'border-slate-300 text-foreground' : ''}
                      >
                        <ThumbsUp size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={message.type === 'assistant' ? 'border-slate-300 text-foreground' : ''}
                      >
                        <ThumbsDown size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-foreground rounded-lg p-4 rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </Card>

          {/* Suggested Prompts */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-semibold">Quick Actions</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  onClick={() => handleSendMessage(prompt.prompt)}
                  className="justify-start h-auto p-3 text-left"
                >
                  <div className="flex gap-2 w-full">
                    <span className="text-lg flex-shrink-0">{prompt.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{prompt.title}</p>
                      <p className="text-xs text-muted-foreground">{prompt.description}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about this case..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage()
              }}
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>

        {/* Sidebar - AI Features & Stats */}
        <div className="space-y-4">
          {/* Features */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Brain size={18} />
              AI Capabilities
            </h3>
            <div className="space-y-2">
              {[
                { icon: '📝', title: 'Case Summary', status: 'Ready' },
                { icon: '📧', title: 'Draft Letters', status: 'Ready' },
                { icon: '⚠️', title: 'Risk Analysis', status: 'Ready' },
                { icon: '✅', title: 'Action Plans', status: 'Ready' },
                { icon: '🎯', title: 'SLA Alerts', status: 'Ready' },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span>{feature.icon}</span>
                    <span className="text-foreground font-medium">{feature.title}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-0">{feature.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Stats */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <BarChart3 size={18} />
              AI Performance
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-semibold">94%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="font-semibold">1.2s</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Today's Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cases Processed</span>
                <span className="font-semibold text-blue-600">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time Saved</span>
                <span className="font-semibold text-green-600">2.5 hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SLA Compliance</span>
                <span className="font-semibold text-emerald-600">100%</span>
              </div>
            </div>
          </Card>

          {/* Export Options */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Export</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Download size={16} />
                Export as PDF
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Copy size={16} />
                Copy Transcript
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
