export interface Quote {
  id: number;
  text: string;
  author: string;
  votes: number;
  category: string;
}

export const categories = [
  "ทั้งหมด", 
  "ชีวิต Dev", 
  "ข้อคิด Front-end", 
  "รักและ React", 
  "สายมืด Dev", 
  "แอบรักใน Git", 
  "ความรักนัก Dev", 
  "ปรัชญา Dev", 
  "เป้าหมายสายเทา", 
  "รักล่มใน repo"
];

export const categoryColors: { [key: string]: string } = {
  "ชีวิت Dev": "from-purple-400 to-purple-600",
  "ข้อคิด Front-end": "from-blue-400 to-blue-600", 
  "รักและ React": "from-pink-400 to-pink-600",
  "สายมืด Dev": "from-gray-700 to-gray-900",
  "แอบรักใน Git": "from-green-400 to-green-600",
  "ความรักนัก Dev": "from-red-400 to-red-600",
  "ปรัชญา Dev": "from-indigo-400 to-indigo-600",
  "เป้าหมายสายเทา": "from-orange-400 to-orange-600",
  "รักล่มใน repo": "from-cyan-400 to-cyan-600"
};

export const mockQuotes: Quote[] = [
  { 
    id: 1, 
    text: "ชีวิตติดบั๊ก แต่เราต้องดัก console.log ต่อไป", 
    author: "โค้ดแล้วค่อยคุย", 
    votes: 45, 
    category: "ชีวิต Dev" 
  },
  { 
    id: 2, 
    text: "อย่าแก้ CSS ตอนอารมณ์เสีย มันจะพังทั้ง layout และชีวิต", 
    author: "Dev ใจบาง", 
    votes: 32, 
    category: "ข้อคิด Front-end" 
  },
  { 
    id: 3, 
    text: "การเริ่มต้นโปรเจกต์ใหม่ก็เหมือนเริ่มรักใหม่—มันดีแค่ใน Figma", 
    author: "UXUI ผู้ถูกลืม", 
    votes: 67, 
    category: "รักและ React" 
  },
  { 
    id: 4, 
    text: "อย่าไว้ใจ npm install ตอนใกล้เที่ยงคืน", 
    author: "เทพบุตร Build Fail", 
    votes: 28, 
    category: "สายมืด Dev" 
  },
  { 
    id: 5, 
    text: "ต่อให้เธอเป็น Error 404 เราก็จะตามหาเธอจนเจอ", 
    author: "ใจเธอไม่เจอใน DOM", 
    votes: 53, 
    category: "แอบรักใน Git" 
  },
  { 
    id: 6, 
    text: "Frontend ดีไม่พอ ถ้าใจเธอยังไม่พร้อม Deploy", 
    author: "รักนี้มี staging", 
    votes: 41, 
    category: "ความรักนัก Dev" 
  },
  { 
    id: 7, 
    text: "อย่าหวังว่า browser จะแปลเจตนาเราได้เหมือนใจคน", 
    author: "JS ก็ยังงงกับเรา", 
    votes: 76, 
    category: "ข้อคิด Front-end" 
  },
  { 
    id: 8, 
    text: "ชีวิตไม่ใช่ dark mode แต่ก็ต้องใช้ให้ชิน", 
    author: "Dev จ้องจอ 18 ชม.", 
    votes: 39, 
    category: "ชีวิต Dev" 
  },
  { 
    id: 9, 
    text: "อย่าคาดหวังว่า code จะ clean ถ้าหัวใจยัง messy", 
    author: "นัก refactor ผู้เดียวดาย", 
    votes: 84, 
    category: "ปรัชญา Dev" 
  },
  { 
    id: 10, 
    text: "อย่าฝันถึง production ถ้ายัง test ไม่ผ่าน", 
    author: "Test Case ก็เหมือนแฟนเก่า", 
    votes: 29, 
    category: "เป้าหมายสายเทา" 
  },
  { 
    id: 11, 
    text: "อย่าใส่ margin ให้ใจเธอ ถ้าเธอไม่เคย align เราเลย", 
    author: "Flexbox Fail", 
    votes: 37, 
    category: "รักและ React" 
  },
  { 
    id: 12, 
    text: "Git commit แก้ใจตัวเองไม่ได้ แต่ revert เรื่องเธอได้เสมอ", 
    author: "นาย Git me out", 
    votes: 55, 
    category: "รักล่มใน repo" 
  },
  { 
    id: 13, 
    text: "ความรักก็เหมือน API ถ้าไม่มี documentation ก็งงเหมือนกัน", 
    author: "Backend ผู้โดดเดี่ยว", 
    votes: 62, 
    category: "ความรักนัก Dev" 
  },
  { 
    id: 14, 
    text: "บางครั้ง null pointer exception ก็เจ็บน้อยกว่าใจที่ถูกทิ้ง", 
    author: "Java ใจสลาย", 
    votes: 48, 
    category: "ปรัชญา Dev" 
  },
  { 
    id: 15, 
    text: "อย่า push code ตอน 3 ทุ่ม เดี๋ยวฝันร้าย", 
    author: "นักฝันร้าย Deploy", 
    votes: 35, 
    category: "สายมืด Dev" 
  }
];

export const getQuotesByCategory = (category: string): Quote[] => {
  if (category === "ทั้งหมด") {
    return mockQuotes;
  }
  return mockQuotes.filter(quote => quote.category === category);
};

export const searchQuotes = (searchTerm: string): Quote[] => {
  return mockQuotes.filter(quote => 
    quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const getTopQuotes = (limit: number = 5): Quote[] => {
  return [...mockQuotes]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, limit);
};

export const getCategoryStats = () => {
  const stats = categories.slice(1).map(category => ({
    category,
    count: mockQuotes.filter(quote => quote.category === category).length,
    totalVotes: mockQuotes
      .filter(quote => quote.category === category)
      .reduce((sum, quote) => sum + quote.votes, 0)
  }));
  
  return stats.sort((a, b) => b.totalVotes - a.totalVotes);
};