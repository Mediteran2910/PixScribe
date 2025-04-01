import "./codeEditor.css";
import React, { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";

type Props = {
  language: "html" | "json" | "yaml";
  defaultValue: string;
  onChange: any;
};

export default function CodeEditor({
  language,
  defaultValue,
  onChange,
}: Props) {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const languageExtensions = {
        html: html(),
      };

      const state = EditorState.create({
        doc: defaultValue,
        extensions: [
          basicSetup,
          languageExtensions[language],
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
  }, [language, defaultValue]);

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
