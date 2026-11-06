# OmniProbe - Simultaneous Multi-Model AI Question Probe

[![Made with pollinations.ai](https://raw.githubusercontent.com/pollinations/pollinations/main/packages/ui/src/brand/badge-made-with.svg)](https://pollinations.ai/?ref=badge)

**OmniProbe** is a multi-model broadcast comparison engine powered by the [Pollinations](https://pollinations.ai/) API (`https://gen.pollinations.ai/v1/chat/completions`). It asks the same user prompt across multiple leading AI models (OpenAI, Claude, Qwen, DeepSeek, Mistral, Llama) simultaneously and presents side-by-side responses.

Built for the **Pollinations Quest #19183: [QUEST] An app or game about asking every model the same question**.

## Features

- **Concurrent Multi-Model Broadcast**: Query up to 6 models in parallel.
- **Pollinations Integration**: Direct integration with `https://gen.pollinations.ai/v1/chat/completions`.
- **Zero-Pollen Mode**: Includes built-in offline comparison cache so users can test immediately without spending any Pollen.
- **Bring Your Own Pollen (BYOP)**: Integrated `<polli-connect>` component allowing users to sign in and spend their own Pollen.

## Live Demo

- **Live App**: https://brutus88ai.github.io/polli-omniprobe/
- **Repository**: https://github.com/Brutus88Ai/polli-omniprobe

## License

MIT
