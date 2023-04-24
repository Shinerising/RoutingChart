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

const getFileList = async () => {
  const data = await requestData("/file/list", []);
  return JSON.parse(data);
};
