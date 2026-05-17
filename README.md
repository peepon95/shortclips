# Stream to Shorts (MVP)

Next.js app for converting long horizontal livestreams into 9:16 vertical Shorts.

## Stack
- Next.js App Router
- Tailwind CSS
- shadcn/ui-style components
- Remotion composition/rendering
- FFmpeg post-processing
- yt-dlp YouTube import

## Features
1. Landing page (`/`)
2. Upload/import page (`/upload`) for local file or YouTube URL
3. Basic editor preview (`/editor`) with default 60% top screen + 40% bottom speaker layout
4. Remotion composition `StreamToShorts` at 1080x1920
5. Render API `POST /api/render` exports MP4

## Setup
```bash
npm install
npm run dev
```

Install required binaries:
- `ffmpeg`
- `yt-dlp`

## Render API Usage
```bash
curl -X POST http://localhost:3000/api/render \
  -H 'Content-Type: application/json' \
  -d '{
    "compositionId": "StreamToShorts",
    "props": {
      "sourceUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "logoUrl": "https://placehold.co/180x60?text=Logo"
    }
  }'
```

With YouTube import:
```bash
curl -X POST http://localhost:3000/api/render \
  -H 'Content-Type: application/json' \
  -d '{"youtubeUrl":"https://www.youtube.com/watch?v=..."}'
```

## Notes
- MVP assumes manual crop choices. No face detection / auto-crop yet.
- Future: draggable crop UI, AI speaker tracking, captions.
