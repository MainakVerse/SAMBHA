export function GameAbout() {
  return (
    <section className="py-20 grid-bg" id="about">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block border border-primary/30 bg-background/50 px-4 py-1 mb-4">
              <span className="text-primary text-sm font-mono">03 // ABOUT</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 cyber-font text-primary">MISSION BRIEFING</h2>
            <div className="space-y-4 text-foreground/80 font-mono">
              <p>
                SAMBHA is a cutting-edge cybersecurity simulation set in a dystopian future where information
                is the ultimate currency and hackers are the new elite.
              </p>
              <p>
                As an operative of the clandestine organization known as COLD, you'll infiltrate corporate networks,
                decrypt classified data, and expose the corruption that plagues the system.
              </p>
              <p>
                With an advanced neural interface and state-of-the-art hacking tools at your disposal, you'll navigate a
                complex web of digital security systems while evading detection.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="border border-primary/30 bg-background/50 p-4">
                <div className="text-3xl font-bold text-primary cyber-font">100+</div>
                <div className="text-sm text-foreground/70 font-mono">MISSIONS</div>
              </div>
              <div className="border border-primary/30 bg-background/50 p-4">
                <div className="text-3xl font-bold text-primary cyber-font">50+</div>
                <div className="text-sm text-foreground/70 font-mono">HACKING TOOLS</div>
              </div>
              <div className="border border-primary/30 bg-background/50 p-4">
                <div className="text-3xl font-bold text-primary cyber-font">5</div>
                <div className="text-sm text-foreground/70 font-mono">MEGACORPS</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="border border-primary/30 p-1 bg-background/50">
              <img src="/placeholder.svg?height=800&width=600" alt="Game Character" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-6 -right-6 border border-primary bg-background p-4">
              <div className="text-2xl font-bold text-primary cyber-font">4.9/5</div>
              <div className="text-sm font-mono text-foreground/70">USER RATING</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
