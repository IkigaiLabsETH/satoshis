import { z } from 'zod';

// Base validation schemas
export const chainSchema = z.enum(['ethereum', 'polygon', 'optimism', 'arbitrum', 'base']);
export const addressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
export const tokenIdSchema = z.string();

// Base asset schema
export const baseAssetSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  image_url: z.string().nullable(),
  external_url: z.string().nullable()
});

// Collection stats schema
export const collectionStatsSchema = z.object({
  total_supply: z.number(),
  total_listings: z.number(),
  total_volume: z.number(),
  floor_price: z.number().nullable(),
  market_cap: z.number().nullable(),
  num_owners: z.number(),
  one_day_volume: z.number().optional(),
  seven_day_volume: z.number().optional(),
  thirty_day_volume: z.number().optional()
});

// Collection schema
export const collectionSchema = baseAssetSchema.extend({
  slug: z.string(),
  banner_image_url: z.string().nullable(),
  safelist_status: z.string().nullable(),
  category: z.string(),
  contract_address: z.string(),
  is_disabled: z.boolean(),
  is_nsfw: z.boolean(),
  trait_offers_enabled: z.boolean(),
  collection_offers_enabled: z.boolean(),
  opensea_url: z.string(),
  project_url: z.string().optional(),
  wiki_url: z.string().optional(),
  discord_url: z.string().optional(),
  telegram_url: z.string().optional(),
  twitter_username: z.string().optional(),
  instagram_username: z.string().optional(),
  stats: collectionStatsSchema,
  fees: z.object({
    seller_fees: z.record(z.string(), z.number()),
    opensea_fees: z.record(z.string(), z.number())
  }).optional(),
  payment_tokens: z.array(z.object({
    symbol: z.string(),
    address: z.string(),
    image_url: z.string(),
    name: z.string(),
    decimals: z.number(),
    eth_price: z.string(),
    usd_price: z.string()
  })).optional(),
  editors: z.array(z.string()).optional(),
  owner: z.string().optional(),
  created_date: z.string().optional()
});

// NFT trait schema
export const nftTraitSchema = z.object({
  trait_type: z.string(),
  value: z.union([z.string(), z.number()]),
  trait_count: z.number().optional()
});

// NFT rarity schema
export const nftRaritySchema = z.object({
  rank: z.number().nullish().default(0),
  score: z.number().nullish().default(0),
  strategy_version: z.string().nullish().default(''),
  strategy_key: z.string().nullish().default(''),
  calculated_at: z.string().nullish().default(''),
  max_rank: z.number().nullish().default(0),
  total_supply: z.number().nullish().default(0)
});

// Collection NFT schema (simpler version returned by collection NFTs endpoint)
export const collectionNFTSchema = baseAssetSchema.extend({
  identifier: z.string(),
  token_id: z.string(),
  contract: z.string(),
  collection: z.string(),
  token_standard: z.string(),
  metadata_url: z.string(),
  animation_url: z.string().nullable(),
  background_color: z.string().nullable(),
  traits: z.array(nftTraitSchema)
});

// Full NFT schema (for individual NFT endpoint)
export const nftSchema = z.object({
  identifier: z.string(),
  collection: z.string(),
  contract: z.string(),
  token_standard: z.string(),
  name: z.string(),
  description: z.string(),
  image_url: z.string(),
  metadata_url: z.string(),
  animation_url: z.string().nullable(),
  background_color: z.string().nullable(),
  external_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  is_disabled: z.boolean(),
  is_nsfw: z.boolean(),
  is_suspicious: z.boolean(),
  creator: z.object({
    username: z.string(),
    profile_url: z.string(),
    address: z.string(),
  }),
  owners: z.array(z.object({
    address: z.string(),
    quantity: z.number(),
  })),
  traits: z.array(z.object({
    trait_type: z.string(),
    value: z.string(),
    display_type: z.string().nullable(),
    max_value: z.number().nullable(),
    trait_count: z.number(),
    order: z.number().nullable(),
  })),
  rarity: z.object({
    strategy_id: z.string().nullable(),
    strategy_version: z.string().nullable(),
    rank: z.number().nullable(),
    score: z.number().nullable(),
    calculated_at: z.string().nullable(),
    max_rank: z.number().nullable(),
    tokens_scored: z.number().nullable(),
  }),
  listings: z.array(z.object({
    price: z.object({
      current: z.object({
        value: z.number(),
      })
    })
  })).optional(),
}).passthrough();

// Response schemas
export const collectionResponseSchema = z.object({
  collection: collectionSchema
});

export const nftResponseSchema = z.object({
  nft: z.preprocess((data) => {
    // If data is null or not an object, return an empty object
    if (!data || typeof data !== 'object') {
      return {};
    }
    return data;
  }, nftSchema.partial())
});

export const collectionNFTsResponseSchema = z.object({
  nfts: z.array(collectionNFTSchema),
  next: z.string().nullable()
});

export const curatedCollectionsResponseSchema = z.object({
  collections: z.array(collectionSchema),
  pagination: z.object({
    total: z.number(),
    offset: z.number(),
    limit: z.number()
  })
}); 