import { queryStore, gql } from '@urql/svelte';
import { currentPrice } from '$lib/stores/priceFeed';
import { graphClient } from './graph';
import { derived } from 'svelte/store';

export const closeablePositionIds = derived(
	currentPrice,
	($currentPrice, set) => {
		if ($currentPrice.isZero()) return [];

		const unsubscribe = queryStore({
			client: graphClient,
			query: gql`
				query CloseablePositions($currentPrice: BigInt!) {
					positions(
						where: {
							and: [
								{ isOpen: true }
								{ or: [{ maxClosePrice_lt: $currentPrice }, { minClosePrice_gte: $currentPrice }] }
							]
						}
					) {
						id
						maxClosePrice
						minClosePrice
					}
				}
			`,
			variables: { currentPrice: $currentPrice.toString() || '0' }
		}).subscribe((result) => {
			set(result?.data?.positions.map((/** @type {{ id: any; }} */ p) => p.id) || []);
		});

		return unsubscribe;
	},
	[]
);
