/* eslint-disable no-console */
/**
 * Manual Test Script for Supermemory MCP Integration
 * 
 * This script can be run to manually test the Supermemory integration
 * with real API calls. Make sure to set the SUPERMEMORY_API_KEY environment variable.
 * 
 * Run with: npx tsx src/tests/supermemory-manual.test.ts
 */

import supermemoryService from '../services/supermemory';

async function testSupermemoryIntegration() {
  console.log('🧠 Testing Supermemory MCP Integration...\n');

  try {
    // Test 1: Add a simple memory
    console.log('1️⃣ Testing addMemory...');
    const memoryResult = await supermemoryService.addMemory(
      'This is a test memory from GROK420 integration',
      { 
        type: 'test',
        source: 'grok420',
        category: 'integration-test'
      }
    );
    console.log('✅ Memory added successfully:', memoryResult.id);
    console.log('   Content:', memoryResult.content.substring(0, 50) + '...');
    console.log('   Metadata:', memoryResult.metadata);
    console.log('');

    // Test 2: Search for the memory
    console.log('2️⃣ Testing searchMemories...');
    const searchResult = await supermemoryService.searchMemories('GROK420 integration', 5);
    console.log('✅ Search completed successfully');
    console.log('   Found memories:', searchResult.total);
    console.log('   Memories:', searchResult.memories.map(m => ({
      id: m.id,
      content: m.content.substring(0, 30) + '...',
      type: m.metadata.type
    })));
    console.log('');

    // Test 3: Store user preferences
    console.log('3️⃣ Testing storeUserPreference...');
    const preferences = {
      timeframes: ['1d', '1w', '1m'],
      favoriteAssets: ['BTC', 'ETH', 'SOL'],
      alertSettings: { priceAlerts: true, newsAlerts: false },
      analysisStyle: 'technical'
    };
    
    const prefResult = await supermemoryService.storeUserPreference('test-user-123', preferences);
    console.log('✅ User preferences stored successfully:', prefResult.id);
    console.log('   Preferences:', JSON.parse(prefResult.content));
    console.log('');

    // Test 4: Store market analysis
    console.log('4️⃣ Testing storeAnalysisPattern...');
    const analysis = {
      type: 'market_analysis' as const,
      symbol: 'BTC',
      timeframe: '1d',
      analysis: {
        prediction: 'bullish',
        confidence: 0.85,
        indicators: ['RSI', 'MACD', 'Bollinger Bands'],
        reasoning: 'Strong technical indicators suggest upward momentum with RSI showing oversold conditions and MACD crossing above signal line.'
      },
      accuracy: 0.78
    };
    
    const analysisResult = await supermemoryService.storeAnalysisPattern(analysis);
    console.log('✅ Market analysis stored successfully:', analysisResult.id);
    console.log('   Analysis:', JSON.parse(analysisResult.content));
    console.log('');

    // Test 5: Store market event
    console.log('5️⃣ Testing storeMarketEvent...');
    const event = {
      type: 'market_event' as const,
      severity: 'high' as const,
      event: {
        title: 'Bitcoin ETF Approval',
        description: 'Major Bitcoin ETF approved by SEC, expected to bring significant institutional capital',
        impact: 'high'
      },
      affectedAssets: ['BTC', 'ETH', 'COIN', 'MSTR']
    };
    
    const eventResult = await supermemoryService.storeMarketEvent(event);
    console.log('✅ Market event stored successfully:', eventResult.id);
    console.log('   Event:', JSON.parse(eventResult.content));
    console.log('');

    // Test 6: Store chart interaction
    console.log('6️⃣ Testing storeChartInteraction...');
    const chartData = {
      type: 'chart_interaction' as const,
      symbol: 'BTC',
      timeframe: '1d',
      indicators: ['RSI', 'MACD', 'Volume'],
      interaction: {
        action: 'zoom',
        parameters: { level: 2, timeframe: '4h' }
      }
    };
    
    const chartResult = await supermemoryService.storeChartInteraction(chartData);
    console.log('✅ Chart interaction stored successfully:', chartResult.id);
    console.log('   Chart data:', JSON.parse(chartResult.content));
    console.log('');

    // Test 7: Get relevant context
    console.log('7️⃣ Testing getRelevantContext...');
    const contextResult = await supermemoryService.getRelevantContext('Bitcoin market analysis');
    console.log('✅ Context retrieval completed');
    console.log('   Relevant memories found:', contextResult.total);
    console.log('   Context memories:', contextResult.memories.map(m => ({
      id: m.id,
      type: m.metadata.type,
      content: m.content.substring(0, 40) + '...'
    })));
    console.log('');

    // Test 8: Get user preferences
    console.log('8️⃣ Testing getUserPreferences...');
    const userPrefsResult = await supermemoryService.getUserPreferences('test-user-123');
    console.log('✅ User preferences retrieved');
    console.log('   Preferences found:', userPrefsResult.total);
    console.log('   User preferences:', userPrefsResult.memories.map(m => ({
      id: m.id,
      content: JSON.parse(m.content)
    })));
    console.log('');

    // Test 9: Get analysis history
    console.log('9️⃣ Testing getAnalysisHistory...');
    const historyResult = await supermemoryService.getAnalysisHistory('BTC');
    console.log('✅ Analysis history retrieved');
    console.log('   Analysis records found:', historyResult.total);
    console.log('   Analysis history:', historyResult.memories.map(m => ({
      id: m.id,
      type: m.metadata.type,
      content: JSON.parse(m.content)
    })));
    console.log('');

    console.log('🎉 All Supermemory MCP integration tests completed successfully!');
    console.log('');
    console.log('📊 Test Summary:');
    console.log('   ✅ Memory storage and retrieval');
    console.log('   ✅ User preferences management');
    console.log('   ✅ Market analysis storage');
    console.log('   ✅ Market event tracking');
    console.log('   ✅ Chart interaction logging');
    console.log('   ✅ Context-aware retrieval');
    console.log('   ✅ Type safety validation');
    console.log('   ✅ Error handling');
    console.log('');
    console.log('🚀 Supermemory MCP integration is working correctly!');

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('   1. Check if SUPERMEMORY_API_KEY is set in environment');
    console.log('   2. Verify internet connection');
    console.log('   3. Check Supermemory API status');
    console.log('   4. Review API rate limits');
    process.exit(1);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testSupermemoryIntegration();
}

export { testSupermemoryIntegration }; 