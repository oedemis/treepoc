<template>
  <div style="height: 100%">
    <div class="example-wrapper">
      <div style="margin-bottom: 5px">
        <input
          type="text"
          id="filter-text-box"
          placeholder="Filter..."
          v-on:input="onFilterTextBoxChanged()"
        />
      </div>
      <ag-grid-vue
        style="width: 100%; height: 100%"
        class="ag-theme-alpine"
        id="myGrid"
        :rowClassRules="rowClassRules"
        :gridOptions="gridOptions"
        @grid-ready="onGridReady"
        :rowData="rowData"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :autoGroupColumnDef="autoGroupColumnDef"
        :treeData="true"
        :animateRows="true"
        :groupDefaultExpanded="groupDefaultExpanded"
        :rowSelection="rowSelection"
        :getDataPath="getDataPath"
        :stopEditingWhenGridLosesFocus="true"
        :frameworkComponents="frameworkComponents"
      >
      </ag-grid-vue>
    </div>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import { AutocompleteSelectCellEditor } from "ag-grid-autocomplete-editor";
import "../node_modules/ag-grid-autocomplete-editor/dist/main.css";
import {
  varianten,
  modelljahrTeilvariante,
  cnummern,
  flattenChildrenRecursively,
} from "../varianten.js";
import VueActionCellRenderer from "./vue-action-cell-renderer.js";

export default {
  name: "App",
  components: {
    AgGridVue,
    AutocompleteSelectCellEditor,
  },
  data: function () {
    return {
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      rowData: null,
      columnDefs: null,
      defaultColDef: null,
      autoGroupColumnDef: null,
      groupDefaultExpanded: null,
      getDataPath: null,
      loadedData: varianten,
      modelljahrTeilvariante: modelljahrTeilvariante,
      cnummern: cnummern,
      frameworkComponents: null,
      //loadedData: [],
      //modelljahrTeilvariante: [],
      //cnummern: [],
    };
  },
  beforeMount() {
    this.gridOptions = {
      stopEditingWhenGridLosesFocus: true,
      singleClickEdit: true,
      components: {
        autocompleteSelectCellEditor: AutocompleteSelectCellEditor,
      },
    };

    this.frameworkComponents = {
      vueActionCellRenderer: VueActionCellRenderer,
    };

    /*
    this.gridOptions.onCellClicked = (params) => {
      //alert(params);
    };
    */

    this.rowData = flattenChildrenRecursively(this.loadedData);

    this.columnDefs = [
      {
        field: "vonmodelljahr",
        headerName: "Von Modelljahr",
        cellEditorSelector: (params) => {
          if (params.data.typ === "Teilvariante") {
            return {
              component: "autocompleteSelectCellEditor",
              params: {
                //values: this.selectData.map((d) => d.label),
                required: true,
                minLength: 3,
                selectData: this.modelljahrTeilvariante,
                placeholder: "Select an option",
                popUp: true,
                autocomplete: {
                  strict: true,
                  autoselectfirst: false,
                  showOnFocus: true,
                  fetch: (cellEditor, text, update) => {
                    var suggestions = this.modelljahrTeilvariante;
                    update(suggestions);
                  },
                },
              },
            };
          } else {
            return {
              component: "agRichSelectCellEditor",
              params: {
                values: ["+ (enthält)", "- (enthält nicht)"],
              },
            };
          }
        },
        editable: (params) => (params.data.label ? false : true),
        valueFormatter: (params) => {
          if (params.value) {
            return params.value.label || params.value.value || params.value;
          }
          return "";
        },
      },
      {
        field: "bismodelljahr",
        headerName: "Bis Modelljahr",
        //suppressKeyboardEvent: false,
        cellEditorSelector: (params) => this.whichCellEditor(params.data.typ),
        editable: (params) => (params.data.label ? false : true),
        valueFormatter: (params) => {
          if (params.value) {
            return params.value.label || params.value.value || params.value;
          }
          return "";
        },
      },
      {
        field: "motortyp",
        headerName: "Motortyp",
        editable: (params) => {
          if (params.data.label) {
            return false;
          }
          if (
            params.data.typ === "CNummerdefinition" ||
            params.data.typ === "Ausstattungsdefinition"
          ) {
            return false;
          }
          return true;
        },
      },
      {
        field: "getriebetyp",
        headerName: "Getriebetyp",
        cellEditorSelector: (params) => {
          if (params.data.typ != "Teilvariante") {
            return {
              component: "agRichSelect",
              params: { values: ["und", "oder"] },
            };
          }
          return null;
        },
        editable: (params) => (params.data.label ? false : true),
      },
      {
        field: "action",
        headerComponentParams: { template: '<i class="fa fa-wrench"></i>' },
        cellStyle: { textAlign: "center" },
        cellRenderer: "vueActionCellRenderer",

        cellRendererParams: {
          rowData: this.rowData,
        },

        //cellEditor: "vueActionCellRenderer",
        cellClass: "actions-button-cell",

        /*
        cellRendererParams: {
          clicked: function (field) {
            alert(`${field} was clicked`);
          },
        },
        */
        width: 60,
      },
    ];
    this.defaultColDef = { flex: 1 };
    this.autoGroupColumnDef = {
      headerName: "Produktschlüssel",
      minWidth: 300,
      editable: (params) => {
        if (params.data.typ !== "Teilvariante") return false;
        return true;
      },
      cellRendererParams: {
        suppressCount: true,
        suppressDoubleClickExpand: true,
      },
      valueGetter: (params) => {
        return params.data.produktschluessel;
      },
      cellStyle: { pointerEvents: "auto" },
    };
    this.groupDefaultExpanded = -1;
    this.rowSelection = "single";
    this.getDataPath = (data) => {
      return data.hierachy;
    };
    this.rowClassRules = {
      isLabel: (params) => {
        return params.data.label;
      },
    };
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  methods: {
    onDelete(msg) {
      console.log(msg);
    },
    onFilterTextBoxChanged() {
      this.gridApi.setQuickFilter(
        document.getElementById("filter-text-box").value
      );
    },
    onGridReady(params) {
      params.api.sizeColumnsToFit();
      /*
      const updateData = (data) => {
        this.rowData = data;
      };
      */
    },
    getSelectedRowData() {
      let selectedNodes = this.gridApi.getSelectedNodes();
      let selectedData = selectedNodes.map((node) => node.data);
      return selectedData;
    },
    whichCellEditor(type) {
      let data = "";
      let gridApi = this.gridApi;
      if (type === "Teilvariante") {
        data = this.modelljahrTeilvariante;
      } else if (type === "CNummerdefinition") {
        data = this.cnummern;
      }
      if (data === "") {
        return null;
      } else {
        return {
          component: "autocompleteSelectCellEditor",
          params: {
            required: true,
            selectData: data,
            minLength: 3,
            placeholder: "Select an option",
            autocomplete: {
              onSelect(cellEditor, item, event) {
                console.log(event);
                item = cellEditor.currentItem;
                if (type === "CNummerdefinition") {
                  let selectedRows = gridApi.getSelectedRows();
                  let selectedRow =
                    selectedRows.length === 1 ? selectedRows[0] : "";
                  selectedRow.motortyp = item.value;
                }
                //cellEditor.currentItem = item;
              },
              render(cellEditor, item, value) {
                const itemElement = document.createElement("div");
                const escapedValue = (value ?? "").replace(
                  /[$()*+.?[\\\]^{|}]/g,
                  "\\$&"
                );
                const regex = new RegExp(escapedValue, "gi");
                const fieldItem = document.createElement("span");
                let matched = false;
                fieldItem.innerHTML = item.label.replace(
                  regex,
                  function strongify(match) {
                    matched = true;
                    cellEditor.currentItem = item;
                    return `<strong>${match}</strong>`;
                  }
                );
                if (matched) {
                  itemElement.classList.add("matched");
                  //itemElement.setAttribute("id", "matched");
                }
                itemElement.append(fieldItem);
                cellEditor.addManagedListener(
                  itemElement,
                  "mousedown",
                  (event) => {
                    // eslint-disable-next-line no-param-reassign
                    cellEditor.currentItem = item;
                    event.stopPropagation();
                  }
                );

                return itemElement;
              },
              strict: true,
              autoselectfirst: false,
              showOnFocus: true,
              preventSubmit: true,
              disableAutoSelect: false,
              fetch: (cellEditor, text, update) => {
                console.log("fetch :)");
                update(data);
                if (document.querySelector(".matched"))
                  document.querySelector(".matched").scrollIntoView();
              },
            },
          },
        };
      }
    },
  },
};
</script>

<style lang="scss">
@import "../node_modules/ag-grid-enterprise/dist/styles/ag-grid.css";
@import "../node_modules/ag-grid-enterprise/dist/styles/ag-theme-alpine.css";

.example-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#myGrid {
  flex: 1 1 0px;
  width: 100%;
}

.ag-row {
  z-index: 0;
}

.ag-row.ag-row-focus {
  z-index: 1;
}

.actions-button-cell {
  overflow: visible;
  pointer-events: auto;
}

.isLabel {
  background-color: #aaaaaa !important;
  font-weight: bold;
  pointer-events: none;
}

.autcomplete {
  box-sizing: border-box;
}

.ag-cell-editor-autocomplete {
  background-color: #f8f8f8;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  border: 1px solid rgba(50, 50, 50, 0.6);
  max-height: 25% !important;
  max-width: 25% !important;
}
.ag-cell-editor-autocomplete * {
  font: inherit;
}
.ag-cell-editor-autocomplete > div {
  margin: 0;
}
.ag-cell-editor-autocomplete > div.group {
  background-color: #7f8fa6;
  color: white;
}
.ag-cell-editor-autocomplete > div:hover:not(.group),
.ag-cell-editor-autocomplete > div.selected {
  background: #dcdde1;
  cursor: pointer;
}
.ag-cell-editor-autocomplete > div > * > strong {
  font-weight: bold !important;
}

.matched {
  background: rgba(33, 150, 243, 0.3);
}
</style>