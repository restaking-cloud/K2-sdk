import { ethers, utils, Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';

export const ZERO = ethers.BigNumber.from('0');
export const ONE_GWEI = utils.parseUnits('1', 'gwei');
export const ONE_ETHER = utils.parseUnits('1', 'ether');

export interface ChainSpecificConstants {
	factoryAddresses: typeof goerliFactoryAddresses | typeof holeskyFactoryAddresses | typeof mainnetFactoryAddresses;
	customErrors: typeof customErrors;
	k2Urls: typeof goerliK2Urls | typeof holeskyK2Urls | typeof mainnetK2Urls;
}

export enum CHAIN_ID {
	MAINNET = 1,
	GOERLI = 5,
    HOLESKY = 17000
};

export const goerliFactoryAddresses: Record<string, string> = {
    "K2_LENDING": "0x10163A57EeCE9EB14Fe9e49889060D0E22c74F1F",
	"K2_LENDING_DEPOSITOR": "0x3e0D17B69504E4305fbd2D82B9F49240b124f0D3",
    "REPORTER_REGISTRY": "0x5b98dC0050f082ffda2d5b13f7e47529638197BE",
	"LINEAR_INTEREST_RATE_MODEL": "0x02E18f54FaaB9ee50F4f2D3da1665fb2Cc7225c9",
	"PARTITIONED_INTEREST_RATE_MODEL": "0x0c2f45a612e217f206861CFAf6073F154579B0dE",
	"NODE_OPERATOR_MODULE": "0x6bA61F2CFfEC4cECCc73397E9b04D04b4106658d"
};

export const holeskyFactoryAddresses: Record<string, string> = {
    "K2_LENDING": "",
	"K2_LENDING_DEPOSITOR": "",
    "REPORTER_REGISTRY": "",
	"LINEAR_INTEREST_RATE_MODEL": "",
	"PARTITIONED_INTEREST_RATE_MODEL": "",
	"NODE_OPERATOR_MODULE": ""
};

export const mainnetFactoryAddresses: Record<string, string> = {
    "K2_LENDING": "",
	"K2_LENDING_DEPOSITOR": "",
    "REPORTER_REGISTRY": "",
	"LINEAR_INTEREST_RATE_MODEL": "",
	"PARTITIONED_INTEREST_RATE_MODEL": "",
	"NODE_OPERATOR_MODULE": ""
};

export const goerliK2Urls: Record<string, string> = {
	SUBGRAPH_ENDPOINT: "https://api.studio.thegraph.com/query/50665/k2-goerli/version/latest",
	EFFECTIVE_BALANCE_VERIFIER: "https://verify-effective-balance-goerli.restaking.cloud"
};

export const holeskyK2Urls: Record<string, string> = {
	SUBGRAPH_ENDPOINT: "",
	EFFECTIVE_BALANCE_VERIFIER: ""
};

export const mainnetK2Urls: Record<string, string> = {
	SUBGRAPH_ENDPOINT: "",
	EFFECTIVE_BALANCE_VERIFIER: ""
};

export const customErrors: Record<string, string> = {
	UNEQUAL_ARRAY_LENGTH: "Error: Unequal array size. Must provide arrays of equal length",
	NULL_OR_UNDEFINED_VALUE: "Error: Null or undefined value provided"
};

export const _extractChainID = async (signerOrProvider: Signer | Provider): Promise<number> => {

	if (!signerOrProvider) {
		throw "Invalid signer or provider instance";
	}

    if (Signer.isSigner(signerOrProvider)) {
        return signerOrProvider.getChainId();
    }
    
	const network = await signerOrProvider.getNetwork();
	if (!network) {
		throw "Invalid signer or provider instance";
	}

	return network.chainId;
};

export const _getChainSpecificConstants = (chainID: CHAIN_ID.GOERLI | CHAIN_ID.HOLESKY | CHAIN_ID.MAINNET): ChainSpecificConstants => {

	if (chainID === CHAIN_ID.GOERLI) {
		return {
			factoryAddresses: goerliFactoryAddresses,
			customErrors: customErrors,
			k2Urls: goerliK2Urls
		};
	}
	else if (chainID === CHAIN_ID.HOLESKY) {
		return {
			factoryAddresses: holeskyFactoryAddresses,
			customErrors: customErrors,
			k2Urls: holeskyK2Urls
		};
	}
	else {
		return {
			factoryAddresses: mainnetFactoryAddresses,
			customErrors: customErrors,
			k2Urls: mainnetK2Urls
		};
	}
};
