import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recentPosts, setRecentPosts] = useState(null);
  const [post, setPost] = useState(null);
  console.log(error);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return(
    <main className='p-3 flex flex-col max-w-5xl mx-auto min-h-screen'>
        <h1 className='text-3xl uppercase mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
            {post?.title}
        </h1>
        <Link 
          to={`/search?category=${post && post.category}`} 
          className='self-center mt-5'
        >
            <Button color='gray' pill size='xs'>
                {post?.category}
            </Button>
        </Link>
        <img 
          src={post?.image} 
          alt={post?.title} 
          className='mt-10  p-3 max-h-[600px] w-full rounded-3xl object-contain'
        />
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl my-5 text-xs">
            <span>
              {post && new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className='italic'>
              {post && (post.content.length /800).toFixed(0)} mins read
            </span>
        </div>

        <div className='px-3 py-5 max-w-full mx-auto w-full post-content' dangerouslySetInnerHTML={{__html: post?.content}}>
        </div>
        
        <div className='max-w-full mx-auto pt-5 w-full'>
          <CallToAction />
        </div>
        
        <CommentSection postId={post._id} />
        
        <div className='flex flex-col justify-center items-center mb-5 '>
          <h1 className='text-2xl mt-5'>
            Recent Articles 
          </h1>
          <div className='flex flex-wrap gap-8 mt-5 justify-center '>
            {
              recentPosts &&
              recentPosts.map((post) => <PostCard key={post._id} post={post} />)
            }
          </div>
        </div>
  </main>
  ); 
}