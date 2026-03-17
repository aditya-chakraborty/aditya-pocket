"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Typography } from "antd";
import { MAX_CHARS } from "../types";
import { SentenceHighlight } from "../extensions/SentenceHighlight";
import EditorToolbar from "./EditorToolbar";
import BubbleToolbar from "./BubbleToolbar";
import CharacterCount from "./CharacterCount";

const { Text } = Typography;

export default function StoryEditor() {
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: "Once upon a time...",
      }),
      SentenceHighlight,
    ],
    content: "",
    onUpdate({ editor }) {
      setCharCount(editor.getText().length);
    },
    editorProps: {
      handleKeyDown(_view, event) {
        if (
          event.key.length > 1 ||
          event.metaKey ||
          event.ctrlKey ||
          event.altKey
        ) {
          return false;
        }
        if (_view.state.doc.textContent.length >= MAX_CHARS) {
          return true;
        }
        return false;
      },
      handlePaste(_view, event) {
        const remaining = MAX_CHARS - _view.state.doc.textContent.length;
        if (remaining <= 0) {
          event.preventDefault();
          return true;
        }
        const clipboard = event.clipboardData?.getData("text/plain") ?? "";
        if (clipboard.length > remaining) {
          event.preventDefault();
          _view.dispatch(
            _view.state.tr.insertText(clipboard.slice(0, remaining))
          );
          return true;
        }
        return false;
      },
      attributes: {
        class: "editor-content",
      },
    },
  });

  return (
    <div className="editor-card">
      <div className="editor-toolbar-wrapper">
        <EditorToolbar editor={editor} />
      </div>

      <BubbleToolbar editor={editor} />
      <EditorContent editor={editor} />

      <div className="editor-footer">
        <CharacterCount count={charCount} />
        {charCount >= MAX_CHARS && (
          <div className="px-5 pb-3">
            <Text
              type="danger"
              style={{ fontSize: 12 }}
            >
              Character limit reached (5,000). Delete text to continue writing.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
