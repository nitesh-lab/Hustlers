"use client";

import Image from 'next/image';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { user_obj } from '../auth/Signup';
import { usePostContext } from '../../Context/PostProvider';
import { axiosInstance } from '@/lib/axiosInstance';
import { getPosts } from '@/lib/actions/posts';
import Loader from '../common/Loader';
import { useRouter } from 'next/navigation';

interface UserProps extends user_obj {
  profile_url: string;
}

interface PostCardProps<T> {
  user: T;
}

interface CardProps {
  user: {
    name: string;
    profilePicture: string;
    isOnline: boolean;
    _id:string,
  };
  content: string;
  photo?: string;
  likeCount?: number;
  commentCount?: number;
  post_id: string;
  uid: string;
  client_user: user_obj;
  hasliked: boolean;
  comments: Comment[];
}

interface Comment {
  text: string;
  username: string;
  userimage: string;
  userid: string;
}

export default function PostCard<T extends UserProps>({ user }: PostCardProps<T>) {
  const { posts, setPosts } = usePostContext();
  const [time, setTime] = useState(() => Date.now());
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback((node: HTMLDivElement)=> {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {

      async function getData() {
        
        if (user._id.length > 0) {
          setLoading(true);
          const res = await getPosts(user._id, time);

          const newPosts = res?.data.map((e: any) => ({
            post_id: e._id,
            likeCount: e.like.length,
            commentCount: e.comment.length,
            imageUrl: e.photo,
            content: e.text,
            time: e.posted,
            user: { ...e.user },
            hasliked: e.hasLiked,
            comments: e.comments
          }));

          setPosts(prevPosts => {
            const postSet = new Set(prevPosts.map(post => post.post_id));
            const filteredPosts = newPosts.filter((post: { post_id: string; }) => !postSet.has(post.post_id));
            return [...prevPosts, ...filteredPosts];
          });

          setTime(new Date(res?.time).getTime());
          setLoading(false);
          if (res?.data.length === 0) setHasMore(false);
        }
      }

      getData();
    },[]);

  const loadMorePosts = async () => {
    setLoading(true);
    const res = await getPosts(user._id, time);
    const newPosts = res?.data.map((e: any) => ({
      post_id: e._id,
      likeCount: e.like.length,
      commentCount: e.comment.length,
      imageUrl: e.photo,
      content: e.text,
      time: e.posted,
      user: { ...e.user },
      hasliked: e.hasLiked,
      comments: e.comments
    }));

    setPosts(prevPosts => {
      const postSet = new Set(prevPosts.map(post => post.post_id));
      const filteredPosts = newPosts.filter((post: { post_id: string; }) => !postSet.has(post.post_id));
      return [...prevPosts, ...filteredPosts];
    });
    setTime(new Date(res?.time).getTime());
    setLoading(false);
    if (res?.data.length === 0) setHasMore(false);
  };

  return (
    <div className='w-[100%]'>
      {posts.map((e, i) => {
        if (posts.length === i + 1) {
          return (
            <Card
              ref={lastPostRef}
              key={e.post_id}
              uid={user._id}
              likeCount={e.likeCount}
              commentCount={e.commentCount}
              photo={e.imageUrl}
              content={e.content}
              user={{_id:e.user._id, name: e.user.name, profilePicture: e.user.profilePicture, isOnline: e.user.isOnline }}
              post_id={e.post_id}
              client_user={user}
              hasliked={e.hasliked}
              comments={e.comments}
            />
          );
        } else {
          return (
            <Card
              key={e.post_id}
              uid={user._id}
              likeCount={e.likeCount}
              commentCount={e.commentCount}
              photo={e.imageUrl}
              content={e.content}
              user={{_id:e.user._id,name: e.user.name, profilePicture: e.user.profilePicture, isOnline: e.user.isOnline }}
              post_id={e.post_id}
              client_user={user}
              hasliked={e.hasliked}
              comments={e.comments}
            />
          );
        }
      })}
       {loading && (
        <div className="flex justify-center items-center w-full my-4">
          <Loader />
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line react/display-name
const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  user: { _id,name, profilePicture, isOnline },
  client_user = { name: "", _id: "", profile_url: "", email: "" },
  content,
  uid,
  photo,
  likeCount = 0,
  commentCount = 0,
  post_id,
  hasliked,
  comments: initialComments
}, ref) => {

  const router=useRouter();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState('');
  const [hasLiked, setHasLiked] = useState(hasliked);
  const [canComment, setCanComment] = useState(true);

  const commentRef = useRef<HTMLDivElement>(null);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLike = () => {
    if (!hasLiked) {
      axiosInstance.post('api/user/like', { post_id: post_id, uid: uid });
      setHasLiked(true);
    }
  };

  const addComment = () => {
    if (commentText.trim() && canComment) {
      axiosInstance.post('api/user/comment', { post_id: post_id, text: commentText, uid: uid });
      setComments([...comments, { text: commentText, username: client_user.email, userimage: client_user.profile_url, userid: client_user._id }]);
      setCommentText('');
      setCanComment(false);
      setTimeout(() => setCanComment(true), 3000); // Set a timer to allow commenting again after 3 seconds
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addComment();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (commentRef.current && !commentRef.current.contains(event.target as Node)) {
      setShowComments(false);
    }
  };

  useEffect(() => {
    if (showComments) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showComments]);

  function handleClick(){
    router.push(`profile/${_id}`)
  }

  return (
    <div className="w-[100%] relative" ref={ref}>
      <div className="max-w-[90%] mx-[5%] sm:max-w-[512px]  my-[1rem] sm:my-[1.5rem] 
      sm:mx-auto bg-white border rounded-lg shadow-md">
        
        <div onClick={()=>handleClick()} className="flex items-center p-4">
          <div className="w-10 h-10 rounded-full bg-gray-300">
            {profilePicture && (
              <Image
                src={profilePicture}
                alt={`${name}'s profile picture`}
                className="rounded-full object-cover"
                width={48}
                height={48}
              />
            )}
          </div>
          <div className="ml-3 flex items-center space-x-2">
            <p className="text-sm font-medium">{name}</p>
            {isOnline && <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>}
          </div>
          <button className="ml-auto text-blue-600 font-medium">+ Follow</button>
        </div>

        <div className="px-4 pb-4">
          <p>{content}</p>
          <div className="text-gray-600">+ {likeCount} Likes </div>
        </div>

        {photo && (
          <div className="relative">
            <Image src={photo} alt="Post image" className="w-full" width={500} height={300} />
            
          </div>
        )}

        <div className="flex justify-around border-t border-gray-300 py-2">
          <button className={`flex items-center ${hasLiked ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`} onClick={handleLike} disabled={hasLiked}>
            <AiOutlineLike className="mr-1" /> Like
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600" onClick={toggleComments}>
            <FaRegComment className="mr-1" /> Comment
          </button>
          {/* <button className="flex items-center text-gray-600 hover:text-blue-600">
            <IoMdSend className="mr-1" /> Send
          </button> */}
        </div>

        {showComments && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-95 border rounded-lg shadow-md p-4 z-10 overflow-y-auto" 
          ref={commentRef}>
            <div className="flex items-center space-x-2 mb-4">
              <Image src={profilePicture} alt={`${name}'s profile picture`} className="rounded-full object-cover" width={36} height={36} />
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 p-2 border rounded-lg focus:outline-none"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!canComment}
              />
              <button 
                onClick={addComment}
                className="p-2 bg-blue-600 text-white rounded-lg"
                disabled={!canComment}>
                Send
              </button>
            </div>
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={Math.random()} className="flex items-start space-x-3">
                  <Image 
                    src={comment.userimage || "/default-profile.png"} 
                    alt={`${comment.username}'s profile picture`} 
                    className="rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{comment.username}</p>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
