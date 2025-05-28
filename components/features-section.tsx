import Link from 'next/link'
export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="terminal-box mb-8">
          <div className="terminal-header">
            <div className="terminal-title">THE ONE AI</div>
            <div className="terminal-controls">FOR QUALITY</div>
          </div>
          <div className="section-title">ABOUT SAMBHA</div>
          <div className="section-subtitle">
            Inspired from the legendary Maratha warrior Chhatrapati Sambhaji Maharaj, our AI system is designed to revolutionize the way you interact with technology. With a focus on quality and performance, SAMBHA is your ultimate companion in the digital realm. Knowledgable in multiple languages, SAMBHA is here to assist you in your coding journey, documentation needs, and code reviews. Experience the power of AI like never before.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="feature-card flex flex-col justify-between p-4 bg-[#03101f] text-[#00e5ff] border border-[#00e5ff30] rounded-xl">
          <div>
            <div className="feature-title font-bold text-lg mb-2">CODE TRANSLATOR</div>
            <div className="feature-description text-sm mb-4">
              Transform your code effortlessly between languages with our advanced AI translator, ensuring accuracy and efficiency.
            </div>
          </div>
          <Link href="/translator">
            <button className="mt-auto bg-[#00e5ff20] text-[#00e5ff] border border-[#00e5ff50] hover:bg-[#00e5ff30] rounded-lg py-2 px-4 text-sm w-full">
              TRY OUT
            </button>
          </Link>
        </div>

          <div className="feature-card flex flex-col justify-between p-4 bg-[#03101f] text-[#00e5ff] border border-[#00e5ff30] rounded-xl">
            <div>
              <div className="feature-title font-bold text-lg mb-2">DOCUMENTATION GENERATOR</div>
              <div className="feature-description text-sm mb-4">
                Generate comprehensive documentation for your projects with just a few clicks, saving you time and effort.
              </div>
            </div>
            <Link href="/documentation">
              <button className="mt-auto bg-[#00e5ff20] text-[#00e5ff] border border-[#00e5ff50] hover:bg-[#00e5ff30] rounded-lg py-2 px-4 text-sm w-full">
                TRY OUT
              </button>
            </Link>
          </div>

          <div className="feature-card flex flex-col justify-between p-4 bg-[#03101f] text-[#00e5ff] border border-[#00e5ff30] rounded-xl">
            <div>
              <div className="feature-title font-bold text-lg mb-2">CODE REVIEWER</div>
              <div className="feature-description text-sm mb-4">
                Enhance your code quality with our AI-powered code reviewer, providing insights and suggestions for improvement.
              </div>
            </div>
            <Link href="/code-review">
              <button className="mt-auto bg-[#00e5ff20] text-[#00e5ff] border border-[#00e5ff50] hover:bg-[#00e5ff30] rounded-lg py-2 px-4 text-sm w-full">
                TRY OUT
              </button>
            </Link>
          </div>

          <div className="feature-card flex flex-col justify-between p-4 bg-[#03101f] text-[#00e5ff] border border-[#00e5ff30] rounded-xl">
            <div>
              <div className="feature-title font-bold text-lg mb-2">PR TEMPLATE GENERATOR</div>
              <div className="feature-description text-sm mb-4">
                Create professional pull request templates that streamline your workflow and ensure consistency across your projects.
              </div>
            </div>
            <Link href="/pr-template">
              <button className="mt-auto bg-[#00e5ff20] text-[#00e5ff] border border-[#00e5ff50] hover:bg-[#00e5ff30] rounded-lg py-2 px-4 text-sm w-full">
                TRY OUT
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
