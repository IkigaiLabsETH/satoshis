import { z } from 'zod';
import { logger } from '@/lib/logger';
import { BaseOpenSeaAPI } from './base';
import { getContractToCollectionMapping, setContractToCollectionMapping } from './cache';

export const StatsSchema = z.object({
  total_supply: z.number(),
  total_listings: z.number(),
  total_volume: z.number(),
  floor_price: z.number().nullable(),
  market_cap: z.number().nullable(),
  num_owners: z.number()
});

export const CollectionDataSchema = z.object({
  collection: z.object({
    banner_image_url: z.string().nullable(),
    chat_url: z.string().nullable(),
    created_date: z.string(),
    default_to_fiat: z.boolean(),
    description: z.string().nullable(),
    dev_buyer_fee_basis_points: z.string(),
    dev_seller_fee_basis_points: z.string(),
    discord_url: z.string().nullable(),
    display_data: z.object({
      card_display_style: z.string()
    }),
    external_url: z.string().nullable(),
    featured: z.boolean(),
    featured_image_url: z.string().nullable(),
    hidden: z.boolean(),
    safelist_request_status: z.string().nullable(),
    image_url: z.string().nullable(),
    is_subject_to_whitelist: z.boolean(),
    large_image_url: z.string().nullable(),
    medium_username: z.string().nullable(),
    name: z.string(),
    only_proxied_transfers: z.boolean(),
    opensea_buyer_fee_basis_points: z.string(),
    opensea_seller_fee_basis_points: z.string(),
    payout_address: z.string().nullable(),
    require_email: z.boolean(),
    short_description: z.string().nullable(),
    slug: z.string(),
    telegram_url: z.string().nullable(),
    twitter_username: z.string().nullable(),
    instagram_username: z.string().nullable(),
    wiki_url: z.string().nullable(),
    is_nsfw: z.boolean(),
    fees: z.object({
      seller_fees: z.record(z.string(), z.string()),
      opensea_fees: z.record(z.string(), z.string())
    }),
    is_rarity_enabled: z.boolean().optional(),
    is_creator_fees_enforced: z.boolean().optional(),
    stats: StatsSchema.nullable()
  }),
  address: z.string().nullable(),
  asset_contract: z.object({
    address: z.string(),
    asset_contract_type: z.string(),
    created_date: z.string(),
    name: z.string(),
    nft_version: z.string().nullable(),
    opensea_version: z.string().nullable(),
    owner: z.number().nullable(),
    schema_name: z.string(),
    symbol: z.string(),
    total_supply: z.string().nullable(),
    description: z.string().nullable(),
    external_link: z.string().nullable(),
    image_url: z.string().nullable(),
    default_to_fiat: z.boolean(),
    dev_buyer_fee_basis_points: z.number(),
    dev_seller_fee_basis_points: z.number(),
    only_proxied_transfers: z.boolean(),
    opensea_buyer_fee_basis_points: z.number(),
    opensea_seller_fee_basis_points: z.number(),
    buyer_fee_basis_points: z.number(),
    seller_fee_basis_points: z.number(),
    payout_address: z.string().nullable()
  })
});

type CollectionResponse = z.infer<typeof CollectionDataSchema>;
type CollectionData = z.infer<typeof CollectionDataSchema>;
type CollectionStats = z.infer<typeof StatsSchema>;

type CollectionsResponse = {
  collections: CollectionData[];
  next: string | null;
};

export class CollectionService extends BaseOpenSeaAPI {
  protected handleError(error: unknown): Error {
    logger.error('OpenSea API error:', error);
    if (error instanceof Error) {
      return error;
    }
    return new Error('Unknown error occurred while fetching from OpenSea API');
  }

  async getCollection(params: { slug: string }): Promise<CollectionData> {
    const validatedParams = this.validateParams(params, z.object({
      slug: z.string()
    }));

    try {
      const response = await this.request<CollectionResponse>({
        method: 'GET',
        url: `/api/v2/collections/${validatedParams.slug}`,
      });

      const collectionData = response;

      // Fetch additional collection stats
      try {
        const statsResponse = await this.request<{ stats: CollectionStats }>({
          method: 'GET',
          url: `/api/v2/collections/${validatedParams.slug}/stats`,
        });

        return {
          ...collectionData,
          collection: {
            ...collectionData.collection,
            stats: statsResponse.stats
          }
        };
      } catch (error) {
        logger.warn(`Failed to fetch stats for collection ${validatedParams.slug}:`, error);
        // Return collection without stats if stats fetch fails
        return {
          ...collectionData,
          collection: {
            ...collectionData.collection,
            stats: null
          }
        };
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getCollectionByContractAddress(params: { 
    contractAddress: string; 
    chain?: string;
  }): Promise<CollectionData> {
    const validatedParams = this.validateParams(params, z.object({
      contractAddress: z.string(),
      chain: z.string().optional().default('ethereum')
    }));

    try {
      // Check cache from shared module
      const cachedSlug = getContractToCollectionMapping(
        validatedParams.chain,
        validatedParams.contractAddress
      );
      
      if (cachedSlug) {
        logger.info(`Using cached collection slug for contract: ${validatedParams.contractAddress}`);
        return this.getCollection({ slug: cachedSlug });
      }

      // First get the collection slug from contract address
      const contractResponse = await this.request<{ collection: string }>({
        method: 'GET',
        url: `/api/v2/chain/${validatedParams.chain}/contract/${validatedParams.contractAddress}`,
      });

      if (!contractResponse.collection) {
        throw new Error(`Collection not found for contract ${validatedParams.contractAddress}`);
      }

      // Cache the result in shared cache
      setContractToCollectionMapping(
        validatedParams.chain,
        validatedParams.contractAddress,
        contractResponse.collection
      );
      
      // Then get the full collection with the slug
      return this.getCollection({ slug: contractResponse.collection });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getCollectionBySlug(slug: string): Promise<CollectionData> {
    return this.getCollection({ slug });
  }

  async getCollections(params: { next?: string }): Promise<CollectionsResponse> {
    const validatedParams = this.validateParams(params, z.object({
      next: z.string().optional()
    }));

    try {
      const response = await this.request<CollectionsResponse>({
        method: 'GET',
        url: '/api/v2/collection',
        params: validatedParams.next ? { next: validatedParams.next } : undefined
      });

      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }
} 