# ReAct Framework: Reasoning + Acting

## Overview

The **ReAct framework (Reasoning + Acting)** is a prompting and agent-design methodology that enables large language models (LLMs) to **interleave reasoning steps with actions**. Instead of producing a single static answer, the model engages in a loop of _thought → action → observation_, allowing it to solve complex tasks that require planning, tool use, or multi-step interaction with the environment.

Originally introduced in the paper **“ReAct: Synergizing Reasoning and Acting in Language Models” (Yao et al., 2022)**, the framework has become foundational to modern AI agent architectures.

## Core Principles

### 1. **Reasoning Traces**

The model explicitly produces intermediate thoughts (not revealed to end-users in production), including:

- Plans
- Hypotheses
- Subgoals
- Error checks

Reasoning traces improve interpretability, debuggability, and controllability of agent execution.

### 2. **Actions**

Actions are operations the model performs to manipulate or observe its environment. Examples include:

- Running a tool (calculator, web search, code execution)
- Querying a database
- Interacting with APIs or software environments

Actions create a feedback loop enabling the model to gather missing information.

### 3. **Observations**

Each action leads to an **observation**, which the model uses to update its reasoning.  
Observations reduce hallucination risk and improve factual reliability by grounding the model in external data.

## The ReAct Loop

```text
Thought → Action → Observation → Thought → … → Final Answer
```

This loop continues until the model reaches a conclusion.
Example structure:

```text
Thought: I need more information to solve this.
Action: Search("population of Tokyo")
Observation: The population is ~14M.
Thought: Now I can answer the user’s question…
Final Answer: ...
```

## Advantages

### **1. Stronger Problem-Solving Abilities**

ReAct enables LLMs to tackle tasks that require:

- Multi-step reasoning
- Planning
- Retrieval of external information
- Correction of earlier mistakes

### **2. Reduced Hallucination**

By grounding reasoning with external observations, ReAct minimizes fabricated or unverified content.

### **3. Interpretable Agents**

Reasoning traces make it possible to analyze why an agent made a particular decision.

### **4. Modular and Extensible**

ReAct forms the foundation for:

- LangChain agents
- Toolformer-like architectures
- Autonomous LLM agents (e.g., AutoGPT/Metaphor-based agents)
- Evaluators and safety-aligned agent systems

## High-Level Prompting Template

```text
You are an agent that uses ReAct (Reasoning + Acting).
For each step, produce:
1) Thought: Explain your reasoning.
2) Action: Select an action, such as:
   - search[]
   - calculate[]
   - run_code[]
   - access_db[]
3) Observation: I will return the result.

Repeat Thought → Action → Observation until you have enough information.
Then produce a Final Answer with no remaining thoughts.
```

This template is often adapted to production settings by **hiding the Thought outputs** (“chain-of-thought suppression”) while keeping the action steps visible.

## Comparisons With Related Frameworks

| Framework                  | Focus                             | Key Difference                      |
| -------------------------- | --------------------------------- | ----------------------------------- |
| **ReAct**                  | Reasoning + acting loop           | Explicit reasoning + tool use       |
| **Chain-of-Thought (CoT)** | Reasoning only                    | No interactions or external actions |
| **Toolformer**             | Self-supervised tool-use training | No explicit reasoning traces        |
| **Agentic LLMs**           | Autonomous workflows              | ReAct is often the backbone         |

## Example (Simplified)

```text
User: What's the distance between Paris and Berlin in miles?

Thought: I need to look up the distance in km first.
Action: search["distance Paris to Berlin km"]
Observation: It's about 1050 km.
Thought: Convert km to miles.
Action: calculate[1050 * 0.621371]
Observation: 652.42
Final Answer: The distance is approximately **652 miles**.
```

## Best Practices for Using ReAct

- **Limit tool access** to safe, controlled actions.
- **Constrain reasoning** to avoid revealing chain-of-thought to users.
- **Implement safety interceptors** to monitor actions.
- **Store observations** for consistency across agent steps.
- **Use guardrails** to avoid infinite loops or incorrect tool use.

## Conclusion

The **ReAct framework** is one of the most influential paradigms in modern AI agent development. By merging explicit reasoning with real-world actions, it transforms LLMs from static text generators into **interactive problem solvers** capable of sophisticated, verifiable multi-step tasks.
