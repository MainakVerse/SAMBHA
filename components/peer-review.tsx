'use client';

import { useState } from 'react';
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

export default function PeerReview() {
  const [originalCode, setOriginalCode] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [tab, setTab] = useState('original');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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
    const result = {
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
        val = Math.max(0, Math.min(val, 100));
        result[metric.key as keyof typeof result] = val;
      }
    }

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
    setTab('peerReview');
    setLoading(true);
    setReviewText('');
    setScores({
      performance: 0,
      conciseness: 0,
      codeStandard: 0,
      reusability: 0,
      bugCount: 0,
    });

    const prompt = `You are a senior software engineer performing a peer review.
Review the following code and provide:
- Praise for strengths
- Constructive feedback on issues
- Specific, actionable suggestions with optional code examples
- Scores (0-100) at the end like:
Performance: 85
Conciseness: 70
Code Standard: 90
Reusability: 60
Bug Count: 10
Keep it short, clear, and within 150 words.\n\n${originalCode}`;

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      await typeText(text);
      const parsedScores = parseScoresFromText(text);
      setScores(parsedScores);
    } catch (error) {
      console.error('Peer review error:', error);
      setReviewText('Error generating peer review. Please check the API key and try again.');
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

  return (
    <section className="py-20 bg-[#051525] text-[#00e5ff] min-h-screen">
      <div className="container mx-auto px-4">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center flex-wrap sm:flex-nowrap">
            <Button
              onClick={handleGenerateReview}
              className="bg-[#00e5ff10] text-[#00e5ff] border border-[#00e5ff50] hover:bg-[#00e5ff20]"
            >
              Generate Peer Review
            </Button>

            <TabsList className="bg-[#03101f] border border-[#00e5ff30]">
              <TabsTrigger value="original">Original Code</TabsTrigger>
              <TabsTrigger value="peerReview">Peer Review</TabsTrigger>
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

          <TabsContent value="peerReview">
            <div className="relative mb-8">
              <Button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-[#00e5ff20] text-[#00e5ff] hover:bg-[#00e5ff30] text-sm px-3 py-1"
              >
                {copied ? 'Copied!' : <Copy size={16} />}
              </Button>
              <pre className="whitespace-pre-wrap min-h-[300px] bg-[#03101f] text-[#00e5ff] border border-[#00e5ff30] p-4 pr-12">
                {loading && reviewText === '' ? 'Generating peer review...' : reviewText}
              </pre>
            </div>

            {/* Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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

            {/* Pull Request Template */}
            <div className="bg-[#03101f] text-[#00e5ff] border border-[#00e5ff30] p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">📄 Pull Request Template</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>✅ What was implemented/changed?</li>
                <li>📌 Why was this change necessary?</li>
                <li>🧪 How was it tested?</li>
                <li>📝 Any outstanding TODOs or follow-ups?</li>
                <li>🔍 Tag reviewers or related issues.</li>
              </ul>
              <p className="mt-4 text-xs text-[#00e5ffb0] italic">
                Keep it short and relevant — under 150 words.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
