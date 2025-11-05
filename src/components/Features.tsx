import { Shield, Zap, TrendingUp, Clock, DollarSign, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Broker-Backed",
    description: "Trade with confidence knowing you're backed by regulated brokers and real capital.",
  },
  {
    icon: Clock,
    title: "No Time Limit",
    description: "Take your time to prove your skills. No pressure, no rushing, just pure trading.",
  },
  {
    icon: DollarSign,
    title: "Up to $2M Funding",
    description: "Scale your account from $25K to $2M as you demonstrate consistent profitability.",
  },
  {
    icon: Zap,
    title: "Instant Payouts",
    description: "Request withdrawals anytime. Get paid within 24 hours of approval.",
  },
  {
    icon: TrendingUp,
    title: "80% Profit Split",
    description: "Keep 80% of your profits. Top performers can earn up to 90% profit share.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "24/7 support from experienced traders and dedicated account managers.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-radial opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">PropTrader Pro</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The most advanced prop trading platform designed for serious traders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl card-3d group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-6 glow-primary group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
