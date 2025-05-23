'use client';

import { Activity, ArrowUpRight, ArrowDownRight, Filter, Tag, Sparkles } from 'lucide-react';
import { useState } from 'react';

export interface NFTEvent {
  type: 'sale' | 'transfer' | 'mint' | 'list';
  price?: string;
  from: string;
  to: string;
  timestamp: string;
}

interface NFTActivityProps {
  events: NFTEvent[];
}

const eventTypes = ['All', 'Sale', 'Transfer', 'Mint', 'List'] as const;
type EventType = typeof eventTypes[number];

function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function getEventIcon(type: NFTEvent['type']) {
  switch (type) {
    case 'sale':
      return <ArrowUpRight className="text-green-500" />;
    case 'transfer':
      return <ArrowDownRight className="text-blue-500" />;
    case 'mint':
      return <Sparkles className="text-purple-500" />;
    case 'list':
      return <Tag className="text-yellow-500" />;
    default:
      return <Activity className="text-gray-500" />;
  }
}

export function NFTActivity({ events }: NFTActivityProps) {
  const [selectedType, setSelectedType] = useState<EventType>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = events.filter(
    (event) => selectedType === 'All' || event.type.toLowerCase() === selectedType.toLowerCase()
  );

  return (
    <div className="bg-[#1c1f26] rounded-lg border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] hover:shadow-[8px_8px_0px_0px_rgba(234,179,8,1)] transition-all duration-300">
      <div className="p-6 border-b border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-yellow-400" />
            <h2 className="text-xl font-bold font-epilogue tracking-tight text-yellow-400">Activity</h2>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg hover:bg-yellow-500/10 transition-colors"
            aria-label="Toggle filters"
          >
            <Filter
              size={20}
              className={`transition-colors ${
                showFilters ? 'text-yellow-400' : 'text-white/60'
              }`}
            />
          </button>
        </div>
        {showFilters && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-yellow-500/20">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedType === type
                    ? 'bg-[#F7B500] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'text-white/60 hover:text-white hover:bg-yellow-500/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-4 rounded-lg bg-black/20 border border-yellow-500/10 hover:border-yellow-500/30 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <p className="text-white font-medium capitalize flex items-center gap-2">
                      {event.type}
                      {event.price && (
                        <span className="text-yellow-400">
                          {event.price} ETH
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-white/60">From</span>
                      <a
                        href={`https://opensea.io/${event.from}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-500 transition-colors font-medium"
                      >
                        {event.from.slice(0, 6)}...{event.from.slice(-4)}
                      </a>
                      <span className="text-white/60">to</span>
                      <a
                        href={`https://opensea.io/${event.to}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-500 transition-colors font-medium"
                      >
                        {event.to.slice(0, 6)}...{event.to.slice(-4)}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/60">
                    {formatTimeAgo(event.timestamp)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-white/60">
                No {selectedType.toLowerCase()} events found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 