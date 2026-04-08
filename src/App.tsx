import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Gamepad2, Heart, Palmtree, ChevronLeft, ChevronRight, Volume2, 
  Search, Calendar, BookOpen, Lightbulb, Play, Users, 
  Music, Book, Scissors, MessageCircle, Info, Star,
  CheckCircle2, RotateCw, Home, Sparkles, Apple, Coffee,
  Baby, Moon, Waves, Plane, Bus, Car, Cat, Dog, Bird, Fish,
  Circle, Smile, Hand, Droplets, CloudRain, Flower2, TreePine,
  Egg, Utensils, Box, LayoutGrid, Umbrella, Gift, Ghost,
  Bath, Trees, CloudSun, Footprints, Eraser, Square, Wind, TrendingDown, CloudRain as CloudRainIcon, Frown, Angry as AngryIcon,
  Settings2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES, CORE_ITEMS, QUICK_SCENES, SUB_SCENES, LISTENING_CONTENTS } from './constants';
import { speak, generateImage, generateMusic } from './services/geminiService';
import { LearningItem, BabyMaterial, QuickScene, SubSceneData, ListeningContent } from './types';
import { SubSceneView } from './components/SubSceneView';
import { ListeningDetailView } from './components/ListeningDetailView';

const ICON_MAP: Record<string, any> = {
  Sun, Gamepad2, Heart, Palmtree, Apple, Coffee, Users, 
  Baby, Moon, Waves, Plane, Bus, Car, Cat, Dog, Bird, Fish,
  Circle, Smile, Hand, Droplets, CloudRain, Flower2, TreePine,
  Egg, Utensils, Box, Book, Star, Music, Scissors, Info, Lightbulb, LayoutGrid, Umbrella, Gift, Ghost,
  Bath, Trees, CloudSun, Footprints, Eraser, Square, Wind, TrendingDown, Frown, Angry: AngryIcon
};

const ItemCard: React.FC<{ 
  item: LearningItem; 
  onClick: () => void;
  isFavorite: boolean;
  onFavorite: () => void;
  progress: number;
}> = ({ 
  item, 
  onClick, 
  isFavorite, 
  onFavorite, 
  progress 
}) => {
  const Icon = ICON_MAP[item.icon] || Sun;
  
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white p-6 rounded-[32px] border-4 border-slate-100 hover:border-pink-200 transition-all text-left flex flex-col gap-4 shadow-sm hover:shadow-xl group relative cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-pink-50 transition-colors">
          <Icon size={28} className="text-pink-500" />
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
          className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-pink-500 bg-pink-50' : 'text-slate-300 hover:text-pink-300'}`}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div>
        <h3 className="text-xl font-black text-slate-800 mb-1">{item.title}</h3>
        <p className="text-slate-500 font-bold">{item.chineseTitle}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-wider">
          {item.subCategory}
        </span>
        {progress > 0 && (
          <div className="flex items-center gap-1 text-green-500">
            <CheckCircle2 size={14} />
            <span className="text-xs font-bold">{progress}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function App() {
  // Navigation State
  const [isLearning, setIsLearning] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'content'>('overview');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedQuickSceneId, setSelectedQuickSceneId] = useState<string | null>(null);
  const [selectedListeningId, setSelectedListeningId] = useState<string | null>(null);
  const [showAllListening, setShowAllListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentItem, setCurrentItem] = useState<LearningItem | null>(null);
  const [preloadedAudio, setPreloadedAudio] = useState<Record<string, string>>({});
  const [hasApiKey, setHasApiKey] = useState(true);
  
  // User Data State
  const [babyName, setBabyName] = useState<string>(() => localStorage.getItem('ps_baby_name') || '');
  const [babyAge, setBabyAge] = useState<number>(() => Number(localStorage.getItem('ps_baby_age')) || 12);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('ps_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [progress, setProgress] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('ps_progress');
    return saved ? JSON.parse(saved) : {};
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('ps_baby_name', babyName);
  }, [babyName]);

  useEffect(() => {
    localStorage.setItem('ps_baby_age', babyAge.toString());
  }, [babyAge]);

  useEffect(() => {
    localStorage.setItem('ps_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ps_progress', JSON.stringify(progress));
  }, [progress]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const updateProgress = (id: string) => {
    setProgress(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };
  
  // Learning State
  const [activeTrack, setActiveTrack] = useState<'baby' | 'parent'>('baby');
  const [currentLevel, setCurrentLevel] = useState<'L1' | 'L2' | 'L3' | 'L4'>('L1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [sceneImage, setSceneImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return CORE_ITEMS.filter(item => {
      const matchesCategory = !selectedCategoryId || item.categoryId === selectedCategoryId;
      const matchesSubCategory = !selectedSubCategory || item.subCategory === selectedSubCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.chineseTitle.includes(searchQuery);
      return matchesCategory && matchesSubCategory && matchesSearch;
    });
  }, [selectedCategoryId, selectedSubCategory, searchQuery]);

  // Sub-categories for current category
  const subCategories = useMemo(() => {
    if (!selectedCategoryId) return [];
    const subs = CORE_ITEMS
      .filter(item => item.categoryId === selectedCategoryId)
      .map(item => item.subCategory);
    return Array.from(new Set(subs));
  }, [selectedCategoryId]);

  const currentCategory = useMemo(() => {
    return CATEGORIES.find(c => c.id === selectedCategoryId);
  }, [selectedCategoryId]);

  const currentQuickScene = useMemo(() => {
    return QUICK_SCENES.find(s => s.id === selectedQuickSceneId);
  }, [selectedQuickSceneId]);

  // Extract practical sentences for the quick scene
  const quickSceneData = useMemo(() => {
    if (!currentQuickScene) return null;
    
    const relatedItems = CORE_ITEMS.filter(item => 
      item.tags.some(tag => currentQuickScene.tags.includes(tag))
    );

    // Extract L3 and L4 sentences
    const sentences: { english: string; chinese: string; audioText: string; itemTitle: string }[] = [];
    relatedItems.forEach(item => {
      const l3 = item.babyMaterials.find(m => m.level === 'L3');
      const l4 = item.babyMaterials.find(m => m.level === 'L4');
      if (l3) sentences.push({ ...l3, itemTitle: item.title });
      if (l4) sentences.push({ ...l4, itemTitle: item.title });
    });

    // Shuffle and pick 8
    const shuffled = [...sentences].sort(() => 0.5 - Math.random()).slice(0, 8);

    return {
      sentences: shuffled,
      relatedItems: relatedItems.slice(0, 6)
    };
  }, [currentQuickScene]);

  // Listening Time Logic (Daily selection)
  const listeningSelection = useMemo(() => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % LISTENING_CONTENTS.length;
    return LISTENING_CONTENTS[index];
  }, []);

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
    }
  };

  // Pre-load listening audio
  useEffect(() => {
    const loadPreload = async (item: ListeningContent) => {
      if (!item || preloadedAudio[item.id]) return;
      try {
        let url = null;
        if (item.type === 'rhyme') {
          url = await generateMusic(item.title, item.content);
          if (!url) {
            console.warn(`Pre-loading music failed for ${item.id}, falling back to TTS`);
            url = await speak(item.content);
          }
        } else {
          url = await speak(item.audioText);
        }
        
        if (url) {
          setPreloadedAudio(prev => ({ ...prev, [item.id]: url }));
        }
      } catch (error) {
        console.error(`Pre-loading failed for ${item.id}:`, error);
      }
    };

    // Pre-load daily selection
    if (listeningSelection) {
      loadPreload(listeningSelection);
    }

    // Pre-load first 5 items in the list
    LISTENING_CONTENTS.slice(0, 5).forEach(item => {
      loadPreload(item);
    });
  }, [listeningSelection]);

  // Current Baby Material
  const currentMaterial = useMemo(() => {
    return currentItem?.babyMaterials.find(m => m.level === currentLevel);
  }, [currentItem, currentLevel]);

  // Image Generation Effect
  useEffect(() => {
    if (!isLearning || !currentMaterial || activeTrack !== 'baby') return;

    const fetchImage = async () => {
      setIsImageLoading(true);
      const img = await generateImage(currentMaterial.imagePrompt);
      if (img) setSceneImage(img);
      setIsImageLoading(false);
    };
    fetchImage();
  }, [currentMaterial, isLearning, activeTrack]);

  const [isSlow, setIsSlow] = useState(false);

  const handlePlayAudio = async (text: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      const audioUrl = await speak(text, isSlow);
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.onended = () => setIsPlaying(false);
        audio.onerror = (e) => {
          console.error("Audio playback error:", e);
          setIsPlaying(false);
        };
        await audio.play();
      } else {
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Audio play failed:", err);
      setIsPlaying(false);
    }
  };

  const startLearning = (item: LearningItem) => {
    setCurrentItem(item);
    setCurrentLevel('L1');
    setActiveTrack('baby');
    setIsLearning(true);
    setSceneImage(null);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] font-sans text-slate-800">
      <AnimatePresence mode="wait">
        {!isLearning ? (
          <motion.div 
            key="lobby"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-4 py-8"
          >
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-10">
              <div className="flex items-center justify-between w-full md:w-auto">
                <div>
                  <h1 className="text-2xl md:text-4xl font-black text-pink-500 mb-1 md:mb-2">Parent-Child English</h1>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-500 font-bold text-sm md:text-base">亲子英语启蒙助手</p>
                    {babyName && !showDashboard && !searchQuery && (
                      <span className="text-pink-400 font-black text-xs md:text-sm bg-pink-50 px-2 py-0.5 rounded-full">
                        Hi, {babyName}的家长
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 md:hidden">
                  <button 
                    onClick={handleOpenKey}
                    className={`p-3 rounded-xl transition-all ${hasApiKey ? 'bg-white border-4 border-slate-100 text-slate-400' : 'bg-pink-500 text-white shadow-lg shadow-pink-200'}`}
                    title={hasApiKey ? "API Key 已设置" : "设置 API Key"}
                  >
                    <Settings2 size={20} />
                  </button>
                  <button 
                    onClick={() => setShowDashboard(!showDashboard)}
                    className={`p-3 rounded-xl transition-all ${showDashboard ? 'bg-pink-500 text-white' : 'bg-white border-4 border-slate-100 text-slate-400'}`}
                  >
                    <Users size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button 
                  onClick={handleOpenKey}
                  className={`hidden md:flex p-4 rounded-2xl items-center gap-2 font-black transition-all ${hasApiKey ? 'bg-white border-4 border-slate-100 text-slate-400 hover:border-pink-200' : 'bg-pink-500 text-white shadow-lg shadow-pink-200 hover:bg-pink-600'}`}
                  title={hasApiKey ? "API Key 已设置" : "设置 API Key 以启用完整功能"}
                >
                  <Settings2 size={20} />
                  <span>{hasApiKey ? 'API 已就绪' : '设置 API Key'}</span>
                </button>
                <button 
                  onClick={() => setShowDashboard(!showDashboard)}
                  className={`hidden md:flex p-4 rounded-2xl items-center gap-2 font-black transition-all ${showDashboard ? 'bg-pink-500 text-white' : 'bg-white border-4 border-slate-100 text-slate-400 hover:border-pink-200'}`}
                >
                  <Users size={20} />
                  家长中心
                </button>
              </div>
            </header>

            {/* Welcome Banner - Simplified for mobile */}
            {!showDashboard && !searchQuery && !babyName && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center bg-white/50 p-6 md:p-10 rounded-[40px] md:rounded-[60px] border-4 border-dashed border-pink-100"
              >
                <h1 className="text-2xl md:text-5xl font-black text-slate-800 mb-2 md:mb-4">
                  宝宝英语启蒙
                </h1>
                <p className="text-sm md:text-xl text-slate-400 font-bold">
                  开启宝宝的英语第一课
                </p>
              </motion.div>
            )}

            {/* Quick Search Entry & Integrated Search */}
            {!showDashboard && !selectedCategoryId && !selectedQuickSceneId && !selectedListeningId && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 md:mb-12"
              >
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-[32px] md:rounded-[40px] p-0.5 md:p-1 shadow-xl">
                  <div className="bg-white rounded-[30px] md:rounded-[38px] p-5 md:p-8 space-y-6 md:space-y-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                        <div className="w-12 h-12 md:w-20 md:h-20 bg-pink-100 rounded-2xl md:rounded-3xl flex items-center justify-center text-pink-500 shrink-0">
                          <Sparkles size={24} className="md:hidden" />
                          <Sparkles size={40} className="hidden md:block" />
                        </div>
                        <div>
                          <h2 className="text-xl md:text-3xl font-black text-slate-800 mb-0.5 md:mb-1">现在玩什么？</h2>
                          <p className="text-xs md:text-slate-400 font-bold text-slate-400">即用即查，满足各种亲子活动场景</p>
                        </div>
                      </div>
                      
                      <div className="relative group w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" size={18} />
                        <input 
                          type="text" 
                          placeholder="搜索单词、场景、句子..." 
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (e.target.value) {
                              setSelectedCategoryId(null);
                              setSelectedSubCategory(null);
                              setSelectedQuickSceneId(null);
                              setSelectedListeningId(null);
                            }
                          }}
                          className="w-full pl-11 pr-4 py-3 md:py-4 bg-slate-50 rounded-xl md:rounded-2xl border-4 border-transparent focus:border-pink-200 focus:bg-white outline-none transition-all font-bold text-sm md:text-lg"
                        />
                      </div>
                    </div>

                    <div className="pt-4 md:pt-6 border-t-2 border-slate-50">
                      <p className="text-[10px] md:text-sm font-black text-slate-400 mb-3 md:mb-4 uppercase tracking-wider">快速场景 (Quick Scenes)</p>
                      <div className="flex overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 md:flex-wrap gap-2 md:gap-3 no-scrollbar">
                        {SUB_SCENES.map(scene => (
                          <button
                            key={scene.id}
                            onClick={() => {
                              setSelectedQuickSceneId(scene.id);
                              setSelectedListeningId(null);
                              setSearchQuery('');
                            }}
                            className="whitespace-nowrap px-4 py-2 md:px-6 md:py-3 bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-pink-500 rounded-xl md:rounded-2xl font-black transition-all border-2 border-transparent hover:border-pink-100 flex items-center gap-2 text-xs md:text-base"
                          >
                            {(() => {
                              const Icon = ICON_MAP[scene.icon] || Sparkles;
                              return <Icon size={16} />;
                            })()}
                            {scene.chineseTitle}
                          </button>
                        ))}
                        {QUICK_SCENES.map(scene => (
                          <button
                            key={scene.id}
                            onClick={() => {
                              setSelectedQuickSceneId(scene.id);
                              setSelectedListeningId(null);
                              setSearchQuery('');
                            }}
                            className="whitespace-nowrap px-4 py-2 md:px-6 md:py-3 bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-pink-500 rounded-xl md:rounded-2xl font-black transition-all border-2 border-transparent hover:border-pink-100 flex items-center gap-2 text-xs md:text-base"
                          >
                            {(() => {
                              const Icon = ICON_MAP[scene.icon] || Sparkles;
                              return <Icon size={16} />;
                            })()}
                            {scene.chineseTitle}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {showDashboard ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black">家长中心</h2>
                  <button onClick={() => setShowDashboard(false)} className="text-pink-500 font-black flex items-center gap-2">
                    <ChevronLeft size={20} /> 返回大厅
                  </button>
                </div>

                <div className="flex gap-4 border-b-4 border-slate-100 pb-4">
                  <button 
                    onClick={() => setDashboardTab('overview')}
                    className={`px-6 py-2 rounded-full font-black text-sm transition-all ${
                      dashboardTab === 'overview' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-400 hover:text-pink-300'
                    }`}
                  >
                    学习概览
                  </button>
                  <button 
                    onClick={() => setDashboardTab('content')}
                    className={`px-6 py-2 rounded-full font-black text-sm transition-all ${
                      dashboardTab === 'content' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-400 hover:text-pink-300'
                    }`}
                  >
                    内容管理 (原型)
                  </button>
                </div>

                {dashboardTab === 'overview' ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-8 rounded-[40px] border-4 border-blue-100 shadow-sm">
                        <div className="flex items-center gap-3 text-blue-500 mb-4">
                          <Baby size={24} />
                          <span className="text-xl font-black">宝宝信息</span>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-wider">宝宝昵称</label>
                            <input 
                              type="text" 
                              value={babyName}
                              onChange={(e) => setBabyName(e.target.value)}
                              placeholder="输入宝宝名字"
                              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-400 rounded-xl px-4 py-2 font-bold outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-wider">宝宝年龄 (月)</label>
                            <input 
                              type="number" 
                              value={babyAge}
                              onChange={(e) => setBabyAge(Number(e.target.value))}
                              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-400 rounded-xl px-4 py-2 font-bold outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-8 rounded-[40px] border-4 border-pink-100 shadow-sm">
                        <div className="flex items-center gap-3 text-pink-500 mb-4">
                          <Heart size={24} fill="currentColor" />
                          <span className="text-xl font-black">我的收藏</span>
                        </div>
                        <p className="text-5xl font-black text-slate-800">{favorites.length}</p>
                        <p className="text-slate-400 font-bold mt-2">收藏的学习项目</p>
                      </div>
                      <div className="bg-white p-8 rounded-[40px] border-4 border-green-100 shadow-sm">
                        <div className="flex items-center gap-3 text-green-500 mb-4">
                          <CheckCircle2 size={24} />
                          <span className="text-xl font-black">学习进度</span>
                        </div>
                        <p className="text-5xl font-black text-slate-800">{Object.keys(progress).length}</p>
                        <p className="text-slate-400 font-bold mt-2">已完成的学习项目</p>
                      </div>
                    </div>

                    {favorites.length > 0 && (
                      <section>
                        <div className="flex items-center gap-2 mb-6">
                          <Heart className="text-pink-500" size={24} fill="currentColor" />
                          <h2 className="text-2xl font-black">收藏夹</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {CORE_ITEMS.filter(i => favorites.includes(i.id)).map(item => (
                            <ItemCard 
                              key={item.id} 
                              item={item} 
                              onClick={() => startLearning(item)}
                              isFavorite={true}
                              onFavorite={() => toggleFavorite(item.id)}
                              progress={progress[item.id] || 0}
                            />
                          ))}
                        </div>
                      </section>
                    )}
                  </>
                ) : (
                  <section className="bg-white rounded-[40px] p-8 border-4 border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-black mb-2">内容管理原型</h3>
                        <p className="text-slate-400 font-bold">管理所有学习项目及其属性</p>
                      </div>
                      <button 
                        onClick={() => alert('内容管理原型：此功能将允许您添加自定义学习项目。')}
                        className="bg-pink-500 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:bg-pink-600 transition-all"
                      >
                        <Sparkles size={20} />
                        添加新项目
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b-2 border-slate-50">
                            <th className="pb-4 font-black text-slate-400">项目名称</th>
                            <th className="pb-4 font-black text-slate-400">分类</th>
                            <th className="pb-4 font-black text-slate-400">阶段数</th>
                            <th className="pb-4 font-black text-slate-400">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {CORE_ITEMS.map(item => (
                            <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                              <td className="py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                                    {(() => {
                                      const Icon = ICON_MAP[item.icon] || Sun;
                                      return <Icon size={20} />;
                                    })()}
                                  </div>
                                  <div>
                                    <p className="font-black">{item.title}</p>
                                    <p className="text-xs text-slate-400 font-bold">{item.chineseTitle}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4">
                                <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-black text-slate-500">
                                  {item.subCategory}
                                </span>
                              </td>
                              <td className="py-4 font-bold text-slate-500">
                                {item.babyMaterials.length} 阶段
                              </td>
                              <td className="py-4">
                                <button className="text-pink-500 font-black hover:underline">编辑</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}
              </motion.div>
            ) : (
              <>
                {/* Breadcrumbs / Navigation Header */}
                {(selectedCategoryId || searchQuery) && (
                  <div className="flex items-center gap-2 mb-6 bg-white p-4 rounded-2xl border-4 border-slate-100">
                    <button 
                      onClick={() => {
                        setSelectedCategoryId(null);
                        setSelectedSubCategory(null);
                        setSelectedListeningId(null);
                        setSearchQuery('');
                      }}
                      className="text-slate-400 hover:text-pink-500 transition-colors"
                    >
                      <Home size={20} />
                    </button>
                    <ChevronRight size={16} className="text-slate-300" />
                    {selectedCategoryId && (
                      <>
                        <button 
                          onClick={() => setSelectedSubCategory(null)}
                          className={`font-black text-sm ${!selectedSubCategory ? 'text-pink-500' : 'text-slate-400 hover:text-pink-500'}`}
                        >
                          {currentCategory?.chineseTitle}
                        </button>
                        {selectedSubCategory && (
                          <>
                            <ChevronRight size={16} className="text-slate-300" />
                            <span className="font-black text-sm text-pink-500">{selectedSubCategory}</span>
                          </>
                        )}
                      </>
                    )}
                    {searchQuery && (
                      <>
                        <span className="font-black text-sm text-pink-500">搜索: {searchQuery}</span>
                      </>
                    )}
                  </div>
                )}

                {/* Quick Scene Detail */}
                {selectedQuickSceneId && (
                  (() => {
                    const subScene = SUB_SCENES.find(s => s.id === selectedQuickSceneId);
                    if (subScene) {
                      return (
                        <SubSceneView 
                          scene={subScene}
                          onBack={() => setSelectedQuickSceneId(null)}
                          onPlay={handlePlayAudio}
                          onStartLearning={startLearning}
                        />
                      );
                    }

                    if (quickSceneData && currentQuickScene) {
                      return (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6 md:space-y-10"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 md:gap-4">
                              <button 
                                onClick={() => setSelectedQuickSceneId(null)}
                                className="p-2 md:p-3 bg-white border-4 border-slate-100 rounded-xl md:rounded-2xl text-slate-400 hover:text-pink-500 transition-colors"
                              >
                                <ChevronLeft size={20} md:size={24} />
                              </button>
                              <div>
                                <h2 className="text-xl md:text-3xl font-black text-slate-800">{currentQuickScene.chineseTitle}</h2>
                                <p className="text-xs md:text-slate-400 font-bold text-slate-400">{currentQuickScene.title}</p>
                              </div>
                            </div>
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-white shrink-0 ${currentQuickScene.color}`}>
                              {(() => {
                                const Icon = ICON_MAP[currentQuickScene.icon] || Sparkles;
                                return (
                                  <>
                                    <Icon size={24} className="md:hidden" />
                                    <Icon size={32} className="hidden md:block" />
                                  </>
                                );
                              })()}
                            </div>
                          </div>

                          <section>
                            <div className="flex items-center gap-2 mb-4 md:mb-6">
                              <MessageCircle className="text-pink-500" size={20} md:size={24} />
                              <h3 className="text-lg md:text-2xl font-black">场景句库 (Sentence Library)</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                              {quickSceneData.sentences.map((s, idx) => (
                                <motion.div 
                                  key={idx}
                                  whileHover={{ scale: 1.02 }}
                                  className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border-4 border-slate-50 shadow-sm hover:shadow-md transition-all group"
                                >
                                  <div className="flex items-start justify-between gap-3 md:gap-4">
                                    <div className="flex-1">
                                      <span className="text-[8px] md:text-[10px] font-black text-pink-300 uppercase tracking-wider mb-1 block">
                                        From: {s.itemTitle}
                                      </span>
                                      <p className="text-base md:text-xl font-black text-slate-800 mb-0.5 md:mb-1 leading-tight">{s.english}</p>
                                      <p className="text-xs md:text-slate-500 font-bold text-slate-500">{s.chinese}</p>
                                    </div>
                                    <button 
                                      onClick={() => handlePlayAudio(s.audioText)}
                                      className="w-10 h-10 md:w-12 md:h-12 bg-pink-50 text-pink-500 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all shrink-0"
                                    >
                                      <Volume2 size={18} md:size={20} />
                                    </button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </section>

                          <section>
                            <div className="flex items-center gap-2 mb-4 md:mb-6">
                              <LayoutGrid className="text-blue-500" size={20} md:size={24} />
                              <h3 className="text-lg md:text-2xl font-black">扩展词汇 (Related Vocabulary)</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                              {quickSceneData.relatedItems.map(item => (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    startLearning(item);
                                    setSelectedQuickSceneId(null);
                                  }}
                                  className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border-4 border-slate-50 hover:border-blue-100 transition-all flex flex-col items-center gap-2 md:gap-3 group"
                                >
                                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-500 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                                    {(() => {
                                      const Icon = ICON_MAP[item.icon] || Sun;
                                      return <Icon size={20} md:size={24} />;
                                    })()}
                                  </div>
                                  <div className="text-center">
                                    <p className="font-black text-xs md:text-sm text-slate-800">{item.title}</p>
                                    <p className="text-[8px] md:text-[10px] text-slate-400 font-bold">{item.chineseTitle}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </section>
                        </motion.div>
                      );
                    }
                    return null;
                  })()
                )}
                {/* Listening Detail View */}
                {selectedListeningId && (
                  (() => {
                    const content = LISTENING_CONTENTS.find(c => c.id === selectedListeningId);
                    if (content) {
                      return (
                        <ListeningDetailView 
                          content={content}
                          onBack={() => setSelectedListeningId(null)}
                          preloadedUrl={preloadedAudio[content.id]}
                        />
                      );
                    }
                    return null;
                  })()
                )}

                {/* Level 1: Categories */}
                {!selectedCategoryId && !selectedQuickSceneId && !selectedListeningId && !searchQuery && (
                  <>
                    {/* Listening Time (磨耳朵时光) */}
                    {listeningSelection && (
                      <motion.section 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-12"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Music className="text-pink-500" size={20} md:size={24} />
                            <h2 className="text-xl md:text-2xl font-black">磨耳朵时光</h2>
                          </div>
                          <div className="flex items-center gap-4">
                            {babyName && (
                              <span className="hidden md:inline text-slate-400 font-bold text-xs md:text-base">
                                {babyName}的语感培养时刻
                              </span>
                            )}
                            <button 
                              onClick={() => setShowAllListening(!showAllListening)}
                              className="text-pink-500 font-black text-sm md:text-base hover:underline flex items-center gap-1"
                            >
                              {showAllListening ? '收起' : '查看全部'}
                              <ChevronRight size={16} className={`transition-transform ${showAllListening ? 'rotate-90' : ''}`} />
                            </button>
                          </div>
                        </div>

                        <AnimatePresence mode="wait">
                          {showAllListening ? (
                            <motion.div 
                              key="all-listening"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                              {LISTENING_CONTENTS.map(item => (
                                <button 
                                  key={item.id}
                                  onClick={() => setSelectedListeningId(item.id)}
                                  className="bg-white p-4 rounded-3xl border-4 border-slate-100 hover:border-pink-200 transition-all text-left flex gap-4 items-center group"
                                >
                                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                                    <img 
                                      src={item.coverImage} 
                                      alt={item.title}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-black text-slate-800 truncate">{item.chineseTitle}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-wider">{item.title}</p>
                                  </div>
                                  <div className="w-8 h-8 bg-pink-50 text-pink-500 rounded-lg flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors">
                                    <Play fill="currentColor" size={16} />
                                  </div>
                                </button>
                              ))}
                            </motion.div>
                          ) : (
                            <motion.button 
                              key="daily-listening"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => setSelectedListeningId(listeningSelection.id)}
                              className="w-full bg-white p-4 md:p-6 rounded-[40px] border-4 border-slate-100 shadow-xl hover:shadow-2xl transition-all group text-left flex flex-col md:flex-row gap-6 items-center"
                            >
                              <div className="w-full md:w-48 h-48 md:h-32 rounded-[32px] overflow-hidden shrink-0 relative">
                                <img 
                                  src={listeningSelection.coverImage} 
                                  alt={listeningSelection.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Play fill="white" size={32} className="text-white" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${listeningSelection.type === 'rhyme' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {listeningSelection.type === 'rhyme' ? '经典儿歌' : '迷你故事'}
                                  </span>
                                  <span className="text-slate-300 text-xs font-bold">每日更新</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">{listeningSelection.chineseTitle}</h3>
                                <p className="text-slate-500 font-bold text-sm line-clamp-2">
                                  {listeningSelection.type === 'rhyme' ? `核心句：${listeningSelection.coreSentence}` : listeningSelection.content.slice(0, 50) + '...'}
                                </p>
                              </div>
                              <div className="w-14 h-14 bg-pink-500 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                                <Play fill="currentColor" size={24} />
                              </div>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </motion.section>
                    )}

                    <section className="mb-8 md:mb-12">
                      <div className="flex items-center gap-2 mb-4 md:mb-6">
                        <Star className="text-yellow-500" size={20} md:size={24} />
                        <h2 className="text-xl md:text-2xl font-black">场景分类</h2>
                      </div>
                      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 no-scrollbar">
                        {CATEGORIES.map(cat => {
                          const Icon = ICON_MAP[cat.icon] || Sun;
                          return (
                            <motion.button
                              key={cat.id}
                              whileHover={{ y: -8, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setSelectedCategoryId(cat.id);
                                setSelectedSubCategory(null);
                                setSelectedQuickSceneId(null);
                                setSelectedListeningId(null);
                              }}
                              className="shrink-0 w-48 md:w-auto bg-white p-6 md:p-8 rounded-[32px] md:rounded-[48px] border-4 border-slate-100 hover:border-pink-200 transition-all flex flex-col items-center gap-4 md:gap-6 shadow-sm hover:shadow-xl group"
                            >
                              <div className={`w-16 h-16 md:w-24 md:h-24 rounded-[24px] md:rounded-[32px] flex items-center justify-center ${cat.color.split(' ')[0]} group-hover:scale-110 transition-transform`}>
                                <Icon size={32} className={`${cat.color.split(' ')[2]} md:hidden`} />
                                <Icon size={48} className={`${cat.color.split(' ')[2]} hidden md:block`} />
                              </div>
                              <div className="text-center">
                                <h3 className="text-lg md:text-2xl font-black text-slate-800 mb-0.5 md:mb-1">{cat.chineseTitle}</h3>
                                <p className="text-slate-400 font-bold text-[10px] md:text-sm">{cat.title}</p>
                              </div>
                              <div className="w-full pt-3 md:pt-4 border-t-2 border-slate-50 flex items-center justify-center gap-1 md:gap-2 text-pink-500 font-black text-xs md:text-base">
                                <span>进入探索</span>
                                <ChevronRight size={14} md:size={18} />
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </section>
                  </>
                )}

                {/* Level 2: Sub-categories */}
                {selectedCategoryId && !selectedSubCategory && !searchQuery && (
                  <motion.section 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${currentCategory?.color.split(' ')[0]}`}>
                          {(() => {
                            const Icon = ICON_MAP[currentCategory?.icon || ''] || Sun;
                            return <Icon size={24} className={currentCategory?.color.split(' ')[2]} />;
                          })()}
                        </div>
                        <div>
                          <h2 className="text-3xl font-black">{currentCategory?.chineseTitle}</h2>
                          <p className="text-slate-400 font-bold">{currentCategory?.description}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedCategoryId(null)}
                        className="p-3 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {subCategories.map(sub => (
                        <motion.button
                          key={sub}
                          whileHover={{ x: 10 }}
                          onClick={() => setSelectedSubCategory(sub)}
                          className="bg-white p-6 rounded-3xl border-4 border-slate-100 hover:border-pink-200 transition-all flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                              <LayoutGrid size={24} />
                            </div>
                            <span className="text-xl font-black text-slate-700">{sub}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300 group-hover:text-pink-500 transition-colors">
                            <span className="font-bold">
                              {CORE_ITEMS.filter(i => i.categoryId === selectedCategoryId && i.subCategory === sub).length} 个场景
                            </span>
                            <ChevronRight size={20} />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Level 3: Items List */}
                {(selectedSubCategory || searchQuery) && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        {!searchQuery && (
                          <button 
                            onClick={() => setSelectedSubCategory(null)}
                            className="p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-colors"
                          >
                            <ChevronLeft size={20} />
                          </button>
                        )}
                        <div className="flex items-center gap-2">
                          <BookOpen className="text-blue-500" size={24} />
                          <h2 className="text-2xl font-black">
                            {searchQuery ? `搜索: ${searchQuery}` : selectedSubCategory}
                          </h2>
                        </div>
                      </div>
                      <span className="text-slate-400 font-bold">{filteredItems.length} 个项目</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredItems.map(item => (
                        <ItemCard 
                          key={item.id} 
                          item={item} 
                          onClick={() => {
                            startLearning(item);
                            setSelectedQuickSceneId(null);
                            setSelectedListeningId(null);
                          }}
                          isFavorite={favorites.includes(item.id)}
                          onFavorite={() => toggleFavorite(item.id)}
                          progress={progress[item.id] || 0}
                        />
                      ))}
                    </div>
                  </motion.section>
                )}
              </>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="learning"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex flex-col"
          >
            {/* Learning Header */}
            <header className="bg-white border-b-4 border-slate-100 px-4 py-2 md:py-4 sticky top-0 z-50">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <button 
                  onClick={() => setIsLearning(false)}
                  className="p-2 md:p-3 bg-slate-50 text-slate-500 rounded-xl md:rounded-2xl hover:bg-slate-100 transition-colors"
                >
                  <ChevronLeft size={20} md:size={24} />
                </button>
                <div className="text-center">
                  <h2 className="text-lg md:text-xl font-black">{currentItem?.title}</h2>
                  <p className="text-[10px] md:text-xs text-slate-400 font-bold">{currentItem?.chineseTitle} · {currentItem?.subCategory}</p>
                </div>
                <div className="w-10 md:w-12" /> {/* Spacer */}
              </div>
            </header>

            {/* Track Switcher */}
            <div className="bg-white px-4 py-2 md:py-4 border-b-4 border-slate-100">
              <div className="max-w-md mx-auto bg-slate-50 p-1 rounded-xl md:rounded-2xl flex gap-1">
                <button 
                  onClick={() => setActiveTrack('baby')}
                  className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl font-black text-xs md:text-sm transition-all flex items-center justify-center gap-1 md:gap-2 ${
                    activeTrack === 'baby' ? 'bg-white text-pink-500 shadow-md' : 'text-slate-400'
                  }`}
                >
                  <Baby size={16} md:size={18} />
                  宝宝学习
                </button>
                <button 
                  onClick={() => setActiveTrack('parent')}
                  className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl font-black text-xs md:text-sm transition-all flex items-center justify-center gap-1 md:gap-2 ${
                    activeTrack === 'parent' ? 'bg-white text-blue-500 shadow-md' : 'text-slate-400'
                  }`}
                >
                  <Users size={16} md:size={18} />
                  家长指南
                </button>
              </div>
            </div>

            <main className="flex-1 max-w-5xl w-full mx-auto p-3 md:p-8">
              {activeTrack === 'baby' ? (
                <div className="flex flex-col items-center">
                  {/* Level Selector */}
                  <div className="flex gap-1.5 mb-6 md:mb-8 overflow-x-auto pb-2 w-full justify-start md:justify-center no-scrollbar">
                    {['L1', 'L2', 'L3', 'L4'].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => setCurrentLevel(lvl as any)}
                        className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full font-black text-[10px] md:text-sm whitespace-nowrap transition-all shrink-0 ${
                          currentLevel === lvl 
                            ? 'bg-pink-500 text-white shadow-lg' 
                            : 'bg-white text-slate-400 border-2 border-slate-100'
                        }`}
                      >
                        {lvl === 'L1' && '单词认知'}
                        {lvl === 'L2' && '基础短语'}
                        {lvl === 'L3' && '核心短句'}
                        {lvl === 'L4' && '生活表达'}
                      </button>
                    ))}
                  </div>

                  {/* Card Content */}
                  <motion.div 
                    key={currentLevel}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-2xl bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-12 shadow-xl border-4 md:border-8 border-white relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-pink-500" />
                    
                    {/* Image Area */}
                    <div className="w-full aspect-square md:aspect-video rounded-[24px] md:rounded-[32px] overflow-hidden mb-6 md:mb-10 bg-slate-50 relative border-2 md:border-4 border-slate-50">
                      <AnimatePresence mode="wait">
                        {isImageLoading ? (
                          <motion.div 
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
                          >
                            <RotateCw className="animate-spin text-pink-400 mb-3 md:mb-4" size={32} md:size={48} />
                            <p className="text-pink-400 font-black text-sm md:text-base">正在生成精美插画...</p>
                          </motion.div>
                        ) : (
                          <motion.img 
                            key={sceneImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            src={sceneImage || `https://picsum.photos/seed/${currentItem?.id}-${currentLevel}/800/600`}
                            alt="Learning"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Text Area */}
                    <div className="text-center mb-6 md:mb-10">
                      {currentMaterial?.phonetic && (
                        <p className="text-pink-400 font-bold mb-1 md:mb-2 text-sm md:text-lg">{currentMaterial.phonetic}</p>
                      )}
                      <h3 className="text-2xl md:text-6xl font-black text-slate-800 mb-2 md:mb-4 leading-tight">
                        {currentMaterial?.english}
                      </h3>
                      <div className="inline-block bg-pink-50 px-4 py-2 md:px-8 md:py-3 rounded-xl md:rounded-2xl">
                        <p className="text-lg md:text-2xl font-black text-pink-500">{currentMaterial?.chinese}</p>
                      </div>
                    </div>

                    {/* Play Button */}
                    <div className="flex flex-col gap-3 md:gap-4">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePlayAudio(currentMaterial?.audioText || '')}
                          disabled={isPlaying}
                          className={`flex-1 py-4 md:py-6 rounded-2xl md:rounded-3xl flex items-center justify-center gap-2 md:gap-4 font-black text-lg md:text-2xl shadow-lg transition-all ${
                            isPlaying ? 'bg-slate-100 text-slate-300' : 'bg-pink-500 text-white hover:bg-pink-600'
                          }`}
                        >
                          <Volume2 size={24} md:size={32} />
                          {isPlaying ? '正在朗读...' : '播放发音'}
                        </motion.button>
                        <button
                          onClick={() => setIsSlow(!isSlow)}
                          className={`px-4 md:px-6 rounded-2xl md:rounded-3xl font-black text-xs md:text-base transition-all border-2 md:border-4 ${
                            isSlow ? 'bg-yellow-400 border-yellow-500 text-white' : 'bg-white border-slate-100 text-slate-400'
                          }`}
                        >
                          {isSlow ? '慢速' : '正常'}
                        </button>
                      </div>

                      {currentLevel !== 'L4' ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            const levels: ('L1' | 'L2' | 'L3' | 'L4')[] = ['L1', 'L2', 'L3', 'L4'];
                            const currentIndex = levels.indexOf(currentLevel);
                            setCurrentLevel(levels[currentIndex + 1]);
                          }}
                          className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl bg-white border-2 md:border-4 border-pink-100 text-pink-500 font-black text-base md:text-xl flex items-center justify-center gap-2 shadow-md hover:border-pink-200 transition-all"
                        >
                          下一阶段
                          <Play size={16} md:size={20} />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (currentItem) {
                              updateProgress(currentItem.id);
                              confetti({
                                particleCount: 150,
                                spread: 70,
                                origin: { y: 0.6 },
                                colors: ['#FF9F1C', '#FFBF69', '#FFFFFF']
                              });
                              setIsLearning(false);
                            }
                          }}
                          className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-xl flex items-center justify-center gap-2 shadow-lg hover:bg-green-600 transition-all"
                        >
                          <CheckCircle2 size={24} />
                          完成学习
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto space-y-8 pb-20">
                  {/* Parent Guide Content */}
                  <section className="bg-white rounded-3xl p-8 shadow-md border-4 border-blue-50">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500">
                        <Volume2 size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-blue-600">发音要点</h3>
                    </div>
                    <ul className="space-y-3">
                      {currentItem?.parentGuide.pronunciation.points.map((p, i) => (
                        <li key={i} className="flex gap-3 text-slate-600 font-bold">
                          <span className="w-6 h-6 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i+1}</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="bg-white rounded-3xl p-8 shadow-md border-4 border-yellow-50">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-500">
                        <Lightbulb size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-yellow-600">教学技巧</h3>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-black text-yellow-600 uppercase tracking-wider mb-2">如何引入</h4>
                        <p className="text-slate-600 font-bold">{currentItem?.parentGuide.tips.intro}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-yellow-600 uppercase tracking-wider mb-2">如何重复</h4>
                        <p className="text-slate-600 font-bold">{currentItem?.parentGuide.tips.repeat}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-yellow-600 uppercase tracking-wider mb-2">如何扩展</h4>
                        <p className="text-slate-600 font-bold">{currentItem?.parentGuide.tips.expand}</p>
                      </div>
                    </div>
                  </section>

                  <section className="bg-white rounded-3xl p-8 shadow-md border-4 border-green-50">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-500">
                        <Gamepad2 size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-green-600">亲子活动 (5分钟)</h3>
                    </div>
                    <div className="bg-green-50 p-6 rounded-2xl mb-4">
                      <h4 className="text-xl font-black text-green-700 mb-2">{currentItem?.parentGuide.activities.title}</h4>
                      <p className="text-slate-600 font-bold mb-4">{currentItem?.parentGuide.activities.instruction}</p>
                      <div className="flex gap-2 items-start text-green-600 font-bold text-sm">
                        <Sparkles size={16} className="mt-1 flex-shrink-0" />
                        <span>扩展：{currentItem?.parentGuide.activities.expansion}</span>
                      </div>
                    </div>
                  </section>

                  <section className="bg-white rounded-3xl p-8 shadow-md border-4 border-purple-50">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-500">
                        <MessageCircle size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-purple-600">生活应用场景</h3>
                    </div>
                    <ul className="space-y-3">
                      {currentItem?.parentGuide.scenarios.map((s, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-600 font-bold">
                          <div className="w-2 h-2 bg-purple-300 rounded-full" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="bg-white rounded-3xl p-8 shadow-md border-4 border-pink-50">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500">
                        <Info size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-pink-600">延伸资源</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                        <Music className="text-pink-400" size={20} />
                        <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase">儿歌</p>
                          <p className="text-sm font-bold">{currentItem?.parentGuide.resources.song}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                        <Book className="text-pink-400" size={20} />
                        <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase">绘本</p>
                          <p className="text-sm font-bold">{currentItem?.parentGuide.resources.book}</p>
                        </div>
                      </div>
                      {currentItem?.parentGuide.resources.craft && (
                        <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3 md:col-span-2">
                          <Scissors className="text-pink-400" size={20} />
                          <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase">手工</p>
                            <p className="text-sm font-bold">{currentItem?.parentGuide.resources.craft}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
