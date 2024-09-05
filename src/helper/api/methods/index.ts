import { client } from "../client";
import { ImageData } from "../../../interfaces/imageDataInterface";

export const getAllImages = async () => {
  try {
    const response = await client.get("/get-all-data");
    return {
      data: response.data?.body?.data,
      updatedAt: response.data?.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

export const addImageData = async (data: ImageData[]) => {
  try {
    const response = await client.post("/add-data", data);
    return {
      data: response.data.body.data,
      updatedAt: response.data.updatedAt,
    };
  } catch (error) {
    console.error("Error adding image:", error);
    throw error;
  }
};

export const deleteImage = async (type: string) => {
  try {
    const response = await client.delete(`/delete-data/${type}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export const updateImageByType = async (type: string, data: []) => {
  try {
    const response = await client.put(`/update-data/${type}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating image:", error);
    throw error;
  }
};

export const updateBulkImage = async (data: ImageData[]) => {
  try {
    const response = await client.put(`/update-bulk-data`, data);
    return {
      data: response.data.body.data,
      updatedAt: response.data.updatedAt,
    };
  } catch (error) {
    console.error("Error updating image:", error);
    throw error;
  }
};
