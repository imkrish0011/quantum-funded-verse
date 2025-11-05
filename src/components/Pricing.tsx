import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$149",
    capital: "$25,000",
    features: [
      "Instant evaluation",
      "80% profit split",
      "No time limits",
      "Trading tools included",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$299",
    capital: "$100,000",
    features: [
      "Instant evaluation",
      "85% profit split",
      "No time limits",
      "Advanced trading tools",
      "Priority support",
      "Risk management tools",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "$599",
    capital: "$250,000",
    features: [
      "Instant evaluation",
      "90% profit split",
      "No time limits",
      "Premium trading suite",
      "Dedicated account manager",
      "Advanced analytics",
      "Early payout access",
    ],
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-radial opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Challenge</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scale up as you prove your skills. All plans include instant evaluation and no time limits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-2xl card-3d relative ${
                plan.popular ? "ring-2 ring-primary glow-primary" : ""
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-secondary px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <span className="inline-block text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {plan.price}
                </span>
                <div className="text-muted-foreground">One-time fee</div>
                <div className="mt-4 text-2xl font-semibold text-secondary">
                  {plan.capital}
                </div>
                <div className="text-sm text-muted-foreground">Simulated Capital</div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 glow-primary"
                    : "glass-card hover:glow-secondary"
                }`}
                size="lg"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-muted-foreground">
          <p>Need more capital? Contact us for custom plans up to $2,000,000</p>
        </div>
      </div>
    </section>
  );
};
