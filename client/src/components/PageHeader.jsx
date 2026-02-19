export default function PageHeader({ title, subtitle, right }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}
