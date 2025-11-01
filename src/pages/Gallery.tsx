import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { Image, Calendar, MapPin, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface MediaItem {
  id: string;
  type: 'image';
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  date?: string;
  location?: string;
  participants?: string;
}

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const mediaItems: MediaItem[] = [
    // IFA Conference Cape Town Images
    {
      id: "ifa-1",
      type: "image",
      src: "/IFA Conference Capetown/f9970a2d-2104-4129-a6c9-caf6559365e3.jpg",
      alt: "IFA Global Conference Cape Town - Opening ceremony and keynote presentation",
      title: "IFA Conference Opening",
      description: "The International Federation on Ageing Global Conference opening ceremony in Cape Town, South Africa.",
      category: "international-conferences",
      date: "September 9, 2025",
      location: "Cape Town, South Africa",
      participants: "Global aging advocates and policymakers"
    },
    {
      id: "ifa-2",
      type: "image",
      src: "/IFA Conference Capetown/d93b201b-eb48-440b-b6a1-655ed7cdc7ea.jpg",
      alt: "Mrs. Margaret Njagi at IFA Conference networking session",
      title: "Networking Session",
      description: "Mrs. Margaret Njagi, Director of Charis Eagle Springs, engaging with global leaders in aging advocacy.",
      category: "international-conferences",
      date: "September 10, 2025",
      location: "Cape Town, South Africa",
      participants: "Mrs. Margaret Njagi and international delegates"
    },
    {
      id: "ifa-3",
      type: "image",
      src: "/IFA Conference Capetown/7cf91e4b-3d28-4adf-908a-5301d6de3a6e.jpg",
      alt: "Age-Friendly Cities workshop at IFA Conference",
      title: "Age-Friendly Cities Workshop",
      description: "Workshop session on building age-friendly cities and communities for healthy aging.",
      category: "international-conferences",
      date: "September 10, 2025",
      location: "Cape Town, South Africa",
      participants: "Urban planners and aging advocates"
    },
    {
      id: "ifa-4",
      type: "image",
      src: "/IFA Conference Capetown/755b1307-289e-4d44-bd26-df709ea90f7e.jpg",
      alt: "Technology and Aging plenary session at IFA Conference",
      title: "Technology & Aging Session",
      description: "Exploring how technology can support healthy aging and improve quality of life for older persons.",
      category: "international-conferences",
      date: "September 11, 2025",
      location: "Cape Town, South Africa",
      participants: "Technology experts and aging specialists"
    },
    {
      id: "ifa-5",
      type: "image",
      src: "/IFA Conference Capetown/16988c27-6df0-4c6b-8736-678872449728.jpg",
      alt: "Immunization and healthy longevity discussion at IFA Conference",
      title: "Immunization & Longevity",
      description: "Critical discussion on immunization programs and their role in promoting healthy longevity.",
      category: "international-conferences",
      date: "September 11, 2025",
      location: "Cape Town, South Africa",
      participants: "Health professionals and aging advocates"
    },
    {
      id: "ifa-6",
      type: "image",
      src: "/IFA Conference Capetown/ecc942b2-63b1-41ca-9809-0b5aa14b507e.jpg",
      alt: "African voices panel at IFA Global Conference",
      title: "African Voices Panel",
      description: "Amplifying African perspectives on aging and elder care in the global conversation.",
      category: "international-conferences",
      date: "September 11, 2025",
      location: "Cape Town, South Africa",
      participants: "African aging advocates and leaders"
    },
    {
      id: "ifa-7",
      type: "image",
      src: "/IFA Conference Capetown/2a0f53e1-20d7-418d-8cda-f4bcc7cfcdd8.jpg",
      alt: "Future of Healthy Longevity masterclass at IFA Conference",
      title: "Future of Healthy Longevity",
      description: "Masterclass exploring innovative approaches to promoting healthy aging and longevity.",
      category: "international-conferences",
      date: "September 12, 2025",
      location: "Cape Town, South Africa",
      participants: "Longevity researchers and practitioners"
    },
    {
      id: "ifa-8",
      type: "image",
      src: "/IFA Conference Capetown/dda5b5e2-97ac-49bf-9458-b23cc2eab377.jpg",
      alt: "Global partnerships discussion at IFA Conference",
      title: "Global Partnerships",
      description: "Building stronger global partnerships to advance the aging agenda across continents.",
      category: "international-conferences",
      date: "September 12, 2025",
      location: "Cape Town, South Africa",
      participants: "International organizations and NGOs"
    },
    {
      id: "ifa-9",
      type: "image",
      src: "/IFA Conference Capetown/1f895156-b26f-4dd7-a60a-1ba803c82625.jpg",
      alt: "Conference closing ceremony and commitments at IFA Conference",
      title: "Closing Ceremony",
      description: "Conference closing with commitments to shape an inclusive, healthy, and empowered future for all generations.",
      category: "international-conferences",
      date: "September 12, 2025",
      location: "Cape Town, South Africa",
      participants: "All conference delegates and speakers"
    },
    // International Day of Older Persons - Nyeri County
    {
      id: "older-persons-1",
      type: "image",
      src: "/International day of older persons /a2b34318-9752-48ac-aa90-1b8f1d5973a2.jpg",
      alt: "Mrs. Margaret Njagi addressing elders at International Day of Older Persons celebration in Nyeri County",
      title: "Welcome Address by Director",
      description: "Mrs. Margaret Njagi, Director of Charis Eagle Springs, delivering the opening address at the International Day of Older Persons celebration at PCEA Kamuyu.",
      category: "community-events",
      date: "October 1, 2025",
      location: "Nyeri County, Mount Kenya Region",
      participants: "Over 200 older persons and community members"
    },
    {
      id: "older-persons-2",
      type: "image",
      src: "/International day of older persons /e42a8e26-1c43-4afb-924f-63dce487ec7c.jpg",
      alt: "Large gathering of elders at International Day of Older Persons event",
      title: "Community Celebration",
      description: "Over 200 older persons gathered together to celebrate the International Day of Older Persons under the theme 'Upholding Dignity Among Older Persons'.",
      category: "community-events",
      date: "October 1, 2025",
      location: "PCEA Kamuyu, Nyeri County",
      participants: "200+ older persons and community volunteers"
    },
    {
      id: "older-persons-3",
      type: "image",
      src: "/International day of older persons /69bd5c44-606a-4f4b-9cf6-6325485494c6.jpg",
      alt: "Elders engaged in wellness and rights awareness session",
      title: "Wellness & Rights Workshop",
      description: "Educational session focused on elder wellness, rights awareness, and holistic care, promoting inclusion and empowerment.",
      category: "community-events",
      date: "October 1, 2025",
      location: "Nyeri County, Mount Kenya Region",
      participants: "Elders and Train-the-Trainer beneficiaries"
    },
    {
      id: "older-persons-4",
      type: "image",
      src: "/International day of older persons /bfaaae16-1a90-418e-8c7e-3533ee4ef96c.jpg",
      alt: "Creative performance by elders celebrating their wisdom and resilience",
      title: "Celebrating Wisdom Through Performance",
      description: "Elders sharing their talents through creative performances that celebrate the wisdom, resilience, and joy of the elderly community.",
      category: "arts-workshops",
      date: "October 1, 2025",
      location: "PCEA Kamuyu, Nyeri County",
      participants: "Elder performers and audience"
    },
    {
      id: "older-persons-5",
      type: "image",
      src: "/International day of older persons /8f97d3f1-36ec-44d5-b138-a3203d85da96.jpg",
      alt: "Train-the-Trainer beneficiaries actively supporting the celebration",
      title: "Train-the-Trainer Impact",
      description: "Train-the-Trainer Program beneficiaries actively participating in the celebration, demonstrating the sustainability of capacity-building initiatives.",
      category: "capacity-building",
      date: "October 1, 2025",
      location: "Nyeri County, Mount Kenya Region",
      participants: "Train-the-Trainer beneficiaries and peers"
    },
    {
      id: "older-persons-6",
      type: "image",
      src: "/International day of older persons /fc356e9f-2370-4cb7-a4a7-c163679cc2e9.jpg",
      alt: "Elders sharing fellowship and meaningful connections",
      title: "Building Community Connections",
      description: "Elders building meaningful relationships and sharing fellowship, reflecting deep respect and recognition for older persons.",
      category: "community-events",
      date: "October 1, 2025",
      location: "PCEA Kamuyu, Nyeri County",
      participants: "Community elders and families"
    },
    {
      id: "older-persons-7",
      type: "image",
      src: "/International day of older persons /ddf68d7a-1ed7-4b9b-b0bf-33753bfd4195.jpg",
      alt: "Tokens of appreciation distributed to elders",
      title: "Recognizing Elder Contributions",
      description: "Distributing tokens of appreciation to honor the valuable contributions and wisdom of our elderly community members.",
      category: "community-support",
      date: "October 1, 2025",
      location: "Nyeri County, Mount Kenya Region",
      participants: "Elders and event organizers"
    },
    {
      id: "older-persons-8",
      type: "image",
      src: "/International day of older persons /ee55b387-d56f-44f9-8344-b9901e7ae93d.jpg",
      alt: "Elders engaged in wellness activities promoting healthy aging",
      title: "Promoting Active Aging",
      description: "Wellness activities designed to promote active and healthy aging, emphasizing that aging is a blessing to be celebrated.",
      category: "community-support",
      date: "October 1, 2025",
      location: "PCEA Kamuyu, Nyeri County",
      participants: "Elders participating in wellness programs"
    },
    {
      id: "older-persons-9",
      type: "image",
      src: "/International day of older persons /062412aa-1b87-4aeb-958e-8b8f8b74ea02.jpg",
      alt: "Closing moments of International Day celebration honoring elders",
      title: "Honoring Aging as a Gift",
      description: "The celebration concluded with a heartfelt reminder that aging is not a decline but a gift to be honored, respected, and celebrated.",
      category: "community-events",
      date: "October 1, 2025",
      location: "Nyeri County, Mount Kenya Region",
      participants: "All celebration attendees"
    },
    {
      id: "older-persons-10",
      type: "image",
      src: "/International day of older persons /7078fdd4-2e0b-4597-9390-bfbe1a07b681.jpg",
      alt: "Elders sharing laughter and joy during the celebration",
      title: "Joy and Laughter",
      description: "Celebrating the vibrant spirit of our elders through moments of shared laughter, joy, and community fellowship.",
      category: "community-events",
      date: "October 1, 2025",
      location: "PCEA Kamuyu, Nyeri County",
      participants: "Community elders and volunteers"
    },
    // New WhatsApp Images
    {
      id: "whatsapp-1",
      type: "image",
      src: "/WhatsApp Image 2025-08-28 at 07.33.58.jpeg",
      alt: "Community elder participating in arts and crafts activities",
      title: "Arts & Crafts Workshop",
      description: "Elders engaging in creative activities that promote mental wellbeing and social connection.",
      category: "arts-workshops",
      date: "August 28, 2025",
      location: "Nairobi, Kenya",
      participants: "Community elders and facilitators"
    },
    {
      id: "whatsapp-2",
      type: "image",
      src: "/WhatsApp Image 2025-08-28 at 07.33.58 (1).jpeg",
      alt: "Group of elders participating in community activities",
      title: "Community Gathering",
      description: "A vibrant community gathering where elders share stories and participate in group activities.",
      category: "community-events",
      date: "August 28, 2025",
      location: "Nairobi, Kenya",
      participants: "Community elders and families"
    },
    {
      id: "whatsapp-3",
      type: "image",
      src: "/WhatsApp Image 2025-08-28 at 07.33.59.jpeg",
      alt: "Elder showing handmade craft work",
      title: "Craft Exhibition",
      description: "Showcasing the beautiful crafts made by our elders, demonstrating their creativity and skills.",
      category: "economic-empowerment",
      date: "August 28, 2025",
      location: "Nairobi, Kenya",
      participants: "Elder crafters and community members"
    },
    {
      id: "whatsapp-4",
      type: "image",
      src: "/WhatsApp Image 2025-08-28 at 07.35.02.jpeg",
      alt: "Elders participating in theatre activities",
      title: "Theatre & Performance",
      description: "Elders participating in theatre activities that promote self-expression and confidence building.",
      category: "arts-workshops",
      date: "August 28, 2025",
      location: "Nairobi, Kenya",
      participants: "Elder performers and audience"
    },
    {
      id: "whatsapp-5",
      type: "image",
      src: "/WhatsApp Image 2025-08-28 at 07.35.02 (1).jpeg",
      alt: "Community feeding program for elders",
      title: "Feeding Program",
      description: "Our feeding program provides nutritious meals to nutritionally vulnerable older persons in informal settlements.",
      category: "community-support",
      date: "August 28, 2025",
      location: "Nairobi Informal Settlements",
      participants: "Elders and caregivers"
    },
    // Additional images from lovable-uploads to replace videos
    {
      id: "existing-1",
      type: "image",
      src: "/lovable-uploads/4b610869-b25a-4fac-bbd5-a76fc765b517.png",
      alt: "Community elder in traditional dress participating in cultural activities",
      title: "Cultural Heritage Celebration",
      description: "Celebrating cultural heritage through traditional activities that honor our elders' wisdom and traditions.",
      category: "community-events",
      date: "Ongoing",
      location: "Eastern Africa",
      participants: "Elders and community"
    },
    {
      id: "existing-2",
      type: "image",
      src: "/lovable-uploads/a3eabbcc-f8ac-4805-a8a2-a318cd803e6e.png",
      alt: "Community gathering supporting older persons through inclusive programs",
      title: "Intergenerational Programs",
      description: "Programs that bring together different generations to learn from each other and build stronger communities.",
      category: "community-events",
      date: "Ongoing",
      location: "Eastern Africa",
      participants: "Elders, youth, and families"
    },
    {
      id: "existing-4",
      type: "image",
      src: "/lovable-uploads/f38fe72c-5c15-4c17-9e2f-aeda7abdb70a.png",
      alt: "Elders learning new skills and crafts",
      title: "Skills Development Workshop",
      description: "Empowering elders through skills development workshops that enhance their economic independence and self-esteem.",
      category: "economic-empowerment",
      date: "Ongoing",
      location: "Eastern Africa",
      participants: "Elders and skills trainers"
    },
    {
      id: "existing-5",
      type: "image",
      src: "/lovable-uploads/9aec6cc2-0aef-435f-9b96-cad75227852f.png",
      alt: "Caregiver training and capacity building session",
      title: "Caregiver Training Program",
      description: "Our Train-the-Trainer program equipping caregivers with essential skills to support older persons effectively.",
      category: "capacity-building",
      date: "Ongoing",
      location: "Eastern Africa",
      participants: "Caregivers and professional trainers"
    },
    {
      id: "existing-6",
      type: "image",
      src: "/lovable-uploads/8e47fff9-02e0-457d-9bb2-03d32b763e2c.png",
      alt: "Elders participating in arts and creative activities",
      title: "Creative Arts Therapy",
      description: "Using creative arts as therapeutic tools to improve mental health and emotional wellbeing of our elders.",
      category: "arts-workshops",
      date: "Ongoing",
      location: "Eastern Africa",
      participants: "Elders and art therapists"
    },
  ];

  const categories = [
    { id: 'all', name: 'All Images', count: mediaItems.length },
    { id: 'international-conferences', name: 'International Conferences', count: mediaItems.filter(item => item.category === 'international-conferences').length },
    { id: 'arts-workshops', name: 'Arts & Workshops', count: mediaItems.filter(item => item.category === 'arts-workshops').length },
    { id: 'community-events', name: 'Community Events', count: mediaItems.filter(item => item.category === 'community-events').length },
    { id: 'community-support', name: 'Community Support', count: mediaItems.filter(item => item.category === 'community-support').length },
    { id: 'capacity-building', name: 'Capacity Building', count: mediaItems.filter(item => item.category === 'capacity-building').length },
    { id: 'economic-empowerment', name: 'Economic Empowerment', count: mediaItems.filter(item => item.category === 'economic-empowerment').length }
  ];

  const filteredItems = activeFilter === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeFilter);

  const openMedia = (item: MediaItem) => setSelectedMedia(item);
  const closeMedia = () => setSelectedMedia(null);

  return (
    <>
      <Helmet>
        <title>Gallery - Charis Eagle Springs | Visual Stories of Impact</title>
        <meta name="description" content="Explore our image gallery showcasing the transformative work of Charis Eagle Springs through photos of arts workshops, community events, and elder support programs across Eastern Africa." />
        <meta name="keywords" content="Charis Eagle Springs gallery, elder care photos, community events Kenya, arts workshops for seniors, elder support programs, Eastern Africa elder care" />
        <link rel="canonical" href="https://chariseaglesprings.org/gallery" />
      </Helmet>

      <ScrollProgress />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/WhatsApp Image 2025-08-28 at 07.33.58.jpeg" 
              alt="Gallery hero image showing community elders" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
          </div>
          
          <div className="container-custom relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 animate-fade-in">
                <span className="text-sm font-light tracking-widest text-white/80 uppercase mb-4 block">
                  Visual Stories
                </span>
                <h1 className="font-heading text-white mb-6 leading-tight drop-shadow-lg">
                  Our Impact in Pictures
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-charis-blue-light to-charis-green-light mx-auto mb-8"></div>
              </div>
              <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                Witness the transformative power of our programs through the eyes of our community elders and the dedicated team at Charis Eagle Springs.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(category.id)}
                  className={`transition-all duration-300 ${
                    activeFilter === category.id 
                      ? 'bg-charis-green hover:bg-charis-green-dark' 
                      : 'hover:border-charis-green'
                  }`}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 bg-white/20">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  onClick={() => openMedia(item)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Image className="h-4 w-4" />
                          <span className="text-sm font-medium">Image</span>
                        </div>
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-charis-blue-dark mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    
                    <div className="space-y-1 text-xs text-gray-500">
                      {item.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{item.date}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{item.location}</span>
                        </div>
                      )}
                      {item.participants && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{item.participants}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Media Modal */}
      <Dialog open={!!selectedMedia} onOpenChange={closeMedia}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedMedia && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-charis-blue-dark mb-2">{selectedMedia.title}</h2>
                <p className="text-gray-600">{selectedMedia.description}</p>
              </div>
              
              <div className="relative">
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  className="w-full rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {selectedMedia.date && (
                  <div className="text-center p-3 bg-charis-neutral-light rounded-lg">
                    <Calendar className="h-5 w-5 mx-auto mb-2 text-charis-blue-dark" />
                    <div className="font-semibold text-charis-blue-dark">Date</div>
                    <div className="text-gray-600">{selectedMedia.date}</div>
                  </div>
                )}
                {selectedMedia.location && (
                  <div className="text-center p-3 bg-charis-neutral-light rounded-lg">
                    <MapPin className="h-5 w-5 mx-auto mb-2 text-charis-blue-dark" />
                    <div className="font-semibold text-charis-blue-dark">Location</div>
                    <div className="text-gray-600">{selectedMedia.location}</div>
                  </div>
                )}
                {selectedMedia.participants && (
                  <div className="text-center p-3 bg-charis-neutral-light rounded-lg">
                    <Users className="h-5 w-5 mx-auto mb-2 text-charis-blue-dark" />
                    <div className="font-semibold text-charis-blue-dark">Participants</div>
                    <div className="text-gray-600">{selectedMedia.participants}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Gallery;
