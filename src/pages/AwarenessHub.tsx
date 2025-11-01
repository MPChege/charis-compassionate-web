
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  Search,
  BookOpen,
  Users,
  Download,
  ArrowRight
} from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeTable } from '@/hooks/useRealtimeTable';

const AwarenessHub = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Set up real-time subscriptions
  useRealtimeTable({
    table: 'articles',
    onInsert: () => fetchArticles(),
    onUpdate: () => fetchArticles(),
    onDelete: () => fetchArticles(),
    showNotifications: true
  });

  useRealtimeTable({
    table: 'events',
    onInsert: () => fetchEvents(),
    onUpdate: () => fetchEvents(),
    onDelete: () => fetchEvents(),
    showNotifications: true
  });

  useRealtimeTable({
    table: 'resources',
    onInsert: () => fetchResources(),
    onUpdate: () => fetchResources(),
    onDelete: () => fetchResources(),
    showNotifications: true
  });

  useEffect(() => {
    Promise.all([fetchArticles(), fetchEvents(), fetchResources()])
      .finally(() => setLoading(false));
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charis-blue mx-auto mb-4"></div>
            <p>Loading awareness hub...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-charis-blue-dark to-charis-green-dark text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Awareness Hub</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Stay informed with the latest articles, upcoming events, and valuable resources 
            for mental health awareness and elderly care.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search articles, events, resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/70"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Articles ({filteredArticles.length})
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Events ({filteredEvents.length})
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Resources ({filteredResources.length})
              </TabsTrigger>
            </TabsList>

            {/* Articles Tab */}
            <TabsContent value="articles">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    {article.featured_image && (
                      <div className="overflow-hidden rounded-t-lg">
                        <img
                          src={article.featured_image}
                          alt={article.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span className="text-sm text-gray-500">{article.date}</span>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.read_time}
                        </div>
                        {article.content && article.slug ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/article/${article.slug}`)}
                          >
                            Read More <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        ) : article.url ? (
                          <Button asChild variant="outline" size="sm">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                              Read More <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {searchTerm ? 'No articles match your search.' : 'No articles available yet.'}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span>{event.title}</span>
                        <Badge variant="outline" className="ml-2">
                          {new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date} at {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{event.description}</p>
                      <Button className="w-full">
                        {new Date(event.date) > new Date() ? 'Register for Event' : 'View Details'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {searchTerm ? 'No events match your search.' : 'No events scheduled yet.'}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{resource.category}</Badge>
                        <span className="text-xs text-gray-500">{resource.type}</span>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        {resource.size && (
                          <span className="text-sm text-gray-500">{resource.size}</span>
                        )}
                        <Button asChild size="sm">
                          <a href={resource.download_url} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <Download className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {searchTerm ? 'No resources match your search.' : 'No resources available yet.'}
                  </p>
                </div>
              )}
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
