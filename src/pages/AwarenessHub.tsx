import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, FileText, Calendar, Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for resources
const articles = [
  {
    title: "Understanding Dementia: A Guide for Caregivers",
    excerpt: "Learn about the different types of dementia, symptoms, and how to provide effective care for your loved ones.",
    category: "Dementia",
    date: "April 2, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1581087724822-9949180e3614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Depression in the Elderly: Signs and Support Strategies",
    excerpt: "Depression often goes undiagnosed in older adults. Learn how to recognize the signs and provide appropriate support.",
    category: "Mental Health",
    date: "March 28, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1453747063559-36695c8771bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "The Importance of Social Connection for Elderly Mental Health",
    excerpt: "Social isolation can have severe consequences for elderly mental health. Discover ways to foster meaningful connections.",
    category: "Wellbeing",
    date: "March 15, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1523325343676-4136d25d013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Anxiety Management Techniques for Seniors",
    excerpt: "Practical strategies to help elderly individuals manage anxiety symptoms and improve their quality of life.",
    category: "Mental Health",
    date: "March 5, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
];

const resources = [
  {
    title: "Dementia Care Guide",
    description: "A comprehensive guide for families and caregivers providing dementia care at home.",
    type: "PDF",
    size: "2.4 MB",
    icon: FileText
  },
  {
    title: "Mental Health Assessment Tools",
    description: "Screening tools to help identify mental health concerns in elderly individuals.",
    type: "PDF",
    size: "1.8 MB",
    icon: FileText
  },
  {
    title: "Caregiver Self-Care Handbook",
    description: "Essential self-care strategies for caregivers to prevent burnout and maintain wellbeing.",
    type: "PDF",
    size: "3.1 MB",
    icon: FileText
  },
  {
    title: "Communication Techniques for Dementia Care",
    description: "Effective communication strategies when caring for someone with dementia.",
    type: "PDF",
    size: "1.5 MB",
    icon: FileText
  },
];

const events = [
  {
    title: "Dementia Care Workshop",
    date: "May 15, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Compassion Community Center, Nairobi",
    description: "A hands-on workshop for caregivers learning to provide effective dementia care."
  },
  {
    title: "Elderly Mental Health Awareness Seminar",
    date: "June 2, 2025",
    time: "2:00 PM - 4:30 PM",
    location: "Virtual (Zoom)",
    description: "Learn about common mental health challenges affecting the elderly and how to provide support."
  },
  {
    title: "Caregiver Support Group Meeting",
    date: "May 28, 2025",
    time: "6:00 PM - 7:30 PM",
    location: "Charis Eagle Springs Office, Nairobi",
    description: "A supportive gathering for caregivers to share experiences and coping strategies."
  },
];

const AwarenessHub = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-charis-purple-light to-charis-blue-light pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-charis-blue-dark mb-6">Awareness Hub</h1>
            <p className="text-xl text-gray-700 mb-8">
              Access educational resources, articles, and tools to better understand elderly mental health and caregiving.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for resources, articles, or events..."
                className="pl-10 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Tab Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid grid-cols-3 mb-12">
              <TabsTrigger value="articles" className="text-base">Articles</TabsTrigger>
              <TabsTrigger value="resources" className="text-base">Downloadable Resources</TabsTrigger>
              <TabsTrigger value="events" className="text-base">Upcoming Events</TabsTrigger>
            </TabsList>
            
            {/* Articles Tab */}
            <TabsContent value="articles">
              <div className="grid md:grid-cols-2 gap-8">
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
                        <CardTitle className="text-xl text-charis-blue-dark">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-700">
                          {article.excerpt}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                        <Button variant="ghost" className="text-charis-blue-dark hover:text-charis-blue hover:bg-charis-blue-light/50">
                          Read More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 py-12 text-center">
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
              <div className="grid md:grid-cols-2 gap-6">
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource, index) => (
                    <Card key={index} className="transition-shadow hover:shadow-md">
                      <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                        <div className="h-12 w-12 rounded-full bg-charis-green-light flex items-center justify-center">
                          <resource.icon className="h-6 w-6 text-charis-green-dark" />
                        </div>
                        <div className="space-y-1">
                          <CardTitle className="text-xl text-charis-blue-dark">{resource.title}</CardTitle>
                          <div className="flex space-x-3">
                            <span className="text-sm text-gray-500">{resource.type}</span>
                            <span className="text-sm text-gray-500">{resource.size}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-700">
                          {resource.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button className="bg-charis-green hover:bg-charis-green-dark w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
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
              <div className="space-y-6">
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
