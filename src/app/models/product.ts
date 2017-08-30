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
  packaging?: {
    packages?: any[]
  };
  lab?: {
    tests?: any[];
    manSpecificationFiles?: any[];
  };
  label?: {};
  marketing?: {
    isSunProtection: boolean;
    isBroadSpectrum: boolean;
    spf: string;
    spfFiles: IFile[];
    uva: string;
    uvaFiles: IFile[];
    isWaterResistant: boolean;
    waterResistantFiles: IFile[];
    isVeryWaterResistant: boolean;
    veryWaterResistantFiles: IFile[];
    isJellyProtection: boolean;
    jellyProtectionFiles: IFile[];
    isHypoalergenic: boolean;
    hypoalergenicFiles: IFile[];
    isSensitiveSkin: boolean;
    sensitiveSkinFiles: IFile[];
    isDermaTested: boolean;
    dermaTestedFiles: IFile[];
    isOplaTested: boolean;
    oplaTestedFiles: IFile[];
    isNonComodogenic: boolean;
    nonComodogenicFiles: IFile[];
    isAntiPerspirant: boolean;
    antiPerspirantAi: string[];
    antiPerspirantFiles: IFile[];
    isSweatPrevention: boolean;
    sweatPreventionAi: string[];
    sweatPreventionFiles: IFile[];
    isMouthHygiene: boolean;
    fluoridResults: string;
    fluoridResultsFiles: IFile[];
    teethWhiteningAi: string[];
    teethWhiteningFiles: IFile[];
    decayPreventionAi: string[];
    decayPreventionFiles: IFile[];
    isSkinLightening: boolean;
    skinLighteningAi: string[];
    skinLighteningFiles: IFile[];
    isAntiDandruff: boolean;
    antiDandruffAi: string[];
    antiDandruffFiles: IFile[];
    isSelfTan: boolean;
    selfTanAi: string[];
    selfTanFiles: IFile[];
    isLackOf: boolean;
    lackOf: string;
    lackOfFiles: IFile[];
    isContainsIng: boolean;
    containsIng: string[];
    containsIngFiles: IFile[];
    isProof: boolean;
    proofMaterials: string[];
    proofMaterialsFiles: IFile[];
    isOrganic: boolean;
    organicFiles: IFile[];
    isAntiAging: boolean;
    antiAgingFiles: IFile[];
    isOther: boolean;
    otherAi: string[];
    otherFiles: IFile[];

  };
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
