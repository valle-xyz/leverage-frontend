import { narrow } from 'abitype';

export default narrow([
	{
		inputs: [
			{
				internalType: 'contract ILiquidityPool',
				name: 'liquidityPool_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'protocol_',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'chainlinkAggregator_',
				type: 'address'
			}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'aggregator',
				type: 'address'
			}
		],
		name: 'ChainlinkAggregatorSet',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'liquidityPool',
				type: 'address'
			}
		],
		name: 'LiquidityPoolSet',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'trader',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'positionId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'isLong',
				type: 'bool'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'shares',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'entryPrice',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'leverage',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'int256',
				name: 'pnlShares',
				type: 'int256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'closePrice',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'closeDate',
				type: 'uint256'
			}
		],
		name: 'PositionClosed',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'trader',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'positionId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'collateral',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'shares',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'leverage',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'isLong',
				type: 'bool'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'entryPrice',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'liquidationPrice',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'takeProfitPrice',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'openDate',
				type: 'uint256'
			}
		],
		name: 'PositionOpened',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'protocol',
				type: 'address'
			}
		],
		name: 'ProtocolSet',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'protocol',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'protocolShare',
				type: 'uint256'
			}
		],
		name: 'ProtocolShareTaken',
		type: 'event'
	},
	{
		inputs: [],
		name: 'chainlinkAggregator',
		outputs: [
			{
				internalType: 'contract AggregatorV3Interface',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'positionId',
				type: 'uint256'
			}
		],
		name: 'closePosition',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'positionIds',
				type: 'uint256[]'
			}
		],
		name: 'closePositions',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'liquidityPool',
		outputs: [
			{
				internalType: 'contract ILiquidityPool',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'collateral',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'leverage',
				type: 'uint256'
			},
			{
				internalType: 'bool',
				name: 'isLong',
				type: 'bool'
			}
		],
		name: 'openPosition',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'positions',
		outputs: [
			{
				internalType: 'address',
				name: 'trader',
				type: 'address'
			},
			{
				internalType: 'uint128',
				name: 'shares',
				type: 'uint128'
			},
			{
				internalType: 'uint32',
				name: 'leverage',
				type: 'uint32'
			},
			{
				internalType: 'bool',
				name: 'isLong',
				type: 'bool'
			},
			{
				internalType: 'uint256',
				name: 'entryPrice',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'protocol',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'aggregator',
				type: 'address'
			}
		],
		name: 'setChainlinkAggregator',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'contract ILiquidityPool',
				name: '_liquidityPool',
				type: 'address'
			}
		],
		name: 'setLiquidityPool',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_protocol',
				type: 'address'
			}
		],
		name: 'setProtocol',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
]);
