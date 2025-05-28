'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function CodeDocumentation() {
  const [originalCode, setOriginalCode] = useState('');
  const [documentation, setDocumentation] = useState('');
  const [tab, setTab] = useState('original');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const typeText = async (text: string) => {
    let index = 0;
    let output = '';
    while (index < text.length) {
      output += text[index];
      setDocumentation(output);
      index++;
      await new Promise((res) => setTimeout(res, 15));
    }
  };

  const handleGenerateDocumentation = async () => {
    setTab('documentation');
    setLoading(true);
    setDocumentation('');

    // Prompt instructs concise explanation of modules and functions, max 500 lines
    const prompt = `You are an expert developer documenting code. 
Explain the main function in the following code concisely but thoroughly.
Keep the documentation under 500 lines.
Do not include code, only explanations.\n\n${originalCode}`;

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      await typeText(text);
    } catch (error) {
      console.error('Documentation generation error:', error);
      setDocumentation('Error generating documentation. Please check the API key and try again.');
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(documentation).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="py-20 bg-[#051525] text-[#00e5ff] min-h-screen">
      <div className="container mx-auto px-4">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center flex-wrap sm:flex-nowrap">
            <Button onClick={handleGenerateDocumentation} className="bg-[#00e5ff10] text-[#00e5ff] border border-[#00e5ff50] hover:bg-[#00e5ff20]">
              Generate Documentation
            </Button>

            <TabsList className="bg-[#03101f] border border-[#00e5ff30]">
              <TabsTrigger value="original">Original Code</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="original">
            <Textarea
              value={originalCode}
              onChange={(e) => setOriginalCode(e.target.value)}
              placeholder="Paste your code here..."
              className="min-h-[300px] bg-[#03101f] text-[#00e5ff] border border-[#00e5ff30]"
            />
          </TabsContent>

          <TabsContent value="documentation">
            <div className="relative">
              <Button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-[#00e5ff20] text-[#00e5ff] hover:bg-[#00e5ff30] text-sm px-3 py-1"
              >
                {copied ? 'Copied!' : <Copy size={16} />}
              </Button>
              <pre className="whitespace-pre-wrap min-h-[300px] bg-[#03101f] text-[#00e5ff] border border-[#00e5ff30] p-4 pr-12">
                {loading && documentation === '' ? 'Generating documentation...' : documentation}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
