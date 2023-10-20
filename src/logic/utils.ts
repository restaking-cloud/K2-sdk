import { customErrors } from './constants';
import _ from 'lodash';
import axios from 'axios';
import { LivenessReportT, LivenessT, MiddlewareInfoT, ReportT } from '../types';
import { _getDebtor } from './kSquaredLending';
import { Signer, ethers } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';

const R = require('@blockswaplab/rpbs-self-attestation');

export const _add0x = (data: string) => {

	if(!data) {
		throw customErrors.NULL_OR_UNDEFINED_VALUE;
	}

	if(_.isString(data)) {
		return (data.indexOf('0x') !== -1) ? data : '0x'.concat(data);		
	}

	return data;
};

export const _remove0x = (data: string) => {

	if(!data) {
		throw customErrors.NULL_OR_UNDEFINED_VALUE;
	}

	if(_.isString(data)) {
		return (data.indexOf('0x') !== -1) ? data.slice(2) : data;
	}

	return data;
};

export const _getMiddlewareInfo = async (middlewareAPI: string): Promise<MiddlewareInfoT> => {

	const { data } = await axios.get<MiddlewareInfoT>(`${middlewareAPI}/info`);

	return data;
};

const _getLivenessCount = async (livenessAPI: string): Promise<LivenessT> => {

	const { data } = await axios.get<LivenessT>(`${livenessAPI}`);
	
	return data;
};

export const _generateLivenessReport = async (signer: Signer | Provider, middlewareAPI: string) => {

	const selfAttester = R.rpbs.SelfAttester.createSelfAttester();

	const rpbsPublicKey = R.curveOperations.encodePointInRPBSFormat(selfAttester.publicKey);

	const middlewareInfo = await _getMiddlewareInfo(middlewareAPI);

	const livenessEndpoint = middlewareInfo.LIVENESS_ENDPOINT;
	const version = middlewareInfo.VERSION;
	const debtor = middlewareInfo.SERVICE_PROVIDER_BORROW_ADDRESS;

	const commonInfo: LivenessT = await _getLivenessCount(livenessEndpoint);

	const message = '';

	const signature = selfAttester.generateSignature(JSON.stringify(commonInfo), message);

	const marshalledSignature = {
        ...signature,
        z1Hat: R.curveOperations.encodePointInRPBSFormat(signature.z1Hat),
        m1Hat: R.curveOperations.encodePointInRPBSFormat(signature.m1Hat)
    }

	const debtPosition = await _getDebtor(signer, _add0x(debtor));

	const maxSlashableBN = ethers.BigNumber.from(debtPosition.maxSlashableAmountPerLiveness.toString());
	const offlineValidatorsBN = ethers.BigNumber.from(commonInfo.numOfValidatorsOffline);
	const totalValidatorsBN = ethers.BigNumber.from(commonInfo.totalValidators);
	const proposedSlashingBN = maxSlashableBN.mul(offlineValidatorsBN).div(totalValidatorsBN);

	const livenessReport: LivenessReportT = {
		rpbsSelfAttestation: {
			signature: marshalledSignature,
			commonInfo: commonInfo,
			publicKey: _remove0x(rpbsPublicKey)
		},
		eventType: "LIVENESS",
		version: version,
		eventData: {
			...commonInfo,
			proposedSlashing: proposedSlashingBN.toString()
		}
	};
	
	return livenessReport;
};

export const _verifyLivenessReport = async (middlewareAPI: string, report: LivenessReportT) => {

	try {
        const response = await axios.post(`${middlewareAPI}/report`, report);
        return response.data;
    } catch(error: any) {
		throw new error.response.data;
    }
};
