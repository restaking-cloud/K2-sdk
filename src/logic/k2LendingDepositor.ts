import { _k2LendingDepositor } from './contracts';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { _add0x, _remove0x } from './utils';

export const _getKethVaultAddress = async (signer: Signer | Provider) => {

    const contract = await _k2LendingDepositor(signer);

    return contract.kethVault();
};

export const _getK2LendingContractAddress = async (signer: Signer | Provider) => {

    const contract = await _k2LendingDepositor(signer);

    return contract.kSquaredLending();
};

export const _deposit = async (signer: Signer | Provider, tokenAddress: string, amount: number) => {

    const contract = await _k2LendingDepositor(signer);

    return contract.deposit(_add0x(tokenAddress), amount);
}; 
