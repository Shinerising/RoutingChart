/*
switch (request.Url.LocalPath)
{
    case "/file/list":
        {
            var data = Reader.GetMdbFileList(station.RecordPath);
            WriteJsonResponse(response, data);
        }
        return;
    case "/plan/list":
        {
            var data = Reader.GetPlanList(file);
            WriteJsonResponse(response, data);
        }
        return;
    case "/cut/list":
        {
            var data = Reader.GetCutList(file, int.Parse(body["plan"]));
            WriteJsonResponse(response, data);
        }
        return;
    case "/cut/data":
        {
            var data = Reader.GetCutData(file, int.Parse(body["plan"]), byte.Parse(body["cut"]));
            WriteJsonResponse(response, data);
        }
        return;
    case "/speed/list":
        {
            var data = Reader.GetSpeedList(file, int.Parse(body["plan"]), byte.Parse(body["cut"]), short.Parse(body["device"]));
            WriteJsonResponse(response, data);
        }
        return;
    case "/device/list":
        {
            var data = Reader.GetDeviceList(station.MonitorPath);
            WriteJsonResponse(response, data);
        }
        return;
    case "/":
    default:
        response.StatusCode = 403;
        response.Close();
        return;
}
*/

import { format } from "date-fns";
// Use XHR to request data from the server
const requestData = (path: string, body: [string, string][]):Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", path);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.timeout = 3000;
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(body.map((v) => v.join("=")).join("&"));
  });
};
const getFilename = (date:Date, shift: "day" | "night") => {
    return `${format(date, "yyyyMMdd")}${shift === "day" ? "白班" : "夜班"}.mdb`;
}
const getFileList = async () => {
  const data = await requestData("/file/list", []);
  return JSON.parse(data);
};
const getPlanList = async (file: string) => {
    const data = await requestData("/plan/list", [["file", file]]);
    return JSON.parse(data);
}
const getCutList = async (file: string, plan: number) => {
    const data = await requestData("/cut/list", [["file", file], ["plan", plan.toString()]]);
    return JSON.parse(data);
}
const getCutData = async (file: string, plan: number, cut: number) => {
    const data = await requestData("/cut/data", [["file", file], ["plan", plan.toString()], ["cut", cut.toString()]]);
    return JSON.parse(data);
}
const getSpeedList = async (file: string, plan: number, cut: number, device: number) => {
    const data = await requestData("/speed/list", [["file", file], ["plan", plan.toString()], ["cut", cut.toString()], ["device", device.toString()]]);
    return JSON.parse(data);
}
const getDeviceList = async () => {
    const data = await requestData("/device/list", []);
    return JSON.parse(data);
}