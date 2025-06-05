
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { Search, FileText, Calendar, Download, BookOpen, Lightbulb, Brain, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useScrollAnimation, useParallaxScroll } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Type definitions based on database schema
interface Article {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  date: string;
  read_time: string | null;
  source: string;
  url: string;
}

interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: string | null;
  size: string | null;
  category: string;
  download_url: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string | null;
}

const AwarenessHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const scrollY = useParallaxScroll();
  const { elementRef: resourcesRef, isVisible: resourcesVisible } = useScrollAnimation(0.1);

  // Fetch articles from database
  const { data: articles = [], isLoading: articlesLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching articles:', error);
        throw error;
      }
      
      return data as Article[];
    },
  });

  // Fetch resources from database
  const { data: resources = [], isLoading: resourcesLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching resources:', error);
        throw error;
      }
      
      return data as Resource[];
    },
  });

  // Fetch events from database
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
      
      return data as Event[];
    },
  });

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (resource.description && resource.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReadMore = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      {/* Enhanced Hero Section with Parallax */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated background with parallax */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-charis-purple via-charis-blue-dark to-charis-green-dark"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        
        {/* Animated elements with parallax */}
        <div 
          className="absolute top-20 left-10 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          <Brain className="w-16 h-16 text-white animate-pulse" />
        </div>
        <div 
          className="absolute top-40 right-20 opacity-20"
          style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        >
          <Lightbulb className="w-12 h-12 text-white animate-pulse delay-500" />
        </div>
        <div 
          className="absolute bottom-40 left-20 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <BookOpen className="w-14 h-14 text-white animate-pulse delay-1000" />
        </div>
        
        <div 
          className="absolute top-32 right-10 w-24 h-24 border border-white/20 rotate-45 animate-spin-slow"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div 
          className="absolute bottom-32 left-32 w-16 h-16 bg-white/10 rounded-full animate-pulse"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        ></div>
        
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8 animate-fade-in">
              <span className="text-sm font-light tracking-widest text-white/80 uppercase mb-4 block">
                Knowledge • Resources • Education
              </span>
              <h1 className="font-heading text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                Awareness Hub
              </h1>
              <div className="flex justify-center mb-6 md:mb-8">
                <div className="w-16 h-1 bg-charis-blue-light mr-2"></div>
                <div className="w-8 h-1 bg-charis-green-light mr-2"></div>
                <div className="w-4 h-1 bg-charis-purple-light"></div>
              </div>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md px-4">
              Access educational resources, expert insights, and practical tools to better understand mental health and caregiving excellence for older persons.
            </p>
            <div className="max-w-xl mx-auto relative px-4">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full"></div>
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
              <Input
                type="text"
                placeholder="Search for resources, articles, or events..."
                className="pl-12 py-4 md:py-6 text-base bg-white/20 border-white/30 text-white placeholder-white/60 rounded-full backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-px h-8 md:h-12 bg-white/60"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full mx-auto mt-2"></div>
        </div>
      </section>

      {/* Resources Tab Section with Scroll Animation */}
      <section ref={resourcesRef} className="py-8 md:py-16 bg-white">
        <div className="container-custom">
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className={`grid grid-cols-3 mb-8 md:mb-12 mx-4 md:mx-0 transition-all duration-1000 ${
              resourcesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <TabsTrigger value="articles" className="text-sm md:text-base px-2 md:px-4">Articles</TabsTrigger>
              <TabsTrigger value="resources" className="text-sm md:text-base px-2 md:px-4">Resources</TabsTrigger>
              <TabsTrigger value="events" className="text-sm md:text-base px-2 md:px-4">Events</TabsTrigger>
            </TabsList>
            
            {/* Articles Tab with Carousel */}
            <TabsContent value="articles">
              <div className="px-4 md:px-0">
                {articlesLoading ? (
                  <div className="py-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charis-blue mx-auto mb-4"></div>
                    <p>Loading articles...</p>
                  </div>
                ) : filteredArticles.length > 0 ? (
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-heading text-charis-blue-dark">
                        Latest Articles & Insights
                      </h3>
                      <div className="flex gap-2">
                        <CarouselPrevious className="relative top-0 left-0 translate-y-0 translate-x-0" />
                        <CarouselNext className="relative top-0 right-0 translate-y-0 translate-x-0" />
                      </div>
                    </div>
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {filteredArticles.map((article) => (
                        <CarouselItem key={article.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 h-full">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-medium px-2 py-1 bg-charis-blue-light text-charis-blue-dark rounded-full">
                                  {article.category}
                                </span>
                                <span className="text-xs text-gray-500">{article.date}</span>
                              </div>
                              <CardTitle className="text-lg text-charis-blue-dark line-clamp-2 leading-tight">
                                {article.title}
                              </CardTitle>
                              <p className="text-xs text-charis-purple font-medium">{article.source}</p>
                            </CardHeader>
                            <CardContent className="flex-1">
                              <CardDescription className="text-sm text-gray-700 line-clamp-3">
                                {article.excerpt}
                              </CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center pt-2">
                              <span className="text-xs text-gray-500">{article.read_time}</span>
                              <Button 
                                size="sm"
                                variant="ghost" 
                                className="text-charis-blue-dark hover:text-charis-blue hover:bg-charis-blue-light/50 text-xs px-2 py-1"
                                onClick={() => handleReadMore(article.url)}
                              >
                                Read More
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                ) : (
                  <div className="py-12 text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No Articles Found</h3>
                    <p className="text-gray-500">
                      We couldn't find any articles matching your search criteria.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Downloadable Resources Tab */}
            <TabsContent value="resources">
              <div className="grid md:grid-cols-2 gap-6 px-4 md:px-0">
                {resourcesLoading ? (
                  <div className="col-span-2 py-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charis-blue mx-auto mb-4"></div>
                    <p>Loading resources...</p>
                  </div>
                ) : filteredResources.length > 0 ? (
                  filteredResources.map((resource) => (
                    <Card key={resource.id} className="transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                      <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                        <div className="h-12 w-12 rounded-full bg-charis-green-light flex items-center justify-center">
                          <FileText className="h-6 w-6 text-charis-green-dark" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <CardTitle className="text-xl text-charis-blue-dark">{resource.title}</CardTitle>
                          <div className="flex flex-wrap gap-3">
                            <span className="text-sm text-gray-500">{resource.type}</span>
                            <span className="text-sm text-gray-500">{resource.size}</span>
                          </div>
                          <span className="text-sm font-medium text-charis-purple">{resource.category}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-700">
                          {resource.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="highlighted"
                          className="w-full"
                          onClick={() => handleDownload(resource.download_url, resource.title)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 py-12 text-center">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No Resources Found</h3>
                    <p className="text-gray-500">
                      We couldn't find any resources matching your search criteria.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Upcoming Events Tab */}
            <TabsContent value="events">
              <div className="space-y-6 px-4 md:px-0">
                {eventsLoading ? (
                  <div className="py-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charis-blue mx-auto mb-4"></div>
                    <p>Loading events...</p>
                  </div>
                ) : filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <Card key={event.id} className="transition-shadow hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between flex-wrap gap-2">
                          <CardTitle className="text-xl text-charis-blue-dark">{event.title}</CardTitle>
                          <div className="flex items-center text-charis-purple px-4 py-1 bg-charis-purple-light rounded-full">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="font-medium">{event.date}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start">
                          <div className="bg-charis-blue-light text-charis-blue-dark p-2 rounded mr-4">
                            <span className="font-medium">{event.time}</span>
                          </div>
                          <span className="text-gray-700">{event.location}</span>
                        </div>
                        <CardDescription className="text-gray-700 pt-2">
                          {event.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button className="bg-charis-blue hover:bg-charis-blue-dark">
                          Register for Event
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No Events Found</h3>
                    <p className="text-gray-500">
                      We couldn't find any events matching your search criteria.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default AwarenessHub;
