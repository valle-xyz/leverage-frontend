import { account } from '$lib/stores/wallet';
import { derived } from 'svelte/store';
import { addresses } from '../addresses';
import { parseAbi } from 'viem';
import { config } from '../client';
import { closedUserPositionsSubgraphUpdater } from './closedUserPositionsSubgraph';
import { watchContractEvent } from '@wagmi/core';

/**
 * @typedef {Object} PositionClosedEvent
 * @property {bigint} id
 * @property {bigint} closePrice
 * @property {bigint} closeDate
 * @property {bigint} pnlShares
 */

/** @type {PositionClosedEvent[]} */
const initialPositionClosedEvents = [];

/**
 * @type {import('svelte/store').Readable<PositionClosedEvent[]>}
 */
export const closedUserPositionsEvents = derived(
	[account, addresses],
	([$account, $addresses], set) => {
		if (!$account.address) return;

		/** @type {PositionClosedEvent[]} */
		let positions = [];

		const unwatch = watchContractEvent(config, {
			address: $addresses.addresses.tradePair,
			abi: parseAbi([
				'event PositionClosed(address indexed trader,uint256 positionId,bool isLong,uint256 shares,uint256 entryPrice,uint256 leverage,int256 pnlShares,uint256 closePrice,uint256 closeDate)'
			]),
			args: { trader: $account.address },
			eventName: 'PositionClosed',
			onLogs: (log) => {
				closedUserPositionsSubgraphUpdater.requestUpdate();
				log.forEach(
					({ transactionHash, args: { positionId, pnlShares, closePrice, closeDate } }) => {
						// return if undefined (just required for type safety)
						if (
							typeof positionId === 'undefined' ||
							typeof pnlShares === 'undefined' ||
							typeof closePrice === 'undefined' ||
							typeof closeDate === 'undefined'
						) {
							return;
						}
						const newClosedPosition = {
							id: positionId,
							openTransactionHash: transactionHash || '',
							closePrice: closePrice,
							closeDate: closeDate,
							pnlShares: pnlShares
						};
						positions = [...positions, newClosedPosition];
						set(positions);
					}
				);
			}
		});
		return unwatch;
	},
	initialPositionClosedEvents
);
