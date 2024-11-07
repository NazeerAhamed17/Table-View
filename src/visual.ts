"use strict";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

// selection point related imports
import ISelectionId = powerbi.visuals.ISelectionId;

// host related  import
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewTable = powerbi.DataViewTable;
import DataViewTableRow = powerbi.DataViewTableRow;
import PrimitiveValue = powerbi.PrimitiveValue;

import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactCircleCard from "./component/ReactCircleCard";
import { State } from "./interfaces";
import "./../style/visual.less";

export class Visual implements IVisual {
  private target: HTMLElement;
  private host: IVisualHost;
  private selectionManager;
  private updateState: (newState: State) => void;

  constructor(options: VisualConstructorOptions) {
    this.updateState = () => {};
    this.host = options.host;
    this.selectionManager = this.host.createSelectionManager();

    const reactRoot = React.createElement(ReactCircleCard, {
      updateCallback: (updateFunc: (newState: State) => void) => {
        this.updateState = updateFunc;
      },
    });
    this.target = options.element;
    ReactDOM.render(reactRoot, this.target);
  }

  public update(options: VisualUpdateOptions) {
    const colData: any[] = [];
    const rowData: any[] = [];
    // console.log(options.dataViews[0]);
    const dataView: DataView = options.dataViews[0];
    // console.log("dataView", dataView);
    const tableDataView: DataViewTable = dataView.table;

    const onRowclick = (rowId: any) => {
      const selection: ISelectionId = this.host
        .createSelectionIdBuilder()
        .withTable(dataView.table, rowId)
        .createSelectionId();
      this.selectionManager.select(selection);
      console.log("rowClicked", selection);
    };
    tableDataView.columns.forEach((col: DataViewMetadataColumn) => {
      colData.push(col.displayName);
    });
    tableDataView.rows.forEach((row: DataViewTableRow) => {
      rowData.push(row);
    });

    this.updateState({
      tableData: { colData, rowData },
      rowClick: onRowclick,
    });
  }
}

// console.log("Col data", colData);
// console.log("row data", rowData);

// console.log("table view data", tableDataView);
