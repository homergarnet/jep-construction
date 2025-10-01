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

export const clientListStatusOptions = [
  { value: "not/a", label: "Select status" }, // 👈 acts like placeholder
  { value: "inactive", label: "Inactive" },
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

export const empAttendanceColumns = [
  { key: "employeeNumber", label: "Employee Number" },
  { key: "employeeName", label: "Employee Name" },
  { key: "timeInOut", label: "Time In Out" },
  { key: "timeInOutType", label: "Time In Out Type" },
  { key: "timeInOutImage", label: "Time In Out Image" },
];

export const clientColumns = [
  { key: "clientNumber", label: "Client Number" },
  { key: "email", label: "Email" },
  { key: "firstname", label: "Firstname" },
  { key: "lastname", label: "Lastname" },
  { key: "mobileNumber", label: "Mobile Number" },
  { key: "status", label: "Status" },
  { key: "address", label: "Address" },
  { key: "birthDate", label: "Date Of Birth" },
  { key: "actions", label: "Actions", className: "text-right" },
];

export const projectManagementColumns = [
  { key: "projectName", label: "Project Name" },
  { key: "clientName", label: "Client Name" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "budget", label: "Budget" },
  { key: "location", label: "Location" },
  { key: "description", label: "Description" },
  { key: "completionStatus", label: "Completion Status" },
  { key: "actions", label: "Actions", className: "text-right" },
];

export const reviewColumns = [
  { key: "projectName", label: "Project Name" },
  { key: "clientName", label: "Client Name" },
  { key: "email", label: "Email" },
  { key: "mobileNumber", label: "Mobile Number" },
  { key: "rate", label: "Rate" },
  { key: "review", label: "Review" },
  { key: "dateTimeCreated", label: "Date Time Created" },
  { key: "actions", label: "Actions", className: "text-right" },
];

export const CREATE_EMPLOYEE = "Create employee";
export const EDIT_EMPLOYEE = "Edit employee";

export const CREATE_EMP_ATTENDANCE = "Create employee attendance";
export const EDIT_EMP_ATTENDANCE = "Edit employee attendance";

export const CREATE_CLIENT = "Create client";
export const EDIT_CLIENT = "Edit client";

export const CREATE_PROJECT_MANAGEMENT = "Create project management";
export const EDIT_PROJECT_MANAGEMENT = "Edit project management";

export const ADD_SKU = "Add SKU";
export const UPDATE_SKU = "Update SKU";
export const DELETE_SKU = "Delete SKU";
export const UPDATED_SKU_MESSAGE = "SKU updated successfully";
export const DELETED_SKU_MESSAGE = "SKU deleted successfully";
export const ADMIN_ROLE_ID = "1";
export const EMPLOYEE_ROLE_ID = "2";
export const CLIENT_ROLE_ID = "3";

export const BRANCH_DEPLOYED = "test branch";

export const EMPLOYEE_TYPE = "employee";
export const CLIENT_TYPE = "client";
export const ADMIN_TYPE = "admin";
