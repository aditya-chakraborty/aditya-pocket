import type { SentenceSpan, ProseMirrorNode } from "../types";
import { MAX_CHARS } from "../types";

// ── Sentence extraction ─────────────────────────────────────────────────────

/**
 * Walk every text-block in a ProseMirror document and return an array of
 * sentence spans with their absolute document positions.
 */
export function extractSentences(doc: ProseMirrorNode): SentenceSpan[] {
  const sentences: SentenceSpan[] = [];

  doc.descendants((node, pos) => {
    if (!node.isTextblock) return;

    const blockText = node.textContent;
    if (!blockText.trim()) return;

    const blockStart = pos + 1; // +1: ProseMirror text offset inside a block

    const sentenceRegex = /[^.!?]*[.!?]+|[^.!?]+$/g;
    let match: RegExpExecArray | null;

    while ((match = sentenceRegex.exec(blockText)) !== null) {
      const raw = match[0];
      const trimmed = raw.trim();
      if (!trimmed) continue;

      const leadingSpaces = raw.length - raw.trimStart().length;
      const from = blockStart + match.index + leadingSpaces;
      const to = from + trimmed.length;

      sentences.push({ from, to, text: trimmed });
    }

    return false;
  });

  return sentences;
}

// ── Word counting ───────────────────────────────────────────────────────────

/**
 * Count the number of words in a string, stripping common punctuation first.
 */
export function countWords(text: string): number {
  const cleaned = text.replace(/[.!?,;:"""''()\[\]{}\-—–…]/g, " ").trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).length;
}

// ── Character-count colour ramp ─────────────────────────────────────────────

/**
 * Return a hex colour for the character-count indicator:
 * green → amber → red as the count approaches MAX_CHARS.
 */
export function getCharCountColor(count: number): string {
  const ratio = count / MAX_CHARS;
  if (ratio >= 0.95) return "#ff4d4f";
  if (ratio >= 0.8) return "#faad14";
  return "#52c41a";
}
