import arbitrumGoerliAddresses from '$lib/addresses/contracts.arbitrum-goerli.json';
import arbitrumGoerliDevAddresses from '$lib/addresses/dev.contracts.arbitrum-goerli.json';
import { graphEndpointArbitrumGoerli, graphEndpointArbitrumGoerliDev } from '$lib/config/constants';

import { watchNetwork } from '@wagmi/core';
import { writable } from 'svelte/store';
import { isInitialized } from './client';

const createAddressStore = () => {
	const initState = {
		addresses: arbitrumGoerliAddresses,
		graphEndpoint: graphEndpointArbitrumGoerli
	};
	let state = initState;

	// When dev is set once (by adding "?dev" to the url) it will stay set until the page is refreshed
	let dev = new URLSearchParams(window.location.search).has('dev');
	let chainId = 421613;
	const { subscribe, set } = writable(state);

	// Set first state
	const setState = () => {
		if (chainId === 421613) {
			if (dev) {
				state.addresses = arbitrumGoerliDevAddresses;
				state.graphEndpoint = graphEndpointArbitrumGoerliDev;
			} else {
				state.addresses = arbitrumGoerliAddresses;
				state.graphEndpoint = graphEndpointArbitrumGoerli;
			}
		}
		set(state);
	};
	setState();

	isInitialized.subscribe(($isInitialized) => {
		if (!$isInitialized) return;
		watchNetwork((network) => {
			if (!network.chain) return;
			chainId = network.chain?.id;
			setState();
		});
	});

	return {
		subscribe
	};
};

export const addresses = createAddressStore();
