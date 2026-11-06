# OmniProbe — Ask Every AI Model the Same Question

[![Made with pollinations.ai](https://raw.githubusercontent.com/pollinations/pollinations/main/packages/ui/src/brand/badge-made-with.svg)](https://pollinations.ai/?ref=badge)

**Live App:** [https://brutus88ai.github.io/polli-omniprobe/](https://brutus88ai.github.io/polli-omniprobe/)  
**Quest:** [pollinations/pollinations#19183](https://github.com/pollinations/pollinations/issues/19183)

OmniProbe broadcasts a single prompt across dozens of diverse AI models simultaneously (OpenAI, Claude, Gemini, Mistral, Qwen, DeepSeek) via **Pollinations**, displaying synchronized outputs side-by-side with latency benchmarking and zero-pollen offline comparison modes.

![OmniProbe Screenshot](https://raw.githubusercontent.com/Brutus88Ai/polli-omniprobe/main/docs/screenshot.png)

## Highlights

- **Simultaneous Broadcast**: Sends queries concurrently across top LLMs through Pollinations' unified API (`https://gen.pollinations.ai/v1/chat/completions`).
- **Bring Your Own Pollen (BYOP)**: Users connect directly via `<polli-connect>` (@pollinations/ui) to spend their own Pollen.
- **0-Pollen Offline Mode**: Includes pre-cached responses for philosophical and controversial dilemma prompts so visitors can explore multi-model synthesis with 0 cost.
