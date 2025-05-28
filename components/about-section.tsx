import Image from 'next/image';

const brandImages = [
  { src: '/brands/image1.jpg', alt: 'Image 1' },
  { src: '/brands/image2.jpg', alt: 'Image 2' },
  { src: '/brands/image3.jpg', alt: 'Image 3' },
  { src: '/brands/image4.jpg', alt: 'Image 4' },
  { src: '/brands/image5.jpg', alt: 'Image 5' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="terminal-box mb-8">
          <div className="terminal-header">
            <div className="terminal-title">TRUSTED PARTNERS</div>
            <div className="terminal-controls">WHO LOVE WORKING WITH US</div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 px-4 py-6">
      {brandImages.map((image, index) => (
        <div key={index} className="w-[200px] h-[100px] relative">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
      ))}
    </div>
          </div>

      
      </div>
    </section>
  )
}
