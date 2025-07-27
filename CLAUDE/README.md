# Specialized AI Agents

This directory contains specialized AI agent definitions used by Claude Code to handle complex, domain-specific tasks. Each agent is an expert in their field and can work autonomously to deliver comprehensive solutions.

## How Agents Work

Agents are intelligent, autonomous specialists that:
- Analyze requirements and create execution plans
- Perform complex multi-step tasks independently
- Utilize all available tools and knowledge
- Coordinate with other agents when needed
- Deliver complete, production-ready solutions

## Available Agents

### 🎯 Project Orchestrator
**Purpose**: Coordinates complex projects requiring multiple domains  
**Use When**: Building new projects, features requiring frontend + backend + testing  
**Expertise**: Breaking down high-level requirements into actionable tasks, delegating to specialized agents in optimal sequence  

### 🏗️ Backend API Architect  
**Purpose**: Designs and implements backend APIs  
**Use When**: Need server infrastructure, REST/GraphQL APIs, database design  
**Expertise**: Framework selection, database schemas, authentication, security, performance optimization  

### 📱 SwiftUI Architect
**Purpose**: Builds modern iOS/macOS applications  
**Use When**: SwiftUI development, iOS 18/26 features, app refactoring  
**Expertise**: Component-driven architecture, @Observable patterns, modern iOS APIs, performance optimization  

### ⚡ Next.js Project Bootstrapper
**Purpose**: Creates production-ready web applications  
**Use When**: Starting new web projects, need modern React setup  
**Expertise**: Next.js App Router, TypeScript, Tailwind CSS, project structure, responsive design  

### 🧪 QA Test Engineer
**Purpose**: Ensures code quality through comprehensive testing  
**Use When**: Need test coverage, quality assurance, functionality verification  
**Expertise**: Test strategies, automated testing, coverage analysis, CI/CD integration  

### 🔒 Security Audit Specialist
**Purpose**: Identifies and prevents security vulnerabilities  
**Use When**: Security reviews, credential audits, compliance preparation  
**Expertise**: Credential leak detection, token security, authentication flows, OWASP standards  

### 🔧 Code Refactoring Architect
**Purpose**: Improves code structure and maintainability  
**Use When**: Code cleanup, architectural improvements, legacy modernization  
**Expertise**: Design patterns, separation of concerns, performance optimization, best practices  

## The Orchestrator's Role

The **Project Orchestrator** serves as the master conductor, analyzing complex requirements and coordinating multiple agents:

1. **Requirements Analysis**: Breaks down user requests into technical components
2. **Task Planning**: Creates comprehensive, prioritized task lists with dependencies  
3. **Agent Selection**: Matches tasks to the most appropriate specialist agents
4. **Execution Coordination**: Manages handoffs and integration between agents
5. **Progress Tracking**: Monitors completion and maintains project coherence

### Example Orchestration Flow
```
User: "Build an e-commerce app with React frontend and Node.js backend"

Orchestrator:
├── nextjs-project-bootstrapper → Create React frontend structure
├── backend-api-architect → Design and implement API endpoints  
├── security-audit-specialist → Review authentication security
└── qa-test-engineer → Implement comprehensive test suite
```

## Agent Coordination

Agents work together seamlessly:
- **Sequential**: Backend API created before frontend integration
- **Parallel**: Security audit while QA engineer writes tests
- **Handoffs**: Orchestrator ensures each agent has necessary context from previous work
- **Integration**: All agents contribute to a cohesive final solution

## Getting Started

Agents are invoked automatically when tasks match their expertise. You can also explicitly request an agent:

```
"Use the security-audit-specialist to review my OAuth implementation"
"Have the project-orchestrator plan my new social media app"
```

Each agent delivers production-ready solutions with documentation, tests, and deployment guidance appropriate for their domain.