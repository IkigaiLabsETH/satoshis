

# 15 Rules of Vibe Coding

	1.	Start from a template: Begin your project by cloning a template from GitHub or another source to provide a solid foundation. (On cursor, Start from Repo, and paste this link to build a nextjs app that is prebuilt with AI features, database and authorization https://github.com/ansh/template-2)
	2.	Use agent mode: Utilize Cursor’s agent mode (not normal mode) to create, edit, and manage files through natural language commands.
	3.	Use Perplexity: Use perplexity to find new designs and api’s from the web. Say that you are creating a nextjs project, and that you want to create x feature, and to give you instructions AND code examples.
	4.	Create new chats in Composer: Open a new Composer chat for each distinct task. Keep agent chats short.
	5.	Run locally, test frequently: Use built-in servers to run your app locally and test often to catch issues early.
	6.	Iterate and refine: Embrace rapid iteration—don’t worry about perfect designs initially; improve them step by step.
	7.	Utilize voice-to-text: Use tools like Whispr Flow for faster input, and just vibe.
	8.	Clone and fork wisely: Use GitHub repos as starting templates to accelerate development, or to find inspiration, then customize them to fit your vision.
	9.	Copy errors and paste into Composer agent: When errors occur, copy error messages from your console and paste them into the Composer agent, and more times than not, it will be fixed. When dealing with errors, over explain the issue if it’s not fixed the first time.
	10.	Don’t forget you can restore previous Composer chats: Save your work frequently so you can revert to an earlier state if needed.
	11.	Secure your secrets: Always store API keys and sensitive data in environment files rather than hard-coding them.
	12.	Commit often: Push your progress to GitHub regularly to track changes and safeguard your work. Cursor can do this for you, just ask the agent.
	13.	Deploy early: Use platforms like Vercel to deploy your app early, to make sure there are no errors on deployment.
	14.	Keep a record of the prompts that work best; reuse them often: Document your most effective prompts to make future development and debugging easier.
	15.	Enjoy the process—just vibe: Embrace the creative journey of vibe coding, experiment, learn, and have fun along the way. Just vibe.

⸻

# Cursor Best Practices

This guide outlines best practices for effectively using Cursor to manage project complexity and maximize productivity.

## Initial Setup and Planning

1. **Start with a Clear Plan**
   - Before using Cursor, ask Claude to create a detailed plan in markdown
   - Request clarifying questions and plan critique
   - Add the plan to `instructions.md` for future reference

2. **Use ChatGPT for Additional Planning**
   - Tell ChatGPT what you want to create
   - Ask it to provide instructions for another AI to do the coding
   - Paste everything into the Cursor composer agent
   - This extra planning layer helps reduce potential issues

## Development Workflow

1. **Use Cursor Rules**
   - Cursor rules are always available in AI context
   - Reference them at https://cursor.directory/
   - Example: Write tests first, then code, then run tests and update until passing

2. **Implement Code Incrementally**
   - Define small task/feature increments
   - Write (or have AI write) failing test cases
   - Instruct AI to write code to make tests pass
   - Run tests
   - If tests fail, AI analyzes and fixes code
   - Developer reviews changes after tests pass

3. **Version Control Best Practices**
   - Use git frequently
   - Avoid accumulating too many uncommitted changes
   - Use `.cursorignore` to exclude irrelevant files

## Context Management

1. **Keep Context Focused**
   - Keep context short by explicitly adding files with @
   - Longer context can reduce AI effectiveness
   - Start new chats when context gets too long
   - Resync/index code frequently

2. **Reference Management**
   - Use /Reference to quickly add editors to context
   - Notepads are frequently used for prompts
   - Use gitingest.com to get all relevant files in one page

## Documentation and Resources

1. **External Resources**
   - Use https://context7.com/ for MCP documentation reference
   - Reference https://cursor.directory/ for cursor rules

## Testing

1. **Testing Approach**
   - Optional: Enable YOLO mode for test writing
   - All test types are supported (vitest, npm test, nr test, etc.)
   - Basic build commands are always allowed
   - File operations (touch, mkdir, etc.) are permitted

## AI Interaction Guidelines

1. **System Prompt Rules**
   - Keep answers concise and direct
   - Suggest alternative solutions
   - Avoid unnecessary explanations
   - Prioritize technical details over generic advice

2. **Problem Resolution**
   - When encountering issues, ask Cursor to write a report
   - List all relevant files and their purposes
   - Document problems encountered
   - Consult Claude/ChatGPT for problem-solving

## Troubleshooting
If Cursor encounters issues:
1. Start fresh with a clear plan
2. Ask ChatGPT to write clear instructions
3. Follow the Edit-Test loop pattern
4. Maintain smaller, focused contexts 