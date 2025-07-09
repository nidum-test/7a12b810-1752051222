import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key',
})

export async function POST(request: NextRequest) {
  try {
    const { 
      type, 
      tone, 
      industry, 
      persona, 
      objective, 
      currentSubject, 
      currentContent,
      sequencePosition 
    } = await request.json()

    // Validate input
    if (!type || !tone || !objective) {
      return NextResponse.json(
        { message: 'Type, tone, and objective are required' },
        { status: 400 }
      )
    }

    let prompt = ''
    
    if (type === 'subject') {
      prompt = `Generate a compelling email subject line for a ${tone} cold email outreach campaign.

Context:
- Industry: ${industry || 'General business'}
- Target persona: ${persona || 'Business professional'}
- Objective: ${objective}
- Email position: ${sequencePosition || 'Initial email'}
- Current subject: ${currentSubject || 'None'}

Requirements:
- Keep it under 50 characters
- Make it engaging and personalized
- Avoid spam trigger words
- ${tone === 'formal' ? 'Use professional language' : tone === 'casual' ? 'Use conversational tone' : 'Use persuasive language'}
- Generate 3 different options

Format: Return only the subject lines, one per line, without quotes or numbering.`
    } else {
      prompt = `Generate a ${tone} cold email for outreach campaign.

Context:
- Industry: ${industry || 'General business'}
- Target persona: ${persona || 'Business professional'}
- Objective: ${objective}
- Email position: ${sequencePosition || 'Initial email'}
- Current content: ${currentContent || 'None'}

Requirements:
- Keep it concise (under 150 words)
- Include personalization variables like {{first_name}}, {{company}}
- ${tone === 'formal' ? 'Use professional, respectful language' : tone === 'casual' ? 'Use friendly, conversational tone' : 'Use persuasive, action-oriented language'}
- Include a clear call-to-action
- ${sequencePosition === 'follow-up' ? 'Reference previous email subtly' : 'Make a strong first impression'}
- Don't use generic templates

Format: Return only the email content, ready to use with variables.`
    }

    // Mock AI response for demo (in real app, use OpenAI API)
    if (process.env.OPENAI_API_KEY === 'demo-key') {
      let mockResponse = ''
      
      if (type === 'subject') {
        const subjects = [
          `Quick question about ${industry || 'your business'} growth`,
          `${persona || 'Business'} insight for {{company}}`,
          `Helping {{company}} with ${objective.toLowerCase()}`
        ]
        mockResponse = subjects.join('\n')
      } else {
        mockResponse = `Hi {{first_name}},

I noticed {{company}} is working on ${objective.toLowerCase()} and thought you might be interested in how we've helped similar ${industry || 'businesses'} achieve their goals.

We've recently helped companies like yours ${tone === 'formal' ? 'optimize their processes' : tone === 'casual' ? 'get better results' : 'increase their ROI by 30%'} through our proven approach.

Would you be open to a brief 15-minute call next week to discuss how this could benefit {{company}}?

Best regards,
[Your name]

P.S. I've attached a quick case study that might interest you.`
      }

      return NextResponse.json({
        generated: mockResponse,
        model: 'demo-mode'
      })
    }

    // Real OpenAI API call
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert email copywriter specializing in cold outreach. Generate compelling, personalized email content that converts while maintaining authenticity.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    const generated = completion.choices[0]?.message?.content || ''

    return NextResponse.json({
      generated,
      model: completion.model,
      usage: completion.usage
    })

  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { message: 'Failed to generate content' },
      { status: 500 }
    )
  }
}