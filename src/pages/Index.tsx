import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Search, FileText, Shield, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";

const steps = [
  { icon: Camera, title: "Capture", desc: "Take a photo or upload an image of the skin area you want to check." },
  { icon: Search, title: "Analyze", desc: "Our AI analyzes the image and evaluates potential risk factors." },
  { icon: FileText, title: "Results", desc: "Get a clear risk score with an explanation and personalized next steps." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/60 via-background to-background" />
        <div className="container relative mx-auto px-4 py-20 text-center md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              AI-Powered Skin Health
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Your AI Skin Health Companion
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Scan skin spots in seconds. Get an instant risk assessment with clear guidance on next steps — all from your phone.
            </p>
            <div className="flex gap-3">
              <Button asChild size="lg" className="rounded-full px-8 text-base">
                <Link to="/scan">Start Scan</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base">
                <Link to="/education">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <Card key={i} className="border-0 bg-card shadow-md transition-shadow hover:shadow-lg">
              <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                  <s.icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Step {i + 1}
                </span>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <div>
              <h4 className="font-semibold">Medical Disclaimer</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                SkinGuard AI is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified dermatologist for any skin concerns. This tool provides an educational risk assessment only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 SkinGuard AI. For educational purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
