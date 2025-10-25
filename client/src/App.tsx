import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

import Dashboard from "@/pages/dashboard";
import Consumers from "@/pages/consumers";
import Units from "@/pages/units";
import Plants from "@/pages/plants";
import BillingUpload from "@/pages/billing-upload";
import BillingEmails from "@/pages/billing-emails";
import BillingRecords from "@/pages/billing-records";
import Performance from "@/pages/performance";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/consumers" component={Consumers} />
      <Route path="/units" component={Units} />
      <Route path="/plants" component={Plants} />
      <Route path="/billing/upload" component={BillingUpload} />
      <Route path="/billing/emails" component={BillingEmails} />
      <Route path="/billing/records" component={BillingRecords} />
      <Route path="/reports/performance" component={Performance} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b px-6">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <ThemeToggle />
                </header>
                <main className="flex-1 overflow-auto p-6">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
