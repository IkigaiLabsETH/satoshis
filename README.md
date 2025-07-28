<div align="center">
  <img src="logo_fur.png" alt="GROK420 Logo" width="120" />

  # GROK420: AI-Powered Market Intelligence

  <p>
    <img src="https://img.shields.io/badge/BTC%20Outperformance-Focused-orange?style=for-the-badge&logo=bitcoin" alt="BTC Outperformance" />
    <img src="https://img.shields.io/badge/Real--Time%20X%20Sentiment-Enabled-blueviolet?style=for-the-badge&logo=twitter" alt="Real-Time X Sentiment" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Finnhub%20Integration-Live%20Data-green?style=for-the-badge&logo=chart" alt="Finnhub Integration" />
    <img src="https://img.shields.io/badge/AI%20Market%20Dashboard-Grok%204%20Powered-red?style=for-the-badge&logo=robot" alt="AI Market Dashboard" />
  </p>
</div>

---

🚀 **Outperform Bitcoin. Every Day.**

> GROK420 is built to help you find assets that beat BTC—automatically.

---

## Core Purpose

**GROK420 and the entire LiveTheLifeTV platform are built around a single mission:**
> **Help you find assets that outperform Bitcoin (BTC).**

Every feature—real-time X (Twitter) sentiment, curated market reports, and daily "gm" briefings—is designed to surface and highlight altcoins, stocks, and narratives that are beating BTC. The system automatically checks and displays which tracked assets are outperforming Bitcoin over multiple timeframes (24h, 7d, YTD, etc.), making BTC outperformance the centerpiece of your daily crypto intelligence and the guiding principle of the site.

**Key Features:**
- 🏆 **BTC Outperformance Detection:** Instantly see which assets are beating Bitcoin, every day.
- 📰 **Narrative-Driven Analysis:** X sentiment and news always highlight the "why" behind outperformance.
- ⏱️ **Flexible Timeframes:** Request 24h, 7d, YTD, or all periods—only fetches extra data if you ask.
- 📈 **Comprehensive Market Coverage:** Real-time prices, altcoins, crypto stocks, macro context, and more.
- 🤖 **Modern AI & Tooling:** Built with Next.js, TypeScript, and Grok 4's real-time X data integration.
- 🔍 **AI-Powered Stock Intelligence:** Automatic detection and live Finnhub data for 50+ prioritized stocks.
- 💰 **Live Financial Data:** Insider sentiment, transactions, earnings, news, and company profiles.
- 🎯 **Smart Query Detection:** Recognizes stock symbols, company names, and common aliases automatically.

**Bottom line:**  
If your goal is to beat Bitcoin, GROK420 and LiveTheLifeTV are your daily edge.

---

## 🧠 Satoshi AI Multi-Persona & Brand DNA Enforcement

**Satoshi AI now features advanced multi-persona routing, brand DNA enforcement, and structured output for every response:**

- **Multi-Persona Intelligence:** Satoshi AI can auto-detect or manually select from 15+ expert personas (Validator, Analyst, Educator, Market Researcher, Content Creator, Viral Creator, Strategic Advisor, and more) to deliver the most relevant expertise for your query.
- **Brand DNA & Writing Style:** Every response—regardless of persona—adheres to the livethelifetv and Satoshi Personality Boost writing style: Bitcoin-first, technical, contrarian, and authentic Satoshi voice. See [SATOSHI_PERSONALITY_BOOST.md](docs/SATOSHI_PERSONALITY_BOOST.md) for details.
- **Structured, Actionable Output:** Market and analyst queries return structured data (tables, lists, headlines) for easy comparison and actionable insights.
- **Anti-Hallucination Protocols:** All personas inherit strict fact-checking, live data verification, and explicit disclaimers for any uncertainty.
- **Manual or Auto Mode:** Users can select a specific persona or let the system auto-route to the best expert for their question.

**Bottom line:**
Satoshi AI always delivers actionable, fact-checked, and on-brand intelligence—no matter which persona is used.

---

## 🚫 AI Hallucination Prevention (NEW July 2024)

GROK420 and Satoshi AI now guarantee that both Grok 4 and Satoshi will never hallucinate facts or numbers:
- **System Prompt:** Both AI systems are explicitly instructed to never make up facts, always use live data, and verify all claims. If data is unavailable, they must state so and never speculate without disclaimers.
- **Fact Verification Tool:** Any claim about prices, dates, or events is checked using live APIs (CoinGecko, Yahoo Finance) and enhanced web search. The system returns a confidence level and explicit recommendations for every claim.
- **No More Hallucinations:** If either AI cannot verify a claim, it will say so, cite sources, or recommend independent verification. Users are now protected from hallucinated facts by design.
- **Multi-Modal Protection:** Satoshi AI's 13 personas all inherit the same anti-hallucination protocols, ensuring consistent truthfulness across all interaction modes.

### Key Features (add to list above):
- 🚫 **No Hallucinations:** All responses are fact-checked and source-backed, or clearly disclaim uncertainty.
- 🤖 **Dual AI Protection:** Both Grok 4 and Satoshi AI systems have identical anti-hallucination safeguards.

## 🧠 Supermemory MCP Integration (NEW)

**Universal Memory Layer for Persistent AI Context**

GROK420 now integrates with [Supermemory MCP](https://supermemory.ai/docs/supermemory-mcp/introduction) to provide persistent memory and context across all AI interactions, solving the fundamental limitation of AI assistants forgetting everything between conversations.

### **Implementation Status: COMPLETE** ✅

**What We Built:**

1. **Core Service Layer** (`src/services/supermemory.ts`)
   - Complete TypeScript service for Supermemory API integration
   - Methods for storing and retrieving all types of memories
   - Error handling and type safety throughout

2. **React Integration** (`src/components/grok420/SupermemoryIntegration.tsx`)
   - Context provider for app-wide memory access
   - Custom hooks for different memory types (charts, analysis, preferences)
   - Real-time loading states and error notifications

3. **API Route** (`src/app/api/supermemory/route.ts`)
   - Secure server-side API for Supermemory operations
   - POST and GET endpoints for all memory operations
   - Proper error handling and response formatting

4. **Memory Panel UI** (`src/components/grok420/MemoryPanel.tsx`)
   - Interactive panel to view and search stored memories
   - Tabbed interface for different memory types
   - Real-time search and filtering capabilities

5. **Type Definitions** (`src/types/supermemory.ts`)
   - Complete TypeScript interfaces for all memory types
   - Type-safe API responses and request payloads
   - Proper metadata structure for categorization

**Integration Points:**

- **User Interactions**: Every chat message stores user preferences and query patterns
- **Market Analysis**: AI responses containing market analysis are automatically stored
- **Chart Interactions**: Chart views and analysis patterns are captured
- **Context Retrieval**: Before generating responses, relevant historical context is retrieved
- **Memory Visualization**: Users can view and search their stored memories through the UI

**Key Features Implemented:**

- ✅ **Persistent User Context**: Remembers preferences, timeframes, and favorite assets
- ✅ **Market Analysis Memory**: Stores successful analysis patterns and predictions
- ✅ **Chart Interaction Tracking**: Captures user chart preferences and analysis styles
- ✅ **Context-Aware Responses**: AI uses historical context to improve responses
- ✅ **Memory Search & Visualization**: Users can browse and search their memory bank
- ✅ **Real-time Sync**: All interactions are immediately stored and retrievable
- ✅ **Type Safety**: Full TypeScript coverage for all memory operations
- ✅ **Error Handling**: Graceful fallbacks when Supermemory is unavailable

### **Why Supermemory MCP Matters**

**The Problem:** Traditional AI systems lose all context between sessions, forcing users to repeatedly explain their preferences, project details, and previous decisions. This creates friction and reduces the effectiveness of AI assistance.

**The Solution:** Supermemory MCP acts as a universal memory layer that bridges isolated AI applications through the Model Context Protocol (MCP), enabling seamless memory persistence across any MCP-compatible LLM client.

### **Key Benefits**

- **🔗 Universal Compatibility:** Works across ChatGPT, Claude, Windsurf, Cursor, VS Code, and any MCP-compatible application
- **🔐 No Login Required:** Access via unique, private URLs that serve as both identifier and API key
- **💰 Completely Free:** Fully functional hosted service available at no cost
- **⚡ One-Command Setup:** Simple CLI installation: `npx install-mcp [URL] --client [CLIENT]`
- **🛡️ Privacy-First:** Complete user data separation through unique URL paths

### **How It Works**

**Architecture Components:**
- **Backend API:** Built on top of the Supermemory API infrastructure
- **Transport Layer:** Uses Server-Sent Events (SSE) for real-time communication
- **Dynamic Server Generation:** Creates unique MCP server instances for each user via URL path parameters
- **Session Management:** Maintains complete user isolation through unique URLs
- **Infrastructure:** Hosted on Cloudflare using Durable Objects for persistent, long-running connections

**Core Workflow:**
1. User interacts with any MCP-compatible AI client (Cursor, Claude, etc.)
2. Client connects to Supermemory MCP server via unique, private URL
3. During conversations, relevant information is stored using the `addToSupermemory` action
4. When context is needed, the `searchSupermemory` action retrieves relevant memories
5. AI assistant accesses persistent context regardless of which platform is being used

### **Two Main Components**

**addToSupermemory Action:**
- **Stores:** User information, preferences, behavioral patterns, technical details, project context
- **Trigger Methods:** Explicit commands ("remember this") or implicit detection of significant patterns
- **Data Types:** Technical preferences, project information, user behaviors, personal facts, rich context

**searchSupermemory Action:**
- **Retrieves:** Relevant information from stored memories using advanced search capabilities
- **Activation Triggers:** Explicit requests, contextual situations, automatic context enhancement
- **Search Capabilities:** Semantic matching, pattern recognition, cross-session retrieval, intelligent filtering

### **Setup & Configuration**

**Hosted Setup (Recommended):**
1. Visit [https://mcp.supermemory.ai](https://mcp.supermemory.ai)
2. Receive automatically generated unique URL
3. Select your MCP client from the dropdown menu
4. Copy the generated installation command
5. Run: `npx install-mcp [YOUR_URL] --client [CLIENT_NAME]`

**Client Configuration Example:**
```json
{
  "mcpServers": {
    "supermemory": {
      "transport": "sse",
      "url": "https://mcp.supermemory.ai/[USER_ID]/sse"
    }
  }
}
```

### **Security & Privacy**

- **URL-based Authentication:** Random URLs serve as access keys, eliminating traditional login complexity
- **Session Isolation:** Complete user data separation through unique URL paths
- **Self-hosting Option:** Full control over data and infrastructure for privacy-conscious users
- **Secure Infrastructure:** Built on Cloudflare's enterprise-grade security platform

### **Integration Benefits for GROK420**

- **Persistent Trading Context:** AI remembers your trading preferences, risk tolerance, and portfolio goals
- **Cross-Platform Continuity:** Start a conversation in Cursor, continue in Claude, maintain full context
- **Learning from Interactions:** System learns from your market analysis patterns and preferences
- **Enhanced Personalization:** Tailored responses based on your historical interactions and decisions
- **Project Memory:** Remembers your current projects, research interests, and technical setup
- **Memory Visualization:** Interactive panel to browse and search your stored memories
- **Real-time Context Enhancement:** Every AI response is enhanced with relevant historical context
- **Pattern Recognition:** System identifies successful analysis patterns and trading strategies

**Bottom Line:** Supermemory MCP transforms GROK420 from a session-based tool into a persistent, learning AI companion that grows more effective with every interaction. The implementation provides a complete memory layer that enhances user experience while maintaining the sophisticated market analysis capabilities.

## 🎯 AI-Powered Market Dashboard (NEW)

**Real-Time Market Analysis & Grok 4 AI Predictions**

GROK420 now features a comprehensive AI-powered market dashboard that provides real-time market state analysis and Grok 4 AI-generated predictions for multiple timeframes:

### **📊 Current Market State Analysis**
- **Total Market Cap & Volume:** Real-time global cryptocurrency market metrics
- **Fear & Greed Index:** Market sentiment indicator with color-coded analysis
- **Market Dominance:** Bitcoin, Ethereum, and altcoin percentage breakdown
- **Market Trend:** Visual trend indicators (📈📉➡️) with real-time analysis
- **Volatility Metrics:** Current market volatility assessment
- **🚨 CoinGlass Bull Market Peak Signals:** Industry-standard peak signal monitoring with risk assessment, hit indicators tracking, distance to peak analysis, and sell signal integration

### **🤖 Grok 4 AI Predictions**
- **Multi-Timeframe Analysis:** Day, Week, Month, and Year predictions
- **Bitcoin Price Targets:** AI-generated price predictions with confidence levels
- **Top Performers:** AI-identified assets with highest outperformance potential
- **Market Sentiment:** Bullish/Bearish/Neutral analysis with detailed reasoning
- **Key Events:** Upcoming market-moving events to watch, including CoinGlass peak signal monitoring
- **Risk Factors:** Comprehensive risk assessment and warnings, including bull market peak indicators

### **📈 Live Market Data Integration**
- **Real-Time Prices:** Current cryptocurrency prices from CoinGecko API
- **24h Performance:** Live price changes and market cap data
- **Volume Analysis:** Trading volume and market activity metrics
- **Asset Icons:** Visual coin identification with optimized images

### **🔧 Technical Implementation**

**API Endpoints:**
- **`/api/watchlist/predictions`** - Grok 4 AI-generated market predictions with CoinGlass peak signal integration
- **`/api/watchlist/market-state`** - Real-time market state, sentiment, and CoinGlass bull market peak signals
- **`/api/watchlist/crypto`** - Live cryptocurrency data from CoinGecko
- **`/api/watchlist/stocks`** - Crypto-related stock data from Finnhub

**Key Features:**
- **Dynamic Predictions:** Based on current market prices with realistic percentage ranges
- **Real-Time Updates:** Live data integration with graceful fallbacks
- **Responsive Design:** Optimized for all screen sizes and devices
- **Error Handling:** Robust error management with mock data fallbacks
- **Type Safety:** Full TypeScript coverage for all data structures
- **🚨 CoinGlass Peak Signal Integration:** Industry-standard bull market peak monitoring with risk assessment and exit timing optimization

**Prediction Accuracy:**
- **Daily:** ±3% range based on current market conditions
- **Weekly:** ±6% range with institutional flow analysis
- **Monthly:** ±12.5% range incorporating macro factors
- **Yearly:** ±40% range for long-term trend analysis

### **🎨 User Experience**
- **Premium Design:** Matches the Italy page styling with black background and yellow accents
- **Interactive Timeframes:** Easy switching between prediction periods
- **Visual Indicators:** Color-coded confidence levels and sentiment analysis
- **Loading States:** Professional loading animations with AI-themed messaging
- **Risk Disclaimers:** Comprehensive risk warnings and investment disclaimers

### **📱 Dashboard Sections**

1. **Market State Overview**
   - Total market cap and 24h volume
   - Fear & greed index with sentiment analysis
   - Market dominance breakdown
   - Current trend indicators
   - 🚨 CoinGlass Bull Market Peak Signals with risk assessment

2. **AI Predictions Panel**
   - Bitcoin price predictions for each timeframe
   - Top performing asset predictions
   - Market sentiment analysis
   - Key events and risk factors
   - CoinGlass peak signal monitoring and exit timing warnings

3. **Live Market Data**
   - Real-time cryptocurrency prices
   - 24h performance metrics
   - Market cap and volume data
   - Asset identification with icons

4. **Risk Management**
   - Comprehensive risk disclosures
   - Investment disclaimers
   - AI prediction limitations
   - Professional advice recommendations
   - Bull market peak signal risk assessment and exit timing optimization

### **🚀 Performance & Reliability**
- **Real-Time Data:** Live integration with CoinGecko and Finnhub APIs
- **Fallback Systems:** Mock data when APIs are unavailable
- **Optimized Loading:** Efficient data fetching and caching
- **Error Recovery:** Graceful handling of API failures
- **Mobile Optimization:** Responsive design for all devices

**Example Usage:**
```
Visit: /watchlist
Features:
- Real-time market state analysis with CoinGlass peak signals
- AI-generated predictions for multiple timeframes
- Live cryptocurrency data
- Risk assessment and market sentiment
- Professional-grade market intelligence with exit timing optimization
```

**Bottom Line:** The AI Market Dashboard transforms GROK420 into a comprehensive market intelligence platform, providing users with real-time analysis, AI-powered predictions, professional-grade market data, and industry-standard CoinGlass bull market peak signals—all designed to help identify assets that outperform Bitcoin and optimize exit timing.

## 🆕 AI-Powered Stock Intelligence System

**NEW: Automatic Stock Detection & Live Data Integration**

GROK420 now features an intelligent stock detection system that automatically identifies when you're asking about tracked stocks and provides comprehensive live financial data:

### **🔍 Smart Stock Detection**
- **Automatic Recognition:** Detects 50+ prioritized stocks from your queries
- **Alias Support:** Recognizes "Tesla" → TSLA, "MicroStrategy" → MSTR, "Coinbase" → COIN
- **Natural Language:** Works with casual queries like "What's up with TSLA?" or "Tell me about MicroStrategy"

### **📊 Live Finnhub Data Integration**
- **Insider Sentiment:** Executive buying/selling patterns and MSPR analysis
- **Insider Transactions:** Detailed executive trading activity and net flows
- **Company Earnings:** Quarterly performance, beats/misses, and trends
- **Recent News:** Latest announcements, press releases, and market-moving events
- **Company Profiles:** Fundamentals, financial metrics, and business information

### **🎯 Prioritized Stock Universe**
**Crypto & Tech:** MSTR, COIN, HOOD, NVDA, TSLA, AAPL, MSFT, GOOGL, AMZN, META, CRCL, BLOCK, PYPL
**Bitcoin Mining:** IREN, CORZ, CIFR, RIOT, CLSK, WULF, HUT, MARA, GLXY
**High-Growth:** QBTS, CRSP, RGTI, QUBT, KTOS, DRS, IONQ
**Innovation:** IBM, PLTR, VRTX, REGN, MRNA, LMT, RTX, NOC, GD, BA, TSM
**Nuclear Energy:** CCJ, CEG, ETR, UEC

### **⚡ How It Works**
1. **Query Analysis:** System scans your message for stock mentions
2. **Live Data Fetch:** Parallel API calls to Finnhub for all relevant metrics
3. **Smart Formatting:** Clear sections with emojis, explanations, and insights
4. **Graceful Fallbacks:** Shows available data even if some endpoints fail

**Example Query:** "What's the latest on TSLA?"
**Response:** Live insider sentiment, recent transactions, earnings analysis, news summary, and company profile

---

# LiveTheLifeTV ⚡

> **Living the Bitcoin-first lifestyle with complete sovereignty**

A Bitcoin-native LLC demonstrating how to build a sustainable, sovereign lifestyle business using Bitcoin as the core treasury asset and Strike for operational liquidity.

## 🧬 Brand DNA

We're not building another startup—we're living proof that you can build a sustainable lifestyle business on Bitcoin. Our brand is built on these core principles:

### 🎯 Bitcoin-First Treasury
- Bitcoin as the core treasury asset
- Strike for operational liquidity
- No equity dilution, no VC oversight
- Long-term value preservation

### 💫 Lifestyle Sovereignty
- "Live The Life" - our holistic approach to freedom
- Real estate as physical manifestation of our values
- Building a community of sovereign individuals
- Cultural curation through property development

### 🎨 Cultural Excellence
- Premium design in every aspect
- Focus on architectural excellence
- Building identity through physical spaces
- Documenting the Bitcoin lifestyle

### 🌱 Educational Empowerment
- Real-world Bitcoin implementation
- Tools for sovereign living
- Knowledge sharing through experience
- Community growth through example

## 📋 Table of Contents
- [Vision & Philosophy](#vision--philosophy)
- [Core Features](#-core-features)
- [AI-Powered Market Dashboard](#-ai-powered-market-dashboard-new)
- [AI-Powered Stock Intelligence](#-ai-powered-stock-intelligence-system)
- [Technical Architecture](#-technical-architecture)
- [Getting Started](#-getting-started)
- [Development Guide](#-development-guide)
- [Performance & Optimization](#-performance--optimization)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Vision & Philosophy

Our platform represents a comprehensive ecosystem for Bitcoin-native living, built on three core principles:

1. **Bitcoin Treasury Management**
   - Strike Business integration for liquidity
   - Bitcoin-backed loans for operations
   - Enterprise-grade custody solutions
   - Automated financial processes

2. **Real Estate Development**
   - Smart home technology integration
   - Architectural excellence
   - Cultural space curation
   - Property as lifestyle manifestation

3. **Content & Documentation**
   - Lifestyle documentation
   - Educational content
   - Cultural preservation
   - Community building

## ⚡ Core Features

### 1. Bitcoin Treasury Engine
- **Strike Integration:** Seamless Bitcoin-backed loans
- **Liquidity Management:** Access cash without selling BTC
- **Enterprise Security:** Professional-grade custody
- **Automated Operations:** Streamlined financial processes

### 2. Smart Home Development
- **Property Acquisition:** Strategic real estate investment
- **Smart Integration:** State-of-the-art home automation
- **Architectural Design:** Premium living spaces
- **Cultural Spaces:** Community hubs and event venues

### 3. Content Production
- **Lifestyle Documentation:** Real-world Bitcoin implementation
- **Educational Content:** Practical Bitcoin knowledge
- **Cultural Curation:** Event production and hosting
- **Community Building:** Sovereign individual network

### 4. Operational Tools
- **LLC Management:** Otonomos integration
- **Equity Automation:** Fairmint implementation
- **Financial Planning:** Bitcoin-first strategies
- **Asset Protection:** Long-term value preservation

### 5. AI-Powered Market Intelligence
- **GROK420 Integration:** Real-time X sentiment analysis
- **Stock Intelligence:** Automatic detection and live Finnhub data
- **BTC Outperformance Tracking:** Daily monitoring of assets beating Bitcoin
- **Narrative Analysis:** Social sentiment and market-moving stories
- **AI Market Dashboard:** Grok 4-powered market predictions and real-time analysis

### 5. Strike Business Integration
- **BTC-Backed Liquidity Layer**
  - Secure multi-sig custody (Casa, Unchained)
  - USD borrowing against BTC (9.5-13% APR)
  - No origination or prepayment fees
  - Automated liquidity management

- **Fiat On/Off-Ramping**
  - BTC/USD conversion for partners and guests
  - Instant settlement across both rails
  - Automated invoice processing
  - Real-world payment integration

- **Treasury Automation**
  - REST API integration for BTC/USD conversion
  - Automated loan requests for property development
  - Transaction data synchronization
  - Dashboard and HQ system integration

- **Lightning Network Integration**
  - Micro-payments for events and installations
  - Guest contribution processing
  - Real-time booking systems
  - Future /smarthome OS integration

## 🏗️ Technical Architecture

### Frontend Architecture
```
src/
├── app/                # Next.js 14 app directory
│   ├── 1on1/          # One-on-one sessions
│   ├── 21/            # 21-related content
│   ├── 8020/          # 80/20 principle content
│   ├── about/         # About pages
│   ├── abra/          # Abra integration
│   ├── aave/          # Aave protocol integration
│   ├── ai/            # AI-related features
│   ├── altbg/         # Alternative background
│   ├── altcoins/      # Altcoin information
│   ├── api/           # API routes
│   │   └── grok4/     # GROK420 AI intelligence system
│   ├── art/           # Art-related content
│   ├── bera/          # Bera protocol
│   ├── bio/           # Biography pages
│   ├── biohacking/    # Biohacking content
│   ├── biarritz/      # Biarritz location
│   ├── bitaxe/        # Bitaxe integration
│   ├── bitbonds/      # Bitbonds platform
│   ├── btcab/         # Bitcoin ATM
│   ├── calculator/    # Calculator tools
│   ├── cirrus/        # Cirrus features
│   ├── club/          # Club features
│   ├── collections/   # NFT collections
│   ├── crypto/        # Crypto features
│   ├── cursor/        # Cursor integration
│   ├── data/          # Data visualization
│   ├── defi/          # DeFi features
│   ├── dgx/           # DGX integration
│   ├── docu/          # Documentation
│   ├── doge/          # Dogecoin features
│   ├── dubai/         # Dubai location
│   ├── ecoflow/       # Ecoflow integration
│   ├── eth/           # Ethereum features
│   ├── etherfi/       # EtherFi integration
│   ├── fairmint/      # Fairmint integration
│   ├── fire/          # Fire features
│   ├── france/        # France location
│   ├── gallery/       # Gallery features
│   ├── gdculture/     # GD Culture
│   ├── grind/         # Grind features
│   ├── holyheld/      # Holyheld integration
│   ├── hx50/          # HX50 features
│   ├── hype/          # Hype features
│   ├── hume/          # Hume integration
│   ├── italy/         # Italy location
│   ├── ledger/        # Ledger integration
│   ├── legal/         # Legal documentation
│   ├── liquidity/     # Liquidity features
│   ├── ln/            # Lightning Network
│   ├── ltl/           # LTL features
│   ├── maldives/      # Maldives location
│   ├── mara/          # Mara features
│   ├── maxpain/       # Maxpain features
│   ├── metaplanet/    # Metaplanet features
│   ├── mint/          # Mint features
│   ├── monaco/        # Monaco location
│   ├── nakamoto/      # Nakamoto features
│   ├── naval/         # Naval features
│   ├── news/          # News features
│   ├── node/          # Node features
│   ├── notebook/      # Notebook features
│   ├── olympus/       # Olympus features
│   ├── otonomos/      # Otonomos integration
│   ├── pfp/           # Profile picture features
│   ├── platforms/     # Platform features
│   ├── portugal/      # Portugal location
│   ├── realestate/    # Real estate features
│   ├── rlt/           # RLT features
│   ├── s9pro/         # S9 Pro features
│   ├── sharplink/     # Sharplink features
│   ├── smarthome/     # Smart home features
│   ├── sol/           # Solana features
│   ├── sonar/         # Sonar features
│   ├── spain/         # Spain location
│   ├── sparrow/       # Sparrow features
│   ├── stacks/        # Stacks features
│   ├── strf/          # STRF features
│   ├── strike/        # Strike integration
│   ├── sui/           # Sui features
│   ├── swiss/         # Swiss location
│   ├── tbs/           # TBS features
│   ├── tax/           # Tax features
│   ├── tesla/         # Tesla features
│   ├── test-nfts/     # NFT testing
│   ├── time/          # Time features
│   ├── treasury/      # Bitcoin treasury management
│   ├── twentyone/     # Twenty-one features
│   ├── vibecode/      # Vibecode features
│   ├── voice/         # Voice features
│   ├── visuals/       # Visual features
│   ├── weather/       # Weather features
│   ├── whitepaper/    # Whitepaper content
│   ├── wine/          # Wine features
│   ├── zero/          # Zero features
│   └── ...            # Additional feature routes
├── components/        # Modular React components
│   ├── strike/        # Strike integration
│   ├── smarthome/     # Smart home features
│   ├── stocks/         # Stock intelligence components
│   └── ...
├── services/          # API/service integrations
│   ├── strike/        # Strike Business API
│   ├── otonomos/      # LLC management
│   ├── fairmint/      # Equity automation
│   ├── finnhub/        # Financial data API
│   └── ...
├── utils/             # Helper functions
└── types/             # TypeScript types
```

### Tech Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, React, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, Redis, Prisma
- **Infrastructure:** AWS (ECS, RDS, ElastiCache)
- **APIs:** Strike Business, Otonomos, Fairmint
- **AI & Data:** Grok 4, Finnhub API, X (Twitter) sentiment analysis
- **Monitoring:** Sentry, Winston, Prometheus

### Key Architectural Decisions
1. **Component-Based Architecture**
   - Atomic design principles for consistent UI
   - Reusable components with TypeScript interfaces
   - Styled-components for CSS-in-JS implementation

2. **Performance Optimization**
   - Server-side rendering for critical pages
   - Code splitting and lazy loading
   - Image optimization and CDN integration

3. **Security Implementation**
   - JWT-based authentication
   - Rate limiting and DDoS protection
   - Secure API integrations

4. **AI-Powered Intelligence**
    - Real-time stock detection and data fetching
    - Parallel API calls for optimal performance
    - Graceful error handling and fallbacks
    - Natural language query processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- Yarn package manager
- Redis server
- PostgreSQL database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/livethelifetv.git
   cd livethelifetv
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```
   Configure the following environment variables:
   ```
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/livethelifetv
   
   # Redis
   REDIS_URL=redis://localhost:6379
   
   # External APIs
   STRIKE_API_KEY=your_strike_key
   OTONOMOS_API_KEY=your_otonomos_key
   FAIRMINT_API_KEY=your_fairmint_key
   XAI_API_KEY=your_xai_key
   FINNHUB_API_KEY=your_finnhub_key
   ```

4. **Database Setup:**
   ```bash
   yarn prisma migrate dev
   ```

5. **Start Development Server:**
   ```bash
   yarn dev
   ```

## 💻 Development Guide

### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write unit tests for critical components
- Document complex functions with JSDoc

### Git Workflow
1. Create feature branch from `main`
2. Make changes and commit with conventional commits
3. Create pull request with detailed description
4. Pass CI/CD checks and code review
5. Merge to `main`

### Testing
```bash
# Run unit tests
yarn test

# Run e2e tests
yarn test:e2e

# Run type checking
yarn type-check
```

### AI System Testing
```bash
# Test stock detection
curl -X POST http://localhost:3000/api/grok4 \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the latest on TSLA?"}'

# Test Finnhub integration
curl -X POST http://localhost:3000/api/grok4 \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me insider sentiment for MicroStrategy"}'
```

## ⚡ Performance & Optimization

### Lighthouse Targets
- Performance Score: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >95

### Core Web Vitals
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

### Optimization Strategies
- Image optimization and lazy loading
- Code splitting and tree shaking
- CDN integration
- Caching strategies
- Service worker implementation

### AI System Performance
- Stock detection: < 50ms
- Finnhub API calls: < 3s per endpoint
- Response formatting: < 100ms
- Graceful fallbacks for API failures

## 🔒 Security

### Implementation Details
- Content Security Policy (CSP)
- CORS configuration
- Rate limiting
- Input sanitization
- CSRF protection
- Secure headers

### AI System Security
- API key encryption and secure storage
- Rate limiting for external APIs
- Input validation and sanitization
- Error handling without data leakage

## 🤝 Contributing

We welcome contributions from builders who share our vision of a more sovereign, innovative, and culturally rich future. Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ⚡ by the LiveTheLifeTV Team
# Trigger Vercel redeploy
