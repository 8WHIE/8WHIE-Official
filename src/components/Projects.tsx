import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, Cpu, Layers, Terminal } from 'lucide-react';

interface ProjectsProps {
  onContact: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onContact }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section
        id="projects"
        aria-label="Projects Showcase"
        className="py-24 sm:py-32 bg-[#070707] border-b border-white/[0.08] relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Label */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#B7FF00] uppercase mb-6">
            <span>05</span>
            <span className="text-white/20">/</span>
            <span>PROJECTS</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] leading-[1.1]">
                BUILT. TESTED. EXPLORED.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#929292] max-w-xl font-['Inter']">
                Active laboratories, pedagogical frameworks, and custom utilities developed for security experimentation.
              </p>
            </div>
            <div className="text-xs font-mono text-[#929292]">
              <span>3 INITIATIVES</span>
            </div>
          </div>

          {/* Projects List / Grid */}
          <div className="space-y-6">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="group relative p-8 sm:p-10 bg-[#0C0C0C] border border-white/[0.1] hover:border-[#B7FF00]/60 transition-all duration-300"
              >
                {/* Tech Accent Indicator */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-[#929292]/60 group-hover:text-[#B7FF00] transition-colors">
                      {project.number}
                    </span>
                    <div>
                      <span className="text-[11px] font-mono text-[#929292] uppercase tracking-wider block">
                        {project.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] mt-0.5">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-[#929292] block">STATUS</span>
                      <span className="text-xs font-mono font-medium text-[#B7FF00] uppercase tracking-wider">
                        ● {project.status}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold tracking-wider text-[#F2F2F2] group-hover:text-[#070707] bg-white/[0.04] group-hover:bg-[#B7FF00] border border-white/[0.12] group-hover:border-[#B7FF00] transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span>VIEW PROJECT</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Description & Technology */}
                <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8">
                    <p className="text-base text-[#929292] font-['Inter'] leading-relaxed">
                      "{project.description}"
                    </p>
                    <p className="mt-2 text-xs text-[#929292]/70 font-mono">
                      FOCUS: {project.focus}
                    </p>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="text-[10px] font-mono text-[#929292] mb-1.5 uppercase">
                      TECHNOLOGY
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#F2F2F2]/80">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContact={onContact}
      />
    </>
  );
};
