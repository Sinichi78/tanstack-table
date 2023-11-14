import { DownloadIcon } from "../Icons/Icons";
import * as XLSX from "xlsx/xlsx.mjs";

const DownloadBtn = ({ data = [], fileName }) => {
  const formatDataForExport = (originalData) => {
    // Create a deep copy of the data to avoid modifying the original data
    const modifiedData = JSON.parse(JSON.stringify(originalData));

    // Remove the "profile" property from each item in the array
    modifiedData.forEach((item) => {
      delete item.profile;
    });

    return modifiedData;
  };

  return (
    <button
      className="download-btn"
      onClick={() => {
        const datas = data?.length ? formatDataForExport(data) : [];
        const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
      }}
    >
      <DownloadIcon />
      Download
    </button>
  );
};

export default DownloadBtn;
