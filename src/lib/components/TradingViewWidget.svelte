<script>
	const initTradingView = () => {
		// @ts-ignore
		// eslint-disable-next-line no-undef
		new TradingView.widget({
			width: '100%',
			height: '100%',
			symbol: 'BINANCE:ETHUSDC',
			interval: '15',
			timezone: 'Etc/UTC',
			theme: 'dark',
			style: '1',
			locale: 'en',
			toolbar_bg: '#f1f3f6',
			enable_publishing: false,
			allow_symbol_change: false,
			hide_legend: true,
			container_id: 'tradingview_widget'
		});
	};
</script>

<svelte:head>
	<script
		type="text/javascript"
		src="https://s3.tradingview.com/tv.js"
		on:load={initTradingView}
	></script>
</svelte:head>

<div class="p-2 w-full h-[512px] overflow-x-hidden">
	<div class="tradingview-widget-container">
		<div id="tradingview_widget" />
		<div class="tradingview-widget-copyright">
			<a
				href="https://www.tradingview.com/symbols/ETHUSDC/?exchange=BINANCE"
				rel="noopener"
				target="_blank"><span class="underline">ETHUSDC chart</span></a
			> by TradingView
		</div>
	</div>
</div>
