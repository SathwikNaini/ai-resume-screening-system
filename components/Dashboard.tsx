
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Candidate, SessionState } from '../types';
import { 
  Trophy, Users, CheckCircle2, FileSearch, BarChart2, 
  PieChart as PieIcon, ArrowRight, Zap, Search, X, 
  Layers, Filter, ChevronDown, CheckCircle, AlertCircle, 
  Hash, Mail, Star, ShieldAlert, Gauge
} from 'lucide-react';

interface DashboardProps {
  session: SessionState;
  onSelect: (id: string) => void;
  selectedForComparison: string[];
  onToggleComparison: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ session, onSelect, selectedForComparison, onToggleComparison }) => {
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score');
  const [searchQuery, setSearchQuery] = useState('');
  
  const completed = session.results;
  const metrics = session.metrics;

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return completed;
    const query = searchQuery.toLowerCase();
    return completed.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.email.toLowerCase().includes(query)
    );
  }, [completed, searchQuery]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'score') return (b.analysis?.suitability_score || 0) - (a.analysis?.suitability_score || 0);
      return a.name.localeCompare(b.name);
    });
  }, [filtered, sortBy]);
  
  const chartData = useMemo(() => 
    sorted.slice(0, 10).map(c => ({
      name: c.name.split(' ')[0],
      score: c.analysis?.suitability_score || 0
    })),
    [sorted]
  );

  const verdictDistribution = useMemo(() => {
    const dist = filtered.reduce((acc, c) => {
      const v = c.analysis?.verdict || 'Other';
      acc[v] = (acc[v] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(dist).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
  const PIE_COLORS: Record<string, string> = {
    'Strong Fit': '#10b981',
    'Moderate Fit': '#f59e0b',
    'Not Suitable': '#ef4444'
  };

  const getScoreColor = (score: number) => score >= 75 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500';
  const getVerdictStyles = (v: string) => {
    switch(v) {
      case 'Strong Fit': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Moderate Fit': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-rose-50 text-rose-700 border-rose-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] border flex items-center space-x-3 sm:space-x-4 shadow-sm">
          <div className="p-2 sm:p-3 bg-blue-50 text-blue-600 rounded-xl sm:rounded-2xl shrink-0"><Users size={20} /></div>
          <div className="min-w-0">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1 truncate">Total Pool</p>
            <p className="text-xl sm:text-2xl font-black text-slate-800">{metrics.totalApplicants}</p>
          </div>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] border flex items-center space-x-3 sm:space-x-4 shadow-sm">
          <div className="p-2 sm:p-3 bg-indigo-50 text-indigo-600 rounded-xl sm:rounded-2xl shrink-0"><Zap size={20} /></div>
          <div className="min-w-0">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1 truncate">Analyzed</p>
            <p className="text-xl sm:text-2xl font-black text-slate-800">{metrics.processed}</p>
          </div>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] border flex items-center space-x-3 sm:space-x-4 shadow-sm">
          <div className="p-2 sm:p-3 bg-amber-50 text-amber-600 rounded-xl sm:rounded-2xl shrink-0"><Trophy size={20} /></div>
          <div className="min-w-0">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1 truncate">Top Match</p>
            <p className="text-xl sm:text-2xl font-black text-slate-800">{metrics.topScore}%</p>
          </div>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] border flex items-center space-x-3 sm:space-x-4 shadow-sm">
          <div className="p-2 sm:p-3 bg-emerald-50 text-emerald-600 rounded-xl sm:rounded-2xl shrink-0"><CheckCircle2 size={20} /></div>
          <div className="min-w-0">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1 truncate">Avg Match</p>
            <p className="text-xl sm:text-2xl font-black text-slate-800">{metrics.averageScore}%</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        {/* Main Rankings Section */}
        <div className="lg:col-span-8 w-full flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-6 rounded-[24px] border shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-100 rounded-lg"><Filter size={16} className="text-slate-500"/></div>
              <h3 className="font-black text-xs text-slate-400 uppercase tracking-widest">Decision Rankings</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name..."
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1 text-[10px] font-black uppercase">
                <button onClick={()=>setSortBy('score')} className={`px-4 py-2 rounded-lg transition-all ${sortBy==='score'?'bg-white text-indigo-600 shadow-sm border border-indigo-100':'text-slate-500 hover:bg-slate-100'}`}>Score</button>
                <button onClick={()=>setSortBy('name')} className={`px-4 py-2 rounded-lg transition-all ${sortBy==='name'?'bg-white text-indigo-600 shadow-sm border border-indigo-100':'text-slate-500 hover:bg-slate-100'}`}>Name</button>
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sorted.map((c, i) => (
                <div 
                  key={c.id} 
                  className={`bg-white rounded-[32px] border transition-all duration-300 group hover:shadow-2xl hover:border-indigo-200 flex flex-col p-6 space-y-6 relative overflow-hidden ${selectedForComparison.includes(c.id) ? 'border-indigo-500 ring-2 ring-indigo-50 shadow-xl' : 'border-slate-100'}`}
                >
                  <div className="absolute -top-2 -left-2 w-12 h-12 bg-slate-900 text-white flex items-center justify-center font-black rounded-br-2xl text-[10px] z-10 shadow-lg">#{i + 1}</div>

                  <div className="flex justify-between items-start pt-2">
                    <div className="flex flex-col min-w-0 pr-4">
                      <h4 className="font-black text-slate-800 text-base truncate flex items-center">
                        {c.name}
                        {c.analysis?.verdict === 'Strong Fit' && <Star size={14} className="ml-2 text-amber-500 fill-amber-500" />}
                      </h4>
                      <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase mt-1">
                        <Mail size={12} className="mr-1.5 shrink-0" />
                        <span className="truncate">{c.email}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <input 
                        type="checkbox" 
                        checked={selectedForComparison.includes(c.id)} 
                        onChange={() => onToggleComparison(c.id)}
                        className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer mb-2"
                      />
                      <span className={`px-2.5 py-1 text-[9px] font-black rounded-full uppercase border shadow-sm ${getVerdictStyles(c.analysis?.verdict || '')}`}>
                        {c.analysis?.verdict}
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Score Display */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-end">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Match</span>
                        <span className="text-xs font-black text-slate-800">{c.analysis?.suitability_score}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${getScoreColor(c.analysis?.suitability_score || 0)}`} style={{ width: `${c.analysis?.suitability_score}%` }} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-end">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Confidence</span>
                        <span className="text-xs font-black text-indigo-600">{c.analysis?.ai_confidence_score}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-indigo-50 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${c.analysis?.ai_confidence_score}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Preview Insight */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 min-h-[60px] flex items-center">
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic line-clamp-2">"{c.analysis?.rank_explanation}"</p>
                  </div>

                  {/* Risks Preview */}
                  {c.analysis && c.analysis.risk_flags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                       {c.analysis.risk_flags.slice(0, 2).map((risk, idx) => (
                         <div key={idx} className="flex items-center px-2 py-1 bg-rose-50 text-rose-600 rounded-lg text-[8px] font-black border border-rose-100 uppercase">
                           <ShieldAlert size={10} className="mr-1"/> {risk}
                         </div>
                       ))}
                    </div>
                  )}

                  <button 
                    onClick={() => onSelect(c.id)}
                    className="w-full py-4 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center group/btn shadow-sm"
                  >
                    Analyze Decision Flow <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[40px] border shadow-sm flex flex-col items-center justify-center p-20 text-center space-y-4">
              <div className="p-6 bg-slate-50 rounded-full"><FileSearch size={48} className="text-slate-300" /></div>
              <div className="space-y-2">
                <p className="text-base font-black text-slate-800">No Match Profiles</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Run a screening session to generate AI decision rankings.</p>
              </div>
            </div>
          )}
        </div>

        {/* Analytics Sidebar */}
        <div className="lg:col-span-4 w-full flex flex-col gap-8 lg:sticky lg:top-24">
          <div className="bg-white p-6 sm:p-8 rounded-[40px] border shadow-sm flex flex-col h-[380px] sm:h-[400px]">
            <h3 className="font-black text-xs text-slate-400 uppercase mb-8 flex items-center tracking-widest shrink-0">
              <BarChart2 size={16} className="mr-2 text-indigo-500"/> Skill Curve
            </h3>
            <div className="flex-1 min-h-0 relative">
              {completed.length > 0 && chartData.length > 0 ? (
                <div className="h-[250px] lg:h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" fontSize={9} interval={0} tick={{ fill: '#64748b' }} />
                      <YAxis fontSize={9} domain={[0, 100]} tick={{ fill: '#64748b' }} />
                      <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={16}>
                        {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-5"><BarChart2 size={60}/></div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-[40px] border shadow-sm h-[380px] sm:h-[400px] flex flex-col">
            <h3 className="font-black text-xs text-slate-400 uppercase mb-8 flex items-center tracking-widest shrink-0">
              <PieIcon size={16} className="mr-2 text-indigo-500"/> Decision Distribution
            </h3>
            <div className="flex-1 min-h-0 relative">
              {completed.length > 0 && verdictDistribution.length > 0 ? (
                <div className="h-[250px] lg:h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={verdictDistribution} 
                        innerRadius={50} 
                        outerRadius={70} 
                        paddingAngle={6} 
                        dataKey="value"
                        animationDuration={1000}
                      >
                        {verdictDistribution.map(entry => (
                          <Cell key={entry.name} fill={PIE_COLORS[entry.name] || '#6366f1'} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-5"><PieIcon size={60}/></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
