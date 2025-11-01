import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User,
  Share2,
  ExternalLink
} from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  category: string;
  author: string | null;
  date: string;
  read_time: string | null;
  featured_image: string | null;
  images: string[] | null;
  url: string | null;
  source: string;
  created_at: string | null;
}

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      
      if (!data) {
        navigate('/awareness-hub');
        return;
      }

      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
      toast({
        title: "Error",
        description: "Failed to load article. Redirecting...",
        variant: "destructive"
      });
      setTimeout(() => navigate('/awareness-hub'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt || '',
        url: url
      }).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Link copied!",
      description: "Article link has been copied to clipboard."
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charis-blue mx-auto mb-4"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </>
    );
  }

  if (!article) {
    return null;
  }

  // If article has external URL but no content, redirect to external URL
  if (!article.content && article.url) {
    window.location.href = article.url;
    return null;
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <article className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-charis-blue-dark to-charis-green-dark text-white py-12">
          <div className="container-custom">
            <Button
              variant="ghost"
              className="text-white hover:text-white/80 hover:bg-white/10 mb-6"
              onClick={() => navigate('/awareness-hub')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Awareness Hub
            </Button>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                {article.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {article.title}
              </h1>
              
              {/* Article Meta */}
              <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                {article.author && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {article.author}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {article.date}
                </div>
                {article.read_time && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {article.read_time}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {article.featured_image && (
          <section className="bg-white">
            <div className="container-custom py-8">
              <div className="max-w-4xl mx-auto">
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Share Button */}
              <div className="flex justify-end mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share Article
                </Button>
              </div>

              {/* Excerpt */}
              {article.excerpt && (
                <div className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-charis-neutral-light rounded-lg border-l-4 border-charis-blue">
                  {article.excerpt}
                </div>
              )}

              {/* Main Content */}
              <div className="prose prose-lg max-w-none mb-12">
                {article.content?.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Image Gallery */}
              {article.images && article.images.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-charis-blue-dark mb-6">
                    Photo Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {article.images.map((image, index) => (
                      <div
                        key={index}
                        className="cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image}
                          alt={`${article.title} - Image ${index + 1}`}
                          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source */}
              {article.source && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Source: <span className="font-medium">{article.source}</span>
                  </p>
                </div>
              )}

              {/* External Link if available */}
              {article.url && (
                <div className="mt-6">
                  <Button asChild variant="outline">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      View Original Article <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              )}

              {/* Call to Action */}
              <Card className="mt-12 bg-gradient-to-br from-charis-blue-light to-charis-green-light border-none">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-charis-blue-dark mb-4">
                    Get Involved
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Support our mission to promote mental wellness for older persons
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button onClick={() => navigate('/get-involved')}>
                      Join Our Cause
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/contact')}>
                      Contact Us
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </article>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default ArticleDetail;



