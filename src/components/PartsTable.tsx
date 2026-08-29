import { Part } from '../types';
import { Eye, ChevronRight } from 'lucide-react';

interface PartsTableProps {
  parts: Part[];
  onSelectPart: (part: Part) => void;
}

export function PartsTable({ parts, onSelectPart }: PartsTableProps) {
  if (parts.length === 0) {
    return (
      <div className="py-12 text-center text-[#8A8377]">
        Nenhuma peça encontrada com os filtros atuais.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop View (Table) */}
      <div className="hidden md:block min-w-[800px]">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 bg-[#F5F4F1] shadow-sm z-10">
            <tr className="text-[10px] uppercase tracking-wider text-[#8A8377] border-b border-[#E2DCD0]">
              <th className="px-4 py-3 font-semibold">Peça / Item</th>
              <th className="px-4 py-3 font-semibold">Descrição</th>
              <th className="px-4 py-3 font-semibold">Categoria</th>
              <th className="px-4 py-3 font-semibold text-right">Preço (R$)</th>
              <th className="px-4 py-3 font-semibold text-center w-24">Ação</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-[#E2DCD0]/50">
            {parts.map((part) => (
              <tr 
                key={part.id} 
                className="hover:bg-[#F9F8F5] cursor-pointer transition-colors group"
                onClick={() => onSelectPart(part)}
              >
                <td className="px-4 py-4 font-medium text-[#2D2A26]">{part.item}</td>
                <td className="px-4 py-4 text-[#5C564D] max-w-xs truncate" title={part.description}>
                  {part.description}
                </td>
                <td className="px-4 py-4">
                  <span className="bg-white border border-[#D8D2C4] text-[#5C564D] px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shadow-sm">
                    {part.category}
                  </span>
                </td>
                <td className="px-4 py-4 text-right font-bold text-[#2D2A26]">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(part.price)}
                </td>
                <td className="px-4 py-4 text-center">
                  <button 
                    className="inline-flex items-center justify-center p-2 rounded-lg text-[#8A8377] hover:text-[#966742] transition-colors"
                    title="Ver Detalhes"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View (Cards) */}
      <div className="flex flex-col md:hidden divide-y divide-[#E2DCD0]/50">
        {parts.map((part) => (
          <div 
            key={part.id}
            onClick={() => onSelectPart(part)}
            className="p-4 flex flex-col gap-2 hover:bg-[#F9F8F5] cursor-pointer transition-colors active:bg-[#EBE7DF]"
          >
            <div className="flex justify-between items-start gap-3">
              <h4 className="font-bold text-[#2D2A26] text-sm leading-snug">{part.item}</h4>
              <span className="text-[#2D2A26] font-bold text-sm whitespace-nowrap shrink-0 mt-0.5">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(part.price)}
              </span>
            </div>
            
            <p className="text-[#5C564D] text-xs line-clamp-2 leading-relaxed">
              {part.description}
            </p>
            
            <div className="flex justify-between items-center mt-2">
              <span className="bg-white border border-[#D8D2C4] text-[#5C564D] px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shadow-sm">
                {part.category}
              </span>
              <div className="flex items-center text-[#8A8377] text-[10px] font-bold uppercase tracking-wider">
                Ver detalhes
                <ChevronRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
