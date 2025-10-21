// Markdown Parser for Chat Messages

export function parseMarkdown(text: string): string {
  if (!text) return '';

  let parsed = text;

  // Headers: ### Header (before other replacements)
  parsed = parsed.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  parsed = parsed.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  parsed = parsed.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Lists: - item or * item
  parsed = parsed.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
  
  // Wrap consecutive list items in ul tags
  const listItems = parsed.match(/<li>.*?<\/li>/g);
  if (listItems && listItems.length > 0) {
    const listBlock = listItems.join('');
    parsed = parsed.replace(/<li>.*?<\/li>/g, '');
    parsed = parsed + '<ul>' + listBlock + '</ul>';
  }

  // Bold: **text** or __text__
  parsed = parsed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic: *text* or _text_ (but not in already processed tags)
  parsed = parsed.replace(/(?<!<[^>]*)\*([^*]+?)\*(?![^<]*>)/g, '<em>$1</em>');
  parsed = parsed.replace(/(?<!<[^>]*)_([^_]+?)_(?![^<]*>)/g, '<em>$1</em>');

  // Code: `code`
  parsed = parsed.replace(/`(.+?)`/g, '<code>$1</code>');

  // Replace double line breaks with paragraph breaks
  parsed = parsed.replace(/\n\n+/g, '</p><p>');
  
  // Replace single line breaks with small breaks
  parsed = parsed.replace(/\n/g, ' ');

  // Wrap in paragraph if not already wrapped
  if (!parsed.startsWith('<')) {
    parsed = '<p>' + parsed + '</p>';
  }

  // Clean up empty paragraphs
  parsed = parsed.replace(/<p><\/p>/g, '');
  parsed = parsed.replace(/<p>\s*<\/p>/g, '');

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
