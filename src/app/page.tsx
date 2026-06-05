"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

type PreviewMode = "formatted" | "markdown";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [componentName, setComponentName] = useState("");
  const [generatedMarkdown, setGeneratedMarkdown] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("formatted");

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content:
      "<h2>Component overview</h2><p>Start writing your rough documentation here...</p>",
    immediatelyRender: false,
  });

  function openImagePicker() {
    fileInputRef.current?.click();
  }

  function addImageFromFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    editor?.chain().focus().setImage({ src: imageUrl }).run();

    event.target.value = "";
  }

  function generateDocumentation() {
    const draftHtml = editor?.getHTML() || "";
    const title = componentName || "Untitled Component";

    const markdown = `# ${title}

## Purpose

Describe what this component is for.

## Draft source

${draftHtml}

## Notes

This is a temporary generated document. Next step: connect AI to rewrite this into clean Markdown.
`;

    const html = `
      <h1>${title}</h1>

      <h2>Purpose</h2>
      <p>Describe what this component is for.</p>

      <h2>Draft source</h2>
      ${draftHtml}

      <h2>Notes</h2>
      <p>This is a temporary generated document. Next step: connect AI to rewrite this into clean Markdown.</p>
    `;

    setGeneratedMarkdown(markdown);
    setGeneratedHtml(html);
    setPreviewMode("formatted");
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-12 text-zinc-50">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold">
          Design Documentation Generator
        </h1>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-medium">Component Name</label>
            <input
              type="text"
              placeholder="PLBlockHeader"
              value={componentName}
              onChange={(event) => setComponentName(event.target.value)}
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Documentation Draft
            </label>

            <div className="mb-3 flex flex-wrap gap-2">
              <button
                className="rounded bg-zinc-800 px-3 py-2"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                H1
              </button>

              <button
                className="rounded bg-zinc-800 px-3 py-2"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                H2
              </button>

              <button
                className="rounded bg-zinc-800 px-3 py-2"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                H3
              </button>

              <button
                className="rounded bg-zinc-800 px-3 py-2"
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                Bold
              </button>

              <button
                className="rounded bg-zinc-800 px-3 py-2"
                onClick={() =>
                  editor?.chain().focus().toggleBulletList().run()
                }
              >
                Bullets
              </button>

              <button
                className="rounded bg-zinc-800 px-3 py-2"
                onClick={() => editor?.chain().focus().toggleCode().run()}
              >
                Code
              </button>

              <button
                className="rounded bg-zinc-800 px-3 py-2"
                onClick={openImagePicker}
              >
                Add image
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={addImageFromFile}
              />
            </div>

            <div className="editor min-h-[320px] rounded border border-zinc-700 bg-zinc-900 p-4">
              <EditorContent editor={editor} />
            </div>
          </div>

          <button
            className="rounded bg-white px-6 py-3 text-black"
            onClick={generateDocumentation}
          >
            Generate Documentation
          </button>

          {generatedMarkdown && (
            <div className="mt-8 rounded border border-zinc-700 bg-zinc-900 p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Generated Documentation</h2>

                <div className="flex rounded bg-zinc-800 p-1">
                  <button
                    className={`rounded px-4 py-2 ${
                      previewMode === "formatted"
                        ? "bg-white text-black"
                        : "text-zinc-300"
                    }`}
                    onClick={() => setPreviewMode("formatted")}
                  >
                    Formatted
                  </button>

                  <button
                    className={`rounded px-4 py-2 ${
                      previewMode === "markdown"
                        ? "bg-white text-black"
                        : "text-zinc-300"
                    }`}
                    onClick={() => setPreviewMode("markdown")}
                  >
                    Markdown
                  </button>
                </div>
              </div>

              {previewMode === "formatted" ? (
                <article
                  className="generated-document"
                  dangerouslySetInnerHTML={{ __html: generatedHtml }}
                />
              ) : (
                <pre className="whitespace-pre-wrap rounded bg-zinc-950 p-4 text-sm text-zinc-200">
                  {generatedMarkdown}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}