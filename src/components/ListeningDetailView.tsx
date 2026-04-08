import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Play, Pause, RotateCcw, Volume2, 
  MessageSquare, Lightbulb, Music, BookOpen, 
  FastForward, Rewind, Settings2
} from 'lucide-react';
import { ListeningContent } from '../types';
import { speak, generateMusic } from '../services/geminiService';

interface ListeningDetailViewProps {
  content: ListeningContent;
  onBack: () => void;
  preloadedUrl?: string;
}

export const ListeningDetailView: React.FC<ListeningDetailViewProps> = ({ content, onBack, preloadedUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleOpenKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
      loadAudio();
    }
  };

  const loadAudio = async () => {
    setIsLoading(true);
    setIsFallback(false);
    try {
      let url: string | null = null;
      if (content.type === 'rhyme') {
        url = await generateMusic(content.title, content.content);
        if (!url) {
          console.warn("Music generation failed, falling back to TTS");
          setIsFallback(true);
          url = await speak(content.content, isSlow);
        }
      } else {
        url = await speak(content.audioText, isSlow);
      }
      
      if (url) {
        setAudioUrl(url);
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Failed to load audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (preloadedUrl && !isSlow) {
      setAudioUrl(preloadedUrl);
      if (audioRef.current) {
        audioRef.current.src = preloadedUrl;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      loadAudio();
    }
    return () => {
      // Don't revoke preloadedUrl as it's managed by App.tsx
      if (audioUrl && audioUrl !== preloadedUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [content.id, isSlow, preloadedUrl]);

  // Auto-scroll lyrics based on progress
  useEffect(() => {
    // Remove the old scroll effect that used progress
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration > 0) {
        const newProgress = (current / duration) * 100;
        setProgress(newProgress);

        // Estimate current line
        const lines = content.content.split('\n').filter(l => l.trim());
        const lineIndex = Math.floor((current / duration) * lines.length);
        setCurrentLineIndex(lineIndex);

        // Auto-scroll to current line
        if (lyricsContainerRef.current) {
          const container = lyricsContainerRef.current;
          const lineElements = container.querySelectorAll('.lyric-line');
          if (lineElements[lineIndex]) {
            const lineElement = lineElements[lineIndex] as HTMLElement;
            const containerHeight = container.clientHeight;
            const lineTop = lineElement.offsetTop;
            const lineHeight = lineElement.clientHeight;
            
            container.scrollTo({
              top: lineTop - containerHeight / 2 + lineHeight / 2,
              behavior: 'smooth'
            });
          }
        }
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = (Number(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(Number(e.target.value));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto px-4 py-6 md:py-10"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-3 bg-white border-4 border-slate-100 rounded-2xl text-slate-400 hover:text-pink-500 transition-colors shadow-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800">{content.title}</h2>
          <p className="text-slate-400 font-bold">{content.type === 'rhyme' ? '经典儿歌' : '可朗读迷你故事'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Left Column: Visuals & Player */}
        <div className="space-y-6">
          <div className="relative aspect-video rounded-[40px] overflow-hidden border-8 border-white shadow-2xl bg-slate-100">
            <img 
              src={content.coverImage} 
              alt={content.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <AnimatePresence>
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-10"
                  >
                    <div className="relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-16 h-16 border-4 border-pink-100 border-t-pink-500 rounded-full"
                      />
                      <Music className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500" size={24} />
                    </div>
                    <div className="text-center">
                      <p className="text-pink-600 font-black text-lg">正在准备音乐...</p>
                      <p className="text-slate-400 text-xs font-bold">Lyria 正在为您创作优美的旋律</p>
                      {!hasApiKey && content.type === 'rhyme' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenKey();
                          }}
                          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full text-xs font-black shadow-lg hover:bg-pink-600 transition-colors"
                        >
                          选择 API Key 以启用音乐模式
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
                {isPlaying && !isLoading && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex gap-1"
                  >
                    {[1, 2, 3, 4].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [20, 40, 20] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                        className="w-2 bg-white rounded-full"
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Audio Player Card */}
          <div className="bg-white p-6 md:p-8 rounded-[40px] border-4 border-slate-100 shadow-xl">
            {isFallback && content.type === 'rhyme' && (
              <div className="mb-4 p-3 bg-amber-50 border-2 border-amber-100 rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                  <Lightbulb size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-amber-800 uppercase tracking-wider">提示</p>
                  <p className="text-xs text-amber-600 font-bold">当前处于朗读模式。选择 API Key 可开启音乐伴奏。</p>
                </div>
                {!hasApiKey && (
                  <button 
                    onClick={handleOpenKey}
                    className="px-3 py-1 bg-amber-500 text-white rounded-lg text-[10px] font-black hover:bg-amber-600 transition-colors"
                  >
                    去设置
                  </button>
                )}
              </div>
            )}
            <div className="flex flex-col gap-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <input 
                  type="range" 
                  value={progress} 
                  onChange={seek}
                  className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-pink-500"
                />
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>{audioRef.current ? Math.floor(audioRef.current.currentTime) : 0}s</span>
                  <span>{audioRef.current ? Math.floor(audioRef.current.duration || 0) : 0}s</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setIsSlow(!isSlow)}
                  className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${isSlow ? 'bg-pink-500 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  {isSlow ? '慢速模式 ON' : '标准语速'}
                </button>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => { if(audioRef.current) audioRef.current.currentTime -= 5 }}
                    className="p-3 text-slate-400 hover:text-pink-500 transition-colors"
                  >
                    <Rewind size={24} />
                  </button>
                  <button 
                    onClick={togglePlay}
                    disabled={isLoading}
                    className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <RotateCcw className="animate-spin" size={32} />
                    ) : isPlaying ? (
                      <Pause fill="currentColor" size={32} />
                    ) : (
                      <Play fill="currentColor" size={32} className="ml-1" />
                    )}
                  </button>
                  <button 
                    onClick={() => { if(audioRef.current) audioRef.current.currentTime += 5 }}
                    className="p-3 text-slate-400 hover:text-pink-500 transition-colors"
                  >
                    <FastForward size={24} />
                  </button>
                </div>

                <button 
                  onClick={() => { if(audioRef.current) audioRef.current.currentTime = 0 }}
                  className="p-3 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Transcript & Tips */}
        <div className="space-y-8">
          {/* Transcript Section */}
          <section className="bg-white p-6 md:p-8 rounded-[40px] border-4 border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {content.type === 'rhyme' ? (
                  <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500">
                    <Music size={24} />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500">
                    <BookOpen size={24} />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-black">文字稿 (Lyrics)</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sing Along</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTranscript(!showTranscript)}
                className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-pink-500 transition-colors"
              >
                {showTranscript ? '隐藏' : '显示'}
              </button>
            </div>

            <AnimatePresence>
              {showTranscript && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4">
                    <div 
                      ref={lyricsContainerRef}
                      className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 max-h-[350px] overflow-y-auto no-scrollbar scroll-smooth"
                    >
                      <div className="space-y-6">
                        {content.content.split('\n').map((line, i) => {
                          const chineseLine = content.chineseContent?.split('\n')[i];
                          const isHighlighted = content.coreSentence && line.includes(content.coreSentence);
                          
                          if (!line.trim() && !chineseLine?.trim()) return <div key={i} className="h-4" />;

                          // Find the actual index among non-empty lines
                          const nonEmptyLines = content.content.split('\n').filter(l => l.trim());
                          const actualLineIndex = nonEmptyLines.indexOf(line);
                          const isActive = actualLineIndex === currentLineIndex;

                          return (
                            <div key={i} className={`group lyric-line transition-all duration-300 ${isActive ? 'scale-105' : ''}`}>
                              <span className={`block text-lg md:text-xl font-black leading-relaxed transition-all ${isActive ? 'text-pink-500' : isHighlighted ? 'text-pink-600 bg-pink-50 px-2 -mx-2 rounded-lg' : 'text-slate-800 opacity-90 group-hover:opacity-100'}`}>
                                {line}
                              </span>
                              {chineseLine && (
                                <span className={`block text-sm md:text-base font-bold mt-1 transition-colors ${isActive ? 'text-pink-400' : 'text-slate-400 group-hover:text-slate-500'}`}>
                                  {chineseLine}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {content.keywords && (
                      <div className="flex flex-wrap gap-2">
                        {content.keywords.map(kw => (
                          <span key={kw} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-wider">
                            #{kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Interaction Tips */}
          <section className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 md:p-8 rounded-[40px] text-white shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="text-yellow-400" size={24} />
              <h3 className="text-xl font-black">亲子互动建议 (Interaction)</h3>
            </div>
            <div className="space-y-4">
              {content.interactionTips.map((tip, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-black text-sm">
                    {i + 1}
                  </div>
                  <p className="font-bold text-white/90 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </motion.div>
  );
};
