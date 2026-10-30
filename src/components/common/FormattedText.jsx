import React from 'react';

/**
 * Splits inline (1) ... (2) ... that are accidentally on one line into clean separate lines,
 * and strips any stray LaTeX math symbols or dollar signs ($).
 */
function normalizeListLines(str) {
  if (!str || typeof str !== 'string') return str;
  let res = str;

  // Clean any remaining LaTeX symbols and dollar delimiters
  res = res.replace(/\\?\\rightarrow/g, '→');
  res = res.replace(/\$→\$/g, '→');
  res = res.replace(/\$\\rightarrow\$/g, '→');
  res = res.replace(/\\?\\ge(q)?/g, '≥');
  res = res.replace(/\$≥\$/g, '≥');
  res = res.replace(/\\?\\le(q)?/g, '≤');
  res = res.replace(/\$≤\$/g, '≤');
  res = res.replace(/\\?\\pm/g, '±');

  // Strip math dollar pairs ($math$ -> math) and stray dollars
  res = res.replace(/\$([^\$\n]+)\$/g, '$1');
  res = res.replace(/\$/g, '');

  // If text has ': (1)' or ':** (1)' without newline, insert newline
  res = res.replace(/:\*{0,2}\s*\(1\)\s*/g, (m) => m.includes('**') ? ':**\n(1) ' : ':\n(1) ');
  // If text has inline ', (2)' or ' dan (3)', insert newline
  res = res.replace(/(?:,\s*|\s+dan\s+|,?\s+dan\s+|,?\s+lalu\s+)\(([0-9]+)\)\s*/g, (match, num) => '\n(' + num + ') ');
  // Split concluding question sentence if attached to the last list item
  res = res.replace(/(\([0-9]+\)[^\n\.]+\.)\s+(Cara berpikir|Jika kamu ingin|Urutan Algoritma|Urutan yang paling|Penerapan Abstraksi)/g, '$1\n\n$2');
  return res;
}

/**
 * Parses markdown inline **bold** and *italic* into React elements.
 */
export function renderInlineMarkdown(line, lineKey = 0) {
  if (!line) return null;
  if (typeof line !== 'string') return line;

  const parts = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match;
  let keyCount = 0;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }
    if (match[2]) {
      // Bold **text**
      parts.push(
        <strong key={`b-${lineKey}-${keyCount++}`} style={{ fontWeight: 800, color: 'inherit' }}>
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Italic *text*
      parts.push(
        <em key={`i-${lineKey}-${keyCount++}`} style={{ fontStyle: 'italic', color: 'inherit' }}>
          {match[3]}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return parts;
}

/**
 * Component to render structured text with bold, italics, clean line breaks,
 * and neatly aligned numbered/bulleted lists.
 */
export default function FormattedText({
  text,
  className = '',
  as: Component = 'div',
  style = {},
  lineStyle = {},
  itemStyle = {},
}) {
  if (!text) return null;
  if (typeof text !== 'string') return <Component className={className} style={style}>{text}</Component>;

  const normalized = normalizeListLines(text);
  const rawLines = normalized.split('\n');

  // Single line without any list markers
  if (rawLines.length === 1 && !/^\s*(\([0-9]+\)|[0-9]+\.|\([a-zA-Z]\)|•|-)\s+/.test(rawLines[0])) {
    return (
      <Component className={className} style={style}>
        {renderInlineMarkdown(rawLines[0], 0)}
      </Component>
    );
  }

  return (
    <Component className={`formatted-text-container ${className}`.trim()} style={{ ...style }}>
      {rawLines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} style={{ height: '8px' }} />;
        }

        // Detect if line is a numbered list item like "(1)", "1.", "•", "-", "(a)"
        const listMatch = line.match(/^\s*(\([0-9]+\)|[0-9]+\.|\([a-zA-Z]\)|•|-)\s+(.*)$/);

        if (listMatch) {
          const badge = listMatch[1];
          const content = listMatch[2];

          return (
            <div
              key={idx}
              className="formatted-list-row"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                marginTop: '6px',
                marginBottom: '4px',
                paddingLeft: '6px',
                lineHeight: '1.55',
                ...itemStyle,
              }}
            >
              <span
                className="formatted-list-badge"
                style={{
                  fontWeight: 800,
                  color: 'var(--purple-dark, #4d3ac8)',
                  flexShrink: 0,
                  userSelect: 'none',
                }}
              >
                {badge}
              </span>
              <div style={{ flex: 1 }}>
                {renderInlineMarkdown(content, idx)}
              </div>
            </div>
          );
        }

        // Regular line
        return (
          <div
            key={idx}
            className="formatted-line"
            style={{
              marginTop: idx === 0 ? 0 : '6px',
              lineHeight: '1.6',
              ...lineStyle,
            }}
          >
            {renderInlineMarkdown(line, idx)}
          </div>
        );
      })}
    </Component>
  );
}
