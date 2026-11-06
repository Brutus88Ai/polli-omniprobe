export const POLLINATIONS_API_BASE = "https://gen.pollinations.ai";

export class PollinationsProbeClient {
    constructor() {
        this.apiBase = POLLINATIONS_API_BASE;
    }

    getToken() {
        return localStorage.getItem("polli:key") || localStorage.getItem("pollinations_api_key") || null;
    }

    async askModel(modelId, prompt) {
        const token = this.getToken();
        if (!token) throw new Error("No BYOP token connected. Connect via <polli-connect> or run 0-Pollen offline probe.");

        const start = performance.now();
        const res = await fetch(`${this.apiBase}/v1/chat/completions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: modelId,
                messages: [{ role: "user", content: prompt }]
            })
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Model ${modelId} error (${res.status}): ${err}`);
        }

        const data = await res.json();
        const latency = Math.round(performance.now() - start);
        return {
            content: data.choices?.[0]?.message?.content || "No response received.",
            latency
        };
    }
}
