"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

export default function UploadPage() {
  const [fileName, setFileName] = useState<string>("");
  const [url, setUrl] = useState("");

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-12">
      <h1 className="text-3xl font-semibold">Upload or import source</h1>
      <section className="space-y-3 rounded-xl border p-6">
        <Label htmlFor="video">Video file</Label>
        <Input
          id="video"
          type="file"
          accept="video/*"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
        {fileName && <p className="text-sm text-slate-600">Selected: {fileName}</p>}
      </section>

      <section className="space-y-3 rounded-xl border p-6">
        <Label htmlFor="yt">YouTube URL (video or live replay)</Label>
        <Input id="yt" placeholder="https://www.youtube.com/watch?v=..." value={url} onChange={(e)=>setUrl(e.target.value)} />
        <p className="text-sm text-slate-600">Use server-side yt-dlp to fetch this URL during render.</p>
      </section>

      <Button>Continue to editor (MVP mock)</Button>
    </main>
  );
}
