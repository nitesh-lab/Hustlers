"use client"
import Image from 'next/image';
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { user_obj } from '../auth/Signup';
import { usePostContext } from '../../Context/PostProvider';
import { axiosInstance } from '@/lib/axiosInstance';
import { getPosts } from '@/lib/actions/posts';

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
  };
  content: string;
  photo?: string;
  likeCount?: number;
  commentCount?: number;
  post_id:string,
  uid:string,
  client_user:user_obj
}



interface Comment {
  id: number;
  name: string;
  text: string;
  profilePicture?: string;
}

export default function PostCard<T extends UserProps>({ user }: PostCardProps<T>) {

  const { posts,setPosts } = usePostContext();
  const [time,setTime]=useState(()=>{
    return Date.now();
  });

  useEffect(()=>{
    async function getData() {
      if(user._id.length>0){
     const res=await getPosts(user._id,time);

     setPosts(()=>{
      return (res?.data.map((e: { _id: any; like: string | any[]; comment: string | any[]; photo: any; posted: any; user: any; })=>{
      return {post_id:e._id,likeCount:e.like.length,commentCount:e.comment.length,imageUrl:e.photo,time:e.posted,user:{...e.user}}
     }) )
    }
    )

        setTime(res?.time)
      }
      else{
        return;
      }
    }
    getData(); 
  },[])

  return (
    <div className='w-[100%]'>
      {posts?.length === 0 && <Card 
        likeCount={10}
        commentCount={5}
        photo={"/Images/logo.png"}
        content={"Welcome Message."}
        user={{ name: "nitesh", profilePicture: user.profile_url, isOnline: true }}
        post_id='-1'
        uid='-1'
        client_user={{name:"",email:"",_id:"",profile_url:""}}
      />}
      
      {posts.map((e, i) => {
        return <Card 
          key={i}
          uid={user._id}
          likeCount={e.likeCount}
          commentCount={e.commentCount}
          photo={e.imageUrl}
          content={e.content}
          user={{ name: e.user.name, profilePicture: e.user.profilePicture, isOnline: e.user.isOnline }}
          post_id={e.post_id}
          client_user={user}
        />
      })}
    </div>
  );
}

function Card({
  user: { name, profilePicture, isOnline },
  client_user={name:"",_id:"",profile_url:"",email:""},
  content,
  uid,
  photo,
  likeCount = 0,
  commentCount = 0,
  post_id
}: CardProps) {

  
  const [showComments, setShowComments] = useState(false);
  
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, name: "Ray Cass", text: "We will close deals faster with a buyer-friendly mutual action plan." },
    { id: 2, name: "Molly Austin", text: "And templatize a repeatable playbook for every rep to follow on every deal." }
  ]);
  
  const [commentText, setCommentText] = useState('');
  
  const [hasLiked, setHasLiked] = useState(false);
  
  const [canComment, setCanComment] = useState(true);

  const commentRef = useRef<HTMLDivElement>(null);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLike = () => {
    if (!hasLiked) {
      
     axiosInstance.post('api/user/like', { post_id: post_id,uid:uid })
      setHasLiked(true);

    }
  };

  const addComment = () => {
    if (commentText.trim() && canComment) {
      axiosInstance.post('api/user/comment', { post_id: post_id, text: commentText,uid:uid })
      setComments([...comments, { id: comments.length + 1, profilePicture:client_user.profile_url ,name:client_user.name, text: commentText }]);
      setCommentText('');
      setCanComment(false);
      setTimeout(() => setCanComment(true), 3000); // Set a timer to allow commenting again after 3 seconds
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
    };
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showComments]);

  return (
    <div className="w-[100%] relative">
      <div className="max-w-[90%] mx-[5%] sm:max-w-lg my-[1rem] sm:my-[1.5rem] sm:mx-auto bg-white border rounded-lg shadow-md">
        <div className="flex items-center p-4">
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
            {isOnline && <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>}
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
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-red-500 rounded-full absolute left-1/4 top-1/4"></div>
              <div className="w-12 h-12 border-4 border-red-500 rounded-full absolute right-1/4 top-1/4"></div>
            </div>
          </div>
        )}

        <div className="flex justify-around border-t border-gray-300 py-2">
          <button className={`flex items-center ${hasLiked ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`} onClick={handleLike} disabled={hasLiked}>
            <AiOutlineLike className="mr-1" /> Like
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600" onClick={toggleComments}>
            <FaRegComment className="mr-1" /> Comment
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <IoMdSend className="mr-1" /> Send
          </button>
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
                <div key={comment.id} className="flex items-start space-x-3">
                  <Image 
                    src={comment?.profilePicture || "/default-profile.png"} 
                    alt={`${comment.name}'s profile picture`} 
                    className="rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{comment.name}</p>
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
}
