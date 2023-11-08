import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { ConstantsSubPackage } from './interface/constantsClass';
import { ContractsSubPackage } from './interface/contractsClass';
import { UtilsSubPackage } from './interface/utilsClass';
import { ReporterRegistrySubPackage } from './interface/reporterRegistryClass';
import { K2LendingDepositorClass } from './interface/k2LendingDepositorClass';
import { K2LendingClass } from './interface/k2LendingClass';
import { NodeOperatorModuleSubPackage } from './interface/nodeOperatorModuleClass';

export class K2 {

    etherSigner: Signer | Provider;
    constants: ConstantsSubPackage;
    contracts: ContractsSubPackage;
    utils: UtilsSubPackage;
    reporterRegistry: ReporterRegistrySubPackage;
    k2LendingDepositor: K2LendingDepositorClass;
    k2Lending: K2LendingClass;
    nodeOperatorModule: NodeOperatorModuleSubPackage;

    constructor(signerOrProvider: Signer | Provider) {
        
        this.etherSigner = signerOrProvider;
        this.constants = new ConstantsSubPackage(this.etherSigner);
        this.contracts = new ContractsSubPackage(this.etherSigner);
        this.utils = new UtilsSubPackage(this.etherSigner);
        this.reporterRegistry = new ReporterRegistrySubPackage(this.etherSigner);
        this.k2LendingDepositor = new K2LendingDepositorClass(this.etherSigner);
        this.k2Lending = new K2LendingClass(this.etherSigner);
        this.nodeOperatorModule = new NodeOperatorModuleSubPackage(this.etherSigner);
    }
}
