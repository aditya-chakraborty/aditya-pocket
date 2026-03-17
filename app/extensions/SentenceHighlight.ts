import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { WORD_LIMIT } from "../types";
import type { ProseMirrorNode } from "../types";
import { extractSentences, countWords } from "../utils/helpers";

const sentenceHighlightKey = new PluginKey("sentenceHighlight");

function buildDecorations(doc: ProseMirrorNode): DecorationSet {
  const decorations: Decoration[] = [];

  for (const sentence of extractSentences(doc)) {
    if (countWords(sentence.text) > WORD_LIMIT) {
      decorations.push(
        Decoration.inline(sentence.from, sentence.to, {
          class: "sentence-too-long",
        })
      );
    }
  }

  return DecorationSet.create(doc, decorations);
}

export const SentenceHighlight = Extension.create({
  name: "sentenceHighlight",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: sentenceHighlightKey,
        state: {
          init(_, { doc }) {
            return buildDecorations(doc);
          },
          apply(tr, oldDecorations) {
            if (!tr.docChanged) return oldDecorations;
            return buildDecorations(tr.doc);
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});
