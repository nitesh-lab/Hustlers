"use client"

import React from 'react';
import { useSwipeable } from 'react-swipeable';

const StoryItem = ({ story }) => {
  return (
    <div className="flex flex-col items-center mx-2">
      <div className="relative">
        <img
          className={`h-16 w-16 rounded-full p-1 ${story.live ? 'border-4 border-red-500' : story.unseen ? 'border-4 border-green-500' : 'border-2 border-gray-300'}`}
          src={story.image}
          alt={story.name}
        />
        {/* {story.live && (
          <span className="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 rounded">LIVE</span>
        )} */}
      </div>
      <span className="text-xs mt-2">{story.name}</span>
    </div>
  );
};

const Stories = () => {
  const stories = [
    { id: 1, name: "Your story", image: "path/to/your-story-image.jpg", unseen: false },
    { id: 2, name: "Sonya", image: "path/to/sonya-image.jpg",  unseen: true },
    { id: 3, name: "Adam", image: "path/to/adam-image.jpg", unseen: true },
    { id: 4, name: "Andrew", image: "path/to/andrew-image.jpg", unseen: true },
    { id: 5, name: "Nicole", image: "path/to/nicole-image.jpg", unseen: true },
    { id: 6, name: "Ashley", image: "path/to/ashley-image.jpg", unseen: true },
    { id: 7, name: "Michael", image: "path/to/michael-image.jpg", unseen: false },
    { id: 8, name: "Damian", image: "path/to/damian-image.jpg", unseen: true },
    { id: 1, name: "Your story", image: "path/to/your-story-image.jpg", unseen: false },
    { id: 2, name: "Sonya", image: "path/to/sonya-image.jpg",  unseen: true },
    { id: 3, name: "Adam", image: "path/to/adam-image.jpg", unseen: true },
    { id: 4, name: "Andrew", image: "path/to/andrew-image.jpg", unseen: true },
    { id: 5, name: "Nicole", image: "path/to/nicole-image.jpg", unseen: true },
    { id: 6, name: "Ashley", image: "path/to/ashley-image.jpg", unseen: true },
    { id: 7, name: "Michael", image: "path/to/michael-image.jpg", unseen: false },
    { id: 8, name: "Damian", image: "path/to/damian-image.jpg", unseen: true },
    { id: 1, name: "Your story", image: "path/to/your-story-image.jpg", unseen: false },
    { id: 2, name: "Sonya", image: "path/to/sonya-image.jpg",  unseen: true },
    { id: 3, name: "Adam", image: "path/to/adam-image.jpg", unseen: true },
    { id: 4, name: "Andrew", image: "path/to/andrew-image.jpg", unseen: true },
    { id: 5, name: "Nicole", image: "path/to/nicole-image.jpg", unseen: true },
    { id: 6, name: "Ashley", image: "path/to/ashley-image.jpg", unseen: true },
    { id: 7, name: "Michael", image: "path/to/michael-image.jpg", unseen: false },
    { id: 8, name: "Damian", image: "path/to/damian-image.jpg", unseen: true },
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      document.getElementById('story-container')?.scrollBy({ left: 200, behavior: 'smooth' });
    },
    onSwipedRight: () => {
      document.getElementById('story-container')?.scrollBy({ left: -200, behavior: 'smooth' });
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} id="story-container" className="flex space-x-4 p-4 overflow-x-auto no-scrollbar">
      {stories.map(story => (
        <StoryItem key={story.id} story={story} />
      ))}
    </div>
  );
};

export default Stories;
