import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { Globe } from "./Globe";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Earth Background */}
      <Globe />
      
      {/* Simplified gradient overlay - no grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating badges */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 animate-float">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm">Broker-Backed</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 animate-float" style={{ animationDelay: "0.2s" }}>
              <Zap className="w-4 h-4 text-secondary" />
              <span className="text-sm">Instant Funding</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 animate-float" style={{ animationDelay: "0.4s" }}>
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm">Up to $2M</span>
            </div>
          </div>

          {/* Main heading with glow effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            Get Funded
            <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in">
            Broker-backed funding up to <span className="text-secondary font-semibold">$2,000,000</span>. 
            No time limits. Instant evaluations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" className="text-lg px-8 py-6 glow-primary group bg-primary hover:bg-primary/90">
              Start Your Challenge
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass-card hover:glow-secondary">
              View Pricing
            </Button>
          </div>

          {/* 3D Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Funded Traders", value: "15,000+", delay: "0s" },
              { label: "Total Payouts", value: "$50M+", delay: "0.1s" },
              { label: "Avg. Payout Time", value: "24hrs", delay: "0.2s" },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl card-3d animate-slide-up"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
    </section>
  );
};
