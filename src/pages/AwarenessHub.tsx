
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, FileText, Calendar, Download, BookOpen, Lightbulb, Brain, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for resources
const articles = [
  {
    title: "Dementia in the Commonwealth – Full Report",
    excerpt: "This comprehensive report provides expert insights into dementia prevention, diagnosis, care, and support across Commonwealth countries. It offers valuable information for healthcare programs and initiatives.",
    category: "Dementia",
    date: "September 2024",
    readTime: "45 min read",
    source: "CommonAge",
    url: "https://www.commage.org/wp-content/uploads/2024/09/Dementia-in-the-Commonwealth-full-report-2024.pdf",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Ageing in The Commonwealth – Research Report",
    excerpt: "This research highlights the challenges and opportunities associated with population ageing in Commonwealth countries, emphasizing the importance of recognizing and supporting the contributions of older people.",
    category: "Research",
    date: "July 2019",
    readTime: "30 min read",
    source: "CommonAge",
    url: "https://www.commage.org/wp-content/uploads/2019/07/CommonAge-Research-Report-Final.pdf",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Celebrating Commonwealth Day & International Women's Day",
    excerpt: "An inspiring article sharing stories of older women from communities across the Commonwealth, emphasizing the value and contributions of older women in society.",
    category: "Community",
    date: "March 2021",
    readTime: "8 min read",
    source: "CommonAge",
    url: "https://www.commage.org/celebrating-commonwealth-day-international-womens-day-8-march-2021/",
    image: "https://images.unsplash.com/photo-1594736797933-d0f71d996273?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Positive Good News Stories",
    excerpt: "A collection of life-affirming true stories that highlight values such as kindness, perseverance, and compassion. These stories serve as inspiration and showcase the power of human connection.",
    category: "Inspiration",
    date: "2024",
    readTime: "15 min read",
    source: "The Foundation for a Better Life",
    url: "https://www.passiton.com/positive-good-news-stories",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Father Turns Personal Tragedy into Triumph",
    excerpt: "A powerful story about a father who created the Honor Connor Scholarship Fund to reward students who served in their community, transforming personal tragedy into positive community impact.",
    category: "Inspiration",
    date: "2024",
    readTime: "6 min read",
    source: "The Foundation for a Better Life",
    url: "https://www.passiton.com/passiton-blog/152-father-turns-personal-tragedy-into-triumph-for",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "A Legend On and Off the Court",
    excerpt: "An article about Kareem Abdul-Jabbar selling his championship rings and MVP trophies to support youth education programs, demonstrating extraordinary generosity and commitment to community development.",
    category: "Inspiration",
    date: "2024",
    readTime: "5 min read",
    source: "The Foundation for a Better Life",
    url: "https://www.passiton.com/positive-good-news-stories/108-a-legend-on-and-off-the-court",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Older Americans Month 2024: Building Connections",
    excerpt: "An article highlighting how older adults in communities boost physical and emotional health through connections, aligning with mental well-being and community engagement initiatives.",
    category: "Community",
    date: "May 2024",
    readTime: "10 min read",
    source: "LeadingAge",
    url: "https://leadingage.org/older-americans-month-2024-news-article/",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Assisted Living News & Insights",
    excerpt: "A comprehensive section featuring news for assisted living providers, offering valuable insights into current trends, challenges, and innovations in elder care services.",
    category: "Healthcare",
    date: "2024",
    readTime: "20 min read",
    source: "LeadingAge",
    url: "https://leadingage.org/assisted-living-news/",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Housing Programs and Policy Impact",
    excerpt: "An important article discussing potential impacts of legislative changes on housing programs for older adults, relevant for understanding current policy environments and advocacy needs.",
    category: "Policy",
    date: "2024",
    readTime: "12 min read",
    source: "LeadingAge",
    url: "https://leadingage.org/threat-to-hud-programs-staff-focus-of-house-hearing/",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  }
];

const resources = [
  {
    title: "Dementia in the Commonwealth – Full Report",
    description: "A comprehensive analysis of dementia care across Commonwealth nations, offering insights into prevention, diagnosis, and support strategies.",
    type: "PDF",
    size: "3.2 MB",
    category: "Mental Health & Dementia Care",
    icon: FileText,
    downloadUrl: "https://www.commage.org/wp-content/uploads/2024/10/4527_FY25_HC_CommonAge_FullReport_Digital_v11-with-links.pdf"
  },
  {
    title: "Train the Trainer Programme – Elder Care",
    description: "Details a training program aimed at enhancing elder care practices in developing countries, emphasizing capacity building and best practices.",
    type: "PDF",
    size: "2.1 MB",
    category: "Mental Health & Dementia Care",
    icon: FileText,
    downloadUrl: "https://www.commage.org/wp-content/uploads/2024/09/REPORT-TRAIN-THE-TRAINER.pdf"
  },
  {
    title: "Pass It On® Stories – Volume 1",
    description: "A collection of true stories highlighting values like perseverance, kindness, and hope, suitable for sharing to inspire visitors and community members.",
    type: "PDF",
    size: "4.5 MB",
    category: "Inspirational Stories & Community Engagement",
    icon: FileText,
    downloadUrl: "https://www.passiton.com/ebooks/FBL_PassItOn_Stories_Volume_1.pdf"
  },
  {
    title: "All the Right Notes",
    description: "Explores how music can be a powerful tool for connection and healing, aligning with arts therapy and mental well-being programs.",
    type: "PDF",
    size: "1.8 MB",
    category: "Inspirational Stories & Community Engagement",
    icon: FileText,
    downloadUrl: "https://assets.passiton.com/articles/pdfs/167_All_the_Right_Notes_PassItOn.pdf"
  },
  {
    title: "Doctor at Your Door: A Guide to Medical House Call Programs",
    description: "Provides insights into implementing medical house call programs for seniors, promoting accessible healthcare solutions for elderly populations.",
    type: "PDF",
    size: "2.7 MB",
    category: "Elder Care & Health Services",
    icon: FileText,
    downloadUrl: "https://leadingage.org/sites/default/files/Senior_Housing_Guide_to_Medical_House_Calls.pdf"
  },
  {
    title: "Electronic Health Records for Long-Term Care",
    description: "A primer on planning and selecting electronic health record systems tailored for long-term and post-acute care settings.",
    type: "PDF",
    size: "3.1 MB",
    category: "Elder Care & Health Services",
    icon: FileText,
    downloadUrl: "https://leadingage.org/sites/default/files/EHR_For_LTPAC_A_Primer_on_Planning_and_Vendor_Selection_0.pdf"
  },
  {
    title: "Ageing in the Commonwealth – Research Report",
    description: "Examines the challenges and opportunities of aging populations within Commonwealth countries, offering comprehensive policy recommendations.",
    type: "PDF",
    size: "2.9 MB",
    category: "Global Aging & Policy Reports",
    icon: FileText,
    downloadUrl: "https://www.commage.org/wp-content/uploads/2019/07/CommonAge-Research-Report-Final.pdf"
  },
  {
    title: "Chapter Report – July 2024",
    description: "Outlines recent initiatives and collaborations aimed at improving aged care services across Commonwealth nations and regional partnerships.",
    type: "PDF",
    size: "1.5 MB",
    category: "Global Aging & Policy Reports",
    icon: FileText,
    downloadUrl: "https://www.commage.org/wp-content/uploads/2024/09/Chapter-Report-July-2024.pdf"
  }
];

const events = [
  {
    title: "Train a Trainer Programme",
    date: "Date to be confirmed",
    time: "Full Day Workshop",
    location: "Multiple Locations (Commonwealth Countries)",
    description: "A comprehensive training program designed to enhance elder care practices and build capacity among caregivers and healthcare professionals in developing countries."
  },
  {
    title: "Community Festivals & Cultural Celebrations",
    date: "Various Dates Throughout the Year",
    time: "Community Events",
    location: "Local Communities, Nairobi",
    description: "Join us for various cultural festivals and community celebrations that bring together elderly individuals, families, and caregivers to foster social connections and mental well-being."
  },
  {
    title: "World Elder Abuse Awareness Day",
    date: "June 15, 2025",
    time: "All Day Campaign",
    location: "Global Initiative - Local Participation",
    description: "A global awareness campaign dedicated to raising awareness about elder abuse prevention, education, and support services for vulnerable elderly populations."
  }
];

const AwarenessHub = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      <Navbar />
      
      {/* Enhanced Hero Section - Reduced height for mobile */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-charis-purple via-charis-blue-dark to-charis-green-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        
        <div className="absolute top-20 left-10 opacity-20">
          <Brain className="w-16 h-16 text-white animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <Lightbulb className="w-12 h-12 text-white animate-pulse delay-500" />
        </div>
        <div className="absolute bottom-40 left-20 opacity-20">
          <BookOpen className="w-14 h-14 text-white animate-pulse delay-1000" />
        </div>
        
        <div className="absolute top-32 right-10 w-24 h-24 border border-white/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        
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
              Access educational resources, expert insights, and practical tools to better understand elderly mental health and caregiving excellence.
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

      {/* Resources Tab Section - Added padding top for mobile */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container-custom">
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 md:mb-12 mx-4 md:mx-0">
              <TabsTrigger value="articles" className="text-sm md:text-base px-2 md:px-4">Articles</TabsTrigger>
              <TabsTrigger value="resources" className="text-sm md:text-base px-2 md:px-4">Resources</TabsTrigger>
              <TabsTrigger value="events" className="text-sm md:text-base px-2 md:px-4">Events</TabsTrigger>
            </TabsList>
            
            {/* Articles Tab */}
            <TabsContent value="articles">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article, index) => (
                    <Card key={index} className="overflow-hidden transition-shadow hover:shadow-lg">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium px-3 py-1 bg-charis-blue-light text-charis-blue-dark rounded-full">
                            {article.category}
                          </span>
                          <span className="text-sm text-gray-500">{article.date}</span>
                        </div>
                        <CardTitle className="text-xl text-charis-blue-dark line-clamp-2">{article.title}</CardTitle>
                        <p className="text-sm text-charis-purple font-medium">{article.source}</p>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-700 line-clamp-3">
                          {article.excerpt}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                        <Button 
                          variant="ghost" 
                          className="text-charis-blue-dark hover:text-charis-blue hover:bg-charis-blue-light/50"
                          onClick={() => handleReadMore(article.url)}
                        >
                          Read More
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center">
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
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource, index) => (
                    <Card key={index} className="transition-shadow hover:shadow-md">
                      <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                        <div className="h-12 w-12 rounded-full bg-charis-green-light flex items-center justify-center">
                          <resource.icon className="h-6 w-6 text-charis-green-dark" />
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
                          className="bg-charis-green hover:bg-charis-green-dark w-full"
                          onClick={() => handleDownload(resource.downloadUrl, resource.title)}
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
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <Card key={index} className="transition-shadow hover:shadow-md">
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
    </>
  );
};

export default AwarenessHub;
