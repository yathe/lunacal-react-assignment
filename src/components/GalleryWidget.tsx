import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const GalleryWidget = () => {
  const [images, setImages] = useState<string[]>([
    "https://picsum.photos/id/1015/800/800",
    "https://picsum.photos/id/1025/800/800",
    "https://picsum.photos/id/1035/800/800",
    "https://picsum.photos/id/1045/800/800",
    "https://picsum.photos/id/1055/800/800",
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("galleryImages");
    if (stored) setImages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("galleryImages", JSON.stringify(images));
  }, [images]);

  const handleAddImageClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result && typeof event.target.result === "string") {
        setImages((prev) => [...prev, event.target!.result as string]);
      }
    };
    reader.readAsDataURL(file);
  };

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });

  return (
    <div
      className="absolute w-[90%] sm:w-[650px] h-auto sm:h-[300px] left-1/2 sm:left-[882px] top-[403px] -translate-x-1/2 sm:translate-x-0 rounded-[18.9px] p-4 sm:p-6"
      style={{
        background: "#363C43",
        boxShadow: "5.67px 5.67px 3.78px rgba(0,0,0,0.4)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
        <div
          className="inline-block text-white font-semibold text-center"
          style={{
            background: "#0f0f10",
            padding: "10px 18px",
            borderRadius: 999,
            boxShadow:
              "inset 0 2px 8px rgba(255,255,255,0.02), 0 10px 30px rgba(0,0,0,0.6)",
          }}
        >
          Gallery
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddImageClick}
            className="text-white text-sm font-medium px-5 py-2 rounded-full"
            style={{
              background: "#40464D",
              boxShadow:
                "0 20px 30px rgba(0,0,0,0.55), inset 0 -4px 12px rgba(255,255,255,0.02)",
            }}
          >
            + ADD IMAGE
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
            style={{
              background: "#40464D",
              boxShadow:
                "0 18px 30px rgba(0,0,0,0.65), 0 8px 18px rgba(0,0,0,0.5)",
            }}
          >
            <CircleArrowLeft size={18} color="#D6D6D6" />
          </button>

          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
            style={{
              background: "#40464D",
              boxShadow:
                "0 18px 30px rgba(0,0,0,0.65), 0 8px 18px rgba(0,0,0,0.5)",
            }}
          >
            <CircleArrowRight size={18} color="#D6D6D6" />
          </button>
        </div>
      </div>

      {/* Images Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide py-2 scroll-smooth"
      >
        <AnimatePresence>
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.28 }}
              className="flex-shrink-0 w-[140px] sm:w-[180px]"
            >
              <div className="overflow-hidden rounded-[14px] shadow-lg">
                <img
                  src={img}
                  alt={`gallery-${i}`}
                  className="w-full h-[140px] sm:h-[180px] object-cover filter grayscale hover:grayscale-0 transform hover:scale-110 transition-all duration-500 ease-in-out"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryWidget;
