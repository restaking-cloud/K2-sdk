import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import {
    _getK2LendingPoolAdress,
    _isReporterActive,
    _isReporterRagequitted,
    _isReportUsed,
    _registerReporter,
    _isReporterOperational,
    _batchSubmitReports,
    _reportTypedHash,
    _isValidReport
} from '../logic/reporterRegistry';
import { ReportT, SignatureECDSAT } from '../types';

export class ReporterRegistrySubPackage {

    etherSigner;

    constructor(signer: Signer | Provider) {
        this.etherSigner = signer;
    }

    getK2LendingPoolAdress() {
        return _getK2LendingPoolAdress(this.etherSigner);
    }

    isReporterActive(reporter: string) {
        return _isReporterActive(this.etherSigner, reporter);
    }

    isReporterRagequitted(reporter: string) {
        return _isReporterRagequitted(this.etherSigner, reporter);
    }

    isReportUsed(reporterIdentifier: number) {
        return _isReportUsed(this.etherSigner, reporterIdentifier);
    }

    registerReporter() {
        return _registerReporter(this.etherSigner);
    }

    isReporterOperational(reporter: string) {
        return _isReporterOperational(this.etherSigner, reporter);
    }

    batchSubmitReports(reports: ReportT[], reportSignatures: SignatureECDSAT[]) {
        return _batchSubmitReports(this.etherSigner, reports, reportSignatures);
    }

    reportTypedHash(report: ReportT) {
        return _reportTypedHash(this.etherSigner, report);
    }

    isValidReport(report: ReportT, reportSignature: SignatureECDSAT) {
        return _isValidReport(this.etherSigner, report, reportSignature);
    }
}
