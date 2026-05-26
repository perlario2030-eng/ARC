import React, { useState } from "react";
import { PlusCircle, FilePlus2, Eye, Map, CheckCircle2, Shield } from "lucide-react";
import { ResearchArticle } from "../types";

interface ResearchFormProps {
  onAddArticle: (newArticle: ResearchArticle) => void;
  onClose: () => void;
}

export default function ResearchForm({ onAddArticle, onClose }: ResearchFormProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState<"geopolitics" | "politics" | "crime">("geopolitics");
  const [readTime, setReadTime] = useState("5 min");
  
  const [summary, setSummary] = useState("");
  const [introduction, setIntroduction] = useState("");
  
  // Custom sections
  const [sec1Title, setSec1Title] = useState("Axe de force principal");
  const [sec1Content, setSec1Content] = useState("");
  const [sec2Title, setSec2Title] = useState("Projections prospectives");
  const [sec2Content, setSec2Content] = useState("");

  // Indicators
  const [ind1Label, setInd1Label] = useState("Indice de friction");
  const [ind1Value, setInd1Value] = useState(50);
  const [ind2Label, setInd2Label] = useState("Tension asymétrique");
  const [ind2Value, setInd2Value] = useState(40);
  const [ind3Label, setInd3Label] = useState("Urgence tactique");
  const [ind3Value, setInd3Value] = useState(60);

  // Illustration / Visual type
  const [visualType, setVisualType] = useState<"map" | "map-china" | "network" | "chart" | "none">("chart");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !summary.trim() || !introduction.trim()) {
      alert("Veuillez remplir les champs obligatoires (Titre, Auteur, Synthèse, Introduction).");
      return;
    }

    const newArticle: ResearchArticle = {
      id: "user-" + Date.now(),
      title,
      subtitle: subtitle || "Rapport d'Investigation Officiel",
      author,
      role: role || "Analyste accrédité ARC",
      date: new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }),
      category,
      tags: ["Analyse Membre", category === "geopolitics" ? "Géostratégie" : category === "politics" ? "Polarisation" : "Sécurité Criminelle"],
      readTime: `${readTime} d'étude`,
      summary,
      introduction,
      sections: [
        { subtitle: sec1Title, content: sec1Content || "Aucun détail complémentaire inséré." },
        { subtitle: sec2Title, content: sec2Content || "Aucune projection additionnelle formulée." }
      ],
      indicators: [
        { label: ind1Label || "Indicateur Alpha", value: ind1Value, trend: ind1Value > 65 ? "up" : ind1Value < 35 ? "down" : "stable", color: "#a83244" },
        { label: ind2Label || "Indicateur Bêta", value: ind2Value, trend: ind2Value > 65 ? "up" : ind2Value < 35 ? "down" : "stable", color: "#ca8a04" },
        { label: ind3Label || "Indicateur Thêta", value: ind3Value, trend: ind3Value > 65 ? "up" : ind3Value < 35 ? "down" : "stable", color: "#10b981" }
      ],
      visualType,
      imageUrl: category === "crime" 
        ? "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop"
        : category === "politics"
          ? "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=600&auto=format&fit=crop"
          : "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop",
      isPinned: false
    };

    onAddArticle(newArticle);
    setFormSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="bg-[#0e0e11] border border-[#2d2024] p-6 rounded-lg relative overflow-hidden text-gray-200">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#a83244]" />

      <div className="flex justify-between items-center mb-6 border-b border-[#2d2427] pb-4">
        <div>
          <h3 className="text-xl font-serif text-white flex items-center gap-2">
            <FilePlus2 className="text-[#a83244]" size={20} />
            Déposer une Nouvelle Recherche
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Enregistrez un rapport analytique officiel dans les archives sécurisées et délibérées d'ARC.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white font-mono text-xs uppercase px-2 py-1 border border-gray-800 hover:border-[#a83244] rounded transition-all cursor-pointer"
        >
          Annuler
        </button>
      </div>

      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
          <CheckCircle2 size={48} className="text-emerald-500 mb-4 animate-bounce" />
          <h4 className="text-lg font-serif font-bold text-white">ARCHIVAGE ET ENREGISTREMENT TERMINÉ</h4>
          <p className="text-xs text-gray-400 font-mono mt-1 max-w-sm">
            La clé de chiffrement a été générée. Votre document est désormais disponible sur la grille de distribution du club.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Metadata Section */}
          <div className="bg-[#141417]/50 p-4 rounded border border-[#231a1c] space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#a83244] uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Shield size={12} />
              Informations d'Éditeur & Classification
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Auteur *</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ex. Alexandre de Vence"
                  className="w-full bg-[#1b1b1f] border border-[#2d2427] rounded p-2 text-xs focus:outline-none focus:border-[#a83244] text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Rôle/Chaire *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex. Directeur de section OTAN"
                  className="w-full bg-[#1b1b1f] border border-[#2d2427] rounded p-2 text-xs focus:outline-none focus:border-[#a83244] text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Rubrique *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#1b1b1f] border border-[#2d2427] rounded p-2 text-xs focus:outline-none focus:border-[#a83244] text-white font-mono"
                >
                  <option value="geopolitics">Géopolitique</option>
                  <option value="politics">Politique</option>
                  <option value="crime">Crime (Criminalité)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Temps de lecture estimé</label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="Ex. 6 min"
                  className="w-full bg-[#1b1b1f] border border-[#2d2427] rounded p-2 text-xs focus:outline-none focus:border-[#a83244] text-white"
                />
              </div>
            </div>
          </div>

          {/* Research Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Titre de la Recherche *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex. Le nouveau corridor ferroviaire trans-arabique"
                className="w-full bg-[#141416] border border-[#2d2427] rounded p-2.5 text-xs focus:outline-none focus:border-[#a83244] text-white font-serif font-bold text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Sous-titre / Axe Thématique</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex. Un levier de désenclavement pétrolier et d'influence multipolaire"
                className="w-full bg-[#141416] border border-[#2d2427] rounded p-2.5 text-xs focus:outline-none focus:border-[#a83244] text-white italic"
              />
            </div>
          </div>

          {/* Summaries */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Synthèse Exécutive Décisionnelle *</label>
              <textarea
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Rédigez un résumé confidentiel à haute teneur d'enjeux d'environ 2 à 3 lignes..."
                className="w-full h-20 bg-[#141416] border border-[#2d2427] rounded p-3 text-xs text-gray-200 focus:outline-none focus:border-[#a83244]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Introduction académique *</label>
              <textarea
                required
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                placeholder="Posez la problématique stratégique générale, l'historique récent et les forces en présence..."
                className="w-full h-24 bg-[#141416] border border-[#2d2427] rounded p-3 text-xs text-gray-200 focus:outline-none focus:border-[#a83244]"
              />
            </div>
          </div>

          {/* Body Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-black/30 border border-[#2d2427] rounded">
              <span className="text-[10px] font-mono text-[#a83244] uppercase block mb-2">Section d'Analyse 1</span>
              <input
                type="text"
                value={sec1Title}
                onChange={(e) => setSec1Title(e.target.value)}
                placeholder="Titre de la section 1"
                className="w-full bg-[#1b1b1f] border border-[#2d2427] rounded p-2 text-xs mb-2 text-white font-semibold"
              />
              <textarea
                value={sec1Content}
                onChange={(e) => setSec1Content(e.target.value)}
                placeholder="Rédigez le contenu d'analyse détaillée..."
                className="w-full h-32 bg-[#141416] border border-[#2d2427] rounded p-2.5 text-xs text-gray-200 focus:outline-none"
              />
            </div>
            <div className="p-3 bg-black/30 border border-[#2d2427] rounded">
              <span className="text-[10px] font-mono text-[#a83244] uppercase block mb-2">Section d'Analyse 2</span>
              <input
                type="text"
                value={sec2Title}
                onChange={(e) => setSec2Title(e.target.value)}
                placeholder="Titre de la section 2"
                className="w-full bg-[#1b1b1f] border border-[#2d2427] rounded p-2 text-xs mb-2 text-white font-semibold"
              />
              <textarea
                value={sec2Content}
                onChange={(e) => setSec2Content(e.target.value)}
                placeholder="Projections complémentaires ou conclusions..."
                className="w-full h-32 bg-[#141416] border border-[#2d2427] rounded p-2.5 text-xs text-gray-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Visuals & Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Visual type selector */}
            <div className="md:col-span-5 bg-[#141417]/50 p-4 border border-[#231a1c] rounded">
              <span className="text-[10px] font-mono text-gray-400 uppercase block mb-3 md:mb-5">Diagramme / Cartographie Associée</span>
              <div className="space-y-2">
                {[
                  { value: "chart", label: "Histogramme d'indices d'instabilité" },
                  { value: "map", label: "Carte radar polaire de l'Arctique" },
                  { value: "map-china", label: "Carte du détroit de Formose (Taiwan)" },
                  { value: "network", label: "Graphe de cyber-cartels" },
                  { value: "none", label: "Aucun visuel de renseignement" },
                ].map((vis) => (
                  <label key={vis.value} className="flex items-center gap-2 text-xs text-gray-300 font-mono cursor-pointer hover:text-white">
                    <input
                      type="radio"
                      name="visualType"
                      value={vis.value}
                      checked={visualType === vis.value}
                      onChange={() => setVisualType(vis.value as any)}
                      className="accent-[#a83244]"
                    />
                    <span>{vis.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Config Sliders */}
            <div className="md:col-span-7 bg-[#141417]/50 p-4 border border-[#231a1c] rounded space-y-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Ajustement des Indices Stratégiques</span>
              
              {/* slider 1 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <input
                    type="text"
                    value={ind1Label}
                    onChange={(e) => setInd1Label(e.target.value)}
                    className="bg-transparent border-b border-gray-800 focus:border-[#a83244] w-2/3 text-gray-200 focus:outline-none"
                  />
                  <span className="text-[#a83244] font-bold">{ind1Value}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ind1Value}
                  onChange={(e) => setInd1Value(Number(e.target.value))}
                  className="w-full accent-[#a83244]"
                />
              </div>

              {/* slider 2 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <input
                    type="text"
                    value={ind2Label}
                    onChange={(e) => setInd2Label(e.target.value)}
                    className="bg-transparent border-b border-gray-800 focus:border-[#a83244] w-2/3 text-gray-200 focus:outline-none"
                  />
                  <span className="text-[#ca8a04] font-bold">{ind2Value}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ind2Value}
                  onChange={(e) => setInd2Value(Number(e.target.value))}
                  className="w-full accent-[#ca8a04]"
                />
              </div>

              {/* slider 3 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <input
                    type="text"
                    value={ind3Label}
                    onChange={(e) => setInd3Label(e.target.value)}
                    className="bg-transparent border-b border-gray-800 focus:border-[#a83244] w-2/3 text-gray-200 focus:outline-none"
                  />
                  <span className="text-[#10b981] font-bold">{ind3Value}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ind3Value}
                  onChange={(e) => setInd3Value(Number(e.target.value))}
                  className="w-full accent-[#10b981]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#231b1c]">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 font-mono text-xs text-gray-400 border border-gray-800 rounded hover:bg-neutral-900 cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-[#a83244] hover:bg-[#852233] text-white py-2.5 px-6 font-mono text-xs uppercase tracking-wider rounded cursor-pointer transition-colors"
            >
              Publier le Rapport
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
