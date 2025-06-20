# AI SDK Comparison

Code examples implemented with different AI frameworks, such as [Vercel AI SDK](https://ai-sdk.dev/), [Firebase Genkit](https://firebase.google.com/products/genkit) and [Langchain.js](https://js.langchain.com).

The main aim is to compare the frameworks and decide which one to choose for next projects.

All of the examples use the same model (Anthropic Claude Sonnet 3.5) for cleaner comparison.

Check out [@kkomelin](https://github.com/kkomelin)'s [companion post on his blog](https://komelin.com/blog/ai-framework-comparison).

## Installation

Clone the repo:

```bash
git clone git@github.com:kkomelin/ai-sdk-comparison.git
cd ai-sdk-comparison
```

Install dependencies:

```bash
pnpm i
```

## Usage

### Simple non-interactive example without tools plugged:

```bash
# src/vercel.simple.ts
pnpm vercel:simple
# src/genkit.simple.ts
pnpm genkit:simple
# src/langchain.simple.ts
pnpm langchain:simple
```

### Simple non-interactive example with a Temperature tool plugged:

```bash
# src/vercel.tool.ts
pnpm vercel:tool
# src/genkit.tool.ts
pnpm genkit:tool
# src/langchain.tool.ts
pnpm langchain:tool
```

### Interactive Chat example with a Temperature tool plugged:

```bash
# src/vercel.chat.ts
pnpm vercel:chat
# src/genkit.chat.ts
pnpm genkit:chat
# src/langchain.chat.ts
pnpm langchain:chat
```

Ask something like this to run the temperature tool:

```
What's the temperature in New York?
```

## Contribute

If you see ways to improve the examples, e.g. adapt them to the latest framework updates, shoot a PR.
