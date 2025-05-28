'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Copy } from 'lucide-react'; // Optional: use an icon for copy

const languages = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'C#', '	Perl'];

export default function CodeTranslator() {
  const [originalCode, setOriginalCode] = useState('');
  const [translatedCode, setTranslatedCode] = useState(''); 
  const [selectedLang, setSelectedLang] = useState('Python');
  const [tab, setTab] = useState('original');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const typeText = async (text: string) => {
    let index = 0;
    let output = '';
    while (index < text.length) {
      output += text[index];
      setTranslatedCode(output);
      index++;
      await new Promise((res) => setTimeout(res, 15));
    }
  };

  const handleTranslate = async () => {
    setTab('translated');
    setLoading(true);
    setTranslatedCode('');

    const prompt = `Convert the following code to ${selectedLang} with correct syntax and necessary packages. Do not include any comments.\n\n${originalCode}`;

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const cleaned = text
        .split('\n')
        .filter(line => !line.trim().startsWith('//') && !line.trim().startsWith('#'))
        .join('\n');

      await typeText(cleaned);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedCode('Error during translation. Please check the API key and try again.');
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="py-20 bg-[#051525] text-[#00e5ff] min-h-screen">
      <div className="container mx-auto px-4">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center flex-wrap sm:flex-nowrap">
            <Select onValueChange={setSelectedLang} defaultValue={selectedLang}>
              <SelectTrigger className="w-full sm:w-60 bg-[#03101f] border border-[#00e5ff30] text-[#00e5ff]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent className="bg-[#03101f] text-[#00e5ff]">
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleTranslate} className="bg-[#00e5ff10] text-[#00e5ff] border border-[#00e5ff50] hover:bg-[#00e5ff20]">
              Translate
            </Button>

            <TabsList className="bg-[#03101f] border border-[#00e5ff30]">
              <TabsTrigger value="original">Original Code</TabsTrigger>
              <TabsTrigger value="translated">Translated Code</TabsTrigger>
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

          <TabsContent value="translated">
            <div className="relative">
              <Button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-[#00e5ff20] text-[#00e5ff] hover:bg-[#00e5ff30] text-sm px-3 py-1"
              >
                {copied ? 'Copied!' : <Copy size={16} />}
              </Button>
              <pre className="whitespace-pre-wrap min-h-[300px] bg-[#03101f] text-[#00e5ff] border border-[#00e5ff30] p-4 pr-12">
                {loading && translatedCode === '' ? 'Translating...' : translatedCode}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
