
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Theater, Users, Heart, Megaphone, BookOpen } from "lucide-react";

const servicesData = [
  {
    title: "Theatre Workshops",
    description: "Encouraging drama and storytelling for self-expression and confidence-building among our older community members.",
    icon: Theater,
    gradient: "from-purple-400 to-indigo-600",
    bgGradient: "from-purple-50 to-indigo-100"
  },
  {
    title: "Community Performances",
    description: "Showcasing talents of older persons, offering a platform for storytelling and recognition within our vibrant community.",
    icon: Users,
    gradient: "from-blue-400 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-100"
  },
  {
    title: "Peer Support Groups",
    description: "Facilitating emotional support and peer interaction through guided activities and meaningful connections.",
    icon: Heart,
    gradient: "from-pink-400 to-rose-600",
    bgGradient: "from-pink-50 to-rose-100"
  },
  {
    title: "Awareness Campaigns",
    description: "Educating the community on mental health needs of older persons and the value of creative engagement in aging.",
    icon: Megaphone,
    gradient: "from-orange-400 to-red-600",
    bgGradient: "from-orange-50 to-red-100"
  },
  {
    title: "Arts Programs",
    description: "Providing accessible artistic programs for mental wellness and fostering intergenerational relationships.",
    icon: BookOpen,
    gradient: "from-green-400 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-100"
  },
];

const Services = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-charis-neutral-light via-charis-blue-light/20 to-charis-green-light/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-charis-blue-dark via-charis-purple to-charis-green-dark bg-clip-text text-transparent mb-4">Our Programs & Activities</h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Our comprehensive programs aim to promote mental well-being of older persons through theatre, arts, and community engagement while reducing social isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <Card key={index} className="border-2 border-transparent hover:border-white/50 transition-all duration-300 h-full transform hover:scale-105 hover:shadow-xl overflow-hidden">
              <div className={`bg-gradient-to-br ${service.bgGradient} h-full`}>
                <CardHeader className="pb-2">
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-heading text-gray-800">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
