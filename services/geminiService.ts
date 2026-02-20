
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeResume = async (
  resumeText: string, 
  jobDescription: string
): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const modelName = 'gemini-3-flash-preview';
  
  const config = {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        suitability_score: { type: Type.NUMBER },
        semantic_match_score: { type: Type.NUMBER },
        ai_confidence_score: { type: Type.NUMBER },
        job_complexity: { type: Type.STRING },
        readiness_timeline: {
          type: Type.OBJECT,
          properties: {
            current: { type: Type.NUMBER },
            potential: { type: Type.NUMBER }
          }
        },
        overqualification_status: { type: Type.STRING },
        skill_redundancy: { type: Type.ARRAY, items: { type: Type.STRING } },
        hiring_risk: { type: Type.STRING },
        score_formula_explanation: { type: Type.STRING },
        alternative_role_fit: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              role: { type: Type.STRING },
              fit: { type: Type.STRING },
              reason: { type: Type.STRING }
            }
          }
        },
        primary_rejection_reason: { type: Type.STRING },
        bias_check: { type: Type.STRING },
        verdict: { type: Type.STRING },
        recommended_role_levels: { type: Type.ARRAY, items: { type: Type.STRING } },
        skill_importance_weights: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING },
              impact: { type: Type.STRING },
              type: { type: Type.STRING }
            }
          }
        },
        matched_skills: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING },
              status: { type: Type.STRING }
            }
          }
        },
        missing_skills: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING },
              status: { type: Type.STRING }
            }
          }
        },
        skill_gap_roadmap: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING },
              priority: { type: Type.STRING },
              improvement_potential: { type: Type.STRING }
            }
          }
        },
        rank_explanation: { type: Type.STRING },
        risk_flags: { type: Type.ARRAY, items: { type: Type.STRING } },
        bias_note: { type: Type.STRING },
        summary: { type: Type.STRING },
        experience_alignment: { type: Type.STRING },
        key_highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
        recommendation: { type: Type.STRING },
        primary_reduction_reason: { type: Type.STRING },
        education_summary: { type: Type.STRING }
      },
      required: [
        "suitability_score", "semantic_match_score", "ai_confidence_score", "job_complexity",
        "readiness_timeline", "overqualification_status", "hiring_risk", "score_formula_explanation",
        "verdict", "bias_check", "primary_rejection_reason"
      ]
    },
    systemInstruction: `You are a Next-Gen XAI Recruitment Architect. 
    Analyze the candidate using zero-shot semantic reasoning. 
    - semantic_match_score: How conceptually similar is the candidate to the ideal profile (beyond keywords).
    - job_complexity: Analyze the JD difficulty (Low/Medium/High).
    - overqualification_status: Detect if candidate is overqualified/well-matched/underqualified.
    - hiring_risk: Probabilistic risk level based on mismatch.
    - score_formula_explanation: A human-readable breakdown of how scores were weighted (e.g. '60% Experience + 30% Skills...').
    - bias_check: Confirm decision-making is strictly objective.
    - readiness_timeline: Current readiness vs Potential after a 3-month onboarding.`
  };

  const prompt = `
    Job Description:
    ${jobDescription}
    
    Resume Text:
    ${resumeText}
    
    Generate the decision intelligence audit in strict JSON.
  `;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: config
  });

  return JSON.parse(response.text.trim()) as AnalysisResult;
};
