
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 p-4">
      <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200">
        <h2 className="text-3xl font-black mb-4 text-indigo-700 uppercase tracking-tight">Smart-ATS v5.0: Next-Gen XDI</h2>
        <p className="text-slate-600 leading-relaxed font-medium">
          The <strong>Smart-ATS v5.0 Architecture</strong> represents a paradigm shift from traditional keyword-based screening to <strong>Semantic Decision Intelligence (SDI)</strong>. By leveraging advanced zero-shot reasoning, the system doesn't just "match" text—it understands the conceptual depth of a candidate's journey, predicts their onboarding success, and audits its own decisions for potential bias.
        </p>
      </section>

      <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black mb-6 text-indigo-700 uppercase tracking-tight">v5.0 Decision Pillars</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4">Semantic Reasoning</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-3 text-xs font-bold leading-relaxed">
              <li>Contextual Similarity Analysis (0-100%)</li>
              <li>Job Description Complexity Weighting</li>
              <li>Skill Redundancy & Breadth Detection</li>
              <li>Hierarchical Multi-Role Fit Scoring</li>
            </ul>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4">Explainability & Trust</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-3 text-xs font-bold leading-relaxed">
              <li>Human-Readable Score Formula Logic</li>
              <li>Predictive Readiness Timeline (Onboarding ROI)</li>
              <li>Overqualification Attrition Risk Detector</li>
              <li>Professional Constructive Rejection Audit</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black mb-6 text-indigo-700 uppercase tracking-tight">Decision Ethics Protocol</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-6 py-2">
            <p className="font-black text-sm uppercase text-slate-800">Bias-Neutral Processing</p>
            <p className="text-slate-600 italic text-xs mt-2 font-medium leading-relaxed">
              Each analysis includes a Mandatory Bias Check. The model is explicitly instructed to ignore demographic signals (name, location, gender-coded language) and focus entirely on technical competency and project outcomes.
            </p>
          </div>
          <div className="border-l-4 border-indigo-500 pl-6 py-2">
            <p className="font-black text-sm uppercase text-slate-800">Predictive Calibration</p>
            <p className="text-slate-600 italic text-xs mt-2 font-medium leading-relaxed">
              The 'Readiness Timeline' utilizes Bayesian logic to estimate the time-to-productivity for a candidate based on their existing skill overlap with the core JD requirements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
