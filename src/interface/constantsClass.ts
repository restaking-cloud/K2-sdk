import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import {
    _getChainSpecificConstants,
	_extractChainID,
    goerliK2Urls,
    holeskyK2Urls,
    mainnetK2Urls, 
	goerliFactoryAddresses,
    holeskyFactoryAddresses,
	mainnetFactoryAddresses,
	customErrors
} from '../logic/constants';

export class ConstantsSubPackage {

	factoryAddresses!: typeof goerliFactoryAddresses | typeof holeskyFactoryAddresses | typeof mainnetFactoryAddresses;
	k2Urls!: typeof goerliK2Urls | typeof holeskyK2Urls | typeof mainnetK2Urls;
    customErrors!: typeof customErrors;
  
	constructor(signer: Signer | Provider) {
	  (async () => {
		const chainID = await _extractChainID(signer);
		const values = _getChainSpecificConstants(chainID);
  
		this.factoryAddresses = values?.factoryAddresses;
        this.k2Urls = values?.k2Urls;
		this.customErrors = values?.customErrors;
  
		return this;
	  })();
	}
  }