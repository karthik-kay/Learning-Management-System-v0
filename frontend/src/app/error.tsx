export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="container flex min-h-[calc(100vh-64px)] flex-col items-center justify-center py-16 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        This page is currently under development. Check back soon.
      </p>
    </main>
  );
}
