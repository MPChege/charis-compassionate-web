
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Theater, Users, Heart, Megaphone, BookOpen, ArrowLeft, ArrowRight } from "lucide-react";

const servicesData = [
  {
    title: "Theatre & Arts for Healing",
    description: "We use drama, music, dance, poetry and storytelling as therapeutic tools. Our events give older persons a creative stage to express life stories, process grief, fight stigma and rebuild self-worth.",
    icon: Theater,
  },
  {
    title: "Train-the-Trainer Programs",
    description: "Building local capacity through caregiver training and arts facilitation. We train caregivers to detect early signs of dementia, use empathetic communication, and lead arts activities as therapeutic interventions.",
    icon: Users,
  },
  {
    title: "Feeding & Community Support",
    description: "Targeted feeding interventions in informal settlements, combining hot meals with health checks, psychosocial support and community referrals for nutritionally vulnerable older persons.",
    icon: Heart,
  },
  {
    title: "Economic Empowerment & Crafts",
    description: "Supporting elders to produce crafts and market them beyond local markets. We participate in LeadingAge Expo exhibitions in the USA, generating income for elders.",
    icon: Megaphone,
  },
  {
    title: "Intergenerational Programs",
    description: "Designing activities that include families, youth and civic institutions so older persons are integrated, not isolated, fostering community connections and understanding.",
    icon: BookOpen,
  },
];

const Services = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-widest text-charis-blue-dark uppercase mb-4 block">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Programs & Services</h2>
            <p className="text-gray-600">
              Comprehensive interventions that transform lives through arts, training, advocacy and practical support, reconnecting older persons to community, purpose and income.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => scrollBy(-1)}
              className="h-12 w-12 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
              aria-label="Previous programs"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="h-12 w-12 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
              aria-label="Next programs"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {servicesData.map((service, index) => (
            <article
              key={service.title}
              data-card
              className="group snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-[calc((100%-48px)/3)] flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:bg-black hover:border-black hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="h-14 w-14 rounded-xl bg-white border border-gray-200 flex items-center justify-center transition-colors duration-300 group-hover:bg-charis-blue group-hover:border-charis-blue">
                  <service.icon className="h-6 w-6 text-black transition-colors duration-300 group-hover:text-white" />
                </div>
                <span className="text-sm font-medium text-gray-400 transition-colors duration-300 group-hover:text-white/40">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-heading text-black mb-4 transition-colors duration-300 group-hover:text-white">
                {service.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-8 transition-colors duration-300 group-hover:text-white/70">
                {service.description}
              </p>
              <Link
                to="/programs"
                className="mt-auto inline-flex items-center text-sm font-medium text-black transition-colors duration-300 group-hover:text-charis-blue"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
