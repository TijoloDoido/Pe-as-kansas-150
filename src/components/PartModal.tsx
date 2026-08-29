import { Part } from '../types';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PartModalProps {
  part: Part | null;
  onClose: () => void;
}

export function PartModal({ part, onClose }: PartModalProps) {
  if (!part) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2A26]/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#F5F4F1] rounded-xl shadow-2xl border border-[#D8D2C4] p-6 flex flex-col w-full max-w-lg max-h-[90vh] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#8A8377] hover:text-[#2D2A26] transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-between items-start mb-6 pr-6">
            <h3 className="text-lg font-bold text-[#2D2A26]">Ficha Técnica</h3>
            <span className="text-[10px] font-bold bg-white text-[#966742] px-2 py-1 rounded uppercase tracking-widest border border-[#D8D2C4] shadow-sm">Item Selecionado</span>
          </div>
          
          <div className="space-y-4 mb-6 flex-1 overflow-y-auto pr-2">
            <div className="pb-3 border-b border-[#E2DCD0] flex justify-between items-start gap-4">
              <h4 className="text-base font-bold text-[#2D2A26] leading-tight">{part.item}</h4>
              <span className="bg-white border border-[#D8D2C4] text-[#5C564D] px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shadow-sm shrink-0 mt-0.5">
                {part.category}
              </span>
            </div>
            
            <div className="bg-white border border-[#E2DCD0] rounded-lg p-4 shadow-sm">
              <span className="text-[10px] font-bold text-[#8A8377] uppercase tracking-widest block mb-2">Observação (Equivalência e Adaptação):</span>
              <p className="text-sm text-[#2D2A26] leading-relaxed mb-3 font-medium">
                <span className="text-[#8A8377] font-normal mr-2">Equivalência:</span>
                {part.description}
              </p>
              {part.adaptation && part.adaptation !== 'Nenhuma' && (
                <p className="text-sm text-[#2D2A26] leading-relaxed font-medium">
                  <span className="text-[#8A8377] font-normal mr-2">Adap./Motivo:</span>
                  {part.adaptation}
                </p>
              )}
            </div>

            <div className="flex justify-between py-2 border-b border-[#E2DCD0]/50">
              <span className="text-xs text-[#8A8377] font-medium uppercase tracking-wider">Preço Estimado:</span>
              <span className="text-xs font-bold text-[#2D2A26]">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(part.price)}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E2DCD0]/50">
              <span className="text-xs text-[#8A8377] font-medium uppercase tracking-wider">Origem:</span>
              <span className="text-xs font-bold text-[#5C564D]">{part.origin}</span>
            </div>
          </div>
          
          {part.link ? (
            <a 
              href={part.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center py-3 bg-white border border-[#D8D2C4] hover:bg-[#F9F8F5] text-[#2D2A26] rounded-lg font-bold text-sm transition-all shadow-sm shrink-0"
            >
              LINK DO PRODUTO
              <ExternalLink className="w-4 h-4 ml-2 text-[#966742]" />
            </a>
          ) : (
            <div className="flex items-center justify-center py-3 bg-[#EBE7DF] text-[#8A8377] rounded-lg font-bold text-sm shrink-0 cursor-not-allowed border border-[#D8D2C4]">
              SEM LINK DISPONÍVEL
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
