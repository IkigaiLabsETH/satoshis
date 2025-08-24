import { ethers } from "ethers";
import { ChainId, Token, Fetcher, Route, Trade, TokenAmount, TradeType } from "@uniswap/sdk";

// Provider factory (server-safe)
function getRpcProvider(): ethers.providers.BaseProvider {
  const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
  if (typeof window !== "undefined" && (window as unknown as { ethereum?: unknown }).ethereum) {
    try {
      const eth = (window as unknown as { ethereum?: unknown }).ethereum as ethers.providers.ExternalProvider;
      return new ethers.providers.Web3Provider(eth, "any");
    } catch {
      // fall through to RPC
    }
  }
  if (projectId) {
    return new ethers.providers.InfuraProvider("mainnet", projectId);
  }
  // Broadly available public RPC with permissive CORS
  return new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth");
}

export const WETH = new Token(
  ChainId.MAINNET,
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  18,
  "WETH",
  "Wrapped Ether"
);

export const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18,
  "DAI",
  "Dai Stablecoin"
);

export async function connectWallet(): Promise<ethers.Signer> {
  if (typeof window !== "undefined" && (window as unknown as { ethereum?: ethers.providers.ExternalProvider & { request?: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum) {
    const ethereum = (window as unknown as { ethereum?: ethers.providers.ExternalProvider & { request?: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum!;
    const web3Provider = new ethers.providers.Web3Provider(ethereum);
    if (typeof ethereum.request === "function") {
      await ethereum.request({ method: "eth_requestAccounts" });
    }
    return web3Provider.getSigner();
  }
  throw new Error("No Ethereum wallet detected");
}

export async function getPairData(tokenA: Token, tokenB: Token) {
  const provider = getRpcProvider();
  // @uniswap/sdk accepts an ethers BaseProvider
  const pair = await Fetcher.fetchPairData(tokenA, tokenB, provider);
  return pair;
}

export async function calculateDeltaNeutral(tokenA: Token, tokenB: Token, amount: string) {
  try {
    const provider = getRpcProvider();
    const pair = await Fetcher.fetchPairData(tokenA, tokenB, provider);
    const route = new Route([pair], tokenA);
    const parsed = amount && amount.trim() !== "" ? amount : "0";
    const wei = ethers.utils.parseUnits(parsed, tokenA.decimals);
    const trade = new Trade(route, new TokenAmount(tokenA, wei.toString()), TradeType.EXACT_INPUT);

    const price = route.midPrice.toSignificant(6);

    return {
      price,
      amountIn: amount,
      amountOut: trade.outputAmount.toSignificant(6),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error calculating delta-neutral position:", error);
    throw error;
  }
}

export async function rebalancePosition(tokenA: Token, tokenB: Token, thresholdPercent: number) {
  const provider = getRpcProvider();
  const pair = await Fetcher.fetchPairData(tokenA, tokenB, provider);
  const price = pair.token0Price.toSignificant(6);
  // Placeholder for threshold-based rebalance logic
  // In production, compare current hedge ratio vs target and execute adjustments
  // via lending/borrowing protocols (e.g., Aave/Compound) and DEX swaps
  // eslint-disable-next-line no-console
  console.log(`Rebalancing if deviation exceeds ${thresholdPercent}%`);
  return price;
}


