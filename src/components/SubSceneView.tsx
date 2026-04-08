import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronLeft, Play, Sparkles, BookOpen, LayoutGrid } from 'lucide-react';
import { SubSceneData, LearningItem, BabyMaterial } from '../types';
import { CORE_ITEMS } from '../constants';

interface TrinityCardProps {
  item: LearningItem;
  onPlay: (text: string) => void;
  onStartLearning: (item: LearningItem) => void;
}

const TrinityCard: React.FC<TrinityCardProps> = ({ item, onPlay, onStartLearning }) => {
  const l1 = item.babyMaterials.find(m => m.level === 'L1');
  const l2 = item.babyMaterials.find(m => m.level === 'L2');
  const l3 = item.babyMaterials.find(m => m.level === 'L3');

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="min-w-[280px] md:min-w-[320px] bg-white rounded-[32px] shadow-xl border-4 border-slate-50 overflow-hidden flex flex-col"
    >
      {/* Part A: Core Word */}
      <div className="p-5 border-b-2 border-slate-50 bg-slate-50/30">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-pink-500 text-white text-[10px] font-black rounded-full uppercase tracking-wider">Part A</span>
          <button onClick={() => onPlay(l1?.audioText || '')} className="p-2 bg-white rounded-full shadow-sm text-pink-500">
            <Volume2 size={18} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-inner overflow-hidden shrink-0">
            <img 
              src={`https://picsum.photos/seed/${item.id}-L1/200/200`} 
              alt={l1?.english} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h4 className="text-xl font-black text-slate-800">{l1?.english}</h4>
            <p className="text-sm font-bold text-slate-400">{l1?.chinese}</p>
          </div>
        </div>
      </div>

      {/* Part B: Phrase */}
      <div className="p-5 border-b-2 border-slate-50">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-black rounded-full uppercase tracking-wider">Part B</span>
          <button onClick={() => onPlay(l2?.audioText || '')} className="p-2 bg-slate-50 rounded-full text-blue-500">
            <Volume2 size={18} />
          </button>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-black text-slate-700">{l2?.english}</p>
          <p className="text-sm font-bold text-slate-400">{l2?.chinese}</p>
        </div>
      </div>

      {/* Part C: Sentence */}
      <div className="p-5 flex-1 bg-slate-50/10">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black rounded-full uppercase tracking-wider">Part C</span>
          <button onClick={() => onPlay(l3?.audioText || '')} className="p-2 bg-white rounded-full shadow-sm text-green-500">
            <Volume2 size={18} />
          </button>
        </div>
        <div className="space-y-1 mb-4">
          <p className="text-base font-black text-slate-600 leading-tight">{l3?.english}</p>
          <p className="text-xs font-bold text-slate-400">{l3?.chinese}</p>
        </div>
        
        <button 
          onClick={() => onStartLearning(item)}
          className="w-full py-3 bg-slate-800 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors"
        >
          深度学习
          <Play size={14} fill="currentColor" />
        </button>
      </div>
    </motion.div>
  );
};

interface SubSceneViewProps {
  scene: SubSceneData;
  onBack: () => void;
  onPlay: (text: string) => void;
  onStartLearning: (item: LearningItem) => void;
}

export const SubSceneView: React.FC<SubSceneViewProps> = ({ scene, onBack, onPlay, onStartLearning }) => {
  const [activeBottomTab, setActiveBottomTab] = useState(scene.bottomCategories[0]?.tag);

  const coreItems = scene.coreTrinityCards
    .map(id => CORE_ITEMS.find(item => item.id === id))
    .filter((item): item is LearningItem => !!item);

  const extendedItems = CORE_ITEMS.filter(item => 
    item.tags.includes(activeBottomTab) && !scene.coreTrinityCards.includes(item.id)
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className={`${scene.color} text-white px-4 py-4 md:py-6 sticky top-0 z-50 shadow-lg`}>
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-black">{scene.chineseTitle}</h2>
            <p className="text-xs md:text-sm font-bold opacity-80 uppercase tracking-widest">{scene.title}</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-10 md:space-y-16">
        
        {/* Section 1: Top Sentences (Practical Library) */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500">
              <Sparkles size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-800">实用句库 (Sentences)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {scene.topSentences.map((s, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-sm border-2 border-slate-100 flex items-center justify-between group hover:border-pink-200 transition-all"
              >
                <div className="flex-1">
                  <p className="text-lg font-black text-slate-700 group-hover:text-pink-600 transition-colors">{s.english}</p>
                  <p className="text-sm font-bold text-slate-400">{s.chinese}</p>
                </div>
                <button 
                  onClick={() => onPlay(s.audioText)}
                  className="p-3 bg-pink-50 text-pink-500 rounded-xl hover:bg-pink-100 transition-colors"
                >
                  <Volume2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 2: Core Trinity Cards */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500">
              <BookOpen size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-800">核心概念 (Trinity Cards)</h3>
          </div>
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 gap-4 md:gap-6 no-scrollbar">
            {coreItems.map(item => (
              <TrinityCard 
                key={item.id} 
                item={item} 
                onPlay={onPlay} 
                onStartLearning={onStartLearning} 
              />
            ))}
          </div>
        </section>

        {/* Section 3: Bottom Categorized Extension */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-500">
              <LayoutGrid size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-800">扩展图库 (Extended Library)</h3>
          </div>
          
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
            {scene.bottomCategories.map(cat => (
              <button
                key={cat.tag}
                onClick={() => setActiveBottomTab(cat.tag)}
                className={`px-6 py-2.5 rounded-full font-black text-sm whitespace-nowrap transition-all ${
                  activeBottomTab === cat.tag 
                    ? 'bg-slate-800 text-white shadow-lg' 
                    : 'bg-white text-slate-400 border-2 border-slate-100 hover:border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatePresence mode="wait">
              {extendedItems.length > 0 ? (
                extendedItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => onStartLearning(item)}
                    className="bg-white p-3 rounded-[24px] shadow-sm border-2 border-slate-100 hover:border-pink-200 transition-all cursor-pointer group"
                  >
                    <div className="aspect-square rounded-2xl bg-slate-50 overflow-hidden mb-3">
                      <img 
                        src={`https://picsum.photos/seed/${item.id}/300/300`} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h4 className="font-black text-slate-800 text-center">{item.title}</h4>
                    <p className="text-xs font-bold text-slate-400 text-center">{item.chineseTitle}</p>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-slate-400 font-bold">暂无更多相关内容</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>

      </main>
    </div>
  );
};
