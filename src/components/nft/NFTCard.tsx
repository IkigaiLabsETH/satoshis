'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { formatEthPrice } from '@/lib/utils';

interface NFTCardProps {
  nft: {
    name: string;
    image_url: string;
    contract: string;
    tokenId: string;
    price?: string;
    description?: string;
  };
  href: string;
  priority?: boolean;
  blurhash?: string;
}

export function NFTCard({ nft, href, priority = false, blurhash }: NFTCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Reset state when image URL changes
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [nft.image_url]);

  const imageUrl = nft.image_url;
  const isUnoptimized = imageUrl?.includes('ipfs') || imageUrl?.includes('arweave');

  const cardVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-black border border-white/10 shadow-[0_5px_20px_0_rgba(0,0,0,0.25)]"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-label={`NFT: ${nft.name}`}
    >
      <Link href={href} className="block">
        <div className="relative">
          {/* Art piece */}
          <div className="relative aspect-square overflow-hidden bg-black">
            {!imageError && imageUrl ? (
              <>
                <Image
                  src={imageUrl}
                  alt={nft.name || 'NFT'}
                  width={500}
                  height={500}
                  className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  priority={priority}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={isUnoptimized}
                  blurDataURL={blurhash || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIUlEQVQoU2NkYGD4z0AEYBxVSFJgFIwC0QwMDAwMDAwMDAwAAAwA4nQn2QAAAABJRU5ErkJggg=="}
                  placeholder="blur"
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#F3CC3E]/5 to-transparent animate-pulse" />
                )}
              </>
            ) : (
              <div 
                className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-yellow-100/10 to-black/80 rounded-lg"
                role="img"
                aria-label="Artwork unavailable"
              >
                <Image
                  src="/IKIGAI_LABS_logo.svg"
                  alt="IKIGAI Labs Logo"
                  width={96}
                  height={96}
                  className="w-24 h-24 mb-4 drop-shadow-lg"
                  style={{ filter: 'brightness(1.2) saturate(1.2)' }}
                  draggable={false}
                  priority
                />
                <span className="mt-2 text-yellow-400 text-lg font-serif">Artwork Unavailable</span>
                <span className="text-white/60 text-sm mt-2">Please try again later.</span>
              </div>
            )}

            {/* Subtle price display */}
            {nft.price && (
              <motion.div 
                className="absolute bottom-0 right-0 bg-black/80 px-3 py-1.5 text-sm font-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-yellow-400">Ξ</span> {formatEthPrice(parseFloat(nft.price))}
              </motion.div>
            )}

            {/* Elegant hover state */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
            />
          </div>

          {/* NFT Info */}
          <div className="p-4">
            <h3 className="text-lg font-medium text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-1">
              {nft.name || 'Untitled'}
            </h3>
            <p className="mt-1 text-sm text-white/60 line-clamp-2">
              {nft.description || 'No description available'}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 