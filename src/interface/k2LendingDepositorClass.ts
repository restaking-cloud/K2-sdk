import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import {
    _getKethVaultAddress,
    _getK2LendingContractAddress,
    _deposit
} from '../logic/k2LendingDepositor';
import { ReportT, SignatureECDSAT } from '../types';

export class K2LendingDepositorClass {

    etherSigner;

    constructor(signer: Signer | Provider) {
        this.etherSigner = signer;
    }
    
    getKethVaultAddress() {
        return _getKethVaultAddress(this.etherSigner);
    }

    getK2LendingContractAddress() {
        return _getK2LendingContractAddress(this.etherSigner);
    }

    deposit(tokenAddress: string, amount: number) {
        return _deposit(this.etherSigner, tokenAddress, amount);
    }
}