# Removebg-bot
Discord bot to remove background from images 

## Features
- Supports **slash command** `/removebg` with image attachment
- Uses the [remove.bg API](https://www.remove.bg/api)
- Node.js + discord.js + Express server (for Replit uptime)
- Deployable to Replit or any Node.js environment
 

## How to Run the Bot Locally

### 1. Clone the repo
```bash
git clone https://github.com/mjinnyru/Removebg-bot.git
cd removebg-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create a .env file and add the following:
```bash
DISCORD_TOKEN=your_discord_bot_token
REMOVEBG_API_KEY=your_removebg_api_key
CLIENT_ID=your_discord_application_id
GUILD_ID=your_discord_server_id
```
### 4. Register Slash Commands

Run this to register the `/removebg` command to your server:
```bash
node deploy-commands.js
```

### 5. Start the bot
```bash
node index.js
```