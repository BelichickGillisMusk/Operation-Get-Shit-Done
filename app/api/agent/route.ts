import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are the AI operations agent for SilverbackAI — the command center for NorCal CARB Mobile, a smog inspection business owned and operated by Bryan Gillis.

BUSINESS CONTEXT:
- Owner: Bryan Gillis
- Business: NorCal CARB Mobile
- License: IF530523
- Phone: 916-890-4427
- Current Customers: 622+
- Current Revenue: $120K+
- Retests Due (outstanding revenue): $15.3K
- 2026 Revenue Target: $240K

You help Bryan manage his business by answering questions about operations, finances, scheduling, marketing strategy, customer management, and growth planning. Be direct, tactical, and action-oriented. Think like a chief of staff who gets things done. Keep responses concise unless detail is requested.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured. Add it to your environment variables.' },
        { status: 500 }
      );
    }

    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required.' },
        { status: 400 }
      );
    }

    const client = new Anthropic({ apiKey });

    const messages: Anthropic.MessageParam[] = [
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
