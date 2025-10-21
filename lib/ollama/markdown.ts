// Markdown Parser for Chat Messages

export function parseMarkdown(text: string): string {
  if (!text) return '';

  let parsed = text;

  // Normalize line breaks
  parsed = parsed.replace(/\r\n/g, '\n');

  // Bold: **text** or __text__ (process before lists)
  parsed = parsed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic: *text* or _text_
  parsed = parsed.replace(/\*([^\*\n]+?)\*/g, '<em>$1</em>');
  parsed = parsed.replace(/_([^_\n]+?)_/g, '<em>$1</em>');

  // Code: `code`
  parsed = parsed.replace(/`(.+?)`/g, '<code>$1</code>');

  // Headers: ### Header
  parsed = parsed.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  parsed = parsed.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  parsed = parsed.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // Process lists (with emoji support)
  const lines = parsed.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Check if line is a list item (-, *, •, or emoji followed by text)
    if (/^[\-\*\•✓✅]\s+/.test(trimmedLine) || /^[\-\*\•]\s+[✓✅]/.test(trimmedLine)) {
      if (!inList) {
        processedLines.push('<ul>');
        inList = true;
      }
      // Remove list marker but keep emoji
      let content = trimmedLine.replace(/^[\-\*\•]\s+/, '');
      processedLines.push(`<li>${content}</li>`);
    } else if (trimmedLine === '' && inList) {
      // Empty line ends the list
      processedLines.push('</ul>');
      inList = false;
      processedLines.push('');
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      processedLines.push(line);
    }
  }
  
  // Close list if still open
  if (inList) {
    processedLines.push('</ul>');
  }
  
  parsed = processedLines.join('\n');

  // Handle paragraphs - split by double newlines
  const paragraphs = parsed.split(/\n\n+/);
  const formattedParagraphs = paragraphs.map(para => {
    const trimmed = para.trim();
    if (!trimmed) return '';
    
    // Don't wrap if already has HTML tags
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li')) {
      return trimmed;
    }
    
    // Replace single newlines with spaces within paragraphs
    const cleaned = trimmed.replace(/\n/g, ' ');
    return `<p>${cleaned}</p>`;
  }).filter(p => p);

  parsed = formattedParagraphs.join('');

  // Clean up spacing
  parsed = parsed.replace(/<\/ul><p>/g, '</ul><p>');
  parsed = parsed.replace(/<\/p><ul>/g, '</p><ul>');
  parsed = parsed.replace(/<\/h([123])><p>/g, '</h$1><p>');

  return parsed;
}

export function stripMarkdown(text: string): string {
  if (!text) return '';

  let stripped = text;

  // Remove bold
  stripped = stripped.replace(/\*\*(.+?)\*\*/g, '$1');
  stripped = stripped.replace(/__(.+?)__/g, '$1');

  // Remove italic
  stripped = stripped.replace(/\*(.+?)\*/g, '$1');
  stripped = stripped.replace(/_(.+?)_/g, '$1');

  // Remove code
  stripped = stripped.replace(/`(.+?)`/g, '$1');

  // Remove headers
  stripped = stripped.replace(/^#{1,6} (.+)$/gm, '$1');

  // Remove list markers
  stripped = stripped.replace(/^[\-\*] (.+)$/gm, '$1');

  return stripped;
}
