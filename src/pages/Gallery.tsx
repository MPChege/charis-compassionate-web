import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { Play, Image, Video, Calendar, MapPin, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
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
    // New WhatsApp Videos
    {
      id: "whatsapp-video-1",
      type: "video",
      src: "/WhatsApp Video 2025-08-28 at 07.34.13.mp4",
      alt: "Elders participating in dance and movement activities",
      title: "Movement & Dance Therapy",
      description: "Gentle movement and dance activities designed to improve mobility and bring joy to our elders.",
      category: "arts-workshops",
      date: "August 28, 2025",
      location: "Nairobi, Kenya",
      participants: "Elders and movement facilitators"
    },
    {
      id: "whatsapp-video-2",
      type: "video",
      src: "/WhatsApp Video 2025-08-28 at 07.34.15.mp4",
      alt: "Community elders sharing stories and experiences",
      title: "Storytelling Circle",
      description: "A storytelling session where elders share their life experiences and wisdom with the community.",
      category: "community-events",
      date: "August 28, 2025",
      location: "Nairobi, Kenya",
      participants: "Elders and community members"
    },
    {
      id: "whatsapp-video-3",
      type: "video",
      src: "/WhatsApp Video 2025-08-28 at 07.34.16.mp4",
      alt: "Arts and crafts workshop in progress",
      title: "Creative Workshop",
      description: "Elders working on various arts and crafts projects that stimulate creativity and fine motor skills.",
      category: "arts-workshops",
      date: "August 28, 2025",
      location: "Nairobi, Kenya",
      participants: "Elders and art facilitators"
    },
    {
      id: "whatsapp-video-4",
      type: "video",
      src: "/WhatsApp Video 2025-08-28 at 07.34.19.mp4",
      alt: "Community celebration and performance",
      title: "Community Celebration",
      description: "A joyful community celebration showcasing the talents and achievements of our elders.",
      category: "community-events",
      date: "August 28, 2025",
      location: "Nairobi, Kenya",
      participants: "Elders, families, and community"
    },
    {
      id: "whatsapp-video-5",
      type: "video",
      src: "/WhatsApp Video 2025-08-28 at 07.34.23.mp4",
      alt: "Training session for caregivers",
      title: "Caregiver Training",
      description: "Our Train-the-Trainer program equipping caregivers with skills to support older persons effectively.",
      category: "capacity-building",
      date: "August 28, 2025",
      location: "Nairobi, Kenya",
      participants: "Caregivers and trainers"
    },
    // Existing images (keeping some for context)
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
    }
  ];

  const categories = [
    { id: 'all', name: 'All Media', count: mediaItems.length },
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
        <meta name="description" content="Explore our gallery showcasing the transformative work of Charis Eagle Springs through images and videos of arts workshops, community events, and elder support programs across Eastern Africa." />
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
                  Our Impact in Pictures & Videos
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
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        muted
                        loop
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          {item.type === 'video' ? (
                            <Play className="h-4 w-4" />
                          ) : (
                            <Image className="h-4 w-4" />
                          )}
                          <span className="text-sm font-medium">{item.type === 'video' ? 'Video' : 'Image'}</span>
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
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.src}
                    controls
                    className="w-full rounded-lg"
                    autoPlay
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    className="w-full rounded-lg"
                  />
                )}
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
