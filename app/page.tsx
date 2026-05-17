import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-6 text-center">
      <p className="rounded-full bg-violet-100 px-4 py-1 text-sm text-violet-700">Stream to Shorts MVP</p>
      <h1 className="text-5xl font-bold tracking-tight">Turn long streams into vertical Shorts</h1>
      <p className="max-w-2xl text-lg text-slate-600">
        Upload a recording or import a YouTube URL, set your screen + speaker crop, and render a 1080x1920 MP4.
      </p>
      <div className="flex gap-3">
        <Button asChild size="lg"><Link href="/upload">Start importing</Link></Button>
        <Button asChild variant="outline" size="lg"><Link href="/editor">Preview editor</Link></Button>
      </div>
    </main>
  );
}
