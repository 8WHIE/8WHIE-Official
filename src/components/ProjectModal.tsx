import React, { useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Terminal, Cpu, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onContact }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#0C0C0C] border border-white/[0.14] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-[#F2F2F2]">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-[#B7FF00] font-bold">
              {project.number}
            </span>
            <span className="text-xs font-mono text-[#929292] uppercase">
              {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-[#929292] hover:text-[#F2F2F2] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B7FF00]"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6">
          <div>
            <h3 id="modal-title" className="text-3xl font-bold font-['Space_Grotesk'] text-[#F2F2F2]">
              {project.name}
            </h3>
            <p className="mt-3 text-base text-[#929292] font-['Inter'] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Status & Scope */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-[#070707] border border-white/[0.08] text-xs font-mono">
            <div>
              <span className="text-[#929292]">CURRENT STATUS:</span>
              <p className="mt-1 text-[#B7FF00] font-semibold">{project.status}</p>
            </div>
            <div>
              <span className="text-[#929292]">RESEARCH FOCUS:</span>
              <p className="mt-1 text-[#F2F2F2]">{project.focus}</p>
            </div>
          </div>

          {/* Architectural Blueprint Description */}
          <div>
            <h4 className="text-xs font-mono text-[#929292] uppercase tracking-wider mb-2">
              ARCHITECTURAL SPECIFICATION
            </h4>
            <p className="text-sm text-[#C4C4C4] leading-relaxed font-['Inter']">
              {project.architectureDetails}
            </p>
          </div>

          {/* Technology Stack (Unboxed text with dots) */}
          <div>
            <h4 className="text-xs font-mono text-[#929292] uppercase tracking-wider mb-2">
              TECHNOLOGY MATRIX
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#F2F2F2]">
              {project.technology.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span>{tech}</span>
                  {idx < project.technology.length - 1 && (
                    <span aria-hidden="true" className="text-white/20">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-[#929292]">
            PROJECT IDENTIFIER: {project.id.toUpperCase()}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onContact();
              }}
              type="button"
              className="px-4 py-2 text-xs font-semibold font-mono tracking-wider text-[#070707] bg-[#B7FF00] hover:bg-[#a6e600] transition-colors cursor-pointer"
            >
              INQUIRE ABOUT THIS PROJECT ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
