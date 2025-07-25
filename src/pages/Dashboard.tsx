import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SwipeInterface } from "@/components/SwipeInterface";
import { InterviewsView } from "@/components/InterviewsView";
import { SummaryView } from "@/components/SummaryView";

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'swipe' | 'interviews' | 'summary'>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'swipe':
        return <SwipeInterface />;
      case 'interviews':
        return <InterviewsView />;
      case 'summary':
        return <SummaryView />;
      default:
        return (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">Welcome back, Sarah!</h1>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="swipe-card p-6">
                  <h3 className="text-lg font-semibold mb-2">Pending Reviews</h3>
                  <p className="text-3xl font-bold text-primary">24</p>
                  <p className="text-sm text-muted-foreground">Candidates waiting</p>
                </div>
                <div className="swipe-card p-6">
                  <h3 className="text-lg font-semibold mb-2">Scheduled Interviews</h3>
                  <p className="text-3xl font-bold text-accent">8</p>
                  <p className="text-sm text-muted-foreground">This week</p>
                </div>
                <div className="swipe-card p-6">
                  <h3 className="text-lg font-semibold mb-2">Hired</h3>
                  <p className="text-3xl font-bold text-secondary">3</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
              </div>
              <div className="swipe-card p-6">
                <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveView('swipe')}
                    className="btn-primary"
                  >
                    Start Swiping
                  </button>
                  <button 
                    onClick={() => setActiveView('interviews')}
                    className="btn-secondary"
                  >
                    View Interviews
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;