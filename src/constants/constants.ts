export const BLACK_LIST_CHARACTERS = ["~", "<", ">", "\\", "'", "`", '"'];
export const BASIC_PUNCTUATIONS = ["(", ")", ".", ",", "-", '"', "'"];
export const WHITE_SPACE = [" "];

export const PUNCTUATIONS = [
  "[",
  "]",
  "{",
  "}",
  "|",
  "\\",
  ";",
  ":",
  "'",
  '"',
  ",",
  "<",
  ">",
  ".",
  "/",
  "?",
  "`",
  "~",
  "Dead",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "=",
  "+",
  "*",
  "-",
];

export const API_ENDPOINTS = {
  CREATE_SKU_MASTER_LIST: "SkuMasterList",
  GET_HOME_TBL_LIST: "Home/get-table-list",
  GET_SKU_DETAILS: "SkuMasterList/GetSkuDetails",
  GET_WORKSHEET_PO_DETAILS: "WorkSheet/GetWorkSheetPODetails",
  UPDATE_SKU: "SkuMasterList/UpdateSku",
  DELETE_SKU: "SkuMasterList/DeleteSku",
};

export const statusOptions = [
  { value: "not/a", label: "Select status" }, // 👈 acts like placeholder
  { value: "Employed", label: "Employed" },
  { value: "inactive", label: "Inactive" },
  { value: "Terminated", label: "Terminated" },
];

export const employeeColumns = [
  { key: "employeeNumber", label: "Employee Number" },
  { key: "email", label: "Email" },
  { key: "firstname", label: "Firstname" },
  { key: "lastname", label: "Lastname" },
  { key: "mobileNumber", label: "Mobile Number" },
  { key: "position", label: "Position" },
  { key: "salary", label: "Salary" },
  { key: "status", label: "Status" },
  { key: "address", label: "Address" },
  { key: "birthDate", label: "Date Of Birth" },
  { key: "actions", label: "Actions", className: "text-right" },
];
export const CREATE_EMPLOYEE = "Create employee";
export const EDIT_EMPLOYEE = "Edit employee";
export const ADD_SKU = "Add SKU";
export const UPDATE_SKU = "Update SKU";
export const DELETE_SKU = "Delete SKU";
export const UPDATED_SKU_MESSAGE = "SKU updated successfully";
export const DELETED_SKU_MESSAGE = "SKU deleted successfully";
export const ADMIN_ROLE_ID = "1";
export const EMPLOYEE_ROLE_ID = "2";
export const CLIENT_ROLE_ID = "3";

export const BRANCH_DEPLOYED = "test branch";
