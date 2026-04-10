import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, X, Volume2, Star, RotateCcw, ChevronLeft, 
  Sparkles, CheckCircle2, Loader2, Waves, MessageSquare,
  Power, PowerOff
} from 'lucide-react';
import { speak, translateForParentChild, getTranslationSuggestions, translateHybrid } from '../services/geminiService';
import { TranslatedSentence } from '../types';

interface AnytimeTranslateProps {
  onBack: () => void;
  onSave: (sentence: TranslatedSentence) => void;
  savedSentences: TranslatedSentence[];
}

export const AnytimeTranslate: React.FC<AnytimeTranslateProps> = ({ onBack, onSave, savedSentences }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<TranslatedSentence | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [suggestions, setSuggestions] = useState<{ chinese: string; english: string }[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isDialogueMode, setIsDialogueMode] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isRecordingRef = useRef(false);

  useEffect(() => {
    console.log('AnytimeTranslate: Initializing Speech Recognition');
    
    if (!process.env.GEMINI_API_KEY) {
      console.error('AnytimeTranslate: GEMINI_API_KEY is not defined in the environment!');
      setError('系统配置错误：缺少 API Key');
    }

    // Initialize Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'zh-CN';

        recognitionRef.current.onstart = () => {
          console.log('AnytimeTranslate: Speech recognition started');
          setIsRecording(true);
          isRecordingRef.current = true;
        };

        recognitionRef.current.onresult = async (event: any) => {
          const transcript = event.results[0][0].transcript;
          console.log('AnytimeTranslate: Transcript received:', transcript);
          handleTranslate(transcript);
        };

        recognitionRef.current.onnomatch = () => {
          console.log('AnytimeTranslate: No match found');
          if (isDialogueMode) {
            // Restart listening if in dialogue mode
            setTimeout(() => {
              if (isDialogueMode && !isRecordingRef.current) {
                startRecording();
              }
            }, 500);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('AnytimeTranslate: Speech recognition error:', event.error);
          if (event.error === 'not-allowed') {
            setError('请允许麦克风权限以使用语音翻译');
          } else if (event.error !== 'aborted') {
            setError('没听清，请再试一次');
          }
          setIsRecording(false);
          isRecordingRef.current = false;
        };

        recognitionRef.current.onend = () => {
          console.log('AnytimeTranslate: Speech recognition ended');
          setIsRecording(false);
          isRecordingRef.current = false;
        };
      } catch (err) {
        console.error('AnytimeTranslate: Failed to initialize SpeechRecognition:', err);
        setError('语音识别初始化失败');
      }
    } else {
      console.warn('AnytimeTranslate: SpeechRecognition not supported in this browser');
      setError('您的浏览器不支持语音识别，请手动输入');
    }
  }, []);

  const startRecording = (e?: React.PointerEvent) => {
    console.log('AnytimeTranslate: startRecording triggered');
    if (e) {
      if (e.button !== 0) return; // Only left click
    }

    if (!recognitionRef.current) {
      console.error('AnytimeTranslate: recognitionRef.current is null');
      setError('语音识别未就绪，请尝试手动输入');
      return;
    }

    if (isRecordingRef.current) {
      console.warn('AnytimeTranslate: Already recording, ignoring start request');
      return;
    }

    try {
      setError(null);
      setResult(null);
      recognitionRef.current.start();
      
      // Haptic feedback if available
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    } catch (err) {
      console.error('AnytimeTranslate: Start recording error:', err);
      setIsRecording(false);
      isRecordingRef.current = false;
      // If it's already started, we might get an error, but that's okay
    }
  };

  const stopRecording = (e?: React.PointerEvent) => {
    console.log('AnytimeTranslate: stopRecording triggered');
    if (!recognitionRef.current || !isRecordingRef.current) {
      console.log('AnytimeTranslate: Not recording or recognition null, ignoring stop request');
      return;
    }
    
    try {
      recognitionRef.current.stop();
    } catch (err) {
      console.error('AnytimeTranslate: Stop recording error:', err);
    }
    // We don't set isRecording false here, we wait for onend
  };

  const handleTranslate = async (text: string) => {
    if (!text.trim()) return;
    console.log('AnytimeTranslate: Starting translation for:', text);
    setIsProcessing(true);
    setError(null);
    setSuggestions([]);
    try {
      const translation = await translateHybrid(text);
      console.log('AnytimeTranslate: Translation result:', translation);
      if (translation) {
        const newResult: TranslatedSentence = {
          id: Math.random().toString(36).substr(2, 9),
          original: translation.original,
          english: translation.english,
          timestamp: Date.now(),
          isFavorite: false
        };
        setResult(newResult);
        // Auto play the translation
        await handlePlay(newResult.english);

        // Fetch suggestions in background
        setIsSuggesting(true);
        getTranslationSuggestions(text).then(async (s) => {
          setSuggestions(s);
          setIsSuggesting(false);
          
          // Preload audio for suggestions
          if (isDialogueMode) {
            s.forEach(suggestion => {
              speak(suggestion.english).catch(() => {});
            });
          }
        }).catch(err => {
          console.error('Failed to get suggestions:', err);
          setIsSuggesting(false);
        });

        // In dialogue mode, restart listening after a short delay
        if (isDialogueMode) {
          setTimeout(() => {
            if (isDialogueMode && !isRecordingRef.current && !isProcessing) {
              startRecording();
            }
          }, 1000);
        }
      } else {
        console.error('AnytimeTranslate: Translation returned null');
        setError('翻译失败，请重试');
        if (isDialogueMode) {
          setTimeout(() => startRecording(), 2000);
        }
      }
    } catch (err) {
      console.error('AnytimeTranslate: Translation error:', err);
      setError('发生错误，请重试');
      if (isDialogueMode) {
        setTimeout(() => startRecording(), 2000);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUseSuggestion = async (suggestion: { chinese: string; english: string }) => {
    const newResult: TranslatedSentence = {
      id: Math.random().toString(36).substr(2, 9),
      original: suggestion.chinese,
      english: suggestion.english,
      timestamp: Date.now(),
      isFavorite: false
    };
    setResult(newResult);
    await handlePlay(suggestion.english);
    
    // Get new suggestions based on the chosen one
    setIsSuggesting(true);
    getTranslationSuggestions(suggestion.chinese).then(async (s) => {
      setSuggestions(s);
      setIsSuggesting(false);
      
      // Preload audio for suggestions
      if (isDialogueMode) {
        s.forEach(sug => {
          speak(sug.english).catch(() => {});
        });
      }
    }).catch(err => {
      console.error('Failed to get suggestions:', err);
      setIsSuggesting(false);
    });

    // If in dialogue mode, restart listening
    if (isDialogueMode) {
      setTimeout(() => {
        if (isDialogueMode && !isRecordingRef.current && !isProcessing) {
          startRecording();
        }
      }, 1000);
    }
  };

  const handlePlay = async (text: string, slow: boolean = false) => {
    if (isPlaying) return;
    setIsPlaying(true);
    const url = await speak(text, slow);
    if (url) {
      return new Promise<void>((resolve) => {
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => {
          setIsPlaying(false);
          audioRef.current = null;
          resolve();
        };
        audio.onerror = () => {
          setIsPlaying(false);
          audioRef.current = null;
          resolve();
        };
        audio.play().catch(err => {
          console.error('Playback failed:', err);
          setIsPlaying(false);
          resolve();
        });
      });
    } else {
      setIsPlaying(false);
    }
  };

  const toggleDialogueMode = () => {
    const newMode = !isDialogueMode;
    setIsDialogueMode(newMode);
    if (newMode) {
      setResult(null);
      setError(null);
      setTimeout(() => startRecording(), 500);
    } else {
      stopRecording();
    }
  };

  const handleToggleFavorite = () => {
    if (!result) return;
    const updated = { ...result, isFavorite: !result.isFavorite };
    setResult(updated);
    onSave(updated);
  };

  const [showManualInput, setShowManualInput] = useState(false);
  const [manualText, setManualText] = useState('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualText.trim()) {
      handleTranslate(manualText);
      setShowManualInput(false);
      setManualText('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed inset-0 z-50 flex flex-col transition-colors duration-500 ${
        isDialogueMode ? 'bg-slate-900' : 'bg-[#FFF9F0]'
      }`}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button 
          onClick={onBack}
          className={`p-3 border-4 rounded-2xl transition-colors shadow-sm ${
            isDialogueMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-100 text-slate-400'
          } hover:text-pink-500`}
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className={`text-2xl font-black ${isDialogueMode ? 'text-white' : 'text-slate-800'}`}>
          {isDialogueMode ? '对话模式' : '随时翻'}
        </h2>
        <button 
          onClick={toggleDialogueMode}
          className={`p-3 border-4 rounded-2xl transition-all shadow-sm flex items-center gap-2 ${
            isDialogueMode 
              ? 'bg-pink-500 border-pink-400 text-white' 
              : 'bg-white border-slate-100 text-slate-400'
          }`}
        >
          <MessageSquare size={24} />
          <span className="text-xs font-black hidden md:inline">
            {isDialogueMode ? '开启中' : '对话模式'}
          </span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {isDialogueMode && !result && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-center"
          >
            <p className="text-pink-400 font-black animate-pulse">
              对话模式已开启，我会持续聆听并翻译...
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {!result && !isProcessing ? (
            <motion.div 
              key="recording"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-12"
            >
              <div className="relative">
                {(isRecording || isDialogueMode) && (
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={`absolute inset-0 rounded-full -z-10 ${
                      isDialogueMode ? 'bg-pink-500/20' : 'bg-pink-200'
                    }`}
                  />
                )}
                <button 
                  onPointerDown={isDialogueMode ? undefined : startRecording}
                  onPointerUp={isDialogueMode ? undefined : stopRecording}
                  onPointerLeave={isDialogueMode ? undefined : stopRecording}
                  onPointerCancel={isDialogueMode ? undefined : stopRecording}
                  onContextMenu={(e) => e.preventDefault()}
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 touch-none select-none ${
                    isRecording 
                      ? 'bg-pink-500 text-white scale-110' 
                      : isDialogueMode
                        ? 'bg-slate-800 text-pink-500 border-8 border-slate-700'
                        : 'bg-white text-pink-500 border-8 border-pink-50'
                  }`}
                >
                  {isRecording ? <Waves size={48} /> : <Mic size={48} />}
                </button>
              </div>
              
              <div className="text-center space-y-4">
                <p className={`text-xl md:text-2xl font-black ${isDialogueMode ? 'text-white' : 'text-slate-800'}`}>
                  {isRecording ? '请说...' : isDialogueMode ? '正在聆听您的声音' : '按住说话，马上翻译成英文'}
                </p>
                <p className="text-slate-400 font-bold">
                  {isRecording ? '正在记录中' : isDialogueMode ? '无需按键，直接说话即可' : '支持亲子场景优化翻译'}
                </p>
                {error && (
                  <p className="text-red-500 font-bold bg-red-50 px-4 py-2 rounded-full">
                    {error}
                  </p>
                )}
                
                {!isRecording && !isDialogueMode && (
                  <button 
                    onClick={() => setShowManualInput(true)}
                    className="mt-4 text-pink-500 font-black text-sm hover:underline flex items-center gap-2 mx-auto"
                  >
                    <Sparkles size={16} />
                    <span>或者手动输入中文</span>
                  </button>
                )}

                {isDialogueMode && (
                  <button 
                    onClick={() => setIsDialogueMode(false)}
                    className="mt-8 px-8 py-3 bg-slate-800 text-slate-400 rounded-full font-black flex items-center gap-2 mx-auto hover:bg-slate-700 transition-colors"
                  >
                    <PowerOff size={16} />
                    <span>结束对话</span>
                  </button>
                )}
              </div>
            </motion.div>
          ) : isProcessing ? (
            <motion.div 
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <Loader2 size={64} className="text-pink-500 animate-spin" />
              <p className={`text-xl font-black ${isDialogueMode ? 'text-white' : 'text-slate-800'}`}>
                正在思考中...
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-full max-w-2xl p-8 md:p-12 rounded-[40px] border-8 shadow-2xl space-y-8 ${
                isDialogueMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-pink-50'
              }`}
            >
              <div className="space-y-4">
                <p className={`text-3xl md:text-5xl font-black leading-tight ${isDialogueMode ? 'text-white' : 'text-slate-800'}`}>
                  {result?.english}
                </p>
                <p className="text-lg md:text-2xl font-bold text-slate-400">
                  {result?.original}
                </p>
              </div>

              <div className={`flex items-center justify-between pt-8 border-t-4 ${isDialogueMode ? 'border-slate-700' : 'border-slate-50'}`}>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handlePlay(result?.english || '', false)}
                    disabled={isPlaying}
                    className="w-16 h-16 bg-pink-500 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-pink-600 transition-all active:scale-95 disabled:opacity-50 group relative"
                  >
                    <Volume2 size={32} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-black">标准语速</span>
                  </button>
                  <button 
                    onClick={() => handlePlay(result?.english || '', true)}
                    disabled={isPlaying}
                    className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50 group relative"
                  >
                    <div className="relative">
                      <Volume2 size={32} />
                      <span className="absolute -bottom-1 -right-1 bg-white text-blue-500 rounded-full p-0.5">
                        <Sparkles size={10} />
                      </span>
                    </div>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-black">龟速朗读</span>
                  </button>
                  <button 
                    onClick={handleToggleFavorite}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all border-4 ${
                      result?.isFavorite ? 'bg-yellow-50 border-yellow-200 text-yellow-500' : isDialogueMode ? 'bg-slate-700 border-slate-600 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-300'
                    }`}
                  >
                    <Star size={32} fill={result?.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <button 
                  onClick={() => {
                    setResult(null);
                    if (isDialogueMode) startRecording();
                  }}
                  className="flex items-center gap-2 text-slate-400 font-black hover:text-pink-500 transition-colors"
                >
                  <RotateCcw size={20} />
                  <span>{isDialogueMode ? '继续对话' : '再试一次'}</span>
                </button>
              </div>

              {/* Suggestions Section */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-pink-500" />
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">猜你还想说 (Suggestions)</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {isSuggesting ? (
                    <div className="flex items-center gap-2 text-slate-400 py-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm font-bold">正在思考下一句...</span>
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((s, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleUseSuggestion(s)}
                        className={`w-full p-4 rounded-2xl border-2 transition-all text-left group ${
                          isDialogueMode 
                            ? 'bg-slate-700 border-slate-600 hover:border-pink-500 hover:bg-slate-600' 
                            : 'bg-slate-50 border-slate-100 hover:border-pink-200 hover:bg-white'
                        }`}
                      >
                        <p className={`text-sm font-black group-hover:text-pink-500 transition-colors ${isDialogueMode ? 'text-slate-200' : 'text-slate-800'}`}>
                          {s.chinese}
                        </p>
                        <p className="text-xs font-bold text-slate-400 mt-1">{s.english}</p>
                      </motion.button>
                    ))
                  ) : !isProcessing && (
                    <p className="text-xs text-slate-300 font-bold italic">暂无联想建议</p>
                  )}
                </div>
              </div>

              {isDialogueMode && (
                <button 
                  onClick={() => setIsDialogueMode(false)}
                  className="w-full py-4 bg-slate-700 text-slate-400 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-600 transition-colors"
                >
                  <PowerOff size={20} />
                  <span>结束对话模式</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manual Input Modal */}
      <AnimatePresence>
        {showManualInput && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black">手动输入</h3>
                <button onClick={() => setShowManualInput(false)} className="text-slate-400">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleManualSubmit} className="space-y-6">
                <textarea 
                  autoFocus
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder="输入你想对宝宝说的话..."
                  className="w-full h-32 p-4 bg-slate-50 rounded-2xl border-4 border-slate-100 focus:border-pink-200 outline-none font-bold resize-none"
                />
                <button 
                  type="submit"
                  disabled={!manualText.trim()}
                  className="w-full py-4 bg-pink-500 text-white rounded-2xl font-black shadow-lg hover:bg-pink-600 transition-all disabled:opacity-50"
                >
                  开始翻译
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History / Saved Sentences (Optional but good for UX) */}
      {savedSentences.length > 0 && !result && !isRecording && !isProcessing && (
        <div className="px-6 pb-10 overflow-x-auto">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">最近收藏</p>
          <div className="flex gap-4">
            {savedSentences.slice(0, 5).map(s => (
              <button 
                key={s.id}
                onClick={() => setResult(s)}
                className="whitespace-nowrap bg-white px-6 py-4 rounded-2xl border-4 border-slate-100 font-bold text-slate-600 hover:border-pink-200 transition-all"
              >
                {s.original}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
