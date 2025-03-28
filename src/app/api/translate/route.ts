import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, source_lang, target_lang } = body;

    // Validation
    if (!text || !source_lang || !target_lang) {
      return NextResponse.json(
        { error: 'Missing required fields: text, source_lang, or target_lang' },
        { status: 400 }
      );
    }

    // Make request to external translation API
    const response = await fetch('https://api-translate.guillermo-516.workers.dev/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        source_lang,
        target_lang,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return NextResponse.json(
        { error: `Translation API error: ${response.statusText}`, details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 