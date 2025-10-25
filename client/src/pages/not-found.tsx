import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl font-semibold">Página não encontrada</p>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe
        </p>
        <Link href="/">
          <Button className="mt-6" data-testid="button-go-home">
            <Home className="h-4 w-4" />
            Voltar ao Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
