interface SectionHeaderProps {
  title: string
  description?: string
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => (
  <div className="flex flex-col gap-1.5">
    <h1 className="text-[28px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
      {title}
    </h1>
    {description && (
      <p className="text-[14.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    )}
  </div>
)