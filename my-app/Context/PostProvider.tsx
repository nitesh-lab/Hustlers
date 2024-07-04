"use client";
import React, { useState, createContext, useContext, ReactNode } from "react";

interface Comment {
  text: string;
  username: string;
  userimage: string;
  userid: string;
}


interface Post_Type {
  comments: Comment[];
  hasliked: boolean;
  hasLiked: boolean;
  likeCount: number;
  commentCount: number;
  imageUrl: string;
  content: string;
  post_id:string,
  user: {
    _id: string;
    name: string;
    profilePicture: string;
    isOnline: boolean;
  };
}

const defaultPosts: Post_Type[] = [];

interface PostContextType {
  posts: Post_Type[];
  setPosts: React.Dispatch<React.SetStateAction<Post_Type[]>>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<Post_Type[]>(defaultPosts);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
