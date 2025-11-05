import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael Chen",
    role: "Day Trader",
    avatar: "MC",
    content: "Best prop firm I've worked with. Instant funding and payouts are exactly as advertised. Already scaled to $250K.",
    rating: 5,
  },
  {
    name: "Sarah Martinez",
    role: "Swing Trader",
    avatar: "SM",
    content: "No time limits changed everything for me. I can trade my strategy without pressure. Support team is incredible.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Forex Trader",
    avatar: "JW",
    content: "Received my first payout in 18 hours. The platform is smooth, rules are fair, and the profit split is generous.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-radial opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
            Trusted by <span className="gradient-primary bg-clip-text text-transparent">15,000+ Traders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our funded traders are saying
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl card-3d"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-foreground mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center font-bold glow-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="glass-card inline-block px-8 py-4 rounded-full">
            <div className="flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">4.9/5</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">2,500+</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
