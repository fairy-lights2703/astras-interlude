import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-24 min-h-[50vh]">
      <h1 className="text-5xl">This part of the sky is empty.</h1>
      <p className="mt-4 text-lg text-muted">The page you were looking for isn&apos;t here.</p>
      <Link href="/" className="btn mt-10">Return home</Link>
    </div>
  );
}
