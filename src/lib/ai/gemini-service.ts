import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiInsightRequest, AiInsightResponse } from '@/lib/types/ai-insight';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateDreamInsight(request: AiInsightRequest): Promise<AiInsightResponse> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = createDreamAnalysisPrompt(request);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the structured response
    return parseAiResponse(text);
  } catch (error) {
    console.error('Error generating AI insight:', error);
    throw new Error('Failed to generate dream insight');
  }
}

function createDreamAnalysisPrompt(request: AiInsightRequest): string {
  const { dreamText, mood, tags } = request;

  return `You are a compassionate dream analyst helping someone understand their dream. Your role is to provide gentle, reflective insights that encourage self-exploration.

Dream Description: "${dreamText}"
${mood ? `Mood: ${mood}` : ''}
${tags && tags.length > 0 ? `Tags: ${tags.join(', ')}` : ''}

Please analyze this dream and provide insights in the following JSON format:

{
  "themes": ["theme1", "theme2", "theme3"],
  "emotions": ["emotion1", "emotion2"],
  "connections": ["possible connection to waking life 1", "possible connection to waking life 2"],
  "summary": "A gentle, reflective summary of 2-3 sentences that identifies key elements and suggests what this dream might be reflecting about the dreamer's inner world or current life circumstances."
}

Guidelines:
- Focus on common dream symbols and their general meanings
- Note the emotional tone of the dream
- Suggest gentle connections to waking life experiences
- Use supportive, non-judgmental language
- Avoid making definitive statements about what the dream "means"
- Do not provide medical advice or predictions
- Keep insights concise and accessible
- Emphasize that dreams are personal and interpretations are suggestions for reflection

Remember: You are a helpful guide for self-reflection, not a fortune teller or therapist.`;
}

function parseAiResponse(responseText: string): AiInsightResponse {
  try {
    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        themes: parsed.themes || [],
        emotions: parsed.emotions || [],
        connections: parsed.connections || [],
        summary: parsed.summary || 'Unable to generate summary.',
      };
    }

    // Fallback: create a basic response from the text
    return {
      themes: [],
      emotions: [],
      connections: [],
      summary: responseText.substring(0, 200) + (responseText.length > 200 ? '...' : ''),
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return {
      themes: [],
      emotions: [],
      connections: [],
      summary: 'Unable to parse AI response. Please try again.',
    };
  }
}

export function formatInsightForDisplay(insight: AiInsightResponse): string {
  let formatted = '';

  if (insight.themes.length > 0) {
    formatted += `**Themes:** ${insight.themes.join(', ')}\n\n`;
  }

  if (insight.emotions.length > 0) {
    formatted += `**Emotional Tone:** ${insight.emotions.join(', ')}\n\n`;
  }

  if (insight.connections.length > 0) {
    formatted += `**Possible Connections:**\n`;
    insight.connections.forEach(connection => {
      formatted += `• ${connection}\n`;
    });
    formatted += '\n';
  }

  if (insight.summary) {
    formatted += `**Reflection:** ${insight.summary}`;
  }

  return formatted.trim();
} 