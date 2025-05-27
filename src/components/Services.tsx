
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Theater, Users, Heart, Megaphone, BookOpen } from "lucide-react";

const servicesData = [
  {
    title: "Theatre Workshops",
    description: "Encouraging drama and storytelling for self-expression and confidence-building among our elderly community members.",
    icon: Theater,
  },
  {
    title: "Community Performances",
    description: "Showcasing elderly talents, offering a platform for storytelling and recognition within our vibrant community.",
    icon: Users,
  },
  {
    title: "Peer Support Groups",
    description: "Facilitating emotional support and peer interaction through guided activities and meaningful connections.",
    icon: Heart,
  },
  {
    title: "Awareness Campaigns",
    description: "Educating the community on mental health needs of the elderly and the value of creative engagement in aging.",
    icon: Megaphone,
  },
  {
    title: "Arts Programs",
    description: "Providing accessible artistic programs for mental wellness and fostering intergenerational relationships.",
    icon: BookOpen,
  },
];

const Services = () => {
  return (
    <section className="section-padding bg-charis-neutral-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charis-blue-dark mb-4">Our Programs & Activities</h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Our comprehensive programs aim to promote mental well-being of the elderly through theatre, arts, and community engagement while reducing social isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <Card key={index} className="card-custom hover:border-charis-blue transition-colors h-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-charis-blue-light flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-charis-blue-dark" />
                </div>
                <CardTitle className="text-xl font-heading text-charis-blue-dark">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
