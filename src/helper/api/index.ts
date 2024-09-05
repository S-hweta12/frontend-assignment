import { DefaultBodyType, http, HttpResponse } from "msw";

interface Data {
  type: string;
  title: string;
  position: number;
}

export const apiHandlers = [
  http.post("/add-data", async ({ request }) => {
    const newData: DefaultBodyType | Data[] = await request.json();
    const existingData: Data[] = JSON.parse(
      localStorage.getItem("data") || "[]"
    );
    if (existingData && existingData.length) {
      return HttpResponse.json({
        status: 200,
        body: { message: "Data added successfully" },
      });
    }
    const isDuplicate = (newData as Data[])?.some((newItem) =>
      existingData.some(
        (existingItem) =>
          JSON.stringify(existingItem) === JSON.stringify(newItem)
      )
    );

    if (isDuplicate) {
      return HttpResponse.json({
        status: 409,
        body: { message: "Duplicate data" },
      });
    } else {
      if (newData && newData instanceof Array) {
        const updatedData = [...existingData, ...newData];
        localStorage.setItem("data", JSON.stringify(updatedData));
      }
      return HttpResponse.json({
        status: 200,
        body: {
          message: "Data added successfully",
          data: JSON.parse(localStorage.getItem("data") || ""),
        },
        updatedAt: localStorage.getItem("updatedAt"),
      });
    }
  }),
  http.get("/get-all-data", () => {
    const storedData = localStorage.getItem("data");
    if (!storedData) {
      return HttpResponse.json({
        status: 403,
        body: { errorMessage: "No data found" },
      });
    }
    const parsedData = JSON.parse(storedData);
    return HttpResponse.json({
      status: 200,
      body: { data: parsedData },
      updatedAt: localStorage.getItem("updatedAt") 
    });
  }),
  http.delete("/delete-data/:type", ({ params }) => {
    const { type } = params;
    const storedData: Data[] = JSON.parse(localStorage.getItem("data") || "[]");
    if (!storedData.length) {
      return HttpResponse.json({
        status: 403,
        body: { errorMessage: "No data found" },
      });
    }
    const newData = storedData.filter((item) => item.type !== type);
    localStorage.setItem("data", JSON.stringify(newData));
    return HttpResponse.json({
      status: 200,
      body: { success: true },
    });
  }),
  http.put("/update-bulk-data", async ({ request }) => {
    const newData = await request.json();
    localStorage.setItem("data", JSON.stringify(newData));
    localStorage.setItem("updatedAt", JSON.stringify(new Date()));
    return HttpResponse.json({
      status: 200,
      body: {
        message: "Data updated successfully",
        data: JSON.parse(localStorage.getItem("data") || ""),
      },
      updatedAt: localStorage.getItem("updatedAt"),
    });
  }),
  http.put("/update-data/:type", async ({ request, params }) => {
    const updatedItem = await request.json();
    const { type } = params;
    const storedData: Data[] = JSON.parse(localStorage.getItem("data") || "[]");
    if (!storedData.length) {
      return HttpResponse.json({
        status: 403,
        body: { errorMessage: "No data found" },
      });
    }
    const updatedData = storedData.map((item) =>
      item.type === type ? updatedItem : item
    );
    localStorage.setItem("data", JSON.stringify(updatedData));
    return HttpResponse.json({
      status: 200,
      body: { success: true },
    });
  }),
];
