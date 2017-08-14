import {IMultiSelectSettings, IMultiSelectTexts} from "angular-2-dropdown-multiselect";

const selectBoxTexts: IMultiSelectTexts = {
  checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'פריטים נבחרו',
    searchPlaceholder: 'חפש',
    defaultTitle: 'בחר...',
    allSelected: 'All selected',
    searchEmptyResult: 'לא נמצאו ערכים תואמים',
};

const singleSelectSettingsWithSearch: IMultiSelectSettings = {
  pullRight: true,
  selectionLimit: 1,
  autoUnselect: true,
  closeOnClickOutside: true,
  enableSearch: true,
  closeOnSelect: true
};

const singleSelectSettingsWithoutSearch: IMultiSelectSettings = {
  pullRight: true,
  selectionLimit: 1,
  autoUnselect: true,
  closeOnClickOutside: true,
  closeOnSelect: true
};

const multiSelectSettingsWithSearch: IMultiSelectSettings = {
  pullRight: true,
  closeOnClickOutside: true,
  enableSearch: true,
  dynamicTitleMaxItems: 1
};

const multiSelectSettingsWithoutSearch: IMultiSelectSettings = {
  pullRight: true,
  closeOnClickOutside: true,
  dynamicTitleMaxItems: 1
};


export let inputConfig = {
  selectBoxTexts: selectBoxTexts,
  singleSelectSettingsWithSearch: singleSelectSettingsWithSearch,
  singleSelectSettingsWithoutSearch: singleSelectSettingsWithoutSearch,
  multiSelectSettingsWithSearch: multiSelectSettingsWithSearch,
  multiSelectSettingsWithoutSearch: multiSelectSettingsWithoutSearch
};
