
import React, { useMemo, useState, useEffect } from 'react';
import { rawData } from './data';
import { InjectionCycle } from './types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ReferenceLine, AreaChart, Area 
} from 'recharts';
import { 
  Activity, TrendingDown, Info, AlertTriangle, 
  BarChart3, Syringe, CalendarDays
} from 'lucide-react';

const App: React.FC = () => {
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

  useEffect(() => {
    if (cycles.length > 0 && selectedCycle === null) {
      setSelectedCycle(cycles[cycles.length - 1].index);
    }
  }, [cycles, selectedCycle]);

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
    <div className="min-h-screen bg-slate-50 pb-28 font-sans text-slate-900 overflow-x-hidden">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-indigo-600 text-white px-4 py-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6" />
          <h1 className="text-lg font-bold">憨憨血糖管家</h1>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
          <span className="text-xs font-bold">{overallStats.latest} mmol/L</span>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">全周期平均</p>
            <span className="text-2xl font-black text-indigo-600 leading-none">{overallStats.avg}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">历史最低</p>
            <span className="text-2xl font-black text-emerald-500 leading-none">{overallStats.min}</span>
          </div>
        </div>

        {/* Global Trend */}
        <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-sm font-bold flex items-center gap-1.5 text-slate-700 mb-4">
            <BarChart3 className="w-4 h-4 text-indigo-500" />
            历史波动趋势
          </h2>
          <div className="h-40 w-full">
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
                <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                <ReferenceLine y={4} stroke="#10b981" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Cycle Selector */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase px-1">切换针次</h3>
          <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar px-1">
            {cycles.map((cycle) => (
              <button
                key={cycle.index}
                onClick={() => setSelectedCycle(cycle.index)}
                className={`flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all ${
                  selectedCycle === cycle.index 
                  ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-slate-500 border border-slate-200'
                }`}
              >
                <span className="text-[8px] font-bold opacity-70">针</span>
                <span className="text-lg font-black">{cycle.index}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Cycle Analysis */}
        {activeCycle && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-5 rounded-3xl text-white shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-black">第 {activeCycle.index} 针分析</h4>
                  <p className="text-xs opacity-80 flex items-center gap-1 mt-1">
                    <CalendarDays className="w-3 h-3" /> {activeCycle.startDate}
                  </p>
                </div>
                <div className="bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm text-center">
                  <span className="block text-[8px] font-bold opacity-70">剂量</span>
                  <span className="text-lg font-black">{activeCycle.dose}u</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 bg-black/10 p-3 rounded-2xl">
                <div className="text-center border-r border-white/10">
                  <span className="text-[9px] block opacity-70">最低</span>
                  <span className={`font-bold ${activeCycle.nadir && activeCycle.nadir < 4 ? 'text-red-300' : 'text-emerald-300'}`}>{activeCycle.nadir}</span>
                </div>
                <div className="text-center border-r border-white/10">
                  <span className="text-[9px] block opacity-70">最高</span>
                  <span className="font-bold">{activeCycle.max}</span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] block opacity-70">均值</span>
                  <span className="font-bold">{activeCycle.avg}</span>
                </div>
              </div>
            </div>

            {/* List of measurements */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase px-1">测量明细</h3>
              {activeCycle.records.map((r, i) => (
                <div key={i} className={`p-4 rounded-2xl bg-white border border-slate-100 flex items-center justify-between ${r.isInjection ? 'ring-2 ring-indigo-500/20 bg-indigo-50/30' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-[10px] ${r.isInjection ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {r.label}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">{r.time}</p>
                      <p className="text-[9px] text-slate-400">{r.date.split('/')[1]}/{r.date.split('/')[2]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-black ${r.value < 4 ? 'text-rose-500' : r.value > 12 ? 'text-amber-500' : 'text-slate-800'}`}>
                      {r.value}
                    </span>
                    {r.value < 4 && <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex gap-3">
          <Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <p className="text-[11px] text-indigo-700 leading-relaxed">
            依柯周效胰岛素生效较慢，一般在第3-4天血糖降至最低。测量值低于4.0需预防低血糖。
          </p>
        </div>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-3 shadow-2xl flex items-center justify-between border border-white/10">
          <div className="flex items-center gap-3 pl-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              <Activity className="w-4 h-4" />
            </div>
            <div className="text-white">
              <p className="text-[9px] opacity-50 font-medium">最后测量</p>
              <p className="text-sm font-bold">{overallStats.latest} mmol/L</p>
            </div>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-xs font-black"
          >
            返回顶部
          </button>
        </div>
      </nav>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default App;
