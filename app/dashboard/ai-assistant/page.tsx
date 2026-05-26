'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  {
    icon: '📋',
    title: 'How can I get an income certificate?',
  },
  {
    icon: '📄',
    title: 'What documents are required for birth certificate?',
  },
  {
    icon: '🔍',
    title: 'Track my application',
  },
  {
    icon: '🎁',
    title: 'Find welfare schemes',
  },
  {
    icon: '⚠️',
    title: 'Raise a complaint',
  },
];

const aiResponses: { [key: string]: string } = {
  'income certificate': `You can apply for an Income Certificate through the Revenue Department. Here's the process:

**Required Documents:**
• Aadhaar Card
• PAN Card
• Bank Statement (last 3 months)
• Proof of Address

**Processing Time:** 10 Days
**Fee:** ₹100

**Steps to Apply:**
1. Click "Services" in the navigation
2. Search for "Income Certificate"
3. Click "Apply Now"
4. Fill in your details
5. Upload required documents
6. Submit application

**Why you need it:**
• Educational loan applications
• Job applications
• Benefit eligibility verification
• Business registration

Would you like me to help you start the application?

[ Apply Now ]`,

  'birth certificate': `Birth Certificate is issued by the Revenue Department. Here's what you need to know:

**Required Documents:**
• Hospital discharge slip / Vaccination card
• Aadhaar of parents
• Marriage certificate (if applicable)

**Processing Time:** 7 Days
**Fee:** Free

**Documents to Get:**
• Identity proof of parents
• Address proof
• Birth registration slip

**For Minors (Below 18):**
• Copy of school certificate
• Copy of parents' ID proof

**For Adults:**
• Age proof documents
• Affidavit

Apply for Birth Certificate now and get it in just 7 days!

[ Apply Now ]`,

  'track my application':
    'I can help you track your application! Here are your recent applications:\n\n✅ Income Certificate (APP-2026-001)\nStatus: Under Review | Expected: 18 Jan 2026\n\n✅ Birth Certificate (APP-2026-002)\nStatus: Approved | Issued: 10 Jan 2026\n\n❌ Driving License (APP-2026-003)\nStatus: Rejected | Reason: Invalid medical certificate\n\n⏳ Community Certificate (APP-2026-004)\nStatus: Pending | Expected: 13 Jan 2026\n\n[ View Details ] [ Download Certificate ]',

  'welfare schemes':
    '🎁 **Welfare Schemes You May Qualify For:**\n\n**1. 🎓 Educational Scholarship**\nFor students pursuing higher education\n💰 Up to ₹50,000 annually\n[ Check Eligibility ]\n\n**2. 👨‍🌾 Farmer Subsidy Program**\nAgricultural support for farming community\n💰 Subsidized seeds and fertilizers\n[ Learn More ]\n\n**3. 👩‍💼 Women\'s Entrepreneurship Fund**\nStartup funding for women entrepreneurs\n💰 Up to ₹5,00,000 loan\n[ Apply Now ]\n\n**4. 👴 Senior Citizen Pension**\nMonthly support for senior citizens\n💰 ₹1,500 - ₹5,000 monthly\n[ Check Eligibility ]\n\n[ View All Schemes ]',

  'raise a complaint':
    '📮 **Raise a Complaint**\n\nYou can file a complaint about:\n• Road infrastructure issues\n• Water/Sanitation problems\n• Electricity supply issues\n• Public transportation\n• Government services\n\n**How to Raise a Complaint:**\n1. Go to Dashboard → My Complaints\n2. Click "Raise New Complaint"\n3. Select department\n4. Describe the issue\n5. Attach photos/videos\n6. Submit\n\n**Your Complaint Will Be:**\n✓ Assigned to relevant department\n✓ Tracked in real-time\n✓ Resolved within timeline\n✓ Updated regularly\n\n[ Raise Complaint Now ]',

  default:
    'Thank you for your question! Our AI Assistant is here to help you navigate government services. You can ask me about:\n\n• How to apply for certificates\n• Required documents\n• Processing timelines\n• Welfare schemes\n• Complaint procedures\n• Application tracking\n• Service eligibility\n\nWhat would you like to know?',
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `👋 Welcome to SevAI Assistant!\n\nI'm your AI-powered citizen service assistant, here to help you navigate government services with ease.\n\nYou can ask me about:\n• Service applications and requirements\n• Document guidance\n• Application tracking\n• Welfare schemes\n• Complaint procedures\n• Eligibility checks\n\nHow can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (
      lowerQuestion.includes('income') &&
      lowerQuestion.includes('certificate')
    ) {
      return aiResponses['income certificate'];
    } else if (
      lowerQuestion.includes('birth') &&
      lowerQuestion.includes('certificate')
    ) {
      return aiResponses['birth certificate'];
    } else if (
      lowerQuestion.includes('track') &&
      lowerQuestion.includes('application')
    ) {
      return aiResponses['track my application'];
    } else if (
      lowerQuestion.includes('scheme') ||
      lowerQuestion.includes('welfare') ||
      lowerQuestion.includes('eligible')
    ) {
      return aiResponses['welfare schemes'];
    } else if (
      lowerQuestion.includes('complaint') ||
      lowerQuestion.includes('raise')
    ) {
      return aiResponses['raise a complaint'];
    }

    return aiResponses.default;
  };

  const handleSendMessage = async (customQuestion?: string) => {
    const questionText = customQuestion || inputValue;

    if (!questionText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: questionText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(questionText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🤖 SevAI Assistant</h1>
          <p className="text-gray-600 text-lg">
            Your AI-powered citizen service assistant
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
                      : 'bg-gray-100 text-gray-900 rounded-2xl rounded-tl-none'
                  } p-4`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {message.content.includes('[ Apply Now ]') && (
                      <Button
                        size="sm"
                        className="bg-white text-blue-600 hover:bg-gray-100 h-8"
                      >
                        Apply Now
                      </Button>
                    )}
                    {message.content.includes('[ Check Eligibility ]') && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                      >
                        Check Eligibility
                      </Button>
                    )}
                    {message.content.includes('[ View All Schemes ]') && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                      >
                        View All
                      </Button>
                    )}
                    {message.content.includes('[ Raise Complaint Now ]') && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                      >
                        Raise Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-tl-none p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 space-y-4">
            {messages.length === 1 && (
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-3 px-2">
                  SUGGESTED QUESTIONS
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQuestions.map((q) => (
                    <Button
                      key={q.title}
                      variant="outline"
                      className="justify-start text-left h-auto py-2"
                      onClick={() => handleSendMessage(q.title)}
                    >
                      <span className="mr-3">{q.icon}</span>
                      <span className="text-sm">{q.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Features Section (on initial load) */}
            {messages.length === 1 && (
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-3 px-2">
                  MY CAPABILITIES
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {[
                    { icon: '📄', label: 'Document Guidance' },
                    { icon: '✅', label: 'Eligibility Check' },
                    { icon: '🎁', label: 'Schemes' },
                    { icon: '📋', label: 'Application Help' },
                    { icon: '⚠️', label: 'Complaint' },
                  ].map((capability) => (
                    <Card
                      key={capability.label}
                      className="p-3 text-center hover:bg-blue-50 cursor-pointer transition"
                    >
                      <p className="text-xl mb-1">{capability.icon}</p>
                      <p className="text-xs text-gray-600 font-semibold">
                        {capability.label}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    handleSendMessage();
                  }
                }}
                className="flex-1 h-10"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? '⏳' : '📤'}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 text-sm text-gray-600">
          <p>
            SevAI can make mistakes. Always verify critical information with official sources.
          </p>
        </div>
      </div>
    </div>
  );
}
