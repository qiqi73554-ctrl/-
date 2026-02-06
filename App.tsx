
import React, { useMemo, useState, useEffect } from 'react';
import { rawData } from './data';
import { InjectionCycle, GlucoseRecord } from './types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ReferenceLine, AreaChart, Area 
} from 'recharts';
import { 
  Activity, TrendingDown, ChevronRight, Info, AlertTriangle, 
  BarChart3, Pill, CalendarDays, Syringe, ChevronLeft
} from 'lucide-react';

const App: React.FC = () => {
  // Default to the latest cycle
  const [selectedCycle, setSelectedCycle] = useState<number | null>(null);

  const cycles = useMemo(() => {
    const result: InjectionCycle[] = [];
    let currentCycle: InjectionCycle | null = null;

    rawData.forEach((record) => {
      if (record.isInjection && record.injectionIndex) {
        if (currentCycle) {
          result.push({
            ...currentCycle,
            min: Math.min(...currentCycle.records.map(r => r.value)),
            max: Math.max(...currentCycle.records.map(r => r.value)),
            avg: Number((currentCycle.records.reduce((acc, r) => acc + r.value, 0) / currentCycle.records.length).toFixed(1)),
            nadir: Math.min(...currentCycle.records.map(r => r.value)),
          });
        }
        currentCycle = {
          index: record.injectionIndex,
          startDate: record.date,
          startValue: record.value,
          dose: record.injectionDose || 0,
          records: [record],
          min: record.value,
          max: record.value,
          avg: record.value,
          nadir: record.value
        };
      } else if (currentCycle) {
        currentCycle.records.push(record);
      }
    });

    if (currentCycle) {
      result.push({
        ...currentCycle,
        min: Math.min(...currentCycle.records.map(r => r.value)),
        max: Math.max(...currentCycle.records.map(r => r.value)),
        avg: Number((currentCycle.records.reduce((acc, r) => acc + r.value, 0) / currentCycle.records.length).toFixed(1)),
        nadir: Math.min(...currentCycle.records.map(r => r.value)),
      });
    }

    return result;
  }, []);

  // Set default cycle to the last one on mount
  useEffect(() => {
    if (cycles.length > 0 && selectedCycle === null) {
      setSelectedCycle(cycles[cycles.length - 1].index);
    }
  }, [cycles]);

  const overallStats = useMemo(() => {
    const values = rawData.map(r => r.value);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)),
      latest: rawData[rawData.length - 1].value
    };
  }, []);

  const activeCycle = useMemo(() => {
    return cycles.find(c => c.index === selectedCycle) || null;
  }, [cycles, selectedCycle]);

  const chartData = rawData.map((r, i) => ({
    name: `${r.date.split('/')[1]}/${r.date.split('/')[2]}`,
    value: r.value,
    isInjection: r.isInjection,
    dose: r.injectionDose,
    index: i
  }));

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900 overflow-x-hidden">
      {/* Mobile Sticky Header */}
      <header className="sticky top-0 z-40 bg-indigo-600 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6" />
          <h1 className="text-lg font-bold">憨憨血糖管家</h1>
        </div>
        <div className="flex items-center gap-2 text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-md">
          <span className="opacity-80">当前:</span>
          <span className="font-bold">{overallStats.latest} mmol/L</span>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        
        {/* Quick Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">历史平均</p>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-black text-indigo-600 leading-none">{overallStats.avg}</span>
              <span className="text-[10px] text-slate-400 font-medium">mmol/L</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">最低点</p>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-black text-emerald-500 leading-none">{overallStats.min}</span>
              <span className="text-[10px] text-slate-400 font-medium">mmol/L</span>
            </div>
          </div>
        </section>

        {/* Master Trend Chart */}
        <section className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold flex items-center gap-1.5 text-slate-700">
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              历史波动全景
            </h2>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" hide />
                <YAxis hide domain={[0, 22]} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2} 
                />
                <ReferenceLine y={4} stroke="#10b981" strokeDasharray="5 5" strokeWidth={1} />
                <ReferenceLine y={10} stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Horizontal Cycle Selector */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5 px-1">
            <Syringe className="w-3.5 h-3.5" /> 切换注射针次
          </h3>
          <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 scrollbar-hide no-scrollbar">
            {cycles.map((cycle) => (
              <button
                key={cycle.index}
                onClick={() => setSelectedCycle(cycle.index)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all border ${
                  selectedCycle === cycle.index 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105' 
                  : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <span className={`text-[10px] font-bold mb-0.5 ${selectedCycle === cycle.index ? 'text-indigo-200' : 'text-slate-400'}`}>针</span>
                <span className="text-xl font-black">{cycle.index}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Selected Cycle Details */}
        {activeCycle && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
            {/* Cycle Header Stats */}
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-5 rounded-3xl text-white shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-black mb-0.5">第 {activeCycle.index} 针分析</h4>
                  <div className="flex items-center gap-1.5 text-indigo-100 text-xs opacity-90">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {activeCycle.startDate} 开始
                  </div>
                </div>
                <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm">
                  <span className="block text-[10px] uppercase font-bold opacity-80 mb-0.5 text-center">剂量</span>
                  <span className="text-lg font-black">{activeCycle.dose}u</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 bg-black/10 p-3 rounded-2xl">
                <div className="text-center border-r border-white/10">
                  <span className="text-[10px] block opacity-70">最高</span>
                  <span className="font-bold">{activeCycle.max}</span>
                </div>
                <div className="text-center border-r border-white/10">
                  <span className="text-[10px] block opacity-70">最低</span>
                  <span className={`font-bold ${activeCycle.nadir && activeCycle.nadir < 4 ? 'text-red-300' : 'text-emerald-300'}`}>
                    {activeCycle.nadir}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] block opacity-70">平均</span>
                  <span className="font-bold">{activeCycle.avg}</span>
                </div>
              </div>
            </div>

            {/* Sub Trend Chart */}
            <section className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />
                本周波动变化曲线
              </h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeCycle.records}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="label" fontSize={9} tick={{fill: '#94a3b8'}} axisLine={false} />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#6366f1" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} 
                    />
                    <ReferenceLine y={4} stroke="#10b981" strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Simplified Mobile Records List */}
            <section className="space-y-2">
               <h3 className="text-xs font-bold text-slate-400 uppercase px-1">详细测量记录</h3>
               {activeCycle.records.map((record, idx) => (
                 <div key={idx} className={`p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between ${record.isInjection ? 'ring-2 ring-indigo-500/20 bg-indigo-50/30' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        record.isInjection ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {record.label}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-700">{record.time}</span>
                          {record.isInjection && <span className="bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter">打针</span>}
                        </div>
                        <p className="text-[10px] text-slate-400">{record.date.replace('2025/', '')}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                       <span className={`text-xl font-black ${
                         record.value < 4 ? 'text-rose-500' : 
                         record.value > 12 ? 'text-amber-500' : 'text-slate-800'
                       }`}>
                         {record.value}
                       </span>
                       {record.value < 4 && <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />}
                    </div>
                 </div>
               ))}
            </section>
          </div>
        )}

        {/* Suggestion Card */}
        <section className="bg-indigo-50 p-4 rounded-3xl border border-indigo-100 flex gap-3">
          <div className="bg-indigo-200/50 p-2 h-fit rounded-xl">
            <Info className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-indigo-900 mb-1">小贴士</h4>
            <p className="text-xs text-indigo-700/80 leading-relaxed">
              从数据看，憨憨对胰岛素很敏感。如果测量值低于 4.0，请及时喂食一些主食罐补充能量。
            </p>
          </div>
        </section>

      </main>

      {/* Floating Bottom Nav for Mobile */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-3 shadow-2xl flex items-center justify-between border border-white/10">
          <div className="flex items-center gap-3 pl-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-white/50 font-medium leading-none">最后一次测量</p>
              <p className="text-sm font-bold text-white">{overallStats.latest} <span className="text-[8px] opacity-60">mmol/L</span></p>
            </div>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
          >
            返回顶部
          </button>
        </div>
      </nav>

      {/* Tailwind Style Patch for Hiding Scrollbars */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
