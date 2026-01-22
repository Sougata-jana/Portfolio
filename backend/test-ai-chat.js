const API_URL = 'http://localhost:5000/api/ai-chat';

async function testAIChat(message) {
  console.log(`\n📤 Sending: "${message}"`);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Success!');
      console.log(`📥 Response: ${data.message}`);
      if (data.usedFallback) {
        console.log('ℹ️  Used fallback response (OpenAI not available)');
      }
      console.log(`🆔 Session: ${data.sessionId}`);
    } else {
      console.log('❌ Failed:', data.message);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function runTests() {
  console.log('🧪 Testing AI Chat Endpoint\n');
  console.log('='.repeat(50));

  await testAIChat('Hello, who is Sougata?');
  await new Promise(resolve => setTimeout(resolve, 500));

  await testAIChat('What are his skills?');
  await new Promise(resolve => setTimeout(resolve, 500));

  await testAIChat('Tell me about his projects');
  await new Promise(resolve => setTimeout(resolve, 500));

  await testAIChat('What is his experience?');
  await new Promise(resolve => setTimeout(resolve, 500));

  await testAIChat('How can I contact him?');
  await new Promise(resolve => setTimeout(resolve, 500));

  await testAIChat('What about his education?');
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ All tests completed!');
}

runTests();
