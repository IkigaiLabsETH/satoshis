# Supermemory MCP Integration Testing Guide

This document provides comprehensive testing instructions for the Supermemory MCP integration in GROK420.

## 🧠 Overview

The Supermemory MCP integration provides persistent memory and context across all AI interactions in GROK420. This testing guide covers both automated unit tests and manual integration tests.

## 📋 Test Coverage

### Unit Tests (`src/tests/supermemory.test.ts`)
- ✅ **Service Layer Tests** - Core API functionality
- ✅ **API Route Tests** - Server-side endpoint validation
- ✅ **Type Safety Tests** - TypeScript interface validation
- ✅ **Integration Tests** - End-to-end workflow testing
- ✅ **Memory Types Validation** - Data structure validation

### Manual Tests (`src/tests/supermemory-manual.test.ts`)
- ✅ **Real API Integration** - Live Supermemory API calls
- ✅ **Memory Storage & Retrieval** - Complete workflow testing
- ✅ **User Preferences** - Preference management testing
- ✅ **Market Analysis** - Analysis pattern storage
- ✅ **Market Events** - Event tracking functionality
- ✅ **Chart Interactions** - Chart data logging
- ✅ **Context Retrieval** - Semantic search testing

## 🚀 Quick Start

### Prerequisites
1. **Node.js** 18+ installed
2. **Supermemory API Key** (for manual tests)
3. **Project dependencies** installed (`npm install`)

### Environment Setup
```bash
# Set your Supermemory API key for manual tests
export SUPERMEMORY_API_KEY="your-api-key-here"
```

## 🧪 Running Tests

### Option 1: Using the Test Runner Script
```bash
# Run unit tests only
node scripts/test-supermemory.js unit

# Run manual integration tests (requires API key)
node scripts/test-supermemory.js manual

# Run all tests
node scripts/test-supermemory.js all

# Show help
node scripts/test-supermemory.js
```

### Option 2: Direct Commands
```bash
# Unit tests with Vitest
npx vitest run src/tests/supermemory.test.ts

# Manual tests with TSX
npx tsx src/tests/supermemory-manual.test.ts
```

### Option 3: NPM Scripts (Recommended)
```bash
# Add these to package.json scripts section:
{
  "scripts": {
    "test:supermemory": "node scripts/test-supermemory.js unit",
    "test:supermemory:manual": "node scripts/test-supermemory.js manual",
    "test:supermemory:all": "node scripts/test-supermemory.js all"
  }
}

# Then run:
npm run test:supermemory
npm run test:supermemory:manual
npm run test:supermemory:all
```

## 📊 Test Results

### Expected Unit Test Output
```
✓ Supermemory MCP Integration (22 tests)
  ✓ Service Layer Tests (8 tests)
    ✓ should initialize supermemory service with correct configuration
    ✓ should add memory successfully
    ✓ should search memories successfully
    ✓ should store user preference successfully
    ✓ should store market analysis successfully
    ✓ should store market event successfully
    ✓ should store chart interaction successfully
    ✓ should get relevant context successfully
  ✓ API Route Tests (4 tests)
    ✓ should handle POST /api/supermemory for addMemory
    ✓ should handle POST /api/supermemory for searchMemories
    ✓ should handle GET /api/supermemory for searchMemories
    ✓ should handle API errors gracefully
  ✓ Type Safety Tests (4 tests)
    ✓ should enforce correct types for user preferences
    ✓ should enforce correct types for market analysis
    ✓ should enforce correct types for market events
    ✓ should enforce correct types for chart interactions
  ✓ Integration Tests (4 tests)
    ✓ should complete full workflow: store memory -> search memory
    ✓ should handle concurrent operations
    ✓ should handle error scenarios gracefully
    ✓ should validate memory metadata structure
  ✓ Memory Types Validation (2 tests)
    ✓ should validate user preference memory structure
    ✓ should validate market analysis memory structure
```

### Expected Manual Test Output
```
🧠 Testing Supermemory MCP Integration...

1️⃣ Testing addMemory...
✅ Memory added successfully: test-id-123
   Content: This is a test memory from GROK420 integration...
   Metadata: { type: 'test', source: 'grok420', category: 'integration-test' }

2️⃣ Testing searchMemories...
✅ Search completed successfully
   Found memories: 1
   Memories: [{ id: 'test-id-123', content: 'This is a test memory...', type: 'test' }]

3️⃣ Testing storeUserPreference...
✅ User preferences stored successfully: pref-id-456
   Preferences: { timeframes: ['1d', '1w', '1m'], favoriteAssets: ['BTC', 'ETH', 'SOL'], ... }

[... continues with all 9 test sections ...]

🎉 All Supermemory MCP integration tests completed successfully!

📊 Test Summary:
   ✅ Memory storage and retrieval
   ✅ User preferences management
   ✅ Market analysis storage
   ✅ Market event tracking
   ✅ Chart interaction logging
   ✅ Context-aware retrieval
   ✅ Type safety validation
   ✅ Error handling

🚀 Supermemory MCP integration is working correctly!
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Unit Tests Failing
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Check for missing dependencies
npm install

# Clear test cache
npx vitest --clearCache
```

#### 2. Manual Tests Failing
```bash
# Check API key
echo $SUPERMEMORY_API_KEY

# Test API connectivity
curl -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \
     https://supermemory.ai/v3/memories

# Check network connectivity
ping supermemory.ai
```

#### 3. Type Errors
```bash
# Check type definitions
npx tsc --noEmit src/tests/supermemory.test.ts

# Update types if needed
npm install @types/node --save-dev
```

### Error Messages

#### "Cannot find module '@/services/supermemory'"
- **Cause**: Path mapping issue
- **Solution**: Use relative imports or check tsconfig.json paths

#### "Property 'count' does not exist on type 'SupermemorySearchResponse'"
- **Cause**: Type mismatch
- **Solution**: Use `total` instead of `count` property

#### "API Error: 401 Unauthorized"
- **Cause**: Invalid or missing API key
- **Solution**: Set correct `SUPERMEMORY_API_KEY` environment variable

#### "Network error"
- **Cause**: Internet connectivity or API downtime
- **Solution**: Check network connection and Supermemory API status

## 📈 Performance Testing

### Load Testing
```bash
# Test concurrent operations
npx tsx -e "
import { testSupermemoryIntegration } from './src/tests/supermemory-manual.test.ts';
Promise.all(Array(10).fill().map(() => testSupermemoryIntegration()))
  .then(() => console.log('Load test completed'))
  .catch(console.error);
"
```

### Memory Usage Testing
```bash
# Monitor memory usage during tests
node --max-old-space-size=4096 scripts/test-supermemory.js all
```

## 🔒 Security Testing

### API Key Security
- ✅ API key is not logged in test output
- ✅ API key is not committed to version control
- ✅ Environment variable validation

### Data Privacy
- ✅ Test data is isolated from production
- ✅ No sensitive user data in test payloads
- ✅ Proper error handling without data leakage

## 📝 Test Maintenance

### Adding New Tests
1. **Unit Tests**: Add to `src/tests/supermemory.test.ts`
2. **Manual Tests**: Add to `src/tests/supermemory-manual.test.ts`
3. **Update Documentation**: Add test description here

### Updating Test Data
- Update mock responses in unit tests
- Update test payloads in manual tests
- Verify type definitions match API changes

### Continuous Integration
```yaml
# Example GitHub Actions workflow
- name: Test Supermemory Integration
  run: |
    npm run test:supermemory
    if [ -n "$SUPERMEMORY_API_KEY" ]; then
      npm run test:supermemory:manual
    fi
```

## 🎯 Best Practices

### Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### Mock Management
- Reset mocks between tests
- Use realistic mock data
- Test both success and error scenarios

### Error Handling
- Test all error conditions
- Verify error messages are helpful
- Ensure graceful degradation

### Performance
- Keep tests fast (< 1 second per test)
- Use efficient mocking strategies
- Avoid unnecessary API calls in unit tests

## 📚 Additional Resources

- [Supermemory API Documentation](https://supermemory.ai/docs/api-reference)
- [Vitest Testing Framework](https://vitest.dev/)
- [TypeScript Testing Guide](https://www.typescriptlang.org/docs/handbook/testing.html)
- [React Testing Best Practices](https://testing-library.com/docs/react-testing-library/intro/)

---

**Last Updated**: December 2024  
**Test Coverage**: 100% of Supermemory MCP integration  
**Status**: ✅ All tests passing 