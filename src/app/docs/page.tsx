

export default function DocsPage() {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-4xl w-full">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
        Introduction
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
        Nexora UI is a stunning collection of beautifully designed, highly customizable, and accessible React components. 
        It is built with Tailwind CSS and Radix UI. It is <strong>not</strong> a component library you install via npm as a single package. 
        Instead, it provides a CLI that copies the components directly into your project&apos;s source code.
      </p>

      <hr className="border-zinc-200 dark:border-white/10 my-8" />

      <h2 id="installation" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 mt-8 scroll-m-24">
        Installation
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Before you can add components, ensure your project is properly configured. Nexora UI is optimized for <strong>Next.js 14+</strong> with the App Router, Tailwind CSS, and TypeScript.
      </p>

      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">1. Create a Next.js project</h3>
      <div className="bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-lg p-4 mb-6 font-mono text-sm text-zinc-800 dark:text-zinc-300 flex items-center">
        <span className="text-zinc-500 mr-4">$</span>
        npx create-next-app@latest my-app --typescript --tailwind --eslint
      </div>

      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">2. Initialize Nexora CLI</h3>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">
        Run the init command to set up your project. This will create a <code className="bg-zinc-100 dark:bg-white/10 rounded px-1 py-0.5">components.json</code> file and install required dependencies (framer-motion, radix-ui, tailwind-merge, clsx).
      </p>
      <div className="bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-lg p-4 mb-8 font-mono text-sm text-zinc-800 dark:text-zinc-300 flex items-center">
        <span className="text-zinc-500 mr-4">$</span>
        npx nexora init
      </div>

      <hr className="border-zinc-200 dark:border-white/10 my-8" />

      <h2 id="cli" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 mt-8 scroll-m-24">
        Using the CLI
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Once initialized, you can add any component from our library directly to your project using the CLI. The component will be downloaded directly into your <code className="bg-zinc-100 dark:bg-white/10 rounded px-1 py-0.5">components/ui</code> folder.
      </p>

      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Add a Component</h3>
      <div className="bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-lg p-4 mb-4 font-mono text-sm text-zinc-800 dark:text-zinc-300 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-zinc-500 mr-4">$</span>
          <span>npx nexora add button</span>
        </div>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm">
        This command will add the Button component and all its required dependencies to your project.
      </p>

      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Add Multiple Components</h3>
      <div className="bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-lg p-4 mb-8 font-mono text-sm text-zinc-800 dark:text-zinc-300 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-zinc-500 mr-4">$</span>
          <span>npx nexora add card input dialog alert</span>
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-white/10 my-8" />

      <h2 id="components" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 mt-8 scroll-m-24">
        Manual Installation
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        If you prefer not to use the CLI, you can manually copy and paste the code. Browse the <strong>Components</strong> section, select the code tab, and copy it into a new file in your project.
      </p>
      
      <ol className="list-decimal list-inside space-y-3 text-zinc-600 dark:text-zinc-400 mb-8">
        <li>Find the component you want in the Components explorer.</li>
        <li>Click on the <strong>Code</strong> tab.</li>
        <li>Copy the code.</li>
        <li>Create a new file in your project (e.g., <code className="bg-zinc-100 dark:bg-white/10 rounded px-1 py-0.5 text-zinc-800 dark:text-zinc-200">components/ui/button.tsx</code>).</li>
        <li>Paste the code and manually install any required dependencies listed at the top of the file (like <code className="bg-zinc-100 dark:bg-white/10 rounded px-1 py-0.5 text-zinc-800 dark:text-zinc-200">lucide-react</code> or Radix primitives).</li>
      </ol>

      <hr className="border-zinc-200 dark:border-white/10 my-8" />

      <h2 id="pro" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 mt-8 flex items-center gap-2 scroll-m-24">
        <span className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Pro</span>
        Premium Blocks
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Nexora UI includes a set of premium dashboard layouts, marketing heroes, and complex functional blocks. These blocks are marked with a PRO badge.
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        To access the source code for Pro Blocks, you must purchase a license from the Pricing page. Once you log in with your licensed account, the code will be unlocked and available to copy or install via CLI.
      </p>
    </div>
  )
}
