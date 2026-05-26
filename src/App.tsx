import React, { useState } from "react";
import {
  Shield,
  Activity,
  Download,
  BookOpen,
  PlusCircle,
  FileText,
  Search,
  Filter,
  Check,
  TrendingUp,
  AlertTriangle,
  Send,
  Lock,
  Compass,
  CornerDownRight,
  Sparkles,
  ChevronRight,
  Clock,
  ExternalLink,
  ChevronDown
} from "lucide-react";

import { ResearchArticle, CategoryId } from "./types";
import VisualMap from "./components/VisualMap";
import IndicatorChart from "./components/IndicatorChart";
import ArcIntelligence from "./components/ArcIntelligence";
import ResearchForm from "./components/ResearchForm";

// Initializing state with premium, academic geopolitical analyses
const INITIAL_ARTICLES: ResearchArticle[] = [
  {
    id: "art-01",
    title: "La Rupture Arctique : Choc Souverain sur les Nouvelles Voies Maritimes",
    subtitle: "Rapport Stratégique ARC-V4 sur les réalignements polaires et infrastructures militaires résurgentes",
    author: "Dr. Alistair Thorne",
    role: "Directeur de la Chaire Polaire & Géostratégie",
    date: "12 Mai 2026",
    category: "geopolitics",
    tags: ["Arctique", "Souveraineté", "NATO", "Chine-Russie"],
    readTime: "8 min d'étude",
    summary: "L'accélération de la fonte glaciaire ouvre le raccourci maritime de la Route Transpolaire. Notre étude modélise la recrudescence des déploiements capacitaires russes et la réponse multilatérale de l'Alliance Atlantique au Nord-Axe.",
    introduction: "Depuis 2024, le détroit de Béring et la côte septentrionale de la Sibérie subissent une militarisation sans précédent. Sous couvert de sécurisation civile des convois de méthaniers arctiques, la marine fédérale russe a réhabilité treize bases de défense aérienne datant de la guerre froide, y implantant des radars de détection par-delà l'horizon et des batteries de missiles S-400.",
    sections: [
      {
        subtitle: "1. Le Corridor Nordique comme Leviathan Économique",
        content: "Le transit de l'Asie à l'Europe par le nord gagne près de 14 jours par rapport au détroit de Malacca et au canal de Suez. Pour Pékin, cette 'Route de la Soie Polaire' représente une alternative immunisée contre tout blocus naval américain traditionnel. Les investissements sino-russes dans la flotte de brise-glaces à propulsion nucléaire témoignent d'une alliance à long terme pour contourner l'asymétrie maritime occidentale."
      },
      {
        subtitle: "2. Déficit d'Alerte : Les Gaps de Détection de l'OTAN",
        content: "Malgré l'adhésion de la Suède et de la Finlande à l'Alliance, le flanc arctique demeure sous-équipé en matière de surveillance sous-marine persistante. La présence croissante de sous-marins d'attaque de classe Yasen dans la faille GIUK (Groenland-Islande-Royaume-Uni) pose une menace directe pour les câbles de communication sous-marins reliant l'Amérique du Nord à l'Europe Continentale."
      }
    ],
    indicators: [
      { label: "Transit Navire Nord-Est", value: 88, trend: "up", color: "#800020" },
      { label: "Militarisation des Littoraux Arctiques", value: 74, trend: "up", color: "#ca8a04" },
      { label: "Couverture Radar OTAN au 75e Parallèle", value: 31, trend: "down", color: "#10b981" }
    ],
    visualType: "map",
    isPinned: true
  },
  {
    id: "art-02",
    title: "Le Bouclier de Silicium : Souveraineté de Formose et Goulots d'Étranglement globaux",
    subtitle: "Modélisation systémique des chaînes de valeur de semi-conducteurs avancés en cas de blocus naval",
    author: "Pr. Hsin-Jou Wu",
    role: "Analyste Senior, Filières Technologiques Stratégiques",
    date: "14 Avril 2026",
    category: "politics",
    tags: ["Taïwan", "Semi-conducteurs", "Microélectronique", "Lobbying"],
    readTime: "9 min d'étude",
    summary: "Cet article explore les scénarios d'interruption logistique autour du détroit de Taïwan. La concentration de 92% de la production mondiale de puces de moins de 5 nanomètres confère à l'île une position d'asymétrie politique absolue.",
    introduction: "L'équilibre mondial repose sur des plaques de silicium de quelques nanomètres gravées à Hsinchu et Tainan. La dissuasion technologique, communément appelée 'Silicon Shield', garantit l'implication des grandes puissances occidentales dans l'autonomie démocratique de Taipei. Cependant, la transition vers le 2nm réorganise les forces coercitives et le chantage aux matières premières.",
    sections: [
      {
        subtitle: "1. La Géographie de l'Extrême Précision",
        content: "Un blocus naval progressif et invisible (dit 'de quarantaine douanière') orchestré par les forces garde-côtes chinoises bloquerait immédiatement les flux d'intrants critiques vers les fonderies de TSMC. Les produits chimiques ultra-purs provenant du Japon et d'Allemagne verraient leurs acheminements suspendus, provoquant l'arrêt des lignes de fabrication en moins de 72 heures."
      },
      {
        subtitle: "2. Relocalisation et Illusion des Fabs Souveraines",
        content: "Le plan Chips Act américain et les initiatives européennes visent à recréer des écosystèmes complets. Néanmoins, l'absence de techniciens spécialisés ultra-qualifiés et la dépendance persistante au packaging avancé de type CoWoS (Chip-on-Wafer-on-Substrate) situé exclusivement à Taïwan maintiennent le goulot d'étranglement intact jusqu'au horizon 2030."
      }
    ],
    indicators: [
      { label: "Indice de Dépendance au Silicium Complex", value: 95, trend: "stable", color: "#800020" },
      { label: "Tandem de Protection Navale US-Japon", value: 72, trend: "up", color: "#ca8a04" },
      { label: "Risque d'Interruption Logistique TSMC", value: 84, trend: "up", color: "#ef4444" }
    ],
    visualType: "map-china",
    isPinned: false
  },
  {
    id: "art-03",
    title: "Syndicats Cyber-Criminels et Architectures Financières Mixtes de Blanchiment",
    subtitle: "Anatomie d'une symbiose logistique entre cartels physiques et opérateurs de ransomware russes",
    author: "Marc-Antoine Laurent",
    role: "Conseiller Spécial, Division Enquêtes Criminologiques Fin-Tech",
    date: "28 Mars 2026",
    category: "crime",
    tags: ["Cybercrime", "Blanchiment", "Monero", "Ransomware"],
    readTime: "11 min d'étude",
    summary: "Les cartels de drogue mexicains du Jalisco et de Sinaloa collaborent désormais activement avec des sous-traitants cyber-criminels d'Europe de l'Est pour liquider d'immenses volumes de devises criminelles via des protocoles crypto décentralisés.",
    introduction: "L'époque des valises de cash dissimulées dans des paradis fiscaux insulaires s'efface devant des systèmes décentralisés d'évitement bancaire. L'alliance entre la force de frappe cybernétique et l'ancrage logistique physique des organisations criminelles classiques redessine l'architecture mondiale de la criminalité transnationale.",
    sections: [
      {
        subtitle: "1. Le Passage par les Rouages du Peer-to-Peer et Mixers",
        content: "Les rançons issues d'attaques par rançongiciel (ransomware) menées par des groupes comme LockBit ou BlackCat sont instantanément transférées dans des crypto-actifs confidentiels à l'instar de Monero (XMR). Celles-ci passent ensuite par des 'mixeurs' de transactions gérés sous licence offshore, brisant définitivement tout traçage par les forces spéciales de cybersécurité."
      },
      {
        subtitle: "2. La Réintégration Immobilière et Physique du Cash",
        content: "Une fois le nettoyage logiciel exécuté, des succursales frauduleuses établies dans des hubs d'échanges (Dubaï, Singapour) convertissent ces valeurs en contrats de matières premières agricoles ou en investissements immobiliers directs, réinjectant l'argent propre dans l'économie légale avec une perte de frais opérationnels d'à peine 6%."
      }
    ],
    indicators: [
      { label: "Efficacité du Blanchiment Crypto-Physique", value: 91, trend: "up", color: "#800020" },
      { label: "Volume de Transactions Monero Non Tracées", value: 78, trend: "up", color: "#e11d48" },
      { label: "Taux de Saisie des Forces Multilatérales", value: 9, trend: "down", color: "#10b981" }
    ],
    visualType: "network",
    isPinned: false
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<CategoryId>("all");
  const [selectedArticle, setSelectedArticle] = useState<ResearchArticle>(INITIAL_ARTICLES[0]);
  const [articles, setArticles] = useState<ResearchArticle[]>(INITIAL_ARTICLES);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    name: "Dr. Alistair Thorne",
    role: "Membre Senior",
    id: "ARC-7809-A"
  });
  const [liveLog, setLiveLog] = useState<string[]>([
    "Système initialisé.",
    "Bdd cryptée connectée.",
    "Canal sécurisé Genève-04-R actif."
  ]);
  const [showLogTerminal, setShowLogTerminal] = useState(false);
  const [cliInput, setCliInput] = useState("");

  // Handling publishing from Gemini AI intelligence or native user publication form
  const handlePublish = (newArticle: ResearchArticle) => {
    setArticles((prev) => [newArticle, ...prev]);
    setSelectedArticle(newArticle);
    setLiveLog((prev) => [`[PUBLISH] Rapport "${newArticle.title.substring(0, 30)}..." archivé à l'index.`, ...prev]);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;
    const cmd = cliInput.trim().toLowerCase();
    let response = `Command unrecognized: "${cmd}". Type 'help' for options.`;

    if (cmd === "help") {
      response = "Available: 'help', 'status', 'clear', 'about', 'secure'";
    } else if (cmd === "status") {
      response = "SYS_ACTIVE // NODES: 4 // CERTIFICATE: SHA-512 VALID";
    } else if (cmd === "clear") {
      setLiveLog([]);
      setCliInput("");
      return;
    } else if (cmd === "secure") {
      response = "Protocol AES-256 reinforced on all endpoints.";
    } else if (cmd === "about") {
      response = "ARC (Analysis and Research Lab) founded in 1988. Geneva Council.";
    }

    setLiveLog((prev) => [`> ${cliInput}`, response, ...prev]);
    setCliInput("");
  };

  // Filtered Articles based on Category and Search
  const filteredArticles = articles.filter((art) => {
    const matchesTab = activeTab === "all" || art.category === activeTab;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  // Calculate high-level global indicators based dynamically on registered articles
  const globalStabilityIdx = (100 - (articles.reduce((acc, current) => {
    // take mean of high indicators
    const mean = current.indicators.reduce((s, i) => s + i.value, 0) / current.indicators.length;
    return acc + mean;
  }, 0) / articles.length)).toFixed(2);

  const activeCategoryDetail = {
    all: { title: "Global Intelligence Feed", desc: "Flux de renseignement unifié du club" },
    geopolitics: { title: "Géopolitique", desc: "Analyse des puissances stratégiques et ressources critiques" },
    politics: { title: "Politique", desc: "Lobbying, polarisation institutionnelle et intégrité publique" },
    crime: { title: "Crime", desc: "Réseaux d'influence clandestins et évitement financier" }
  }[activeTab];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-[#800020] selection:text-white">
      
      {/* ⚠️ Warning Banner for Confidential Mode */}
      <div className="bg-[#1c090c] border-b border-[#800020]/30 py-1.5 px-4 text-center text-[10px] font-mono uppercase tracking-[0.25em] text-[#ec808d] flex items-center justify-center gap-2">
        <Shield size={11} className="text-[#800020] animate-pulse" />
        <span>Réseau Cryptographique de l'ARC // Accès restreint au personnel accrédité de classe Level-4</span>
      </div>

      {/* Main Header / Branding */}
      <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-6 md:px-10 bg-zinc-950">
        <div className="flex items-center gap-6 md:gap-12">
          {/* Brand Identity with Bordeaux Blocks */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab("all"); setShowForm(false); }}>
            <span className="bg-[#800020] text-white px-3 py-1 font-black text-2xl tracking-tighter shadow-md">
              ARC
            </span>
            <div className="flex flex-col select-none">
              <span className="text-[10px] uppercase tracking-[0.35em] font-light text-zinc-400 leading-none">
                Analysis & Research Lab
              </span>
              <span className="text-[8px] text-[#800020] uppercase tracking-wider font-mono font-bold">
                EST. 1988 // SECURE CHANNEL
              </span>
            </div>
          </div>
          
          {/* Horizontal Quick-Menu Options */}
          <nav className="hidden lg:flex gap-8 text-[11px] uppercase tracking-widest font-bold">
            <button 
              onClick={() => { setActiveTab("all"); setShowForm(false); }}
              className={`pb-1 border-b transition-all uppercase cursor-pointer ${activeTab === "all" && !showForm ? "text-[#800020] border-[#800020]" : "text-zinc-400 hover:text-white border-transparent"}`}
            >
              Note d'actualité
            </button>
            <button 
              onClick={() => { setShowForm(true); }}
              className={`pb-1 border-b transition-all uppercase cursor-pointer ${showForm ? "text-[#800020] border-[#800020]" : "text-zinc-400 hover:text-white border-transparent"}`}
            >
              Rédiger un Rapport
            </button>
            <button 
              onClick={() => setShowLogTerminal(!showLogTerminal)}
              className="text-zinc-400 hover:text-[#800020] transition-colors cursor-pointer"
            >
              Terminal {showLogTerminal ? "[Actif]" : "[Inactif]"}
            </button>
          </nav>
        </div>

        {/* Member Profile Badge representing Secure Level Entry */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-sans font-bold">
              {userCredentials.name}
            </div>
            <div className="text-[8px] font-mono text-zinc-500 tracking-wider">
              ID: {userCredentials.id} // SECURE PASS
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#800020] border-2 border-zinc-900 flex items-center justify-center text-xs font-black shadow-lg">
            AT
          </div>
        </div>
      </header>

      {/* Main Structural Layout containing Rubrics, Feed, and Live Data Panels */}
      <div className="flex-1 grid grid-cols-12 min-h-0 bg-black">
        
        {/* Leftmost Sidebar containing primary Rubrics styled with Serifs & Bordeaux accent indicators */}
        <aside className="col-span-12 md:col-span-3 border-r border-zinc-800 bg-zinc-950 flex flex-col justify-between">
          <div className="flex-1 flex flex-col divide-y divide-zinc-900">
            
            {/* Rubrics Group Heading */}
            <div className="p-5 bg-zinc-950 border-b border-zinc-900">
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500 block mb-1">SECTION ARCHIVES</span>
              <h3 className="text-xs uppercase font-bold text-[#800020] tracking-wider">Trois Rubriques Majeures</h3>
            </div>

            {/* Geopolitics Button Block */}
            <div 
              onClick={() => { setActiveTab("geopolitics"); setShowForm(false); }}
              className={`p-6 cursor-pointer transition-all ${activeTab === "geopolitics" ? "bg-[#181113] border-l-4 border-[#800020]" : "hover:bg-zinc-900/60"}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] text-[#800020] font-mono font-bold uppercase tracking-widest">Section I</span>
                <span className="text-[10px] font-mono text-zinc-600">
                  [{articles.filter(a => a.category === "geopolitics").length} ANALYSES]
                </span>
              </div>
              <h2 className="text-2xl font-serif italic text-white font-medium tracking-tight">Géopolitique</h2>
              <p className="text-[10px] text-zinc-500 leading-normal uppercase tracking-tighter mt-1">
                Polarisation Maritime & Ressources critiques
              </p>
              
              {/* Dynamic Bar Indicator of Selection */}
              <div className="mt-4 flex gap-1">
                <div className={`h-1 transition-all ${activeTab === "geopolitics" ? "w-12 bg-[#800020]" : "w-4 bg-zinc-800"}`}></div>
                <div className="h-1 w-2 bg-zinc-900"></div>
                <div className="h-1 w-2 bg-zinc-900"></div>
              </div>
            </div>

            {/* Politics Button Block */}
            <div 
              onClick={() => { setActiveTab("politics"); setShowForm(false); }}
              className={`p-6 cursor-pointer transition-all ${activeTab === "politics" ? "bg-[#181113] border-l-4 border-[#800020]" : "hover:bg-zinc-900/60"}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] text-[#800020] font-mono font-bold uppercase tracking-widest">Section II</span>
                <span className="text-[10px] font-mono text-zinc-600">
                  [{articles.filter(a => a.category === "politics").length} ANALYSES]
                </span>
              </div>
              <h2 className="text-2xl font-serif italic text-white font-medium tracking-tight">Politique</h2>
              <p className="text-[10px] text-zinc-500 leading-normal uppercase tracking-tighter mt-1">
                Stabilités Institutionnelles & Érosion cyber
              </p>
              
              <div className="mt-4 flex gap-1">
                <div className="h-1 w-2 bg-zinc-900"></div>
                <div className={`h-1 transition-all ${activeTab === "politics" ? "w-12 bg-[#800020]" : "w-4 bg-zinc-800"}`}></div>
                <div className="h-1 w-2 bg-zinc-900"></div>
              </div>
            </div>

            {/* Crime Button Block */}
            <div 
              onClick={() => { setActiveTab("crime"); setShowForm(false); }}
              className={`p-6 cursor-pointer transition-all ${activeTab === "crime" ? "bg-[#181113] border-l-4 border-[#800020]" : "hover:bg-zinc-900/60"}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] text-[#800020] font-mono font-bold uppercase tracking-widest">Section III</span>
                <span className="text-[10px] font-mono text-zinc-600">
                  [{articles.filter(a => a.category === "crime").length} ANALYSES]
                </span>
              </div>
              <h2 className="text-2xl font-serif italic text-white font-medium tracking-tight">Crime</h2>
              <p className="text-[10px] text-zinc-500 leading-normal uppercase tracking-tighter mt-1">
                Organisations Occultes & Cryptomonnaie
              </p>
              
              <div className="mt-4 flex gap-1">
                <div className="h-1 w-2 bg-zinc-900"></div>
                <div className="h-1 w-2 bg-zinc-900"></div>
                <div className={`h-1 transition-all ${activeTab === "crime" ? "w-12 bg-[#800020]" : "w-4 bg-zinc-800"}`}></div>
              </div>
            </div>

            {/* View All Option */}
            <div 
              onClick={() => { setActiveTab("all"); setShowForm(false); }}
              className={`p-4 text-center cursor-pointer font-mono text-[11px] uppercase tracking-wider transition-all ${activeTab === "all" && !showForm ? "bg-zinc-900 text-white font-bold" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              -- Consulter la Grille Complète --
            </div>
          </div>

          {/* Quick Informational Box with credentials setup */}
          <div className="p-4 bg-zinc-950 border-t border-zinc-900 text-xs text-zinc-500 leading-relaxed">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-[#800020] uppercase font-bold">
              <Compass size={12} fill="#800020" />
              <span>Cahier d'Engagement ARC</span>
            </div>
            <p>
              Chaque analyse publiée sur cette grille est soumise au secret d'instruction du conseil de Genève. Toute fuite est passible de sanctions d'exclusion.
            </p>
          </div>
        </aside>

        {/* Middle Area: The Core Feeding & Interactive Intelligence Board */}
        <main className="col-span-12 md:col-span-6 border-r border-zinc-800 bg-black overflow-y-auto max-h-[calc(100vh-140px)]">
          
          {/* If terminal is active, we render quick interactive system logs at the top */}
          {showLogTerminal && (
            <div className="bg-[#0b0b0d] border-b border-[#800020] p-4 font-mono text-xs text-zinc-300">
              <div className="flex items-center justify-between text-[#800020] uppercase text-[10px] tracking-widest mb-2 font-bold">
                <span>Console Intégrée d'Investigation</span>
                <button onClick={() => setShowLogTerminal(false)} className="hover:underline font-serif text-white uppercase text-xs cursor-pointer">[Fermer]</button>
              </div>
              <div className="max-h-32 overflow-y-auto mb-2 space-y-1 bg-black p-2 rounded border border-zinc-900">
                {liveLog.map((log, i) => (
                  <div key={i} className="leading-tight">
                    <span className="text-zinc-600 font-bold">[{new Date().toLocaleTimeString()}]</span> {log}
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommandSubmit} className="flex gap-2">
                <span className="text-[#800020] font-bold">&gt;</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="Saisissez une commande (ex: 'status', 'secure', 'help')..."
                  className="bg-zinc-950 text-white outline-none flex-1 font-mono text-xs"
                />
                <button type="submit" className="bg-[#800020] text-white px-3 font-bold text-[10px] uppercase tracking-wider cursor-pointer">OK</button>
              </form>
            </div>
          )}

          {/* Content Dynamic Views */}
          {showForm ? (
            <div className="p-6">
              <div className="mb-4">
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-xs text-[#a83244] hover:underline font-mono uppercase flex items-center gap-1.5 cursor-pointer"
                >
                  &larr; Revenir au flux d'actualité
                </button>
              </div>
              <ResearchForm 
                onAddArticle={handlePublish} 
                onClose={() => setShowForm(false)} 
              />
            </div>
          ) : (
            <div className="p-4 md:p-8 space-y-8">
              
              {/* Dynamic Rubric Title Banner */}
              <div className="border-b border-zinc-800 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase font-mono text-zinc-500 tracking-widest">
                    LABORATOIRE DE RECHERCHE & D'ANALYSE
                  </div>
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter font-sans uppercase mt-1">
                    {activeCategoryDetail.title}
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1 italic font-serif">
                    {activeCategoryDetail.desc}
                  </p>
                </div>

                {/* Filter and Search controls */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Filtrer l'archive..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 pl-8 text-xs text-zinc-200 outline-none focus:border-[#800020] w-40 md:w-48 transition-all"
                    />
                    <Search size={12} className="absolute left-2.5 top-2.5 text-zinc-500" />
                  </div>
                </div>
              </div>

              {/* ARC INTELLIGENCE BOX: Server-side generative integration with Gemini API proxy */}
              <section className="transition-all">
                <ArcIntelligence onPublishArticle={handlePublish} />
              </section>

              {/* ACTIVE INVESTIGATION HERO PORTRAIT */}
              {selectedArticle && (
                <section className="bg-zinc-950 border border-zinc-800 p-6 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Compass size={180} />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-white text-black text-[9px] font-mono font-black px-2 py-0.5 uppercase tracking-wider">
                      INVESTIGATION EN COURS
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">
                      Publié le {selectedArticle.date} • {selectedArticle.readTime}
                    </span>
                  </div>

                  {/* Prestige Big Typography */}
                  <h2 className="text-2xl md:text-4xl font-bold tracking-tight leading-none mb-4 font-sans text-white hover:text-[#800020] transition-colors">
                    {selectedArticle.title}
                  </h2>

                  <p className="text-xs uppercase text-zinc-500 font-mono tracking-wider mb-2">
                    Axe d'étude : "{selectedArticle.subtitle}"
                  </p>

                  <div className="flex items-center gap-3 py-3 border-y border-zinc-900 text-xs mb-6">
                    <div className="font-bold text-zinc-300">{selectedArticle.author}</div>
                    <span className="text-zinc-700">|</span>
                    <div className="text-zinc-500 font-mono uppercase text-[10px]">{selectedArticle.role}</div>
                  </div>

                  {/* Executive Summary in styled quotation callout */}
                  <blockquote className="border-l-4 border-[#800020] pl-4 text-xs italic text-zinc-300 mb-6 bg-zinc-900/40 p-3 rounded font-serif max-w-2xl leading-relaxed">
                    <span className="block font-mono font-bold text-[9px] tracking-wider text-[#ec808d] mb-1 uppercase">
                      SYNTHÈSE LOGISTIQUE CONFIDENTIELLE
                    </span>
                    "{selectedArticle.summary}"
                  </blockquote>

                  {/* Introduction Block */}
                  <div className="space-y-4 text-xs md:text-sm text-zinc-400 font-sans leading-relaxed">
                    <p className="text-white font-serif italic text-base mb-3">
                      {selectedArticle.introduction}
                    </p>

                    {/* Rich Content Sections */}
                    {selectedArticle.sections.map((sec, i) => (
                      <div key={i} className="mt-6 space-y-2">
                        <h4 className="text-sm font-mono font-black uppercase text-zinc-200 tracking-wide border-b border-zinc-900 pb-1.5 flex items-center gap-2">
                          <CornerDownRight size={12} className="text-[#800020]" />
                          {sec.subtitle}
                        </h4>
                        <p className="pl-4 text-zinc-400 leading-relaxed text-xs">
                          {sec.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Visualisation Map for the chosen active article */}
                  {selectedArticle.visualType && selectedArticle.visualType !== "none" && (
                    <div className="mt-8">
                      <VisualMap type={selectedArticle.visualType} />
                    </div>
                  )}

                  {/* Indicators visual layout inside the article */}
                  <div className="mt-8">
                    <IndicatorChart indicators={selectedArticle.indicators} />
                  </div>

                  {/* Print & share panel */}
                  <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-500 font-mono">
                    <div className="flex gap-2">
                      {selectedArticle.tags.map((tag) => (
                        <span key={tag} className="bg-zinc-900 hover:bg-[#1c0c0e] hover:text-[#ec808d] px-2 py-0.5 rounded text-[10px] tracking-tight">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => alert(`Impression du livret de sécurité stratégique : ${selectedArticle.title}`)}
                      className="flex items-center gap-1.5 hover:text-[#800020] transition-colors cursor-pointer"
                    >
                      <Download size={13} /> Export PDF
                    </button>
                  </div>
                </section>
              )}

              {/* ARCHIVE FEED LISTING */}
              <section className="space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-[#800020]">
                    Grille Complète des Renseignements Disponibles ({filteredArticles.length})
                  </h3>
                  <div className="text-[10px] text-zinc-500 font-mono">
                    FILTRAGE : {activeTab.toUpperCase()}
                  </div>
                </div>

                {filteredArticles.length === 0 ? (
                  <div className="text-center py-10 bg-zinc-950 rounded border border-zinc-900 font-mono text-zinc-500 text-xs">
                    Aucun rapport d'archive ne correspond à vos critères de recherche.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredArticles.map((art) => {
                      const isSelected = selectedArticle?.id === art.id;
                      return (
                        <div
                          key={art.id}
                          onClick={() => {
                            setSelectedArticle(art);
                            window.scrollTo({ top: 300, behavior: "smooth" });
                          }}
                          className={`p-5 rounded border transition-all cursor-pointer text-left ${
                            isSelected
                              ? "bg-[#160c0e] border-[#800020] shadow-md"
                              : "bg-zinc-950 border-zinc-900 hover:bg-zinc-900/50 hover:border-zinc-800"
                          }`}
                        >
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <span className="text-[9px] font-mono bg-zinc-900 text-[#ec808d] px-2 py-0.5 rounded border border-[#800020]/20 uppercase">
                              {art.category === "geopolitics" ? "GÉOPOLITIQUE" : art.category === "politics" ? "POLITIQUE" : "CRIME"}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              {art.date}
                            </span>
                          </div>

                          <h4 className="text-lg font-serif font-black text-white hover:text-[#800020] transition-colors line-clamp-1">
                            {art.title}
                          </h4>

                          <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                            {art.summary}
                          </p>

                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-900/60 text-[10px] text-zinc-500 font-mono">
                            <div>
                              Rédacteur : <span className="text-zinc-300">{art.author}</span>
                            </div>
                            <div className="flex items-center gap-1 hover:text-white">
                              Analysé &rarr;
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

            </div>
          )}
        </main>

        {/* Rightmost Panel styled with Live Data, Stability Indexes, Recent Downloads */}
        <aside className="col-span-12 md:col-span-3 bg-zinc-950 p-6 flex flex-col justify-between gap-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          
          {/* Section: Stability Monitor Gauge */}
          <div className="space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#800020] font-black mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#800020] animate-ping"></span>
              INDICATEURS DE SÉCURITÉ ARC
            </h3>

            {/* Dynamic Stability gauge calculation */}
            <div className="bg-black p-4 border border-zinc-800 rounded">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-zinc-500 uppercase font-mono">Indice de Stabilité Résurgent (Geneva-Unit)</span>
                <span className="text-xs text-rose-500 font-mono font-bold">-2.14%</span>
              </div>
              <div className="text-3xl font-mono text-white font-black tracking-tight flex items-baseline gap-2">
                {globalStabilityIdx}%
                <span className="text-xs text-zinc-500 font-normal">NIVEAU MOYEN</span>
              </div>

              {/* Progress dynamic line */}
              <div className="w-full h-1 bg-zinc-900 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-800 to-rose-600 transition-all duration-1000"
                  style={{ width: `${globalStabilityIdx}%` }}
                />
              </div>
            </div>

            {/* General Geopolitical Tension score card */}
            <div className="bg-black p-4 border border-zinc-800 rounded">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-zinc-500 uppercase font-mono">Niveau de Menace Hybride</span>
                <span className="bg-red-950/40 text-rose-500 border border-red-900 px-1.5 py-0.5 rounded text-[8px] font-mono">
                  CRITIQUE
                </span>
              </div>
              <div className="text-2xl font-mono text-zinc-100 font-black">
                HAUT SÉCURISÉ
              </div>
              <p className="text-[10px] text-zinc-500 mt-2 font-mono leading-none">
                Mise à jour : Aujourd'hui (Automatique)
              </p>
            </div>
          </div>

          {/* Documents Access Section */}
          <div className="space-y-4 border-t border-zinc-900 pt-6">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-4">
              Documents Clôturés et Mémoires Officiels
            </h3>

            <div className="space-y-5">
              {[
                {
                  title: "Cartographie des flux migratoires en Méditerranée",
                  meta: "MAPPING • PDF (12MB) • CLASSIFIÉ",
                  alert: true
                },
                {
                  title: "Évolution de l'influence clandestine du Cartel de Jalisco",
                  meta: "CASE STUDY • CHART ACCESS SECURE",
                  alert: false
                },
                {
                  title: "Impact stratégique des sanctions sur le secteur bancaire russe",
                  meta: "ECONOMIC REPORT • SECURE MEMORY",
                  alert: false
                },
                {
                  title: "Infrastructures satellitaires civiles et souverainetés fragmentées",
                  meta: "ANALYSIS • PRINT LEVEL-4 ONLY",
                  alert: true
                }
              ].map((doc, idx) => (
                <div 
                  key={idx} 
                  className="group cursor-pointer p-2.5 rounded hover:bg-zinc-900/60 transition-colors border border-transparent hover:border-zinc-800"
                  onClick={() => alert(`Téléchargement sécurisé accordé pour : ${doc.title}. Clé SHA-256 générée.`)}
                >
                  <p className="text-xs font-bold leading-tight text-zinc-300 group-hover:text-[#800020] transition-colors">
                    {doc.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest block">
                      {doc.meta}
                    </span>
                    {doc.alert && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 text-[10px]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Member Access Credentials details */}
          <div className="bg-zinc-900 p-4 border border-zinc-800 rounded text-center">
            <span className="text-[9px] font-mono text-zinc-400 block mb-1 uppercase tracking-widest">
              Ligne Souveraine ARC
            </span>
            <div className="text-xs font-bold font-serif italic text-[#ec808d]">
              Geneva Council 1988
            </div>
          </div>

        </aside>

      </div>

      {/* Styled Status Bar Footer matching the template perfectly */}
      <footer className="h-10 bg-black border-t border-zinc-800 px-6 md:px-8 flex items-center justify-between text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="flex items-center gap-1.5 text-zinc-500">
            <Lock size={10} className="text-[#800020]" />
            CONEX: <span className="text-zinc-300 font-mono">ARC-SECURE / AES-256</span>
          </span>
          <span className="hidden sm:inline">SERVEUR: <span className="text-zinc-300 font-mono">GENEVA-04-R</span></span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <span className="text-zinc-500 hidden md:inline">© 2026 ARC RESEARCH HUB — PRESTIGE ACCESS ONLY</span>
          <span className="text-[#800020] animate-pulse font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#800020]" />
            LIVE SECURE NETWORK
          </span>
        </div>
      </footer>

    </div>
  );
}
