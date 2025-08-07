"use client";

import Masonry from 'react-masonry-css';
import { NFTCard } from './NFTCard';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { logger } from '@/lib/logger';

interface NFTGridProps {
  nfts: Array<{
    name: string;
    description: string;
    image_url: string;
    contract_address: string;
    token_id: string;
    placeholderColor?: string;
    blurhash?: string;
  }>;
}

function NFTCardSkeleton() {
  return (
    <div 
      className="w-full aspect-[3/4] bg-[#181818] rounded-xl animate-pulse flex items-center justify-center border-4 border-yellow-400"
      role="status"
      aria-label="Loading NFT card"
    >
      <div className="w-16 h-16 bg-yellow-900/20 rounded-full" />
    </div>
  );
}

function LazyNFTCard({ nft, idx, onPriorityLoad }: { nft: NFTGridProps['nfts'][number]; idx: number; onPriorityLoad?: () => void }) {
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    rootMargin: '200px',
    threshold: 0.1
  });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <motion.div 
      className="mb-6 w-full" 
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      role="article"
      aria-label={`NFT: ${nft.name}`}
    >
      {inView ? (
        <NFTCard
          name={nft.name}
          imageUrl={nft.image_url}
          contract={nft.contract_address}
          tokenId={nft.token_id}
          onLoad={idx < 4 ? onPriorityLoad : undefined}
          priority={idx < 4}
          placeholderColor={nft.placeholderColor}
          blurhash={nft.blurhash}
        />
      ) : (
        <NFTCardSkeleton />
      )}
    </motion.div>
  );
}

const BATCH_SIZE = 16;
const _SCROLL_THRESHOLD = 800; // Kept for potential future use
const PRIORITY_TIMEOUT = 5000; // 5 seconds timeout for priority loading

export function NFTMasonryGrid({ nfts }: NFTGridProps) {
  const [priorityLoadedCount, setPriorityLoadedCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(nfts.length); // Show all NFTs immediately
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showPriorityOverlay, setShowPriorityOverlay] = useState(true);

  // Debug logging to help troubleshoot NFT count issues
  useEffect(() => {
    logger.info(`NFTMasonryGrid: Displaying ${nfts.length} NFTs`);
  }, [nfts.length]);

  // Memoize breakpoints to prevent unnecessary recalculations
  const breakpointCols = useMemo(() => ({
    default: 4,
    1920: 4,
    1536: 3,
    1280: 2,
    1024: 2,
    768: 2,
    640: 1
  }), []);

  // Handler to load more NFTs with debouncing (kept for potential future use)
  const loadMore = useCallback(() => {
    if (isLoadingMore || visibleCount >= nfts.length) return;
    
    setIsLoadingMore(true);
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, nfts.length));
    setIsLoadingMore(false);
  }, [nfts.length, visibleCount, isLoadingMore]);

  // Listen for scroll near bottom with debouncing (disabled for now since we show all)
  useEffect(() => {
    // Disabled progressive loading for gallery pages
    // All NFTs are shown immediately
    return;
  }, [visibleCount, nfts.length, loadMore]);

  // Hide priority overlay after timeout or when enough images load
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowPriorityOverlay(false);
    }, PRIORITY_TIMEOUT);

    // Also hide when we have at least 4 loaded or when we have fewer than 4 total NFTs
    if (priorityLoadedCount >= 4 || nfts.length < 4) {
      setShowPriorityOverlay(false);
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [priorityLoadedCount, nfts.length]);

  // Show all NFTs
  const visibleNFTs = nfts; // Show all NFTs instead of slicing

  const handlePriorityImageLoad = () => {
    setPriorityLoadedCount((prev) => prev + 1);
  };

  useEffect(() => {
    // Reset loading state when nfts change
    setPriorityLoadedCount(0);
    setVisibleCount(nfts.length); // Show all NFTs immediately
    setShowPriorityOverlay(nfts.length >= 4); // Only show overlay if we have enough NFTs
  }, [nfts]);

  return (
    <div className="relative" role="region" aria-label="NFT Gallery">
      {/* Background gradient for depth */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-[#F3CC3E]/5 to-transparent opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Non-blocking loading overlay with timeout */}
      <AnimatePresence>
        {showPriorityOverlay && nfts.length >= 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center pointer-events-none"
            role="status"
            aria-label="Loading artworks"
          >
            <div className="text-yellow-400 text-lg font-serif">Loading artworks...</div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Masonry
        breakpointCols={breakpointCols}
        className="flex w-auto"
        columnClassName="pl-8 first:pl-0 bg-clip-padding space-y-12 md:space-y-16"
      >
        {visibleNFTs.map((nft, idx) => (
          <LazyNFTCard
            key={`${nft.contract_address}-${nft.token_id}`}
            nft={nft}
            idx={idx}
            onPriorityLoad={handlePriorityImageLoad}
          />
        ))}
      </Masonry>

      {/* Loading indicator - hidden since we show all NFTs */}
      {false && visibleCount < nfts.length && (
        <div className="mt-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
        </div>
      )}
    </div>
  );
} 