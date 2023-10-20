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
    "K_SQUARED_LENDING": "0xF44c6c567380db68Dc414Bb414Cc9385f7c54FE9",
	"K_SQUARED_LENDING_DEPOSITOR": "0xd4DADd2C0e40FfC503e0bF56F678D6280B7b461F",
    "REPORTER_REGISTRY": "0x3F9a0aC0417f9B6aD164174876AB9D42ADEa22d1",
	"INTEREST_RATE_MODEL": "0x9f75890b1a492047d5e317F63B6780275A8f36B8"
};

export const holeskyFactoryAddresses: Record<string, string> = {
    "K_SQUARED_LENDING": "",
	"K_SQUARED_LENDING_DEPOSITOR": "",
    "REPORTER_REGISTRY": "",
	"INTEREST_RATE_MODEL": ""
};

export const mainnetFactoryAddresses: Record<string, string> = {
    "K_SQUARED_LENDING": "",
	"K_SQUARED_LENDING_DEPOSITOR": "",
    "REPORTER_REGISTRY": "",
	"INTEREST_RATE_MODEL": ""
};

export const goerliK2Urls: Record<string, string> = {
	SUBGRAPH_ENDPOINT: "https://api.studio.thegraph.com/query/50665/k2-goerli/version/latest"
};

export const holeskyK2Urls: Record<string, string> = {
	SUBGRAPH_ENDPOINT: ""
};

export const mainnetK2Urls: Record<string, string> = {
	SUBGRAPH_ENDPOINT: ""
};

export const customErrors: Record<string, string> = {
	UNEQUAL_ARRAY_LENGTH: "Error: Unequal array size. Must provide arrays of equal length",
	NULL_OR_UNDEFINED_VALUE: "Error: Null or undefined value provided"
};

export const _extractChainID = async (signerOrProvider: Signer | Provider): Promise<number> => {

	if(!signerOrProvider) {
		throw "Invalid signer or provider instance";
	}

    if(Signer.isSigner(signerOrProvider)) {
        return signerOrProvider.getChainId();
    }
    
	const network = await signerOrProvider.getNetwork();
	if(!network) {
		throw "Invalid signer or provider instance";
	}

	return network.chainId;
};

export const _getChainSpecificConstants = (chainID: CHAIN_ID.GOERLI | CHAIN_ID.HOLESKY | CHAIN_ID.MAINNET): ChainSpecificConstants => {

	if(chainID === CHAIN_ID.GOERLI) {
		return {
			factoryAddresses: goerliFactoryAddresses,
			customErrors: customErrors,
			k2Urls: goerliK2Urls
		};
	}
	else if(chainID === CHAIN_ID.HOLESKY) {
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
