"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

export default function Home() {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<h2>Component overview</h2><p>Start writing your rough documentation here...</p>",
    immediatelyRender: false,
  });

  function addImage() {
    const url = window.prompt("Image URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-12 text-zinc-50">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold">
          Design Documentation Generator
        </h1>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-medium">Component Name</label>
            <input
              type="text"
              placeholder="PLBlockHeader"
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Documentation Draft</label>

            <div className="mb-3 flex flex-wrap gap-2">
              <button className="rounded bg-zinc-800 px-3 py-2" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
                H1
              </button>
              <button className="rounded bg-zinc-800 px-3 py-2" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
                H2
              </button>
              <button className="rounded bg-zinc-800 px-3 py-2" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
                H3
              </button>
              <button className="rounded bg-zinc-800 px-3 py-2" onClick={() => editor?.chain().focus().toggleBold().run()}>
                Bold
              </button>
              <button className="rounded bg-zinc-800 px-3 py-2" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
                Bullets
              </button>
              <button className="rounded bg-zinc-800 px-3 py-2" onClick={() => editor?.chain().focus().toggleCode().run()}>
                Code
              </button>
              <button className="rounded bg-zinc-800 px-3 py-2" onClick={addImage}>
                Add image
              </button>
            </div>

            <div className="min-h-[320px] rounded border border-zinc-700 bg-zinc-900 p-4">
              <EditorContent editor={editor} />
            </div>
          </div>

          <button className="rounded bg-white px-6 py-3 text-black">
            Generate Documentation
          </button>
        </div>
      </div>
    </main>
  );
}