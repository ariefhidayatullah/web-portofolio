export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-zinc-500">
          Mohammad Arief Hidayatullah © {new Date().getFullYear()}
        </p>
        <p className="text-xs text-zinc-400 mt-1">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
