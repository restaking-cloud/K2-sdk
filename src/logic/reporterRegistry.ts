import { customErrors } from './constants';
import { getContractInstance } from './contracts';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { _add0x, _remove0x } from './utils';
import { ReportT, SignatureECDSAT } from '../types';

export const _getKSquaredLendingPoolAdress = async (signer: Signer | Provider) => {

    const contract = (await getContractInstance(signer)).reporterRegistry();

    return contract.kSquaredLendingPool();
};

export const _isReporterActive = async (signer: Signer | Provider, reporter: string) => {

    const contract = (await getContractInstance(signer)).reporterRegistry();

    return contract.isReporterActive(_add0x(reporter));
};

export const _isReporterRagequitted = async (signer: Signer | Provider, reporter: string) => {

    const contract = (await getContractInstance(signer)).reporterRegistry();

    return contract.isReporterRagequitted(_add0x(reporter));
};

export const _isReportUsed = async (signer: Signer | Provider, reportIdentifier: number) => {

    const contract = (await getContractInstance(signer)).reporterRegistry();

    return contract.isReportUsed(reportIdentifier);
};

export const _registerReporter = async (signer: Signer | Provider) => {

    const contract = (await getContractInstance(signer)).reporterRegistry();

    return contract.registerReporter();
};

export const _isReporterOperational = async (signer: Signer | Provider, reporter: string) => {

    const contract = (await getContractInstance(signer)).reporterRegistry();

    return contract.isReporterOperational(_add0x(reporter));
};

export const _batchSubmitReports = async (signer: Signer | Provider, reports: ReportT[], reportSignatures: SignatureECDSAT[]) => {

    const len = reports.length;

    if(len == 0) {
        throw customErrors.NULL_OR_UNDEFINED_VALUE;
    }

    if(reports.length != reportSignatures.length) {
        throw customErrors.UNEQUAL_ARRAY_LENGTH;
    }

    const contract = (await getContractInstance(signer)).reporterRegistry();

    return contract.batchSubmitReports(reports, reportSignatures);
};

export const _reportTypedHash = async (signer: Signer | Provider, report: ReportT) => {

    const contract = (await getContractInstance(signer)).reporterRegistry();

    return contract.reportTypedHash(report);
};

export const _isValidReport = async (signer: Signer | Provider, report: ReportT, reportSignature: SignatureECDSAT) => {

    const contract = (await getContractInstance(signer)).reporterRegistry();

    return contract.isValidReport(report, reportSignature);
};
