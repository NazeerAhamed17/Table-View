import * as React from "react";

export default function TableData({ tableData }) {
  const [selectValue, setSelectValue] = React.useState<number>(1000);

  return (
    <>
      <div className="selectContainer">
        <select
          value={selectValue}
          onChange={(e: any) => {
            setSelectValue(e.target.value);
          }}
        >
          <option value="1000">Thousand</option>
          <option value="1000000">Million</option>
          <option value="1000000000">Billion</option>
        </select>
      </div>
      {tableData.colData || tableData.rowData ? (
        <table>
          <thead>
            <tr>
              {tableData.colData &&
                tableData.colData.map((thData: string, index: number) => (
                  <th key={index}>{thData}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rowData &&
              tableData.rowData.map((tdData: any[], rowIndex: number) => (
                <tr key={rowIndex}>
                  {tdData.map((data: any, cellIndex: number) => {
                    return (
                      <td key={cellIndex}>
                        {typeof data !== "string"
                          ? Math.floor((data / selectValue) * 100) / 100
                          : data}
                        {typeof data !== "string" ? (
                          <span>
                            {selectValue == 1000
                              ? " k"
                              : selectValue == 1000000
                              ? " M"
                              : " B"}
                          </span>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>Please Add the data</p>
      )}
    </>
  );
}
