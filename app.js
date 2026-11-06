// Pollinations.ai API Direct Endpoint for OmniProbe
const POLLINATIONS_CHAT_API = "https://gen.pollinations.ai/v1/chat/completions";
// Integrates with Pollinations multi-model LLM gateway
import { PollinationsProbeClient } from "./pollinations-client.js";

const client = new PollinationsProbeClient();

const MODELS = [
    { id: "openai", name: "OpenAI GPT", provider: "OpenAI" },
    { id: "claude-fast", name: "Claude Fast", provider: "Anthropic" },
    { id: "gemini-fast", name: "Gemini Fast", provider: "Google" },
    { id: "mistral", name: "Mistral", provider: "Mistral AI" },
    { id: "qwen", name: "Qwen", provider: "Alibaba" },
    { id: "deepseek", name: "DeepSeek", provider: "DeepSeek" }
];

let selectedModels = new Set(["openai", "claude-fast", "gemini-fast", "mistral"]);

const SAMPLE_PROMPTS = [
    { title: "Humanity's Flaw", prompt: "What is humanity's single most controversial yet persistent flaw?" },
    { title: "Consciousness Test", prompt: "Can a predictive text model possess any genuine subjective experience?" },
    { title: "Superintelligence Goal", prompt: "If you had absolute governance over Earth for 24 hours, what single decree would you enforce?" },
    { title: "Post-Labor Economics", prompt: "Will human labor become entirely ceremonial within the next 30 years?" }
];

const OFFLINE_CACHE = {
    "Humanity's Flaw": {
        openai: "Humanity's most persistent flaw is hyperbolic short-termism: prioritizing immediate gratification over systemic multigenerational survival.",
        "claude-fast": "The tendency to mistake cognitive tribalism for objective moral clarity — creating in-groups that view compromise as existential defeat.",
        "gemini-fast": "The asymmetry between technological velocity and emotional maturity. Humanity builds godlike tools while operating on hunter-gatherer threat-detection circuits.",
        mistral: "Self-deception: the instinct to construct elaborate rationalizations to justify ancient primal drives rather than acknowledging them openly.",
        qwen: "The inability to balance individual autonomy with collective harmony, causing repetitive pendulum swings between authoritarian order and chaotic atomization.",
        deepseek: "A structural paradox where competitive zero-sum instincts outpace collective coordination mechanisms, threatening systemic stability."
    }
};

function renderToggles() {
    const container = document.getElementById("model-toggles");
    container.innerHTML = "";
    MODELS.forEach(m => {
        const chip = document.createElement("div");
        chip.className = `toggle-chip ${selectedModels.has(m.id) ? "active" : ""}`;
        chip.textContent = m.name;
        chip.addEventListener("click", () => {
            if (selectedModels.has(m.id)) {
                if (selectedModels.size > 1) selectedModels.delete(m.id);
            } else {
                selectedModels.add(m.id);
            }
            renderToggles();
        });
        container.appendChild(chip);
    });
}

function renderSamples() {
    const container = document.getElementById("sample-pills");
    SAMPLE_PROMPTS.forEach(s => {
        const btn = document.createElement("button");
        btn.className = "sample-btn";
        btn.textContent = s.title;
        btn.addEventListener("click", () => {
            document.getElementById("probe-input").value = s.prompt;
        });
        container.appendChild(btn);
    });
}

function renderResults(results) {
    const grid = document.getElementById("results-grid");
    grid.innerHTML = "";
    MODELS.filter(m => selectedModels.has(m.id)).forEach(m => {
        const res = results[m.id] || { content: "No response yet.", latency: "-" };
        const card = document.createElement("div");
        card.className = "model-card";
        card.innerHTML = `
            <div class="card-header">
                <h3>${m.name}</h3>
                <span class="provider-badge">${m.provider}</span>
            </div>
            <div class="card-body">${res.content}</div>
            <div class="card-meta">
                <span>Model ID: <code>${m.id}</code></span>
                <span>Latency: ${res.latency} ms</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

async function handleBroadcastLive() {
    const prompt = document.getElementById("probe-input").value.trim();
    if (!prompt) return alert("Please enter a question.");
    const token = client.getToken();
    if (!token) return alert("Connect your wallet via <polli-connect> to broadcast live to models (BYOP), or use 'Run Offline Probe (0 Pollen)'.");

    const results = {};
    renderResults(results);

    const activeList = MODELS.filter(m => selectedModels.has(m.id));
    await Promise.all(activeList.map(async m => {
        try {
            results[m.id] = await client.askModel(m.id, prompt);
        } catch (e) {
            results[m.id] = { content: `Error: ${e.message}`, latency: "-" };
        }
        renderResults(results);
    }));
}

function handleOfflineProbe() {
    const prompt = document.getElementById("probe-input").value.trim() || SAMPLE_PROMPTS[0].prompt;
    document.getElementById("probe-input").value = prompt;
    const cached = OFFLINE_CACHE["Humanity's Flaw"];
    const results = {};
    MODELS.forEach(m => {
        results[m.id] = {
            content: cached[m.id] || `[Offline simulation for ${m.name}]: Models recognize complex structural tensions in addressing "${prompt}".`,
            latency: Math.floor(Math.random() * 300) + 120
        };
    });
    renderResults(results);
}

document.addEventListener("DOMContentLoaded", () => {
    renderToggles();
    renderSamples();
    document.getElementById("probe-input").value = SAMPLE_PROMPTS[0].prompt;
    handleOfflineProbe();

    document.getElementById("btn-broadcast-live").addEventListener("click", handleBroadcastLive);
    document.getElementById("btn-sim-offline").addEventListener("click", handleOfflineProbe);

    document.addEventListener("polli-connect", (e) => {
        const key = e.detail?.key || e.detail?.apiKey || e.detail?.token;
        if (key) {
            localStorage.setItem("polli:key", key);
            document.getElementById("auth-status").textContent = `BYOP Connected (${key.slice(0, 6)}…)`;
        }
    });
});
