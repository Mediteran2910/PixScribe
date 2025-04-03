import "./codeEditor.css";
import React, { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { yaml } from "@codemirror/lang-yaml";
import { oneDark } from "@codemirror/theme-one-dark";

type Props = {
  editorLanguage?: "html" | "json" | "yaml";
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export default function CodeEditor({
  editorLanguage,
  defaultValue,
  onChange,
}: Props) {
  console.log(editorLanguage);
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const languageExtensions = {
        html: html(),
        json: json(),
        yaml: yaml(),
      };

      const state = EditorState.create({
        doc: defaultValue,
        extensions: [
          basicSetup,
          languageExtensions[editorLanguage],
          oneDark,
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.changes) {
              onChange?.(update.state.doc.toString());
            }
          }),
        ],
      });

      viewRef.current = new EditorView({
        state,
        parent: editorRef.current,
      });

      return () => viewRef.current.destroy();
    }
  }, [editorLanguage, defaultValue]);

  return (
    <div
      ref={editorRef}
      style={{
        border: "1px solid #444",
        minHeight: "300px",
        background: "#1e1e1e",
        overflowY: "auto",
      }}
    />
  );
}
