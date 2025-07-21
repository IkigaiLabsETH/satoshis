import { PersonaKey } from './router';

function extractSections(markdown: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const lines = markdown.split('\n');
  let currentHeader = '';
  let buffer: string[] = [];
  for (const line of lines) {
    const headerMatch = line.match(/^#+\s*(.+)$/);
    if (headerMatch) {
      if (currentHeader && buffer.length) {
        sections[currentHeader] = buffer.join('\n').trim();
      }
      currentHeader = headerMatch[1].trim();
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  if (currentHeader && buffer.length) {
    sections[currentHeader] = buffer.join('\n').trim();
  }
  return sections;
}

function extractMarkdownTable(section: string): Array<Record<string, string>> {
  const lines = section.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);
  const rows = lines.slice(2).map(row => row.split('|').map(cell => cell.trim()));
  return rows.map(rowArr => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = rowArr[i] || ''; });
    return obj;
  });
}

function extractBullets(section: string): string[] {
  return section.split('\n').filter(l => /^[-*•]/.test(l.trim())).map(l => l.replace(/^[-*•]\s*/, '').trim());
}

function extractHeadlines(section: string): string[] {
  return section.split('\n').filter(l => l.match(/^[0-9]+\./) || l.match(/^[-*•]/)).map(l => l.replace(/^[0-9]+\.\s*/, '').replace(/^[-*•]\s*/, '').trim());
}

export function postProcessLLMOutput(persona: PersonaKey, output: string): Record<string, unknown> {
  const sections = extractSections(output);
  switch (persona) {
    case 'MarketResearcher': {
      // Try to extract tables and lists from key sections
      const result: Record<string, unknown> = { sections, raw: output };
      for (const [title, content] of Object.entries(sections)) {
        if (content.includes('|')) {
          result[title] = extractMarkdownTable(content);
        } else if (/\n[-*•]/.test(content)) {
          result[title] = extractBullets(content);
        }
      }
      return result;
    }
    case 'Analyst': {
      // Extract bullets and tables from summary and thesis sections
      const result: Record<string, unknown> = { sections, raw: output };
      if (sections['Investment Summary']) {
        result['InvestmentSummaryBullets'] = extractBullets(sections['Investment Summary']);
      }
      if (sections['Fundamental Analysis'] && sections['Fundamental Analysis'].includes('|')) {
        result['FundamentalTable'] = extractMarkdownTable(sections['Fundamental Analysis']);
      }
      return result;
    }
    case 'Researcher':
    case 'Consultant': {
      // Extract headlines from summary or news sections
      const result: Record<string, unknown> = { sections, raw: output };
      if (sections['Summary'] || sections['Market Trends']) {
        const key = sections['Summary'] ? 'Summary' : 'Market Trends';
        result['Headlines'] = extractHeadlines(sections[key]);
      }
      return result;
    }
    default:
      return { raw: output };
  }
} 