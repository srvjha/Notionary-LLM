# Notionary

A retrieval-augmented research notebook. Drop in your PDFs, web articles,
YouTube videos, or pasted text — Notionary indexes them and lets you ask
questions grounded in what you actually have, with source attribution on
every answer.

[Live demo](https://notecast.srvjha.in/) · [Video walkthrough](https://youtu.be/3QpY7EyjPXw) · [Repo](https://github.com/srvjha/notecast)

## What it does

- **Multi-source ingestion** — PDFs (with OCR fallback), website URLs,
  YouTube transcripts, and pasted text.
- **RAG pipeline** — content is chunked, embedded, and stored in Qdrant.
  Queries retrieve relevant passages before the model generates a response.
- **Persistent notebooks** — chat sessions, sources, and message history
  are saved per user via Postgres + Prisma. Resume anywhere.
- **Source attribution** — every answer is anchored to the chunk it came
  from, so you can verify rather than trust.

## Stack

| Layer       | Tools                                                              |
| ----------- | ------------------------------------------------------------------ |
| Frontend    | Next.js 15, React 19, TypeScript, Tailwind CSS 4                   |
| AI          | Vercel AI SDK, LangChain, OpenAI, Google Generative AI             |
| Vector DB   | Qdrant                                                             |
| Database    | Postgres + Prisma                                                  |
| Auth        | better-auth (GitHub, Google)                                       |
| Ingestion   | pdf-parse, cheerio + jsdom, youtubei.js                            |

## Run locally

Requires Node 18+ and access to a Postgres instance and a Qdrant cluster
(local or hosted).

```bash
git clone https://github.com/srvjha/notecast.git
cd notecast
npm install
cp .env.sample .env   # fill in the values below
npx prisma migrate deploy
npm run dev
```

The app runs at `http://localhost:3000`.

### Environment variables

```env
DATABASE_URL=

OPENAI_API_KEY=
GEMINI_API_KEY=

QDRANT_URL=
QDRANT_HOST=
QDRANT_API_KEY=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_COLLECTION_NAME=qdrantdb
```

## Scripts

| Command         | What it does                            |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start the dev server                    |
| `npm run build` | Production build                        |
| `npm start`     | Run the production build                |
| `npm run lint`  | Lint the project                        |

## Contributing

Issues and PRs welcome. For larger changes, open an issue first so we can
align on the direction.

## License

MIT — see [LICENSE](LICENSE).

## Contact

Built by [@srvjha](https://github.com/srvjha). Bugs and feedback go in
[GitHub Issues](https://github.com/srvjha/notecast/issues).
