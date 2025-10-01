export interface GetInventoryParams {
  keyword?: string;
  page: number;
  pageSize: number;
}

export interface GetInventoryByIdParams {
  id: number;
}

export interface CreateUpdateInventoryRequest {
  Id?: number;
  UserId: number;
  ItemName: string;
  Category: string;
  Quantity: number;
  UnitOfMeasure: string;
  ReOrderLevel: number;
  ReOrderQuantity: number;
  Description: string;
}

export interface InventoryDto {
  Id: number;
  UserId: number;
  ClientName: string;
  ItemName: string;
  Category: string;
  Quantity: number;
  UnitOfMeasure: string;
  ReOrderLevel: number;
  ReOrderQuantity: number;
  Description: string;
}

export interface InventoryResponse {
  InventoryList: InventoryDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}
