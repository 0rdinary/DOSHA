import * as XLSX from 'xlsx';

export const downloadMyXlsx = (data) => {
  const excelHandler = {
    getExcelFileName: () => '데이터.xlsx',
    getSheetName: () => '데이터',
    getExcelData: () => data,
    getWorksheet: () => XLSX.utils.json_to_sheet(excelHandler.getExcelData()),
  };

  const datas = excelHandler.getWorksheet();
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, datas, excelHandler.getSheetName());
  XLSX.writeFile(workbook, excelHandler.getExcelFileName());
};
