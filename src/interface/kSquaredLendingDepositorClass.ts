import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import {
    _getKethVaultAddress,
    _getKSquaredLendingContractAddress,
    _deposit
} from '../logic/kSquaredLendingDepositor';
import { ReportT, SignatureECDSAT } from '../types';

export class KSquaredLendingDepositorClass {

    etherSigner;

    constructor(signer: Signer | Provider) {
        this.etherSigner = signer;
    }
    
    getKethVaultAddress() {
        return _getKethVaultAddress(this.etherSigner);
    }

    getKSquaredLendingContractAddress() {
        return _getKSquaredLendingContractAddress(this.etherSigner);
    }

    deposit(tokenAddress: string, amount: number) {
        return _deposit(this.etherSigner, tokenAddress, amount);
    }
}