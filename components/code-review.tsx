'use client';

import { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';





const metrics = [
  { label: 'Performance', key: 'performance' },
  { label: 'Conciseness', key: 'conciseness' },
  { label: 'Code Standard', key: 'codeStandard' },
  { label: 'Reusability', key: 'reusability' },
  { label: 'Bug Count', key: 'bugCount' },
];

export default function CodeReview() {
  const [originalCode, setOriginalCode] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [tab, setTab] = useState('original');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scores for the gauges (1-100)
  const [scores, setScores] = useState({
    performance: 0,
    conciseness: 0,
    codeStandard: 0,
    reusability: 0,
    bugCount: 0,
  });

  const typeText = async (text: string) => {
    let index = 0;
    let output = '';
    while (index < text.length) {
      output += text[index];
      setReviewText(output);
      index++;
      await new Promise((res) => setTimeout(res, 15));
    }
  };

  const parseScoresFromText = (text: string) => {
    // Try to extract scores from the text if present,
    // else randomly generate for demo purpose.

    // Example expected format in text (optional):
    // Performance: 80
    // Conciseness: 75
    // ...

    const result: typeof scores = {
      performance: 0,
      conciseness: 0,
      codeStandard: 0,
      reusability: 0,
      bugCount: 0,
    };

    for (const metric of metrics) {
      const regex = new RegExp(`${metric.label}:\\s*(\\d{1,3})`, 'i');
      const match = text.match(regex);
      if (match && match[1]) {
        let val = parseInt(match[1], 10);
        if (val > 100) val = 100;
        if (val < 0) val = 0;
        result[metric.key as keyof typeof scores] = val;
      }
    }

    // If none found, fallback to random values 50-90 for demo
    if (Object.values(result).every(v => v === 0)) {
      return {
        performance: 80,
        conciseness: 75,
        codeStandard: 85,
        reusability: 70,
        bugCount: 15,
      };
    }

    return result;
  };

  const handleGenerateReview = async () => {
    setTab('codeReview');
    setLoading(true);
    setReviewText('');
    setScores({
      performance: 0,
      conciseness: 0,
      codeStandard: 0,
      reusability: 0,
      bugCount: 0,
    });

    const prompt = `You are an expert software engineer performing a detailed code review. 
Review the following code and provide:
- Praise for strong areas
- Identification of weak or problematic areas
- Suggestions with optimized and copiable code snippets where applicable
- Scores (0-100) for Performance, Conciseness, Code Standard, Reusability, and Bug Count at the end in the format:
Performance: 85
Conciseness: 70
Code Standard: 90
Reusability: 60
Bug Count: 10
Keep the review clear and actionable.\n\n${originalCode}`;

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      await typeText(text);

      // After typing, parse the scores from the generated text
      const parsedScores = parseScoresFromText(text);
      setScores(parsedScores);
    } catch (error) {
      console.error('Code review generation error:', error);
      setReviewText('Error generating code review. Please check the API key and try again.');
      setLoading(false);
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Prepare Chart data for each metric
  const getChartData = (value: number) => ({
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ['#00e5ff', '#0a2533'],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  });

  return (
    <section className="py-20 bg-[#051525] text-[#00e5ff] min-h-screen">
      <div className="container mx-auto px-4">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center flex-wrap sm:flex-nowrap">
            <Button
              onClick={handleGenerateReview}
              className="bg-[#00e5ff10] text-[#00e5ff] border border-[#00e5ff50] hover:bg-[#00e5ff20]"
            >
              Generate Code Review
            </Button>

            <TabsList className="bg-[#03101f] border border-[#00e5ff30]">
              <TabsTrigger value="original">Original Code</TabsTrigger>
              <TabsTrigger value="codeReview">Code Review</TabsTrigger>
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

          <TabsContent value="codeReview">
            <div className="relative mb-8">
              <Button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-[#00e5ff20] text-[#00e5ff] hover:bg-[#00e5ff30] text-sm px-3 py-1"
              >
                {copied ? 'Copied!' : <Copy size={16} />}
              </Button>
              <pre className="whitespace-pre-wrap min-h-[300px] bg-[#03101f] text-[#00e5ff] border border-[#00e5ff30] p-4 pr-12">
                {loading && reviewText === '' ? 'Generating code review...' : reviewText}
              </pre>
            </div>

            {/* Progress Bars */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {metrics.map(({ label, key }) => (
    <div key={key} className="flex flex-col gap-2">
      <div className="flex justify-between text-sm font-medium text-[#00e5ff]">
        <span>{label}</span>
        <span>{scores[key as keyof typeof scores]}%</span>
      </div>
      <div className="w-full bg-[#0a2533] rounded-full h-4 overflow-hidden">
        <div
          className="bg-[#00e5ff] h-4 transition-all duration-700 ease-out"
          style={{ width: `${scores[key as keyof typeof scores]}%` }}
        ></div>
      </div>
    </div>
  ))}
</div>

          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
