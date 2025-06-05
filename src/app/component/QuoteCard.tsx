'use client';
import React from 'react';
import { Heart } from 'lucide-react';
import { QuoteCardProps } from '../types';
import { categoryColors } from './mockData';

export default function QuoteCard({ quote, onVote, isVoted, isLoggedIn }: QuoteCardProps) {
  const handleVote = () => {
    if (!isLoggedIn) {
      alert('กรุณาเข้าสู่ระบบก่อนโหวต');
      return;
    }
    
    if (isVoted) {
      alert('คุณได้โหวตคำคมนี้แล้ว');
      return;
    }

    onVote(quote.id);
  };

  // ใช้สีจาก mockData หรือใช้สีเริ่มต้นถ้าไม่มี
  const categoryGradient = categoryColors[quote.category] || "from-gray-400 to-gray-600";

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative">
      <div className="mb-4">
        <span className={`inline-block bg-gradient-to-r ${categoryGradient} text-white text-xs px-3 py-1.5 rounded-full mb-4 shadow-md font-prompt font-medium thai-text`}>
          {quote.category}
        </span>
        
        <blockquote className="text-gray-800 text-lg leading-relaxed mb-4 font-prompt font-medium relative thai-text">
          <span className="text-purple-400 text-2xl absolute -left-2 -top-1 font-fredoka">&quot;</span>
          <span className="pl-4">{quote.text}</span>
          <span className="text-purple-400 text-2xl font-fredoka">&quot;</span>
        </blockquote>
        
        <cite className="text-gray-600 text-sm font-fredoka font-medium">
          - {quote.author}
        </cite>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-purple-100">
        <div className="flex items-center space-x-2 text-gray-600">
          <Heart 
            size={18} 
            className={`transition-all duration-300 ${
              isVoted 
                ? 'fill-red-500 text-red-500 animate-pulse' 
                : 'text-purple-400 hover:text-red-400'
            }`} 
          />
          <span className="font-fredoka font-semibold text-purple-700">
            <span className="thai-text">{quote.votes} โหวต</span>
          </span>
        </div>
        
        <button
          onClick={handleVote}
          disabled={isVoted}
          className={`px-6 py-2.5 rounded-xl font-fredoka font-semibold transition-all duration-300 transform ${
            isVoted
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95'
          }`}
        >
          {isVoted ? (
            <span className="flex items-center space-x-1 thai-text">
              <Heart size={16} className="fill-current" />
              <span>โหวตแล้ว</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1 thai-text">
              <Heart size={16} />
              <span>โหวต</span>
            </span>
          )}
        </button>
      </div>
      
      {/* Decorative gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-200 via-blue-200 to-green-200 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}