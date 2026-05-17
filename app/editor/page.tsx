"use client";

import {useMemo, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

export default function EditorPage() {
  const [logo, setLogo] = useState("https://placehold.co/180x60?text=Logo");
  const preview = useMemo(() => ({top: "60%", bottom: "40%"}), []);

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[360px_1fr]">
      <aside className="space-y-4 rounded-xl border p-6">
        <h1 className="text-2xl font-semibold">Basic editor preview</h1>
        <div>
          <Label htmlFor="logo">Channel logo URL</Label>
          <Input id="logo" value={logo} onChange={(e)=>setLogo(e.target.value)} />
        </div>
        <p className="text-sm text-slate-600">MVP: user manually sets crop areas in future control panel.</p>
        <Button onClick={async ()=>{
          await fetch('/api/render', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({compositionId:'StreamToShorts', props:{logoUrl:logo}})});
          alert('Render endpoint triggered. Check server logs/output path.');
        }}>Render MP4</Button>
      </aside>
      <section className="flex items-center justify-center">
        <div className="relative aspect-[9/16] w-[320px] overflow-hidden rounded-2xl border-4 border-slate-900 bg-black">
          <div className="absolute inset-x-0 top-0 bg-slate-800" style={{height: preview.top}} />
          <div className="absolute inset-x-0 bottom-0 bg-slate-600" style={{height: preview.bottom}} />
          <img src={logo} alt="logo" className="absolute right-3 top-3 h-8 rounded bg-white/90 p-1" />
        </div>
      </section>
    </main>
  );
}
