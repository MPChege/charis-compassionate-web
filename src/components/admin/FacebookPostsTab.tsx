import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, ExternalLink, Facebook } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth/AuthProvider';
import FacebookPost, { isFacebookUrl, normaliseFacebookUrl } from '@/components/FacebookPost';
import type { Database } from '@/integrations/supabase/types';

type FacebookPostRow = Database['public']['Tables']['facebook_posts']['Row'];

const FacebookPostsTab = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [posts, setPosts] = useState<FacebookPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [postUrl, setPostUrl] = useState('');
  const [caption, setCaption] = useState('');

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('facebook_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching facebook posts:', error);
      toast({ title: 'Error', description: 'Could not load Facebook posts.', variant: 'destructive' });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFacebookUrl(postUrl)) {
      toast({ title: 'Invalid link', description: 'Please paste a link that starts with https://www.facebook.com/', variant: 'destructive' });
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('facebook_posts').insert([{
      post_url: normaliseFacebookUrl(postUrl),
      caption: caption.trim() || null,
      created_by: user?.id ?? null,
    }]);
    setSaving(false);

    if (error) {
      console.error('Error adding facebook post:', error);
      toast({ title: 'Error', description: 'Could not add the post. Please try again.', variant: 'destructive' });
      return;
    }

    setPostUrl('');
    setCaption('');
    toast({ title: 'Post added', description: 'It now appears on the Awareness Hub.' });
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('facebook_posts').delete().eq('id', id);
    if (error) {
      console.error('Error deleting facebook post:', error);
      toast({ title: 'Error', description: 'Could not remove the post.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Post removed', description: 'It no longer appears on the website.' });
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Facebook className="h-5 w-5" />
            Add a Facebook post to the website
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label htmlFor="post_url" className="text-sm font-medium text-gray-700 mb-1 block">Facebook post link *</label>
              <Input
                id="post_url"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                placeholder="https://www.facebook.com/..."
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                On Facebook, click the post's date/time (under the name) to open it, then copy the link from the address bar. The post must be set to <strong>Public</strong>.
              </p>
            </div>
            <div>
              <label htmlFor="caption" className="text-sm font-medium text-gray-700 mb-1 block">Short note (optional, for your reference)</label>
              <Input
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. IDOP 2026 conference photos"
              />
            </div>
            <Button type="submit" disabled={saving || !postUrl} className="bg-black hover:bg-charis-blue-dark">
              <Plus className="h-4 w-4 mr-2" />
              {saving ? 'Adding...' : 'Add to website'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posts on the website ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-500">No posts yet. Add your first Facebook post above.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div key={post.id} className="rounded-xl border border-gray-200 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-black truncate">{post.caption || 'Facebook post'}</p>
                      <p className="text-xs text-gray-500">Added {new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button asChild variant="outline" size="icon" aria-label="Open on Facebook">
                        <a href={post.post_url} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(post.id)} aria-label="Remove from website">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <FacebookPost url={post.post_url} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FacebookPostsTab;
