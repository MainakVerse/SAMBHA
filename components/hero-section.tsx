import Typewriter from 'typewriter-effect';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
      {/* Centered Responsive Background Image */}
      <img
        src="/sambha.png" // Replace with your actual path
        alt="Background"
        className="absolute inset-0 m-auto w-full max-w-xs sm:max-w-xl md:max-w-lg lg:max-w-4xl opacity-30 z-0 object-contain h-auto max-h-[800px]"
      />

      {/* Hero Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="protocol-title text-8xl md:text-8xl mb-4 glitch">SAMBHA</h1>
        <div className="text-[#00e5ffb3] text-xl md:text-3xl max-w-4xl mx-auto mb-8">
          <Typewriter
            options={{
              strings: ['Translate Code', 'Generate Documentation', 'Review Code', 'Create PR Templates'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/translation" passHref>
            <button className="button button-primary">TRANSLATE CODE</button>
          </Link>

          <Link href="/documentation" passHref>
            <button className="button">GENERATE DOCUMENTATION</button>
          </Link>
      </div>
      </div>
    </section>
  );
}
