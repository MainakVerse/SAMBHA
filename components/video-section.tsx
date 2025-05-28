'use client';

import { useState } from 'react';

const videos = [
  '/videos/video1.mp4',
  '/videos/video2.mp4',
  '/videos/video3.mp4',
  '/videos/video4.mp4',
];

const buttonLabels = ['Code Translation', 'Code Documentation', 'Code Review', 'Peer Review Template'];

export function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleVideoClick = (index: number) => {
    setSelectedVideo(index);
    // Open modal only on small screens
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setShowModal(true);
    }
  };

  return (
    <section className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
    <section className="py-20 bg-[#051525] text-[#00e5ff]">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl text-center md:text-5xl mb-4 glitch">VIDEO HELP</h1>
        <div className="feature-description text-center text-sm mb-4">
                Recommended to view on desktop for better experience. Also, a bit of zoom can help.
              </div>
        {/* Button row */}
        <div className="flex flex-col sm:flex-row w-full mb-6 gap-2">
          {buttonLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => handleVideoClick(index)}
              className="flex-1 border border-[#00e5ff50] py-2 text-sm sm:text-base hover:bg-[#00e5ff10] transition-colors text-center"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop Video Container */}
        <div className="hidden sm:flex w-full border border-[#00e5ff50] rounded-md h-[400px] p-4 bg-black justify-center items-center">
          <video
            key={selectedVideo}
            src={videos[selectedVideo]}
            controls
            autoPlay
            loop
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      </div>

      {/* Modal for Mobile Video */}
      {showModal && (
        <dialog
          open
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-black rounded-lg overflow-hidden w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={selectedVideo}
              src={videos[selectedVideo]}
              controls
              autoPlay
              loop
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2 bg-[#00e5ff20] text-[#00e5ff] text-center hover:bg-[#00e5ff40]"
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </section>
    </section>
  );
}
