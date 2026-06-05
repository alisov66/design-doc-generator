export default function Home() {
  return (
    <main className="min-h-screen p-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">
          Design Documentation Generator
        </h1>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-medium">
              Upload Screenshots
            </label>

            <input
              type="file"
              multiple
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Component Name
            </label>

            <input
              type="text"
              placeholder="PLBlockHeader"
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              placeholder="Describe the component..."
              rows={6}
              className="w-full rounded border p-3"
            />
          </div>

          <button className="rounded bg-black px-6 py-3 text-white">
            Generate Documentation
          </button>
        </div>
      </div>
    </main>
  );
}