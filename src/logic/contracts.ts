import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { _getChainSpecificConstants, _extractChainID } from './constants';
import { 
    KSquaredLending_abi__factory,
    KSquaredLendingDepositor_abi__factory,
    Reporter_registry_abi__factory
} from '../contracts/index';

export const getContractInstance = async (signer: Signer | Provider) => {

    const chainID = await _extractChainID(signer);
    const values = _getChainSpecificConstants(chainID);

    const getKSquaredLendingContract = () => KSquaredLending_abi__factory.connect(
        values?.factoryAddresses.K_SQUARED_LENDING as string,
        signer
    );

    const getKSquaredLendingDepositor = () => KSquaredLendingDepositor_abi__factory.connect(
        values?.factoryAddresses.K_SQUARED_LENDING_DEPOSITOR as string,
        signer
    );
    
    const getReporterRegistry = () => Reporter_registry_abi__factory.connect(
        values?.factoryAddresses.REPORTER_REGISTRY as string,
        signer
    );

    return {
        kSquaredLendingContract: getKSquaredLendingContract,
        kSquaredLendingDepositor: getKSquaredLendingDepositor,
        reporterRegistry: getReporterRegistry
    }
}
