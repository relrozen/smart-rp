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
    oneTimeUse?: Boolean;
    airTight?: Boolean;
    shelfLifeOther?: boolean;
    shelfLifeOtherText?: string;
    shelfLifeFiles?: IFile[];
    batchCodeMethodFiles?: IFile[];
    country?: string[];
    countryOther?: string;
    certOfFreeSaleFiles?: IFile[];
    gmpFiles?: IFile[];
  };
  formula?: {};
  packaging?: {};
  lab?: {};
  label?: {};
  marketing?: {};
  safety?: {};
  consumers?: {};
  misc?: {};
}
