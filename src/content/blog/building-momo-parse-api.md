---
title: "Building MoMo Parse API — Turning SMS Chaos into Structured Data"
date: "2026-03-10"
excerpt: "How I built an open-source Python parser that converts unstructured Mobile Money SMS messages from Ghana's major telcos into structured JSON for fintech applications."
tags: ["Python", "Regex", "Fintech", "API", "Open Source"]
---

# Building MoMo Parse API — Turning SMS Chaos into Structured Data

If you've ever used Mobile Money in Ghana, you know the drill — every transaction triggers an SMS that looks like it was formatted by someone in a hurry. Different telcos, different formats, abbreviations everywhere. Now imagine trying to extract meaningful financial data from thousands of those messages programmatically.

That's the problem MoMo Parse solves.

## The Problem

Fintech apps, lending platforms, and financial institutions in Ghana need transaction intelligence from MoMo users. But MoMo transaction data lives in unstructured SMS messages — each telco (MTN, Telecel, AirtelTigo) formats them differently, and even within the same telco, different transaction types look completely different.

A typical MTN MoMo SMS might say something like:

```
You have received GHS 50.00 from KWAME MENSAH (024XXXXXXX).
Your new balance is GHS 120.50. Transaction ID: 12345678.
Fee charged: GHS 0.00. Date: 10/03/2026 Time: 14:30:05.
```

Multiply that by nine transaction types across three telcos, and you have a parsing nightmare.

## The Solution: A Three-Stage Pipeline

I designed MoMo Parse as a three-stage processing pipeline:

### 1. Telco Detection

The first stage identifies which provider sent the message using keyword matching and sender-ID analysis. If you pass a sender ID like `"MobileMoney"`, it narrows the search immediately. Otherwise, content-based heuristics figure it out.

### 2. Template Matching

Each (telco, transaction type) combination has its own regex template stored as a JSON config. All matching templates compete against the input — the highest-scoring template wins. This approach means adding support for a new message format is as simple as dropping a new JSON object into `parser/configs/`.

### 3. Field Extraction

Named regex capture groups pull out the financial data — amount, currency, balance, fee, counterparty details, transaction ID, date, and time. Every result comes with a confidence score:

- **1.0** — perfect match, all fields extracted
- **0.8** — partial match, some fields missing
- **0.0** — unrecognized format

```python
from momoparse import parse

result = parse(sms_text, sender_id="MobileMoney")

print(result.telco)        # "mtn"
print(result.tx_type)      # "transfer_received"
print(result.amount)       # 50.00
print(result.currency)     # "GHS"
print(result.balance)      # 120.50
print(result.confidence)   # 1.0
```

## Beyond Parsing: The API Layer

The open-source parser is just the foundation. On top of it, I built a REST API that adds:

- **Categorization** — Automatically assigns financial categories (rent, salary, groceries) to transactions
- **Enrichment** — Batch analytics from 1,000+ SMS in a single request
- **Financial Profiles** — Monthly income metrics, expense ratios, business activity scoring, and risk signals

```bash
curl -X POST https://web-production-5aa38.up.railway.app/v1/parse \
  -H "X-API-Key: sk-sandbox-momoparse" \
  -H "Content-Type: application/json" \
  -d '{"sms_text": "YOUR_SMS_HERE"}'
```

The sandbox key (`sk-sandbox-momoparse`) gives you 100 calls per day with no registration — enough to test the API and build a proof of concept.

## Technical Decisions

### Why Regex Over NLP?

This was the biggest decision. I could have thrown an LLM at the problem, but:

1. **Speed** — Regex parsing is sub-millisecond. LLM calls take seconds and cost money per request
2. **Determinism** — Same input always produces the same output. No temperature, no hallucinations
3. **Offline capability** — The core parser works without an internet connection
4. **Cost** — Zero API costs for the parsing layer

The trade-off is maintenance — new SMS formats require new regex templates. But I designed the config system to make this trivial. Each template is a single JSON object, and the community can contribute new patterns through pull requests.

### JSON-Based Template Configs

Instead of hardcoding regex patterns in Python, I externalized them into JSON config files. This means:

- Non-developers can review and understand the patterns
- Adding a new telco or transaction type doesn't touch core logic
- Templates are version-controlled and easy to diff

### Poetry for Dependency Management

I chose Poetry over pip/setuptools for reproducible builds and a clean `pyproject.toml`. The package is published to PyPI as `momoparse` — one `pip install` and you're running.

### Railway for Deployment

The API runs on Railway with Docker. The setup is minimal — a `Dockerfile`, `railway.toml`, and environment variables. Auto-deploys on push to main.

## Challenges

### The Long Tail of SMS Formats

The hardest part wasn't building the parser — it was collecting enough real SMS samples to cover edge cases. Telcos occasionally change their message formats without warning, amounts can appear with or without comma separators, and some messages get truncated by carriers.

I built a `corpus/` directory with sample messages for testing. Every bug report that comes in with a new format gets added to the corpus and a matching template gets created.

### Confidence Scoring

Deciding when a parse is "good enough" was tricky. A message might match a template but miss the transaction ID. Is that a 0.8 or a 0.5? I settled on a simple rule: if the core financial fields (amount, transaction type) are present, it's at least 0.8. If all fields are present, it's 1.0. Anything below the core fields is 0.0.

## What I Learned

Building MoMo Parse taught me that **the best architecture for messy real-world data is often the simplest one**. Regex gets a bad reputation, but for structured-ish text with known patterns, it's unbeatable on speed and reliability.

It also reinforced that **open-source design matters**. Making templates JSON-based instead of hardcoded Python means the project can grow beyond what I personally encounter. Someone using Telecel in Tamale might see SMS formats I've never seen in Kumasi — and they can contribute a fix without understanding the parser internals.

---

*MoMo Parse is open source and published on PyPI. Check it out on [GitHub](https://github.com/theboylexis/momo-parse-api) or install it with `pip install momoparse`.*
