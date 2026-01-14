# need-assistance-mcp

An MCP server that allows AI assistants to ask for help by calling `codex exec`.

## Installation

```bash
npm install
npm run build
```

## Usage

### Local

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
      "args": ["run", "-i", "--rm", "need-assistance-mcp"]
    }
  }
}
```

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
