import React, { useState } from "react";
import { Sparkles, Terminal, ShieldAlert, Cpu, FileText, ArrowRight, Check } from "lucide-react";
import { IntelResponse, ResearchArticle, CategoryId } from "../types";

interface ArcIntelligenceProps {
  onPublishArticle: (newArticle: ResearchArticle) => void;
}

export default function ArcIntelligence({ onPublishArticle }: ArcIntelligenceProps) {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState<CategoryId>("geopolitics");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IntelResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [published, setPublished] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setPublished(false);

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, category }),
      });

      if (!response.ok) {
        throw new Error("Impossible d'interroger la cellule d'IA stratégique d'ARC.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur lors de la formulation stratégique.");
    } finally {
      setLoading(false);
    }
  };

  const integrateArticle = () => {
    if (!result) return;

    // Map strategic result output to standard ResearchArticle
    const newArticle: ResearchArticle = {
      id: "intel-" + Date.now(),
      title: result.title,
      subtitle: `Analyse Générative d'ARC Intelligence (Modèle ${result.source.includes("Gemini") ? "Gemini 3.5" : "Moteur Interne"})`,
      author: "Cellule de Renseignement ARC",
      role: "Intelligence Algorithmique & Prospective",
      date: new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }),
      category: category === "all" ? "geopolitics" : (category as any),
      tags: ["Intelligence Artificielle", "Synthèse Prospective", category === "geopolitics" ? "Stratégie" : category === "politics" ? "Institution" : "Menace"],
      readTime: "4 min d'étude",
      summary: result.summary,
      introduction: result.introduction,
      sections: result.sections.map(sec => ({
        subtitle: sec.subtitle,
        content: sec.content
      })),
      indicators: result.indicators.map(ind => ({
        label: ind.label,
        value: ind.value,
        trend: ind.value > 65 ? "up" : ind.value < 40 ? "down" : "stable",
        color: category === "crime" ? "#e11d48" : category === "politics" ? "#ca8a04" : "#a83244"
      })),
      visualType: category === "crime" ? "network" : category === "geopolitics" ? "map" : "chart",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
      isPinned: false
    };

    onPublishArticle(newArticle);
    setPublished(true);
  };

  return (
    <div className="bg-[#0b0b0c] border border-[#2d2024] rounded-lg p-6 relative overflow-hidden">
      {/* Absolute red border accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#a83244]" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#2d2427]">
        <div>
          <h3 className="text-xl font-serif text-white tracking-wide flex items-center gap-2">
            <Sparkles className="text-[#a83244]" size={20} />
            ARC Intelligence Stratégique
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Générez des rapports géostratégiques confidentiels de haut niveau grâce à l'IA d'investigation
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#1c1214] border border-[#a83244]/20 px-3 py-1.5 rounded text-[11px] font-mono text-[#a83244]">
          <Cpu size={14} className="animate-spin" />
          <span>MOTEUR GÉOPOLITIQUE ACTIF</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Parameters Form */}
        <div className="lg:col-span-4">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                Rubrique Stratégique
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(["geopolitics", "politics", "crime"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-2 px-1 text-[10px] font-mono uppercase tracking-tight rounded border transition-all ${
                      category === cat
                        ? "bg-[#a83244] text-white border-[#a83244]"
                        : "bg-[#141417] text-gray-400 border-[#2d2427] hover:border-[#4c2d34]"
                    }`}
                  >
                    {cat === "geopolitics" ? "Géopolitique" : cat === "politics" ? "Politique" : "Crime"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                Sujet ou Axe d'Investigation
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex. L'influence grandissante du cyber-espionnage dans l'océan Indien ou les routes du trafic de lithium andin..."
                className="w-full h-28 bg-[#141416]/90 border border-[#2d2427] rounded p-3 text-xs text-gray-200 placeholder-gray-500 font-sans focus:outline-none focus:border-[#a83244] focus:ring-1 focus:ring-[#a83244] transition-all"
                maxLength={250}
              />
              <span className="text-[10px] text-gray-500 float-right font-mono mt-0.5">
                {topic.length}/250 caractères max
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || !topic.trim()}
              className="w-full bg-[#a83244] hover:bg-[#852233] disabled:bg-[#422228] disabled:text-gray-500 text-white font-mono text-xs uppercase tracking-widest py-3 px-4 rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              {loading ? (
                <>
                  <Terminal size={14} className="animate-pulse" />
                  <span>ANALYSIS IN PROGRESS...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>SOUMETTRE À L'INTELLIGENCE</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="bg-[#241315] border border-red-950 p-3 rounded mt-4 text-[11px] font-mono text-red-500 flex gap-2 items-start">
              <ShieldAlert size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Side: Investigation Output OR Prompt State */}
        <div className="lg:col-span-8 bg-[#111113] border border-[#241a1c] rounded p-5 relative min-h-[300px] flex flex-col justify-between">
          {!result && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <Terminal className="text-gray-600 mb-3" size={32} />
              <p className="text-xs text-gray-400 font-mono max-w-sm">
                En attente d'amorçage. Saisissez un sujet et initiez le calcul matriciel pour déverrouiller la note d'analyse opérationnelle.
              </p>
              <div className="mt-4 flex gap-2 text-[10px] text-[#a83244] font-mono">
                <span>[GÉO]</span>
                <span>[POL]</span>
                <span>[CRIM]</span>
              </div>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-full border-t-2 border-[#a83244] border-r-2 border-transparent animate-spin mb-4" />
              <div className="font-mono text-xs text-gray-300 animate-pulse uppercase tracking-widest">
                DÉCRYPTAGE DES RAMIFICATIONS...
              </div>
              <p className="text-[10px] text-gray-500 font-mono mt-2 text-center max-w-xs">
                Requête transmise aux serveurs sécurisés d'ARC. Interpolation des variables géopolitiques en cours.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-fade-in text-gray-200">
              {/* Header result */}
              <div className="pb-3 border-b border-[#2d2427] flex justify-between items-start gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-mono uppercase bg-[#341115] text-[#ec808d] px-1.5 py-0.5 rounded border border-[#a83244]/30">
                      RÉSOLUTION TERMINÉE
                    </span>
                    <span className="text-[9px] font-mono text-gray-400">
                      Source : {result.source}
                    </span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-white mt-2 leading-snug">
                    {result.title}
                  </h4>
                </div>
              </div>

              {/* Summary executive in Bordeaux Callout */}
              <div className="bg-[#1e1417] border-l-2 border-[#a83244] p-3 text-xs italic text-gray-300 leading-relaxed font-serif">
                <span className="font-mono font-bold text-[#a83244] block not-italic text-[10px] tracking-wider uppercase mb-1">
                  SYNTHÈSE EXÉCUTIVE CONFIDENTIELLE
                </span>
                "{result.summary}"
              </div>

              {/* Introduction introduction */}
              <div className="text-xs text-gray-400 leading-relaxed">
                {result.introduction}
              </div>

              {/* Sections list */}
              <div className="space-y-4 pt-2">
                {result.sections.map((sec, i) => (
                  <div key={i} className="space-y-1.5">
                    <h5 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-1 h-2 bg-gray-500" />
                      {sec.subtitle}
                    </h5>
                    <p className="text-xs text-gray-400 leading-relaxed pl-3 border-l border-gray-800">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Indicators preview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                {result.indicators.map((ind, i) => (
                  <div key={i} className="bg-[#17171a] p-2 rounded border border-[#201c1d] text-center">
                    <div className="text-[10px] font-mono text-gray-500 truncate">{ind.label}</div>
                    <div className="text-base font-bold text-[#a83244] font-mono mt-0.5">{ind.value}%</div>
                  </div>
                ))}
              </div>

              {/* Notice for live activation */}
              {result.isDemo && (
                <div className="bg-[#241c14] border border-orange-950 p-2.5 rounded text-[10px] font-mono text-orange-400/90 leading-snug">
                  📌 {result.notice}
                </div>
              )}

              {/* Action row to integrate into website publications */}
              <div className="pt-4 border-t border-[#231b1c] flex justify-end">
                {published ? (
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-4 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                    <Check size={14} />
                    NOTE DE SYNTHÈSE PUBLIÉE AVEC SUCCÈS
                  </span>
                ) : (
                  <button
                    onClick={integrateArticle}
                    className="bg-transparent hover:bg-[#a83244] hover:text-white text-[#a83244] border border-[#a83244] px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
                  >
                    <FileText size={14} />
                    INTÉGRER AUX RECHERCHES PUBLIÉES DU CLUB <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
