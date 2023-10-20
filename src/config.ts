import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { ConstantsSubPackage } from './interface/constantsClass';
import { ContractsSubPackage } from './interface/contractsClass';
import { UtilsSubPackage } from './interface/utilsClass';
import { ReporterRegistrySubPackage } from './interface/reporterRegistryClass';
import { KSquaredLendingDepositorClass } from './interface/kSquaredLendingDepositorClass';
import { KSquaredLendingClass } from './interface/kSquaredLendingClass';

export class K2 {

    etherSigner: Signer | Provider;
    constants: ConstantsSubPackage;
    contracts: ContractsSubPackage;
    utils: UtilsSubPackage;
    reporterRegistry: ReporterRegistrySubPackage;
    kSquaredLendingDepositor: KSquaredLendingDepositorClass;
    kSquaredLending: KSquaredLendingClass;

    constructor(signerOrProvider: Signer | Provider) {
        
        this.etherSigner = signerOrProvider;
        this.constants = new ConstantsSubPackage(this.etherSigner);
        this.contracts = new ContractsSubPackage(this.etherSigner);
        this.utils = new UtilsSubPackage(this.etherSigner);
        this.reporterRegistry = new ReporterRegistrySubPackage(this.etherSigner);
        this.kSquaredLendingDepositor = new KSquaredLendingDepositorClass(this.etherSigner);
        this.kSquaredLending = new KSquaredLendingClass(this.etherSigner);
    }
}
