import { Globe } from "lucide-react";
import { useLanguage, languages } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LanguageSelector = () => {
  const { lang, setLang } = useLanguage();
  const current = languages.find((l) => l.code === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-xs">{current?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto">
        {languages.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code)}
            className={lang === l.code ? "bg-accent" : ""}
          >
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
