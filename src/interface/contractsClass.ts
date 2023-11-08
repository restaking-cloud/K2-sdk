import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { 
    _k2LendingContract,
    _k2LendingDepositor,
    _reporterRegistry,
    _nodeOperatorModule
} from '../logic/contracts';

export class ContractsSubPackage {

    etherSigner;

    constructor(signer: Signer | Provider) {
        this.etherSigner = signer;
    }

    k2LendingContract() {
        return _k2LendingContract(this.etherSigner);
    }

    k2LendingDepositor() {
        return _k2LendingDepositor(this.etherSigner);
    }

    reporterRegistry() {
        return _reporterRegistry(this.etherSigner);
    }

    nodeOperatorModule() {
        return _nodeOperatorModule(this.etherSigner);
    }
}
