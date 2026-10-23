import React from 'react';

/**
 * Ensures exactly one word in a heading string is highlighted in red.
 * If already a React node (e.g. JSX with span), returns as-is.
 */
export function renderHeadingWithRed(text, targetWord) {
  if (!text) return null;
  if (typeof text !== 'string') return text;

  if (targetWord) {
    const regex = new RegExp(`\\b(${targetWord})\\b`, 'i');
    const parts = text.split(regex);
    if (parts.length > 1) {
      return (
        <>
          {parts.map((part, i) =>
            regex.test(part) ? <span key={i} className="text-red">{part}</span> : part
          )}
        </>
      );
    }
  }

  // Highlight the last meaningful word (including any trailing ? or !)
  const match = text.match(/^(.*?\s+)?([\w'’\-]+[?!.]*)$/s);
  if (match) {
    const prefix = match[1] || '';
    const lastWord = match[2];
    return (
      <>
        {prefix}<span className="text-red">{lastWord}</span>
      </>
    );
  }
  return <span className="text-red">{text}</span>;
}

/**
 * Ensures exactly one word in a subheading string is highlighted in red.
 * If already a React node, returns as-is.
 */
export function renderSubheadingWithRed(text, targetWord) {
  if (!text) return null;
  if (typeof text !== 'string') return text;

  if (targetWord) {
    const regex = new RegExp(`\\b(${targetWord})\\b`, 'i');
    const parts = text.split(regex);
    if (parts.length > 1) {
      return (
        <>
          {parts.map((part, i) =>
            regex.test(part) ? <span key={i} className="text-red">{part}</span> : part
          )}
        </>
      );
    }
  }

  // Check for common evocative automotive/location keywords first
  const preferredKeywords = [
    'Chennai', 'Adambakkam', 'craftsmanship', 'upgrades', 'accessories',
    'zero', 'precision', 'compatibility', 'fitment', 'consultation',
    'performance', 'confidential', 'guarantee', 'technicians'
  ];

  for (const kw of preferredKeywords) {
    const regex = new RegExp(`\\b(${kw})\\b`, 'i');
    if (regex.test(text)) {
      const parts = text.split(regex);
      return (
        <>
          {parts.map((part, i) =>
            regex.test(part) ? <span key={i} className="text-red">{part}</span> : part
          )}
        </>
      );
    }
  }

  // Fallback: highlight the last word
  const match = text.match(/^(.*?\s+)?([\w'’\-]+[?!.]*)$/s);
  if (match) {
    const prefix = match[1] || '';
    const lastWord = match[2];
    return (
      <>
        {prefix}<span className="text-red">{lastWord}</span>
      </>
    );
  }

  return <span className="text-red">{text}</span>;
}
