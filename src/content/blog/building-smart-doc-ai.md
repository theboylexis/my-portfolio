---
title: "Building Smart Doc AI — From Zero to Production"
date: "2026-02-15"
excerpt: "How I built a production-grade document analysis API with Node.js, Express, PostgreSQL, Redis, and OpenAI — and what I learned along the way."
tags: ["Node.js", "Express", "PostgreSQL", "Redis", "OpenAI", "Backend"]
---

# Building Smart Doc AI — From Zero to Production

Smart Doc AI started as a learning project and evolved into a full production-grade REST API. Here's the story of how I built it, the architecture decisions I made, and what I'd do differently.

## What Is Smart Doc AI?

Smart Doc AI is a document analysis API. You upload a document (PDF, DOCX, or plain text), and the API processes it with OpenAI GPT-4 to extract key insights, summaries, and structured data. Think of it as an intelligent document reader that understands context.

### Core Features

- **JWT Authentication** — Secure user registration and login
- **File Uploads** — Cloudinary-based document storage
- **Background Processing** — BullMQ job queue for async document analysis
- **AI Analysis** — OpenAI GPT-4 for intelligent text extraction
- **Caching** — Redis for performance optimization
- **Real-time Updates** — Socket.io for live job status notifications

## The Architecture

I went with a layered architecture that separates concerns clearly:

```
Client Request
    → Express Route
        → Middleware (Auth, Validation)
            → Controller
                → Service Layer
                    → Database (Prisma + PostgreSQL)
                    → External APIs (OpenAI, Cloudinary)
                    → Cache (Redis)
                    → Job Queue (BullMQ)
```

### Why This Structure?

Most tutorials show everything crammed into route handlers. That works for demos, but falls apart when you need to:

- **Test individual pieces** — Service functions can be unit tested without spinning up Express
- **Swap implementations** — Moving from local storage to Cloudinary only touched one service file
- **Add features** — Adding caching meant wrapping service calls, not rewriting routes

## Key Technical Decisions

### 1. BullMQ for Background Jobs

Document analysis with GPT-4 takes 5–15 seconds. You can't make users wait that long on an HTTP request. BullMQ gave me:

- **Async processing** — Upload returns immediately with a job ID
- **Retries** — Failed jobs retry automatically with exponential backoff
- **Concurrency control** — Process multiple documents without overwhelming the OpenAI API

```javascript
// Adding a job to the queue
const job = await analysisQueue.add('analyze-document', {
  documentId: doc.id,
  userId: user.id,
  filePath: doc.cloudinaryUrl,
}, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 2000 },
});
```

### 2. Redis Caching Strategy

Not everything needs to hit the database every time. I cached:

- **Analysis results** — Once a document is analyzed, the result doesn't change
- **User profile data** — Refreshed every 5 minutes
- **Rate limiting counters** — Track API usage per user

The cache-aside pattern was straightforward: check Redis first, fall back to PostgreSQL, then cache the result.

### 3. Prisma ORM

Prisma made database work almost enjoyable. The schema file is self-documenting, migrations are version-controlled, and the generated client catches type errors before they hit production.

```prisma
model Document {
  id          Int       @id @default(autoincrement())
  title       String
  fileUrl     String
  status      Status    @default(PENDING)
  analysis    Analysis?
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
  createdAt   DateTime  @default(now())
}
```

## Challenges I Faced

### The "It Works Locally" Problem

Everything ran perfectly on my machine. Then I deployed to Render and discovered:

- **Environment variables** — Forgot to set `REDIS_URL` in production
- **File system differences** — Temporary file handling broke on Linux
- **Cold starts** — Free tier containers sleep and take 30+ seconds to wake up

The fix was building a proper CI/CD pipeline with GitHub Actions. Now every push runs tests, builds the app, and deploys automatically.

### Rate Limiting OpenAI

The OpenAI API has rate limits, and my background worker was hitting them during batch processing. I solved this with:

1. **Concurrency limits** on the BullMQ worker (max 2 concurrent jobs)
2. **Exponential backoff** on 429 responses
3. **Request queuing** in the service layer

### Real-time Updates with Socket.io

Adding WebSocket support to an existing Express app was trickier than expected. The key insight was separating the HTTP server from Socket.io initialization and sharing the `io` instance with the background worker through a clean interface.

## What I'd Do Differently

1. **Start with TypeScript** — JavaScript's flexibility became a liability at scale. Type errors caught at compile time would have saved hours of debugging.

2. **Write tests first** — I added tests after building features. Writing them first would have caught edge cases earlier and produced better API designs.

3. **Use structured logging from day one** — `console.log` doesn't cut it. Structured logging with levels (info, warn, error) and context would have made debugging production issues much faster.

## What I Learned

Building Smart Doc AI taught me that backend development is about decisions, not just code. Every choice — from database schema to caching strategy to error handling — has trade-offs. The best architecture isn't the most complex one; it's the one that solves your specific problems cleanly.

The project also proved that learning by building beats tutorials every time. Reading about BullMQ is one thing. Debugging why your jobs aren't being processed at 2 AM is where real understanding lives.

---

*Smart Doc AI is open source. Check it out on [GitHub](https://github.com/theboylexis/smart-doc-api).*
