import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Initialize express app
const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GoogleGenAI client to avoid crashes if API key is not yet present
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// REST API Endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "active",
    club: "ARC (Analysis and Research Lab)",
    founded: 1988,
    version: "2.1.0"
  });
});

// Assistant Strategy API leveraging Gemini
app.post("/api/gemini/generate", async (req, res) => {
  const { topic, category } = req.body;

  if (!topic) {
    res.status(400).json({ error: "Sujet de recherche manquant." });
    return;
  }

  // Define Category label in French
  const catNames: { [key: string]: string } = {
    geopolitics: "Géopolitique & Écosystèmes de Puissance",
    politics: "Politique, Polarisation & Lobbying Institutionnel",
    crime: "Criminalité Transnationale & Réseaux Occultes",
  };

  const currentCategory = catNames[category] || "Analyse Multilatérale";

  const prompt = `Génère une note d'analyse stratégique confidentielle de niveau Think Tank international de haute importance sur le sujet suivant : "${topic}" de la rubrique "${currentCategory}".
  
  Le rapport doit respecter scrupuleusement le ton d'ARC : hautement intellectuel, élégant, solennel, analytique et réaliste, inspiré des rapports de la RAND Corporation, du CSIS et du Royal United Services Institute (RUSI). Heure actuelle de l'indexation : ${new Date().toISOString()}.
  
  Formatte la réponse en un JSON valide avec l'arborescence stricte suivante pour que le frontend l'affiche d'une manière somptueuse :
  {
    "title": "Un titre extrêmement prestigieux, journalistique et percutant",
    "summary": "Une synthèse exécutive haut de gamme et dense de 2-3 phrases de niveau secret défense.",
    "introduction": "Une contextualisation sociologique ou géostratégique raffinée.",
    "sections": [
      {
        "subtitle": "Titre prestigieux de la Section 1 (ex. Forces de friction, Vecteurs de rupture)",
        "content": "Analyse rigoureuse et détaillée démontrant une profonde culture de l'enjeu, avec de vraies références théoriques, historiques ou conceptuelles."
      },
      {
        "subtitle": "Titre prestigieux de la Section 2 (ex. Enjeux multilatéraux, Ramifications financières)",
        "content": "Suite des déductions d'experts avec des indicateurs d'analyse structurés."
      }
    ],
    "indicators": [
      {"label": "Nom d'un indicateur clé mesurable en % ou échelle (ex: Indice de Friction en Arctique)", "value": 74},
      {"label": "Indicateur 2 (ex: Risque de rupture logistique)", "value": 43},
      {"label": "Indicateur 3 (ex: Taux de pénétration institutionnelle)", "value": 68}
    ],
    "strategy": "Une section finale de recommandations opérationnelles concrètes baptisée 'Directives Académiques et Recommandations Opérationnelles'."
  }`;

  try {
    const ai = getGeminiClient();

    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "Tu es le Secrétaire Général et Directeur des Recherches de l'ARC (Analysis and Research Lab). Tu génères de prestigieux rapports d'analyse géopolitique, politique ou criminelle. Tu rédiges exclusivement en langue française soutenue, hautement académique, dense et sérieuse. Ne mets jamais d'explications superflues en dehors du bloc JSON demandé.",
        },
      });

      const responseText = response.text || "";
      let parsedOutput;
      try {
        parsedOutput = JSON.parse(responseText.trim());
        res.json({ ...parsedOutput, source: "ARC Intelligence (Gemini)" });
      } catch (parseErr) {
        // Fallback inside catch if JSON from AI was slightly formatted with markdown wrapper
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedOutput = JSON.parse(jsonMatch[0].trim());
          res.json({ ...parsedOutput, source: "ARC Intelligence (Gemini)" });
        } else {
          throw new Error("Impossible de formater l'analyse IA sous forme structurée.");
        }
      }
    } else {
      // Elegant, rich, highly-detailed LOCAL demo simulation with zero external failure risk
      // Generates customized elegant reports based on category and topic
      setTimeout(() => {
        let title = `Analyse Stratégique : Les ramifications de l'enjeu "${topic}"`;
        let summary = `Cette note confidentielle examine le dossier "${topic}" sous le prisme des équilibres multilatéraux. Les projections de notre cellule indiquent une recomposition tactique précoce des rapports de force régionaux.`;
        let intro = `L'accélération des dynamiques technologiques et réglementaires a redessiné la grille de lecture des conflits d'influence autour de : ${topic}. L'évaluation d'ARC pose l'hypothèse d'une asymétrie croissante entre acteurs souverains et structures mercantiles privées.`;
        
        let sections = [
          {
            subtitle: "Vecteurs de Friction et Pression Multipolaire",
            content: `L'étude approfondie du dossier "${topic}" révèle une fragilité structurelle des traités existants. La résilience des chaînes de transfert logistique et d'influence politique est compromise par des interventions tierces indirectes. Ce phénomène engendre un biais systémique dans la collecte de renseignement ouvert.`
          },
          {
            subtitle: "Ramifications Confidentielles et Échiquier Occulte",
            content: "L'interconnexion globale crée des zones grises juridictionnelles exploitées avec minutie par des entités coordonnées. La circulation de capitaux non-étatiques et l'usage de plateformes chiffrées compliquent l'équation décisionnelle des centres opérationnels étatiques traditionnels."
          }
        ];

        let indicators = [
          { label: "Niveau d'Instabilité Globale", value: 62 },
          { label: "Indice d'Asymétrie Logistique", value: 49 },
          { label: "Vulnérabilité Institutionnelle", value: 38 }
        ];

        let strategy = "Il convient d'initier un moratoire d'analyse d'impact à spectre large, d'ancrer de nouveaux verrous de chiffrement souverains, et de consolider le réseau de coopération bilatérale au sein de notre conseil d'investigation d'élite.";

        if (category === "geopolitics") {
          title = `Pivot Tactique & Redistribution Multi-Sphères : ${topic}`;
          indicators = [
            { label: "Friction Géostratégique", value: 78 },
            { label: "Perméabilité des Frontières Maritimes", value: 54 },
            { label: "Indice de Soumission Énergétique", value: 65 }
          ];
        } else if (category === "politics") {
          title = `Lobbying de Rupture & Érosion des Verrous Démocratiques : ${topic}`;
          indicators = [
            { label: "Polarisation Idéologique", value: 83 },
            { label: "Densité du Lobbying Privé", value: 71 },
            { label: "Taux de Confiance Publique", value: 29 }
          ];
        } else if (category === "crime") {
          title = `Anatomie de la Menace Souterraine et Criminalité Organisée : ${topic}`;
          indicators = [
            { label: "Flux Financiers Occultes", value: 89 },
            { label: "Intégration du Chiffrement Criminel", value: 76 },
            { label: "Capacité de Dissidance Opérationnelle", value: 58 }
          ];
        }

        res.json({
          title,
          summary,
          introduction: intro,
          sections,
          indicators,
          strategy,
          source: "ARC Intelligence d'Élite (Moteur d'Analyse Interne)",
          isDemo: true,
          notice: "Pour obtenir des conclusions de l'IA vivante en temps réel avec Gemini, l'administrateur système peut insérer une GEMINI_API_KEY valide dans le volet Secrets."
        });
      }, 1500);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Erreur de génération d'analyse stratégique." });
  }
});

// Setup Vite & static serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware mounted successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production build from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ARC Platform] Server running securely on http://localhost:${PORT}`);
  });
}

setupVite();
