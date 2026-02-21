import { useLocation, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, ArrowLeft, RotateCcw, Stethoscope, Video } from "lucide-react";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";

const riskConfig = {
  low: {
    label: "Low Risk",
    color: "bg-[hsl(var(--risk-low))]",
    textColor: "text-[hsl(var(--risk-low))]",
    icon: CheckCircle,
    barWidth: "33%",
  },
  moderate: {
    label: "Moderate Risk",
    color: "bg-[hsl(var(--risk-moderate))]",
    textColor: "text-[hsl(var(--risk-moderate))]",
    icon: AlertTriangle,
    barWidth: "66%",
  },
  high: {
    label: "High Risk",
    color: "bg-[hsl(var(--risk-high))]",
    textColor: "text-[hsl(var(--risk-high))]",
    icon: AlertTriangle,
    barWidth: "100%",
  },
};

interface AnalysisResult {
  riskLevel: "low" | "moderate" | "high";
  explanation: string;
  nextSteps: string[];
  tips: string[];
}

const Results = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const state = location.state as { result?: AnalysisResult; imageUrl?: string } | null;

  if (!state?.result) {
    return <Navigate to="/scan" replace />;
  }

  const { result, imageUrl } = state;
  const risk = riskConfig[result.riskLevel] || riskConfig.low;
  const RiskIcon = risk.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-lg">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/scan">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Scan
            </Link>
          </Button>

          <h1 className="mb-6 text-3xl font-bold">Your Results</h1>

          {/* Image preview */}
          {imageUrl && (
            <Card className="mb-6 overflow-hidden">
              <img src={imageUrl} alt="Scanned skin area" className="w-full max-h-48 object-cover" />
            </Card>
          )}

          {/* Risk Score Gauge */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <RiskIcon className={`h-8 w-8 ${risk.textColor}`} />
                <div>
                  <Badge className={`${risk.color} text-white border-0 text-sm px-3 py-1`}>
                    {risk.label}
                  </Badge>
                </div>
              </div>
              {/* Visual bar */}
              <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${risk.color}`}
                  style={{ width: risk.barWidth }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
              </div>
            </CardContent>
          </Card>

          {/* Explanation */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">What We Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Stethoscope className="h-5 w-5 text-primary" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tips */}
          {result.tips && result.tips.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Skin Care Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1 rounded-full">
              <Link to="/scan">
                <RotateCcw className="mr-2 h-4 w-4" /> {t("scanAgain")}
              </Link>
            </Button>
            <Button asChild variant="secondary" className="flex-1 rounded-full">
              <Link to="/consult">
                <Video className="mr-2 h-4 w-4" /> {t("consultDoctor")}
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 rounded-full">
              <Link to="/education">{t("learnMore")}</Link>
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            This assessment is for educational purposes only and is not a medical diagnosis. Please consult a dermatologist for professional evaluation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
