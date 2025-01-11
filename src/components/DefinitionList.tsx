export function DefinitionList({ children }: { children?: React.ReactNode }) {
  return <dl className="space-y-4">{children}</dl>;
}

export function DefinitionListItem({
  label,
  text,
  children,
}: {
  label: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-2">
      <dt className="shrink-0 font-bold">{label}:</dt>
      <dd>
        {text && <>{text}</>}
        {children && <>{children}</>}
      </dd>
    </div>
  );
}

export function DefinitionListItemCard({
  label,
  text,
}: {
  label: string;
  text?: string;
}) {
  return (
    <div className="flex gap-2">
      <dt className="shrink-0 font-bold">{label}:</dt>
      <dd>{text && <>{text}</>}</dd>
    </div>
  );
}
