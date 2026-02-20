import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Sun, Eye, Heart, BookOpen } from "lucide-react";

const abcde = [
  { letter: "A", title: "Asymmetry", desc: "One half of the mole doesn't match the other half." },
  { letter: "B", title: "Border", desc: "Edges are irregular, ragged, notched, or blurred." },
  { letter: "C", title: "Color", desc: "Color is not uniform — may include shades of brown, black, pink, red, white, or blue." },
  { letter: "D", title: "Diameter", desc: "The spot is larger than 6mm (about the size of a pencil eraser), though melanomas can be smaller." },
  { letter: "E", title: "Evolving", desc: "The mole is changing in size, shape, or color over time." },
];

const conditions = [
  { name: "Eczema", desc: "Red, itchy, inflamed patches. Keep skin moisturized, avoid triggers, use gentle cleansers." },
  { name: "Psoriasis", desc: "Thick, scaly patches. Manage stress, moisturize, consult a dermatologist for treatment options." },
  { name: "Acne", desc: "Pimples, blackheads, whiteheads. Cleanse gently, avoid picking, use non-comedogenic products." },
  { name: "Fungal Infections", desc: "Ring-shaped rashes, discolored patches. Keep skin dry, don't share personal items, use antifungal creams." },
  { name: "Allergic Reactions", desc: "Hives, redness, swelling. Identify and avoid allergens, use antihistamines if needed." },
];

const sunTips = [
  "Apply SPF 30+ sunscreen daily, even on cloudy days.",
  "Reapply sunscreen every 2 hours and after swimming or sweating.",
  "Wear protective clothing, hats, and UV-blocking sunglasses.",
  "Seek shade during peak UV hours (10 AM – 4 PM).",
  "Avoid tanning beds and sunlamps.",
];

const monitoringTips = [
  "Do a full-body skin check monthly using a mirror.",
  "Take photos of moles to track changes over time.",
  "Pay special attention to new spots or changing moles.",
  "Check hidden areas: scalp, between toes, under nails.",
  "See a dermatologist annually for a professional skin exam.",
];

const lifestyleTips = [
  "Stay hydrated — drink plenty of water daily.",
  "Eat a balanced diet rich in antioxidants (berries, leafy greens, fish).",
  "Get enough sleep to support skin repair.",
  "Manage stress through exercise, meditation, or hobbies.",
  "Avoid smoking — it accelerates skin aging.",
];

const Education = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-center text-3xl font-bold">Skin Health Hub</h1>
          <p className="mb-8 text-center text-muted-foreground">
            Learn how to protect your skin and spot warning signs early.
          </p>

          <Tabs defaultValue="abcde" className="w-full">
            <TabsList className="mb-6 flex h-auto flex-wrap justify-center gap-1 bg-transparent">
              <TabsTrigger value="abcde" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BookOpen className="mr-1.5 h-4 w-4" /> ABCDE Rule
              </TabsTrigger>
              <TabsTrigger value="sun" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Sun className="mr-1.5 h-4 w-4" /> Sun Protection
              </TabsTrigger>
              <TabsTrigger value="monitor" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Eye className="mr-1.5 h-4 w-4" /> Monitoring
              </TabsTrigger>
              <TabsTrigger value="conditions" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Shield className="mr-1.5 h-4 w-4" /> Conditions
              </TabsTrigger>
              <TabsTrigger value="lifestyle" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Heart className="mr-1.5 h-4 w-4" /> Lifestyle
              </TabsTrigger>
            </TabsList>

            <TabsContent value="abcde">
              <Card>
                <CardHeader>
                  <CardTitle>The ABCDE Rule for Skin Checks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Use the ABCDE rule to evaluate moles and spots for warning signs of melanoma.
                  </p>
                  {abcde.map((item) => (
                    <div key={item.letter} className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
                        {item.letter}
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sun">
              <Card>
                <CardHeader><CardTitle>Sun Protection Tips</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {sunTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitor">
              <Card>
                <CardHeader><CardTitle>Skin Monitoring Guide</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {monitoringTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conditions">
              <Card>
                <CardHeader><CardTitle>Common Skin Conditions</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {conditions.map((c) => (
                    <div key={c.name} className="rounded-lg border p-4">
                      <h4 className="font-semibold">{c.name}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lifestyle">
              <Card>
                <CardHeader><CardTitle>Healthy Lifestyle for Your Skin</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {lifestyleTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Education;
