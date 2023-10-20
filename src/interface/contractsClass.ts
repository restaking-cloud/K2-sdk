import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { getContractInstance } from '../logic/contracts';

export class ContractsSubPackage {

    constructor(signer: Signer | Provider) {
        return getContractInstance(signer);
    }
}
