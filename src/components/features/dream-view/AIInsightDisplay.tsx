'use client';

import { Sparkles } from 'lucide-react';

interface AIInsightDisplayProps {
  insightText: string;
  generatedAt: string;
}

export default function AIInsightDisplay({ insightText, generatedAt }: AIInsightDisplayProps) {
  // Parse the insight text to separate sections
  const sections = parseInsightText(insightText);

  return (
    <div className="dreamy-card p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-shimmering-gold to-soft-mint rounded-full flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">AI Insight</h2>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <div className="bg-gradient-to-r from-lavender-mist/20 to-misty-blue/20 p-6 rounded-lg border border-lavender-mist/30">
          <div className="space-y-6">
            {/* Themes Section */}
            {sections.themes && (
              <div>
                <h3 className="text-lg font-semibold text-amber-500 mb-2">Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {sections.themes.map((theme, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-shimmering-gold/10 text-amber-500 text-sm rounded-full"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Emotional Tone Section */}
            {sections.emotionalTone && (
              <div>
                <h3 className="text-lg font-semibold text-emerald-500 mb-2">Emotional Tone</h3>
                <div className="flex flex-wrap gap-2">
                  {sections.emotionalTone.map((emotion, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-soft-mint/10 text-emerald-500 text-sm rounded-full"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Connections Section */}
            {sections.connections && (
              <div>
                <h3 className="text-lg font-semibold text-sky-400 mb-2">Possible Connections</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {sections.connections.map((connection, index) => (
                    <li key={index}>{connection}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reflection Section */}
            {sections.reflection && (
              <div className="border-t border-lavender-mist/30 pt-4 mt-6">
                <h3 className="text-lg font-semibold text-violet-400 mb-2">Reflection</h3>
                <p className="text-gray-700 leading-relaxed">{sections.reflection}</p>
              </div>
            )}
          </div>

          <div className="mt-6 text-sm text-gray-500">
            Generated on {new Date(generatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ParsedInsight {
  themes?: string[];
  emotionalTone?: string[];
  connections?: string[];
  reflection?: string;
}

function parseInsightText(text: string): ParsedInsight {
  const parsed: ParsedInsight = {};
  
  // Extract themes
  const themesMatch = text.match(/\*\*Themes:\*\*\s*([\w\s,]+)/);
  if (themesMatch) {
    parsed.themes = themesMatch[1].split(',').map(theme => theme.trim());
  }

  // Extract emotional tone
  const emotionMatch = text.match(/\*\*Emotional Tone:\*\*\s*([\w\s,]+)/);
  if (emotionMatch) {
    parsed.emotionalTone = emotionMatch[1].split(',').map(emotion => emotion.trim());
  }

  // Extract connections
  const connectionsMatch = text.match(/\*\*Possible Connections:\*\*\s*•\s*([\s\S]+?)(?=\*\*|$)/);
  if (connectionsMatch) {
    parsed.connections = connectionsMatch[1]
      .split('•')
      .map(connection => connection.trim())
      .filter(connection => connection.length > 0);
  }

  // Extract reflection
  const reflectionMatch = text.match(/\*\*Reflection:\*\*\s*([\s\S]+?)(?=\*\*|$)/);
  if (reflectionMatch) {
    parsed.reflection = reflectionMatch[1].trim();
  }

  return parsed;
}
