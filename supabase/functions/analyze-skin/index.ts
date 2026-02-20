import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image, mimeType } = await req.json();

    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a skin health assessment AI assistant. You analyze images of skin spots, moles, lesions, or other skin concerns and provide an educational risk assessment.

IMPORTANT: You are NOT providing a medical diagnosis. You are providing an educational risk assessment only.

Analyze the provided skin image and respond using the "assess_skin" tool.

Guidelines:
- riskLevel: "low" for likely benign/normal, "moderate" for uncertain or showing some concerning features, "high" for showing multiple warning signs
- explanation: 2-3 sentences describing what you observe in the image. Be specific but non-alarming. Mention visual features like symmetry, border, color, and size if relevant.
- nextSteps: 3-4 actionable recommendations appropriate to the risk level
  - Low: self-monitoring, regular skin checks, sunscreen
  - Moderate: schedule a dermatologist visit, monitor for changes, document with photos
  - High: seek prompt medical consultation, avoid self-treatment, get a professional biopsy
- tips: 2-3 general skin care tips relevant to what you observed (e.g. sun protection, moisturizing, avoiding irritants)

If the image is not a skin photo or is unclear, set riskLevel to "low", explain that the image couldn't be properly assessed, and recommend uploading a clearer image.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mimeType || "image/jpeg"};base64,${image}`,
                  },
                },
                {
                  type: "text",
                  text: "Please analyze this skin image and provide your assessment.",
                },
              ],
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "assess_skin",
                description:
                  "Provide a structured skin health risk assessment based on the image analysis.",
                parameters: {
                  type: "object",
                  properties: {
                    riskLevel: {
                      type: "string",
                      enum: ["low", "moderate", "high"],
                      description: "Overall risk level based on visual assessment",
                    },
                    explanation: {
                      type: "string",
                      description:
                        "2-3 sentence explanation of observations from the image",
                    },
                    nextSteps: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "3-4 actionable next steps appropriate to the risk level",
                    },
                    tips: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "2-3 relevant skin care tips based on the observation",
                    },
                  },
                  required: ["riskLevel", "explanation", "nextSteps", "tips"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "assess_skin" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("AI analysis failed");
    }

    const aiData = await response.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("No structured response from AI");
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-skin error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
