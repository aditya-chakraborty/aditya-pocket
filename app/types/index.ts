import type { Editor } from "@tiptap/react";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

// ── Shared constants ────────────────────────────────────────────────────────

export const MAX_CHARS = 5000;
export const WORD_LIMIT = 20;

// ── Sentence analysis ───────────────────────────────────────────────────────

export interface SentenceSpan {
  from: number;
  to: number;
  text: string;
}

// ── Component props ─────────────────────────────────────────────────────────

export interface EditorToolbarProps {
  editor: Editor | null;
}

export interface BubbleToolbarProps {
  editor: Editor | null;
}

export interface CharacterCountProps {
  count: number;
}

// ── Toolbar item descriptor ─────────────────────────────────────────────────

export interface ToolbarItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  action: () => void;
  isActive: boolean;
  disabled?: boolean;
}

// ── ProseMirror re-export for convenience ───────────────────────────────────

export type { ProseMirrorNode };
