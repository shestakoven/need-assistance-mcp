# need-assistance-mcp

An MCP server that allows AI assistants to ask for help by calling `codex exec`.

## Prerequisites

- [Codex CLI](https://github.com/openai/codex) installed and authenticated
  ```bash
  npm install -g @openai/codex
  ```

## Installation

```bash
npm install
npm run build
```

## Usage

### Local

Requires codex CLI installed on your system.

Add to your Claude Code MCP configuration:

```json
{
  "mcpServers": {
    "need-assistance": {
      "command": "node",
      "args": ["/path/to/need-assistance-mcp/dist/index.js"]
    }
  }
}
```

### Docker

Build the image:

```bash
docker build -t need-assistance-mcp .
```

Add to your Claude Code MCP configuration:

```json
{
  "mcpServers": {
    "need-assistance": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "OPENAI_API_KEY", "need-assistance-mcp"]
    }
  }
}
```

Note: Set `OPENAI_API_KEY` environment variable for codex authentication.

## Tool

### `need_assistance`

Use this tool when the AI needs help with a task, is stuck, or wants to consult another AI assistant.

**Parameters:**
- `message` (string): Your question or description of what you need help with

**Example:**
```
need_assistance({ message: "How do I implement a binary search tree in Python?" })
```

## License

MIT
