// markdowns.tsx

// Markdown Parser for Chat Messages

export function parseMarkdown(text: string): string {
  if (!text) return '';

  let parsed = text;

  // Normalize line breaks
  parsed = parsed.replace(/\r\n/g, '\n');

  // Escape HTML special characters (လုံးဝ အရင်ဆုံး လုပ်ပါ)
  parsed = escapeHtml(parsed);

  // Bold: **text** or __text__
  parsed = parsed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic: *text* or _text_
  parsed = parsed.replace(/\*([^\*\n]+?)\*/g, '<em>$1</em>');
  parsed = parsed.replace(/_([^_\n]+?)_/g, '<em>$1</em>');

  // Code Block: ```code``` (အရင်ဆုံး လုပ်ပါ)
  parsed = parsed.replace(/```([\s\S]*?)```/g, (_match, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // Inline Code: `code`
  parsed = parsed.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Horizontal Line: --- or *** or ___
  parsed = parsed.replace(/^(\-{3,}|\*{3,}|_{3,})$/gm, '<hr>');

  // Links: [text](url)
  parsed = parsed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

  // Headers: ### Header
  parsed = parsed.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  parsed = parsed.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  parsed = parsed.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Blockquote: > text
  parsed = parsed.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // Tables: Parse markdown tables
  parsed = parseTable(parsed);

  // Process lists
  const lines = parsed.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' = 'ul';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Check for ordered list (1. 2. 3.)
    const orderedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    // Check for unordered list (-, *, •)
    const unorderedMatch = /^[\-\*\•✓✅]\s+/.test(trimmedLine);

    if (orderedMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) {
          processedLines.push(`</${listType}>`);
        }
        processedLines.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      const content = orderedMatch[2];
      processedLines.push(`<li>${content}</li>`);
    } else if (unorderedMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) {
          processedLines.push(`</${listType}>`);
        }
        processedLines.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      let content = trimmedLine.replace(/^[\-\*\•]\s+/, '');
      processedLines.push(`<li>${content}</li>`);
    } else if (trimmedLine === '' && inList) {
      processedLines.push(`</${listType}>`);
      inList = false;
      processedLines.push('');
    } else {
      if (inList) {
        processedLines.push(`</${listType}>`);
        inList = false;
      }
      if (trimmedLine !== '') {
        processedLines.push(line);
      } else {
        processedLines.push('');
      }
    }
  }

  if (inList) {
    processedLines.push(`</${listType}>`);
  }

  parsed = processedLines.join('\n');

  // Handle paragraphs
  const paragraphs = parsed.split(/\n\n+/);
  const formattedParagraphs = paragraphs.map(para => {
    const trimmed = para.trim();
    if (!trimmed) return '';

    // Don't wrap if already has HTML tags
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('<ol') ||
      trimmed.startsWith('<li') ||
      trimmed.startsWith('</ul>') ||
      trimmed.startsWith('</ol>') ||
      trimmed.startsWith('<pre>') ||
      trimmed.startsWith('<blockquote>') ||
      trimmed.startsWith('<a') ||
      trimmed.startsWith('<hr') ||
      trimmed.startsWith('<table')
    ) {
      return trimmed;
    }

    // Replace single newlines with <br>
    const cleaned = trimmed.replace(/\n/g, '<br>');
    return `<p>${cleaned}</p>`;
  }).filter(p => p);

  parsed = formattedParagraphs.join('\n');

  // Clean up spacing
  parsed = parsed.replace(/<\/(ul|ol)>\n<p>/g, '</$1><p>');
  parsed = parsed.replace(/<\/p>\n<(ul|ol)>/g, '</p><$1>');
  parsed = parsed.replace(/<\/h([123])>\n<p>/g, '</h$1><p>');
  parsed = parsed.replace(/<\/(ul|ol)>\n<(ul|ol)>/g, '</$1><$2>');
  parsed = parsed.replace(/<\/blockquote>\n<p>/g, '</blockquote><p>');
  parsed = parsed.replace(/<\/pre>\n<p>/g, '</pre><p>');
  parsed = parsed.replace(/<hr>\n<p>/g, '<hr><p>');

  return parsed;
}

export function stripMarkdown(text: string): string {
  if (!text) return '';

  let stripped = text;

  // Remove bold
  stripped = stripped.replace(/\*\*(.+?)\*\*/g, '$1');
  stripped = stripped.replace(/__(.+?)__/g, '$1');

  // Remove italic
  stripped = stripped.replace(/\*([^\*\n]+?)\*/g, '$1');
  stripped = stripped.replace(/_([^_\n]+?)_/g, '$1');

  // Remove code blocks
  stripped = stripped.replace(/```([\s\S]*?)```/g, '$1');

  // Remove inline code
  stripped = stripped.replace(/`(.+?)`/g, '$1');

  // Remove horizontal lines
  stripped = stripped.replace(/^(\-{3,}|\*{3,}|_{3,})$/gm, '');

  // Remove links
  stripped = stripped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');

  // Remove headers
  stripped = stripped.replace(/^#{1,6} (.+)$/gm, '$1');

  // Remove list markers
  stripped = stripped.replace(/^[\-\*\•]\s+/gm, '');
  stripped = stripped.replace(/^\d+\.\s+/gm, '');

  // Remove blockquotes
  stripped = stripped.replace(/^> (.+)$/gm, '$1');

  return stripped;
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Helper function to parse markdown tables
function parseTable(text: string): string {
  const lines = text.split('\n');
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check if this line looks like a table row (contains |)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [line];
      let j = i + 1;

      // Collect all consecutive table lines
      while (j < lines.length && lines[j].trim().startsWith('|') && lines[j].trim().endsWith('|')) {
        tableLines.push(lines[j]);
        j++;
      }

      // Check if we have at least 2 lines (header + separator or header + data)
      if (tableLines.length >= 2) {
        const tableHtml = convertTableToHtml(tableLines);
        if (tableHtml) {
          result.push(tableHtml);
          i = j;
          continue;
        }
      }
    }

    result.push(line);
    i++;
  }

  return result.join('\n');
}

// Convert markdown table to HTML
function convertTableToHtml(tableLines: string[]): string | null {
  if (tableLines.length < 2) return null;

  // Parse header
  const headerCells = tableLines[0]
    .split('|')
    .map(cell => cell.trim())
    .filter(cell => cell !== '');

  if (headerCells.length === 0) return null;

  // Check if second line is a separator (contains dashes)
  const secondLine = tableLines[1];
  const isSeparator = /^[\|\s\-:]+$/.test(secondLine);

  let html = '<table><thead><tr>';

  // Add header cells
  headerCells.forEach(cell => {
    html += `<th>${cell}</th>`;
  });

  html += '</tr></thead><tbody>';

  // Add body rows (skip separator if exists)
  const startRow = isSeparator ? 2 : 1;

  for (let i = startRow; i < tableLines.length; i++) {
    const cells = tableLines[i]
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell !== '');

    if (cells.length > 0) {
      html += '<tr>';
      cells.forEach(cell => {
        html += `<td>${cell}</td>`;
      });
      html += '</tr>';
    }
  }

  html += '</tbody></table>';

  return html;
}