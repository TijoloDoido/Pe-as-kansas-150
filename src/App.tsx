import { useState, useMemo } from 'react';
import { partsData } from './data';
import { Part } from './types';
import { PartsTable } from './components/PartsTable';
import { PartModal } from './components/PartModal';
import { Search, ArrowUpDown, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

type SortOption = 'price_asc' | 'price_desc' | 'name_asc';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [sortOption, setSortOption] = useState<SortOption>('name_asc');
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(partsData.map(p => p.category));
    return ['Todas', ...Array.from(cats)].sort();
  }, []);

  const filteredAndSortedParts = useMemo(() => {
    let result = [...partsData];

    // Filter by search query (code, description, item)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(part => 
        part.code.toLowerCase().includes(q) ||
        part.item.toLowerCase().includes(q) ||
        part.description.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory !== 'Todas') {
      result = result.filter(part => part.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === 'price_asc') return a.price - b.price;
      if (sortOption === 'price_desc') return b.price - a.price;
      return a.item.localeCompare(b.item);
    });

    return result;
  }, [searchQuery, selectedCategory, sortOption]);

  return (
    <div className="min-h-screen bg-[#F5F4F1] font-sans text-[#33302C] flex flex-col overflow-x-hidden">
      {/* Header Section */}
      <header className="w-full bg-[#EBE7DF] border-b border-[#D8D2C4] shadow-sm pb-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* Uploaded Image */}
          <div className="w-full rounded-xl overflow-hidden shadow-lg shadow-[#D8D2C4]/50 mb-6 sm:mb-8 bg-white flex items-center justify-center relative border border-[#D8D2C4]/50">
            <img 
              src="/kansas_exploded.png" 
              alt="Dafra Kansas 150 Vista Explodida" 
              className="w-full h-auto object-contain max-h-[35vh] sm:max-h-[45vh] md:max-h-[60vh] lg:max-h-[750px] transition-all duration-300"
            />
          </div>
          
          {/* Title Area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-[#2D2A26]">CATÁLOGO DE PEÇAS</h1>
              <p className="text-[#966742] font-bold text-sm mt-2 uppercase tracking-widest">Dafra Kansas 150 - Série Especial</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.slice(1, 4).map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-[#F5F4F1] border border-[#D8D2C4] rounded-full text-[10px] font-bold uppercase transition-all shadow-sm text-[#5C564D]"
                >
                  {cat}
                </button>
              ))}
              {categories.length > 4 && (
                <button 
                  onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-3 py-1.5 bg-[#2D2A26] hover:bg-[#433F39] text-white border border-transparent rounded-full text-[10px] font-bold uppercase transition-all shadow-sm"
                >
                  Ver Mais
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="search-section" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Controls */}
        <div className="bg-white shadow-md z-20 px-6 py-4 flex flex-col md:flex-row items-center gap-4 border border-[#E2DCD0] rounded-xl shrink-0">
          <div className="flex-1 relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8377] italic font-serif flex items-center justify-center">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Busque por código, descrição ou palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F9F8F5] border border-[#E2DCD0] rounded-lg text-sm text-[#33302C] focus:outline-none focus:ring-2 focus:ring-[#966742]/30 focus:border-[#966742] transition-all placeholder-[#8A8377]"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative min-w-[200px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-[#F9F8F5] border border-[#E2DCD0] px-4 py-2.5 rounded-lg text-sm font-medium text-[#33302C] focus:outline-none focus:ring-2 focus:ring-[#966742]/30 focus:border-[#966742] cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8377] pointer-events-none" />
            </div>

            <div className="relative min-w-[200px]">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full appearance-none bg-[#F9F8F5] border border-[#E2DCD0] px-4 py-2.5 rounded-lg text-sm font-medium text-[#33302C] focus:outline-none focus:ring-2 focus:ring-[#966742]/30 focus:border-[#966742] cursor-pointer"
              >
                <option value="name_asc">A-Z (Nome)</option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8377] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Container */}
        <div className="flex flex-col bg-white rounded-xl shadow-md border border-[#E2DCD0] overflow-hidden flex-1">
          <div className="bg-[#F9F8F5] px-4 py-3 border-b border-[#E2DCD0] flex justify-between items-center shrink-0">
            <span className="text-xs font-bold text-[#5C564D] uppercase tracking-wider">
              Resultados da Busca ({filteredAndSortedParts.length} itens)
            </span>
            <span className="text-[10px] text-[#8A8377] uppercase italic hidden sm:inline-block">Sincronizado instantaneamente</span>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <PartsTable parts={filteredAndSortedParts} onSelectPart={setSelectedPart} />
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedPart && (
        <PartModal part={selectedPart} onClose={() => setSelectedPart(null)} />
      )}
    </div>
  );
}
