import {IFile} from './file';

export interface IProduct {
  _id?: number;
  spec?: {
    type?: string[];
    hebName?: string;
    engName?: string;
    formulaIdNumber?: number;
    category1?: string[];
    category2?: string[];
    category3?: string[];
    formulaUsedSince?: any;
    startingFromNow?: boolean;
    physicalForm?: string[];
    physicalFormOther?: string;
    physicalFormFiles?: IFile[];
    siteOfApplication?: string;
    userSex?: string[];
    consumerAgeRange?: string[];
    consumerAgeRangeOther?: string;
    maxFrequencyOfUse?: string;
    amountPerApplication?: string;
    leaveOrRinse?: string[]
    leaveOrRinseOther?: string;
    shelfLife?: string[];
    shelfLifeExpiration?: string;
    shelfLifePoa?: string;
    oneTimeUse?: boolean;
    airTight?: boolean;
    shelfLifeOther?: boolean;
    shelfLifeOtherText?: string;
    shelfLifeFiles?: IFile[];
    batchCodeMethodFiles?: IFile[];
    country?: string[];
    euCountry: string;
    countryOther?: string;
    certOfFreeSaleFiles?: IFile[];
    gmpFiles?: IFile[];
  };
  formula?: {};
  actions?: {
    manufacturing: boolean;
    filling: boolean;
    packaging: boolean;
    storage: boolean;
    distribution: boolean;
    other: boolean;
    otherText: string;
    privateLabel: boolean;
    privateLabelText: string;
    privateLabelFiles: IFile[];
  };
  packaging?: {};
  lab?: {};
  label?: {};
  marketing?: {};
  safety?: {
    safetyAssessorName?: string;
    safetyAssessorAddress?: string;
    safetyAssessorCVFiles?: IFile[];
    tests?: boolean[];
    notes?: string;
    safetyAssessmentReportFiles: IFile[];
  };
  consumers?: {};
  misc?: {
    animalDeclarationFiles: IFile[];
    tollPaymentApprovalFiles: IFile[];
    notificationNumber: string;
    notificationFiles: IFile[];
    manufacturingMethodFiles: IFile[];
    qaDuringManufacturingFiles: IFile[];
  };
}
