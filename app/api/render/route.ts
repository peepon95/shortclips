import {NextRequest, NextResponse} from "next/server";
import path from "node:path";
import {execFile} from "node:child_process";
import {bundle} from "@remotion/bundler";
import {renderMedia, selectComposition} from "remotion";

function execPromise(file: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    execFile(file, args, (error) => (error ? reject(error) : resolve()));
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    compositionId?: string;
    props?: Record<string, unknown>;
    youtubeUrl?: string;
  };

  const outPath = path.join(process.cwd(), "public", "renders", `short-${Date.now()}.mp4`);
  let sourceUrl = (body.props?.sourceUrl as string | undefined) ?? "";

  if (body.youtubeUrl) {
    const ytOut = path.join(process.cwd(), "public", "imports", `yt-${Date.now()}.mp4`);
    await execPromise("yt-dlp", ["-f", "mp4", "-o", ytOut, body.youtubeUrl]);
    sourceUrl = ytOut;
  }

  if (!sourceUrl) {
    return NextResponse.json({error: "Missing sourceUrl or youtubeUrl"}, {status: 400});
  }

  await execPromise("mkdir", ["-p", path.dirname(outPath)]);

  const bundleLocation = await bundle({entryPoint: path.join(process.cwd(), "remotion-root.tsx")});
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: body.compositionId ?? "StreamToShorts",
    inputProps: {...body.props, sourceUrl}
  });

  await renderMedia({
    codec: "h264",
    composition,
    serveUrl: bundleLocation,
    outputLocation: outPath,
    inputProps: {...body.props, sourceUrl}
  });

  const finalPath = outPath.replace(".mp4", "-processed.mp4");
  await execPromise("ffmpeg", ["-y", "-i", outPath, "-vf", "format=yuv420p", "-c:a", "aac", finalPath]);

  return NextResponse.json({ok: true, output: finalPath});
}
