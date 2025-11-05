import { CheckCircle2, CreditCard, TrendingUp, Wallet } from "lucide-react";

const steps = [
  {
    icon: CreditCard,
    title: "Choose Your Plan",
    description: "Select the account size that matches your trading goals and pay the one-time fee.",
  },
  {
    icon: CheckCircle2,
    title: "Instant Evaluation",
    description: "Get immediate access to your funded account. No waiting, no delays.",
  },
  {
    icon: TrendingUp,
    title: "Trade & Profit",
    description: "Start trading with no time limits. Prove your consistency and skill.",
  },
  {
    icon: Wallet,
    title: "Get Paid",
    description: "Request payouts anytime. Receive your earnings within 24 hours.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-gradient-to-b from-primary/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to start earning as a funded trader
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30"></div>
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="glass-card p-6 rounded-2xl card-3d text-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-6 glow-primary">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="inline-block text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
