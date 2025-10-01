import type {
  CreateUpdateInventoryRequest,
  GetInventoryByIdParams,
  GetInventoryParams,
  InventoryResponse,
} from "@/types/inventory";
import apiConfig from "./apiConfig";
import type { InventoryFormValues } from "@/pages/schema/inventoryFormSchema";
import useInventoryContext from "@/store/inventory/inventoryContext";

export const inventoryApi = {
  createInventory: async (
    payload: CreateUpdateInventoryRequest
  ): Promise<InventoryResponse> => {
    const { data } = await apiConfig.post<InventoryResponse>(
      "/Inventory/create-inventory",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    // Return the full response, not just ApiMessage
    return data;
  },

  getInventoryList: async (
    params: GetInventoryParams
  ): Promise<InventoryResponse> => {
    const { data } = await apiConfig.get("/Inventory/get-inventory-list", {
      params,
    });

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  getInventoryById: async (
    params: GetInventoryByIdParams
  ): Promise<InventoryResponse> => {
    const { data } = await apiConfig.get("/Inventory/get-inventory-by-id", {
      params,
    });

    const result = {
      id: data.InventoryList[0].Id,
      userId: data.InventoryList[0].UserId,
      itemName: data.InventoryList[0].ItemName,
      category: data.InventoryList[0].Category,
      quantity: data.InventoryList[0].Quantity,
      unitOfMeasure: data.InventoryList[0].UnitOfMeasure,
      reOrderLevel: data.InventoryList[0].ReOrderLevel,
      reOrderQuantity: data.InventoryList[0].ReOrderQuantity,
      description: data.InventoryList[0].Description,
    } as InventoryFormValues;

    useInventoryContext.getState().zSetInventoryAEData(result);
    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  updateInventory: async (
    payload: CreateUpdateInventoryRequest
  ): Promise<InventoryResponse> => {
    const { data } = await apiConfig.put<InventoryResponse>(
      "/Inventory/update-inventory",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },

  removeInventory: async (id: number): Promise<InventoryResponse> => {
    const { data } = await apiConfig.put<InventoryResponse>(
      `/Inventory/soft-delete-inventory-by-id/${id}`
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },
};
