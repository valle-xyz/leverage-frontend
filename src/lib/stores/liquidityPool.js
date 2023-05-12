import { waitForTransaction, watchContractEvent, writeContract } from '@wagmi/core';
import { derived, get } from 'svelte/store';
import { isInitialized } from './client';
import { account } from './wallet';
import { toast } from '@zerodevx/svelte-toast';
import { userUsdc } from '$lib/stores/usdc';
import { addresses } from './addresses';
import { fetchSignerOrWarn } from '$lib/utils/signer';
import { readContract } from '@wagmi/core';
import liquidityPoolAbi from '$lib/abis/LiquidityPool';

/**
 * This store is used to run the other contract reading stores after a liquidity pool update
 * It also makes sure the wagmi client is initialized by returning 0 before
 * I updates max once per block
 */
export const liquitityPoolLastUpdate = derived(
	[isInitialized, addresses],
	([$isInitialized, $addresses], set) => {
		if (!$isInitialized) return;

		const unwatch = watchContractEvent(
			{
				address: $addresses.addresses.liquidityPool,
				abi: liquidityPoolAbi,
				eventName: 'Transfer'
			},
			(log) => {
				set(log[log.length - 1].blockNumber || 0n);
			}
		);

		// set to 1 to trigger the first update
		set(1n);

		return unwatch;
	},
	0n
);

export const totalSupply = derived(
	[liquitityPoolLastUpdate, addresses],
	([$liquitityPoolLastUpdate, $addresses], set) => {
		if ($liquitityPoolLastUpdate == 0n) return;

		readContract({
			address: $addresses.addresses.liquidityPool,
			abi: liquidityPoolAbi,
			functionName: 'totalSupply'
		}).then((totalSupply) => set(totalSupply));
	},
	0n
);

export const totalAssets = derived(
	[liquitityPoolLastUpdate, addresses],
	([$liquitityPoolLastUpdate, $addresses], set) => {
		if ($liquitityPoolLastUpdate == 0n) return;

		readContract({
			address: $addresses.addresses.liquidityPool,
			abi: liquidityPoolAbi,
			functionName: 'totalAssets'
		}).then((totalAssets) => set(totalAssets));
	},
	0n
);

export const tradePairBalance = derived(
	[liquitityPoolLastUpdate, addresses],
	([$liquitityPoolLastUpdate, $addresses], set) => {
		if ($liquitityPoolLastUpdate == 0n) return;

		readContract({
			address: $addresses.addresses.liquidityPool,
			abi: liquidityPoolAbi,
			functionName: 'balanceOf',
			args: [$addresses.addresses.tradePair]
		}).then((tradePairBalance) => set(tradePairBalance));
	},
	0n
);

export const userShares = derived(
	[liquitityPoolLastUpdate, addresses, account],
	([$liquitityPoolLastUpdate, $addresses, $account], set) => {
		if ($liquitityPoolLastUpdate == 0n) return;
		if (!$account.address) return;

		readContract({
			address: $addresses.addresses.liquidityPool,
			abi: liquidityPoolAbi,
			functionName: 'balanceOf',
			args: [$account.address]
		}).then((tradePairBalance) => set(tradePairBalance));
	},
	0n
);

export const liquidityPoolRatio = derived(
	[totalAssets, totalSupply],
	([$totalAssets, $totalSupply], set) => {
		if ($totalAssets == 0n || $totalSupply == 0n) {
			set(0n);
			return;
		}

		set($totalSupply / $totalAssets);
	}
);

export const userAssets = derived(
	[userShares, liquidityPoolRatio],
	([$userShares, $liquidityPoolRatio], set) => {
		if ($userShares == 0n || $liquidityPoolRatio == 0n) {
			set(0n);
			return;
		}
		set($userShares / $liquidityPoolRatio);
	},
	0n
);

export const redeem = async (/** @type {bigint} */ shares) => {
	const signer = await fetchSignerOrWarn();
	if (!signer) return;

	const tx = await writeContract({
		address: get(addresses).addresses.liquidityPool,
		abi: liquidityPoolAbi,
		functionName: 'redeem',
		args: [shares]
	});

	const txToast = toast.push('Waiting for Withdraw Transaction...', {
		initial: 0,
		classes: ['info']
	});

	await waitForTransaction(tx);

	toast.pop(txToast);

	toast.push('Withdraw Successful', {
		duration: 2000,
		classes: ['success']
	});

	userUsdc.requestUpdate();
};
