import React from 'react';

export default function TrendNews() {
  return (
    <div className="max-w-sm border  shadow-md mt-[100px] mx-auto bg-white  rounded-lg  p-4">
      <h2 className="font-bold text-lg mb-4">LinkedIn News</h2>
      
      <h3 className="font-semibold text-sm mb-2">Top stories</h3>
      
      <ul className="mb-4">
        <li className="mb-2">
          <a href="#" className="text-blue-700 hover:underline">Doubling down on virtual twins</a>
          <p className="text-xs text-gray-500">16h ago • 2,492 readers</p>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-700 hover:underline">Train accident leaves 10 dead</a>
          <p className="text-xs text-gray-500">13h ago • 6,964 readers</p>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-700 hover:underline">Babycare booms in smaller cities</a>
          <p className="text-xs text-gray-500">2d ago • 3,772 readers</p>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-700 hover:underline">Private banks snap up talent</a>
          <p className="text-xs text-gray-500">17h ago • 696 readers</p>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-700 hover:underline">Why cultural intelligence matters</a>
          <p className="text-xs text-gray-500">20h ago • 2,932 readers</p>
        </li>
        <li>
          <button className="text-blue-700 hover:underline text-sm">Show more</button>
        </li>
      </ul>
      
      <h3 className="font-semibold text-sm mb-2">Todays games <span className="text-xs text-gray-500 bg-yellow-200 rounded px-1 py-0.5 ml-2">NEW</span></h3>
      
      <ul>
        <li className="mb-2 flex items-center">
          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
          <a href="#" className="text-blue-700 hover:underline">Queens #49</a>
          <p className="text-xs text-gray-500 ml-2">Crown each region</p>
        </li>
        <li className="flex items-center">
          <div className="w-4 h-4 bg-blue-400 mr-2"></div>
          <a href="#" className="text-blue-700 hover:underline">Pinpoint #49</a>
          <p className="text-xs text-gray-500 ml-2">Guess the category</p>
        </li>
      </ul>
    </div>
  );
}
