import React, { useState } from "react";
import { Shield, MapPin, Radio, Cpu, Network, HelpCircle } from "lucide-react";

interface VisualMapProps {
  type: "map" | "chart" | "network" | "map-china" | "none";
  data?: any;
}

export default function VisualMap({ type, data }: VisualMapProps) {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  if (type === "none") return null;

  // Render highly-polished geopolitical maps/networks in SVG
  return (
    <div className="relative bg-[#121214] border border-[#2d2024] rounded-lg p-5 overflow-hidden transition-all duration-300">
      {/* Top indicator ribbon */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2d2427] text-xs font-mono text-[#a83244] tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a83244] animate-pulse" />
          <span>Matrice Visuelle d'Investigation</span>
        </div>
        <div className="text-[10px] text-gray-400">ARC UNIT-09 // SYSTÈME EMBARQUÉ</div>
      </div>

      {activeElement && (
        <div className="absolute top-14 left-5 right-5 z-20 bg-[#1e1417]/95 border border-[#a83244] rounded p-2 text-xs font-mono text-gray-200 shadow-xl backdrop-blur">
          <span className="font-bold text-[#a83244]">SENSITIVE DATA:</span> {activeElement}
        </div>
      )}

      {/* Render Arctic Map */}
      {type === "map" && (
        <div>
          <h4 className="text-sm font-semibold text-gray-200 mb-2 font-mono">Zones de friction en Arctique & Routes Libres</h4>
          <div className="relative h-60 w-full flex items-center justify-center bg-radial from-[#1e1315]/50 to-black rounded">
            <svg viewBox="0 0 400 240" className="w-full h-full text-gray-600">
              {/* Arctic Circle Radial Grids */}
              <circle cx="200" cy="120" r="100" fill="none" stroke="#2c1e21" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="200" cy="120" r="70" fill="none" stroke="#42292f" strokeWidth="1" strokeDasharray="4,4" />
              <circle cx="200" cy="120" r="40" fill="none" stroke="#a83244" strokeWidth="0.5" strokeDasharray="3,3" />
              
              {/* Polar Coordinates Axes */}
              <line x1="200" y1="10" x2="200" y2="230" stroke="#2c1e21" strokeWidth="1" />
              <line x1="90" y1="120" x2="310" y2="120" stroke="#2c1e21" strokeWidth="1" />

              {/* Simplified Polar Borders (Greenland, Siberia, Alaska, Canada) */}
              {/* Greenland */}
              <path d="M 120,105 Q 110,130 140,150 T 170,120 Z" fill="#2d2a2a" stroke="#444141" strokeWidth="1.5" />
              {/* Canada / Alaska */}
              <path d="M 60,60 Q 90,80 120,40 T 150,70" fill="none" stroke="#333" strokeWidth="2" strokeDasharray="5,2" />
              {/* Russia / Siberia */}
              <path d="M 220,160 Q 280,180 340,150 T 360,90" fill="none" stroke="#a83244" strokeWidth="1" opacity="0.6" />

              {/* High Friction Points (Military bases, drills) */}
              <g className="cursor-pointer" onMouseEnter={() => setActiveElement("Base sous-marine d'Arkhangelsk (Russie) : Activité nucléaire résurgente")} onMouseLeave={() => setActiveElement(null)}>
                <circle cx="240" cy="150" r="6" fill="#a83244" className="animate-ping" />
                <circle cx="240" cy="150" r="4" fill="#a83244" />
                <text x="250" y="154" fill="#fff" fontSize="8" fontFamily="monospace">ARK-90</text>
              </g>

              <g className="cursor-pointer" onMouseEnter={() => setActiveElement("Base d'alerte avancée de Thulé (Groenland/USA) : Station radar active")} onMouseLeave={() => setActiveElement(null)}>
                <circle cx="135" cy="125" r="4" fill="#1b5ea8" />
                <text x="110" y="120" fill="#a0aec0" fontSize="8" fontFamily="monospace">THULE DEFEN.</text>
              </g>

              <g className="cursor-pointer" onMouseEnter={() => setActiveElement("Détroit de Béring (Sino-Russe/USA) : Surveillance navale permanente")} onMouseLeave={() => setActiveElement(null)}>
                <circle cx="310" cy="80" r="5" fill="#ca8a04" />
                <text x="320" y="84" fill="#ca8a04" fontSize="8" fontFamily="monospace">BERING STRAIT</text>
              </g>

              {/* Shipping lanes routes (Northern Sea Route & Northwest Passage) */}
              <path d="M 110,70 Q 150,55 200,60 T 260,85 T 310,80" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3" />
              <text x="140" y="225" fill="#22c55e" fontSize="7" fontFamily="monospace">Route Transpolaire (Transit Écologique Raccourci)</text>
              <line x1="120" y1="222" x2="135" y2="222" stroke="#22c55e" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 text-[9px] font-mono text-[#22c55e]">
              <Radio size={10} className="animate-pulse" />
              <span>ROUTE NAVIGABLE CHAUDE</span>
            </div>
          </div>
        </div>
      )}

      {/* Render Taiwan & East China Sea Map */}
      {type === "map-china" && (
        <div>
          <h4 className="text-sm font-semibold text-gray-200 mb-2 font-mono">Choke hold stratégique de Formose & Usines de semi-conducteurs</h4>
          <div className="relative h-60 w-full flex items-center justify-center bg-radial from-[#1e1315]/50 to-black rounded">
            <svg viewBox="0 0 400 240" className="w-full h-full text-gray-600">
              {/* Shoreline paths roughly approximating Fujian and Taiwan */}
              {/* Mainland China (Fujian coast) */}
              <path d="M 40,20 Q 80,80 70,140 Q 60,195 20,220" fill="none" stroke="#2d2d30" strokeWidth="4" />
              <path d="M 40,20 L 70,140 L 20,220" fill="#1b1c1e" opacity="0.3" />
              
              {/* Taiwan Island */}
              <path d="M 240,100 C 250,70 270,100 260,150 C 255,180 230,190 225,160 Z" fill="#2d2024" stroke="#a83244" strokeWidth="1.5" />
              
              {/* Strait Line and Buffer Zone (Median line) */}
              <path d="M 140,40 Q 165,120 135,210" fill="none" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="6,4" />
              <text x="75" y="115" fill="#ca8a04" fontSize="8" fontFamily="monospace" transform="rotate(78 140 100)">LIGNE MÉDIANE SENSITIVE</text>

              {/* Major Hsinchu/Tainan TSMC Foundries */}
              <g className="cursor-pointer" onMouseEnter={() => setActiveElement("TSMC Phase 20 (Hsinchu Science Park) - Leader mondial silicium 2nm")} onMouseLeave={() => setActiveElement(null)}>
                <rect x="238" y="90" width="6" height="6" fill="#10b981" />
                <text x="250" y="95" fill="#10b981" fontSize="8" fontFamily="monospace" fontWeight="bold">FAB 20 (N2)</text>
              </g>

              <g className="cursor-pointer" onMouseEnter={() => setActiveElement("Tainan Foundries (TSMC Fab 18) - Production exclusive puces avancées A-Series")} onMouseLeave={() => setActiveElement(null)}>
                <rect x="230" y="145" width="6" height="6" fill="#10b981" />
                <text x="175" y="150" fill="#10b981" fontSize="8" fontFamily="monospace">FAB 18 (3nm)</text>
              </g>

              {/* Naval blocking deployment points */}
              <g className="cursor-pointer" onMouseEnter={() => setActiveElement("Quartier de blocus de la marine populaire d'ici 2026")} onMouseLeave={() => setActiveElement(null)}>
                <polygon points="170,60 180,75 160,75" fill="#ef4444" />
                <polygon points="210,180 220,195 200,195" fill="#ef4444" />
                <text x="140" y="55" fill="#ef4444" fontSize="7" fontFamily="monospace">ZONES D'EXCLUSION</text>
              </g>
              
              {/* Compass grid asset */}
              <circle cx="340" cy="50" r="20" fill="none" stroke="#2c1e21" strokeWidth="0.75" />
              <line x1="340" y1="25" x2="340" y2="75" stroke="#a83244" strokeWidth="0.5" />
              <line x1="315" y1="50" x2="365" y2="50" stroke="#a83244" strokeWidth="0.5" />
              <text x="337" y="22" fill="#a83244" fontSize="6" fontFamily="monospace">N</text>
            </svg>
          </div>
        </div>
      )}

      {/* Cyber Crime / Network Map */}
      {type === "network" && (
        <div>
          <h4 className="text-sm font-semibold text-gray-200 mb-2 font-mono">Réseaux d'action de Ransomware & Blanchiment de Crypto</h4>
          <div className="relative h-60 w-full flex items-center justify-center bg-radial from-[#1e1315]/50 to-black rounded">
            <svg viewBox="0 0 400 240" className="w-full h-full text-gray-500">
              {/* Grid connections lines */}
              <line x1="60" y1="60" x2="160" y2="100" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="160" y1="100" x2="260" y2="70" stroke="#ef4444" strokeWidth="1.5" />
              <line x1="160" y1="100" x2="200" y2="170" stroke="#e11d48" strokeWidth="2" />
              <line x1="200" y1="170" x2="320" y2="180" stroke="#a83244" strokeWidth="1" />
              <line x1="260" y1="70" x2="320" y2="180" stroke="#10b981" strokeWidth="2" strokeDasharray="2,2" />
              <line x1="60" y1="140" x2="160" y2="100" stroke="#4a5568" strokeWidth="1" />
              
              {/* Servers Nodes */}
              <g className="cursor-pointer" onMouseEnter={() => setActiveElement("Zone de minage & Botnets anonymes (XMR - Russie du Nord)")} onMouseLeave={() => setActiveElement(null)}>
                <circle cx="60" cy="60" r="8" fill="#ca8a04" />
                <circle cx="60" cy="60" r="14" fill="none" stroke="#ca8a04" strokeWidth="1" opacity="0.4" className="animate-pulse" />
                <text x="75" y="64" fill="#ca8a04" fontSize="8" fontFamily="monospace">MONERO-BOT</text>
              </g>

              <g className="cursor-pointer" onMouseEnter={() => setActiveElement("Plateforme de mixage Tornado / Tumbler offshore (Dépôts frauduleux)")} onMouseLeave={() => setActiveElement(null)}>
                <circle cx="160" cy="100" r="10" fill="#ef4444" />
                <circle cx="160" cy="100" r="18" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.5" className="animate-pulse" />
                <text x="110" y="85" fill="#ef4444" fontSize="8" fontFamily="monospace" fontWeight="bold">LAUNDERER HUB</text>
              </g>

              <g className="cursor-pointer" onMouseEnter={() => setActiveElement("Puces zombies & serveurs d'encaissement Ransomware (Moyen-Orient)")} onMouseLeave={() => setActiveElement(null)}>
                <circle cx="260" cy="70" r="7" fill="#3182ce" />
                <text x="272" y="74" fill="#a0aec0" fontSize="8" fontFamily="monospace">PROXY EXIT-02</text>
              </g>

              <g className="cursor-pointer" onMouseEnter={() => setActiveElement("Cartel financier sud-américain d'évasion d’actifs (Mule de données payantes)")} onMouseLeave={() => setActiveElement(null)}>
                <circle cx="200" cy="170" r="9" fill="#e11d48" />
                <text x="150" y="190" fill="#e11d48" fontSize="8" fontFamily="monospace">CARTEL-PAYLOAD</text>
              </g>

              <g className="cursor-pointer" onMouseEnter={() => setActiveElement("Passerelle finale de réintégration bancaire licite (Fiduciaires physiques)")} onMouseLeave={() => setActiveElement(null)}>
                <circle cx="320" cy="180" r="8" fill="#10b981" />
                <circle cx="320" cy="180" r="15" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4" />
                <text x="280" y="205" fill="#10b981" fontSize="8" fontFamily="monospace">BANK CLEARING</text>
              </g>

              {/* Data streams indicator */}
              <circle cx="180" cy="135" r="3" fill="#ffffff" className="animate-ping" />
            </svg>
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[9px] font-mono text-gray-400">
              <Network size={11} className="text-[#a83244]" />
              <span>Chiffrement résistant à 98% (Double SHA-256)</span>
            </div>
          </div>
        </div>
      )}

      {/* Render custom analytics chart */}
      {type === "chart" && (
        <div>
          <h4 className="text-sm font-semibold text-gray-200 mb-2 font-mono">Indicateur d'Instabilité et Friction Institutionnelle (Sur 7 ans)</h4>
          <div className="relative h-60 w-full flex flex-col justify-end bg-black/60 rounded p-4">
            <div className="flex items-end justify-between h-40 pt-5 border-l border-b border-gray-800 relative">
              
              {/* Background grid lines */}
              <div className="absolute left-0 right-0 top-1/4 border-t border-gray-900 h-0 w-full" />
              <div className="absolute left-0 right-0 top-2/4 border-t border-gray-900 h-0 w-full" />
              <div className="absolute left-0 right-0 top-3/4 border-t border-gray-900 h-0 w-full" />

              {/* High-quality analytical Custom SVG Lines & Bars */}
              {(data?.chartPoints || [
                { label: "2020", value: 34 },
                { label: "2021", value: 48 },
                { label: "2022", value: 59 },
                { label: "2023", value: 74 },
                { label: "2024", value: 81 },
                { label: "2025", value: 76 },
                { label: "2026", value: 92 },
              ]).map((pt: any, idx: number) => {
                const barHeight = `${pt.value}%`;
                const isHighlight = pt.value > 80;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center flex-1 group cursor-pointer"
                    onMouseEnter={() => setActiveElement(`Période ${pt.label} : Niveau d'alerte global à ${pt.value}%`)}
                    onMouseLeave={() => setActiveElement(null)}
                  >
                    <div className="text-[9px] font-mono text-gray-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {pt.value}%
                    </div>
                    {/* The bar */}
                    <div className="w-6 bg-gradient-to-t from-[#2c1216] to-[#a83244] group-hover:to-[#ef4444] transition-all rounded-t-sm relative" style={{ height: barHeight }}>
                      {isHighlight && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-400 border border-black shadow" />
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-gray-400 mt-2">{pt.label}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 items-center justify-start mt-4 text-[10px] font-mono text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-gradient-to-t from-[#2c1216] to-[#a83244] border border-[#a83244]/40" /> Trend haussière
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Alerte critique (&gt;80%)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer warning */}
      <div className="mt-4 flex items-center gap-1.5 text-[9.5px] text-gray-400 font-mono italic">
        <Shield size={10} className="text-[#a83244]" />
        <span>Document classifié ARC - Diffusion restreinte aux membres accrédités du club.</span>
      </div>
    </div>
  );
}
