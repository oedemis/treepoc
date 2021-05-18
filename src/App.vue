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
        :getRowNodeId="getRowNodeId"
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
        :context="context"
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
import { varianten, modelljahrTeilvariante, cnummern } from "../varianten.js";
import VueActionCellRenderer from "./vue-action-cell-renderer.js";
import LeafCellRenderer from "./leaf-cell-renderer.js";

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
      getRowNodeId: null,
      context: null,
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

    this.rowData = this.loadedData;

    this.frameworkComponents = {
      vueActionCellRenderer: VueActionCellRenderer,
      leafCellRenderer: LeafCellRenderer,
    };

    this.columnDefs = [
      {
        field: "vonmodelljahr",
        headerName: "Von Modelljahr",
        colId: "vonmodelljahr",
        cellEditorSelector: (params) => {
          if (params.data.typ === "Teilvariante") {
            return {
              component: "autocompleteSelectCellEditor",
              params: {
                required: true,
                minLength: 3,
                selectData: this.modelljahrTeilvariante,
                placeholder: "Select an option",
                popUp: true,
                autocomplete: {
                  strict: true,
                  autoselectfirst: false,
                  showOnFocus: true,
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
                  fetch: (cellEditor, text, update) => {
                    var suggestions = this.modelljahrTeilvariante;
                    update(suggestions);
                    if (document.querySelector(".matched"))
                      document.querySelector(".matched").scrollIntoView();
                  },
                },
              },
            };
          } else {
            return {
              // agRichSelect
              component: "agSelectCellEditor",
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
        colId: "bismodelljahr",
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
        colId: "motortyp",
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
        colId: "getriebetyp",
        cellEditorSelector: (params) => {
          if (params.data.typ != "Teilvariante") {
            return {
              component: "agSelectCellEditor",
              params: { values: ["und", "oder"] },
            };
          }
          return null;
        },
        editable: (params) => (params.data.label ? false : true),
      },
      {
        field: "action",
        colId: "action",
        headerComponentParams: { template: '<i class="fa fa-wrench"></i>' },
        cellStyle: { textAlign: "center" },
        cellRenderer: "vueActionCellRenderer",
        cellRendererParams: {
          suppressDoubleClickExpand: true,
        },
        cellClass: "actions-button-cell",
        editable: false,
        width: 60,
      },
    ];
    this.defaultColDef = { flex: 1 };
    this.autoGroupColumnDef = {
      headerName: "Produktschlüssel",
      colId: "produktschluessel",
      field: "produktschluessel",
      minWidth: 300,
      editable: (params) => {
        if (params.data.typ !== "Teilvariante") return false;
        return true;
      },
      cellRendererParams: {
        suppressCount: true,
        suppressDoubleClickExpand: true,
        innerRenderer: "leafCellRenderer",
      },
      valueGetter: (params) => {
        if (params.data)
          return params.data.produktschluessel[
            params.data.produktschluessel.length - 1
          ];
      },
      valueSetter: (params) => {
        /**
         * TODO: name can only appear once in tree UNIQUE checkeness
         */
        if (params.data.typ === "Teilvariante") {
          // Update all childs key path
          let selectedNode = this.gridApi.getSelectedNodes()[0];
          if (!selectedNode) {
            console.warn("No nodes selected!");
            return;
          }

          this.gridApi.forEachNode((node) => {
            console.log(
              "before valueSetter " + node.data.produktschluessel.join("")
            );
          });

          if (selectedNode.childrenAfterGroup.length == 0) {
            params.data.produktschluessel[0] = params.newValue;
            //const rowNode = this.gridApi.getRowNode(selectedNode.data.id);
            //rowNode.setData(params.data);

            this.gridApi.applyTransaction({
              update: [selectedNode.data],
              addIndex: 0,
            });
          } else {
            params.data.produktschluessel[0] = params.newValue;

            let newData = this.updateAllChildrenKeys(
              selectedNode,
              params.newValue,
              params.oldValue
            );
            selectedNode.data = newData.data;
            this.gridApi.applyTransaction({
              remove: [selectedNode.data],
              addIndex: 1000,
            });
            this.gridApi.applyTransaction({ add: [newData.data], addIndex: 0 });
          }

          this.gridApi.forEachNode((node) => {
            console.log(
              "after valueSetter " + node.data.produktschluessel.join("")
            );
          });
          return true;
        } else {
          return false;
        }
      },
      cellStyle: { pointerEvents: "auto" },
    };
    this.groupDefaultExpanded = -1;
    this.rowSelection = "single";
    this.getDataPath = (data) => {
      let res = data.produktschluessel;
      if (data.labelName) {
        //for leave nodes we add the id to make them unique
        res.push(data.labelName + data.id);
      }
      return res;
    };
    this.rowClassRules = {
      isLabel: (params) => (params.data != undefined ? params.data.label : ""),
    };

    this.getRowNodeId = (data) => {
      return data.id;
    };

    this.context = { componentParent: this };
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  methods: {
    methodFromParent(cell) {
      //alert("Parent Component Method from " + cell + "!");
    },
    updateItems() {
      var itemsToUpdate = [];
      this.gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
        var data = rowNode.data;
        itemsToUpdate.push(data);
      });
      var res = this.gridApi.applyTransaction({ update: itemsToUpdate });
    },
    updateChildrens(teilvariante, newKey, oldKey) {
      for (var i = 0; i < teilvariante.childrenAfterGroup.length; i++) {
        let indexOldValue = teilvariante.childrenAfterGroup[
          i
        ].data.produktschluessel.indexOf(oldKey);

        if (indexOldValue !== -1) {
          teilvariante.childrenAfterGroup[i].data.produktschluessel[
            indexOldValue
          ] = newKey;
          this.updateAllChildrenKeys(
            teilvariante.childrenAfterGroup[i],
            newKey,
            oldKey
          );
        }
      }
    },
    updateAllChildrenKeys(teilvariante, newKey, oldKey) {
      let rootWithChildren = teilvariante;
      rootWithChildren.key = newKey;
      for (var i = 0; i < rootWithChildren.childrenAfterGroup.length; i++) {
        let indexOldValue = rootWithChildren.childrenAfterGroup[
          i
        ].data.produktschluessel.indexOf(oldKey);

        if (indexOldValue !== -1) {
          rootWithChildren.childrenAfterGroup[i].data.produktschluessel[
            indexOldValue
          ] = newKey;
          this.updateAllChildrenKeys(
            rootWithChildren.childrenAfterGroup[i],
            newKey,
            oldKey
          );
        }
      }
      return rootWithChildren;
    },
    getRowData() {
      var rowData = [];
      this.gridApi.forEachNode(function (node) {
        rowData.push(node.data);
      });
      console.log("Row Data:");
      console.log(rowData);
    },
    onDeleteLabel(data) {
      this.deleteNodeFromTree(this.loadedData[0], data.id);
      let selectedData = this.gridApi.getSelectedRows()[0];
      let newRowData = this.rowData.filter((row) => {
        return row.typ !== selectedData.typ;
      });
      this.rowData = newRowData;
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