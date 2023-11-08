import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { 
    _getK2LendingContract,
    _getReporterRegistryContract,
    _batchNodeOperatorKick,
    _nodeOperatorClaim,
    _isValidReport
} from '../logic/nodeOperatorModule';
import { SignatureECDSAT } from '../types';

export class NodeOperatorModuleSubPackage {

    etherSigner;

    constructor(signer: Signer | Provider) {
        this.etherSigner = signer;
    }
    
    getK2LendingContract() {
        return _getK2LendingContract(this.etherSigner);
    }

    getReporterRegistryContract() {
        return _getReporterRegistryContract(this.etherSigner);
    }

    batchNodeOperatorKick(blsPublicKeys: string[], effectiveBalances: string[], designatedVerifierSignatures: SignatureECDSAT[]) {
        return _batchNodeOperatorKick(this.etherSigner, blsPublicKeys, effectiveBalances, designatedVerifierSignatures);
    }

    nodeOperatorClaim(blsPublicKeys: string[], effectiveBalances: string[], designatedVerifierSignatures: SignatureECDSAT[]) {
        return _nodeOperatorClaim(this.etherSigner, blsPublicKeys, effectiveBalances, designatedVerifierSignatures);
    }

    isValidReport(blsPublicKey: string, effectiveBalance: string, designatedVerifierSignature: SignatureECDSAT) {
        return _isValidReport(this.etherSigner, blsPublicKey, effectiveBalance, designatedVerifierSignature);
    }
}