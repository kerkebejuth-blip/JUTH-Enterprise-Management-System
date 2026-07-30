export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="mt-2 text-slate-500">
        {title} module is under development.
      </p>
    </div>
  );
}
