
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Users, Landmark, BookOpen } from "lucide-react";

const servicesData = [
  {
    title: "Dementia Awareness",
    description: "Educational resources and support for understanding and managing dementia and Alzheimer's disease.",
    icon: Brain,
  },
  {
    title: "Mental Health Support",
    description: "Programs focused on elderly depression, anxiety, and other mental health challenges.",
    icon: Heart,
  },
  {
    title: "Caregiver Training",
    description: "Training programs for professional and family caregivers to provide compassionate, effective care.",
    icon: Users,
  },
  {
    title: "Advocacy",
    description: "Advocating for better policies and resources for elderly mental health services.",
    icon: Landmark,
  },
  {
    title: "Community Education",
    description: "Workshops and resources to help communities better understand and support their elderly members.",
    icon: BookOpen,
  },
];

const Services = () => {
  return (
    <section className="section-padding bg-charis-neutral-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charis-blue-dark mb-4">What We Do</h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Our programs and initiatives aim to improve the quality of life for elderly individuals by addressing their mental health needs and fostering supportive communities.
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
