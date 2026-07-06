export default function GlobalLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
