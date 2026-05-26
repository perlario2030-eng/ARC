import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { GlobalIndicator } from "../types";

interface IndicatorChartProps {
  indicators: GlobalIndicator[];
}

export default function IndicatorChart({ indicators }: IndicatorChartProps) {
  if (!indicators || indicators.length === 0) return null;

  return (
    <div className="bg-[#121214] border border-[#2d2024] p-5 rounded-lg">
      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a83244] mb-4 flex items-center gap-2">
        <span className="w-1.5 h-3 bg-[#a83244] rounded" />
        PROJECTION DES INDICES STRATÉGIQUES
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indicators.map((ind, idx) => {
          // Circular progress calculation
          const radius = 35;
          const strokeWidth = 5;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (ind.value / 100) * circumference;

          return (
            <div
              key={idx}
              className="bg-[#17171a] border border-[#251b1e] rounded p-4 flex items-center justify-between transition-all hover:border-[#422228]"
            >
              {/* Left content */}
              <div className="flex-1 pr-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">
                  MÉTRIQUE SPEC.
                </span>
                <p className="text-xs font-medium text-gray-200 line-clamp-2 leading-snug">
                  {ind.label}
                </p>

                <div className="flex items-center gap-1.5 mt-2">
                  {ind.trend === "up" && (
                    <span className="flex items-center text-[10px] font-mono text-red-500 bg-red-950/40 px-1.5 py-0.5 rounded">
                      <TrendingUp size={10} className="mr-1" /> HAUSSE
                    </span>
                  )}
                  {ind.trend === "down" && (
                    <span className="flex items-center text-[10px] font-mono text-green-500 bg-green-950/40 px-1.5 py-0.5 rounded">
                      <TrendingDown size={10} className="mr-1" /> BAISSE
                    </span>
                  )}
                  {ind.trend === "stable" && (
                    <span className="flex items-center text-[10px] font-mono text-gray-400 bg-gray-900 px-1.5 py-0.5 rounded">
                      <Minus size={10} className="mr-1" /> STABLE
                    </span>
                  )}
                </div>
              </div>

              {/* Right content - Circular Gauge */}
              <div className="relative flex items-center justify-center w-20 h-20">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background track */}
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="transparent"
                    stroke="#1e1e24"
                    strokeWidth={strokeWidth}
                  />
                  {/* Foreground progress */}
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="transparent"
                    stroke={ind.color || "#a83244"}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                {/* Score label inside */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-bold font-mono text-white leading-none">
                    {ind.value}
                  </span>
                  <span className="text-[8px] font-mono text-gray-500 uppercase">
                    pts
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
