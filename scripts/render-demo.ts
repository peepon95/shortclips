import path from "node:path";
import {bundle} from "@remotion/bundler";
import {renderMedia, selectComposition} from "remotion";

async function run() {
  const serveUrl = await bundle({entryPoint: path.join(process.cwd(), "remotion-root.tsx")});
  const composition = await selectComposition({serveUrl, id: "StreamToShorts"});
  await renderMedia({
    composition,
    serveUrl,
    codec: "h264",
    outputLocation: path.join(process.cwd(), "public", "renders", "demo.mp4")
  });
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
