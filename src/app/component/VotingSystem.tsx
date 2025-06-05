'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, BarChart3 } from 'lucide-react';
import QuoteCard from './QuoteCard';
import { Quote, VotingSystemProps, SortBy } from '../types';
import { mockQuotes, categories } from './mockData';

export default function VotingSystem({ currentUser, onLogout }: VotingSystemProps) {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [sortBy, setSortBy] = useState<SortBy>('votes');
  const [currentPage, setCurrentPage] = useState(1);
  const [showChart, setShowChart] = useState(false);
  const [votedQuotes, setVotedQuotes] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  
  const itemsPerPage = 4;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const handleVote = (quoteId: number) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId 
        ? { ...quote, votes: quote.votes + 1 }
        : quote
    ));
    setVotedQuotes(prev => new Set([...prev, quoteId]));
  };

  const filteredQuotes = quotes
    .filter(quote => 
      quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(quote => 
      selectedCategory === 'ทั้งหมด' || quote.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortBy === 'votes') return b.votes - a.votes;
      if (sortBy === 'author') return a.author.localeCompare(b.author, 'th');
      return a.text.localeCompare(b.text, 'th');
    });

  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
  const currentQuotes = filteredQuotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-100">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-3 py-4 sm:hidden">
            <h1 className="text-2xl font-fredoka gradient-text animate-bounce-slow text-center">
              <span className="thai-text">ระบบโหวตคำคม คำกวนๆ</span>
            </h1>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-prompt font-medium thai-text text-sm">สวัสดีคุณ {currentUser}</span>
              <button
                onClick={onLogout}
                className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-2 rounded-lg hover:from-orange-500 hover:to-red-500 transition-all shadow-md transform hover:scale-105 font-fredoka font-medium text-sm"
              >
                <span className="thai-text">ออกจากระบบ</span>
              </button>
            </div>
          </div>

          <div className="hidden sm:flex justify-between items-center py-4">
            <h1 className="text-4xl font-fredoka gradient-text animate-bounce-slow">
              <span className="thai-text">ระบบโหวตคำคม คำกวนๆ</span>
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-prompt font-medium thai-text">สวัสดีคุณ {currentUser}</span>
              <button
                onClick={onLogout}
                className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 rounded-xl hover:from-orange-500 hover:to-red-500 transition-all shadow-md transform hover:scale-105 font-fredoka font-medium"
              >
                <span className="thai-text">ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
              <input
                type="text"
                placeholder="ค้นหาคำคม..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white/80 text-purple-800 transition-all font-fredoka placeholder:thai-text"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/80 text-blue-800 appearance-none transition-all font-prompt thai-text"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-white/80 text-green-800 transition-all font-prompt thai-text"
            >
              <option value="votes">เรียงตามโหวต</option>
              <option value="author">เรียงตามผู้แต่ง</option>
              <option value="text">เรียงตามเนื้อหา</option>
            </select>

            <button
              onClick={() => setShowChart(!showChart)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-3 rounded-xl hover:from-yellow-500 hover:to-orange-500 transition-all shadow-md transform hover:scale-105"
            >
              <BarChart3 size={20} />
              <span className="font-fredoka font-medium thai-text">{showChart ? 'ซ่อนกราฟ' : 'แสดงกราฟ'}</span>
            </button>
          </div>

          {showChart && (
            <div className="border-t-2 border-purple-200 pt-6">
              <h3 className="text-xl font-fredoka gradient-text mb-4">
                <span className="thai-text">กราฟแสดงคะแนนโหวต (Top 5)</span>
              </h3>
              <div className="space-y-4">
                {quotes
                  .sort((a, b) => b.votes - a.votes)
                  .slice(0, 5)
                  .map((quote, index) => (
                    <div key={quote.id} className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="w-48 text-sm text-gray-700 truncate font-medium">
                        {quote.text.substring(0, 35)}...
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full h-8 relative shadow-inner">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-bold transition-all duration-700 shadow-lg"
                          style={{ 
                            width: `${Math.max((quote.votes / Math.max(...quotes.map(q => q.votes))) * 100, 20)}%` 
                          }}
                        >
                          {quote.votes}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 absolute top-0 left-0"></div>
            </div>
            <span className="ml-4 text-purple-700 text-lg font-medium">กำลังโหลด...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {currentQuotes.length > 0 ? (
                currentQuotes.map(quote => (
                  <QuoteCard
                    key={quote.id}
                    quote={quote}
                    onVote={handleVote}
                    isVoted={votedQuotes.has(quote.id)}
                    isLoggedIn={true}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                    <p className="text-gray-600 text-lg">ไม่พบคำคมที่ตรงกับการค้นหา</p>
                  </div>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-3">
                <div className="flex sm:hidden items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border-2 border-purple-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 transition-all bg-white/80 text-purple-700 font-medium text-sm"
                  >
                    ←
                  </button>
                  
                  <span className="px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium text-sm min-w-[80px] text-center">
                    {currentPage} / {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border-2 border-purple-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 transition-all bg-white/80 text-purple-700 font-medium text-sm"
                  >
                    →
                  </button>
                </div>

                <div className="hidden sm:flex items-center space-x-3">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-3 border-2 border-purple-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 transition-all bg-white/80 text-purple-700 font-medium"
                  >
                    ก่อนหน้า
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-3 rounded-xl transition-all font-medium ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                          : 'border-2 border-purple-200 hover:bg-purple-50 bg-white/80 text-purple-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 border-2 border-purple-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 transition-all bg-white/80 text-purple-700 font-medium"
                  >
                    ถัดไป
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 inline-block">
            <p className="text-gray-700 font-medium">
              แสดง <span className="text-purple-600 font-bold">{currentQuotes.length}</span> จาก{' '}
              <span className="text-blue-600 font-bold">{filteredQuotes.length}</span> คำคม{' '}
              (ทั้งหมด <span className="text-green-600 font-bold">{quotes.length}</span> คำคม)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}