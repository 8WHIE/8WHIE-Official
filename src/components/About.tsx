import React, { useState } from 'react';
import { Shield, Eye, Cpu, Network, Lock, Terminal } from 'lucide-react';

interface InspectionNode {
  id: string;
  name: string;
  type: string;
  state: string;
  metric: string;
  description: string;
}

const SYSTEM_NODES: InspectionNode[] = [
  {
    id: 'runtime',
    name: 'RUNTIME BOUNDARY',
    type: 'Execution Layer',
    state: 'ISOLATED',
    metric: 'Zero-Trust Sandboxing',
    description: 'Verifying process boundaries and preventing unauthorized privilege escalation.',
  },
  {
    id: 'network',
    name: 'NETWORK TELEMETRY',
    type: 'Transport Layer',
    state: 'FILTERED',
    metric: 'Encrypted Invariants',
    description: 'Analyzing flow protocols, packet structures, and egress anomalies in real time.',
  },
  {
    id: 'identity',
    name: 'ACCESS CONTROLS',
    type: 'Identity Gate',
    state: 'AUTHENTICATED',
    metric: 'Cryptographic Nonces',
    description: 'Auditing authentication lifecycles, session tokens, and identity boundaries.',
  },
  {
    id: 'memory',
    name: 'DATA INTEGRITY',
    type: 'State Storage',
    state: 'IMMUTABLE',
    metric: 'Integrity Signatures',
    description: 'Ensuring stored states, telemetry logs, and configuration matrices remain tamper-proof.',
  },
];

export const About: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<InspectionNode>(SYSTEM_NODES[0]);

  return (
    <section
      id="about"
      aria-label="About 8WHIE and Mission"
      className="py-24 sm:py-32 bg-[#070707] border-b border-white/[0.08] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#B7FF00] uppercase mb-6">
          <span>01</span>
          <span className="text-white/20">/</span>
          <span>ABOUT</span>
        </div>

        {/* Layout: Editorial Text + Technical Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] leading-[1.1] [text-wrap:balance]">
              UNDERSTAND <br />
              THE SYSTEM.
            </h2>

            <div className="mt-8 sm:mt-10 space-y-6 text-[#929292] text-base sm:text-lg leading-relaxed font-['Inter']">
              <p className="text-[#F2F2F2] font-medium text-lg sm:text-xl">
                Technology moves faster than most people can understand it.
              </p>

              <p>
                8WHIE exists to make that complexity easier to explore.
              </p>

              <p>
                From cybersecurity and ethical hacking to digital tools and emerging technology, the goal is simple:
              </p>

              <div className="pl-6 border-l-2 border-[#B7FF00] space-y-2 py-2 text-[#F2F2F2] font-mono text-sm sm:text-base">
                <p>learn how systems work,</p>
                <p>understand where they fail,</p>
                <p>and use that knowledge responsibly.</p>
              </div>

              <p className="pt-2 text-sm text-[#929292]">
                We believe security is not an obstacle to innovation—it is the foundational prerequisite for true technological autonomy.
              </p>
            </div>

            {/* Core Values / Lab Principles */}
            <div className="mt-12 grid grid-cols-2 gap-6 pt-8 border-t border-white/[0.08] text-xs font-mono text-[#929292]">
              <div>
                <span className="text-[#B7FF00] font-bold">FOCUS</span>
                <p className="mt-1 text-[#F2F2F2] font-sans text-sm">Defensive Invariants</p>
                <p className="mt-1 text-xs text-[#929292]">Testing assumptions before adversaries can exploit them.</p>
              </div>
              <div>
                <span className="text-[#B7FF00] font-bold">ETHOS</span>
                <p className="mt-1 text-[#F2F2F2] font-sans text-sm">Responsible Inquiry</p>
                <p className="mt-1 text-xs text-[#929292]">Transparent research conducted with strict ethical integrity.</p>
              </div>
            </div>
          </div>

          {/* Right Interactive Technical Visualization */}
          <div className="lg:col-span-5">
            <div className="bg-[#0D0D0D] border border-white/[0.12] p-6 sm:p-8 relative">
              {/* Corner tech registration marks */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30" />

              {/* Topology Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs font-mono text-[#929292]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]" />
                  <span className="text-[#F2F2F2]">SYSTEM TOPOLOGY INSPECTOR</span>
                </div>
                <span>4 NODES ACTIVE</span>
              </div>

              {/* Interactive Node Selector */}
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {SYSTEM_NODES.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      type="button"
                      className={`text-left p-3 border transition-all text-xs cursor-pointer ${
                        isSelected
                          ? 'border-[#B7FF00] bg-[#141414] text-[#F2F2F2]'
                          : 'border-white/[0.08] bg-[#070707] text-[#929292] hover:border-white/20 hover:text-[#F2F2F2]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#929292] mb-1">
                        <span>{node.type}</span>
                        <span className={isSelected ? 'text-[#B7FF00]' : ''}>●</span>
                      </div>
                      <div className="font-semibold tracking-wide font-['Space_Grotesk'] text-xs">
                        {node.name}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Node Detailed Readout */}
              <div className="mt-6 p-4 bg-[#070707] border border-white/[0.08] font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-[#929292] border-b border-white/[0.06] pb-2 mb-3">
                  <span>INSPECTION TARGET:</span>
                  <span className="text-[#B7FF00] font-semibold">{selectedNode.name}</span>
                </div>

                <div className="space-y-2 text-[#929292]">
                  <div className="flex justify-between">
                    <span>SECURITY STATE:</span>
                    <span className="text-[#F2F2F2]">{selectedNode.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DEFENSIVE METRIC:</span>
                    <span className="text-[#F2F2F2]">{selectedNode.metric}</span>
                  </div>
                </div>

                <p className="mt-4 pt-3 border-t border-white/[0.06] text-xs font-sans text-[#F2F2F2] leading-normal">
                  {selectedNode.description}
                </p>
              </div>

              {/* Visual Vector Schematic Bar */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#929292]">
                <span>METHOD: RESPONSIBLE REVERSE AUDIT</span>
                <span className="text-[#B7FF00]">DEFENSIVE VECTORS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
