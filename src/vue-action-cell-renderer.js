import Vue from 'vue';

export default Vue.extend({
    template: `
    <div style="width: 100%" class="btn-group"">
        <button @click="invokeParentMethod" type="button" class="btn btn-default" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" >
            <i class="fa fa-ellipsis-v"></i>
        </button>

        <div v-if="determineUsabilityForTeilvariante" class="dropdown-menu dropdown-menu-right">
            <button @click="deleteDto()" class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Fahrzeugdefinition Löschen</button>
            <div class="dropdown-divider"></div>
            <button @click="createDto('Aussenfarbdefinition')" class="dropdown-item" type="button"><i class="fa fa-pencil"></i>&nbsp;&nbsp;Außenfarbdefinition Anlegen</button>
            <button @click="createDto('Ausstattungsdefinition')" class="dropdown-item" type="button"><i class="fa fa-cube"></i>&nbsp;&nbsp;Ausstattungsdefinition Anlegen</button>
            <button @click="createDto('CNummerdefinition')" class="dropdown-item" type="button"><i class="fa fa-globe"></i>&nbsp;&nbsp;C-Nummerdefinition Anlegen</button>
            <button @click="createDto('Datumsdefinition')" class="dropdown-item" type="button"><i class="fa fa-calendar"></i>&nbsp;&nbsp;Datumsdefinition Anlegen</button>
            <button @click="createDto('Innenausstattungsdefinition')" class="dropdown-item" type="button"><i class="fa fa-building"></i>&nbsp;&nbsp;Innenausstattungsdefinition Anlegen</button>
            <button @click="createDto('Nummernkreisdefinition')" class="dropdown-item" type="button"><i class="fa fa-list-ol"></i>&nbsp;&nbsp;Nummernkreisdefinition Anlegen</button>
            <button @click="createDto('Verbauvorschriftdefinition')" class="dropdown-item" type="button"><i class="fa fa-balance-scale"></i>&nbsp;&nbsp;Verbauvorschriftdefinition Anlegen</button>
            <button @click="createDto('Versandartdefinition')" class="dropdown-item" type="button"><i class="fa fa-envelope-square"></i>&nbsp;&nbsp;Versandartdefinition Anlegen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Ausstattungsdefinition')" class="dropdown-menu dropdown-menu-right">
            <button @click="createDto('Ausstattungsdefinition')" class="dropdown-item" type="button"><i class="fa fa-cube"></i>&nbsp;&nbsp;Ausstattungsdefinition Anlegen</button>
            <button @click="deleteLabelDto()" class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Ausstattungsdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Ausstattungsdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Ausstattungsdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Aussenfarbdefinition')" class="dropdown-menu dropdown-menu-right">
            <button @click="createDto('Aussenfarbdefinition')" class="dropdown-item" type="button"><i class="fa fa-pencil"></i>&nbsp;&nbsp;Außenfarbdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Außenfarbdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Aussenfarbdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Außenfarbdefinition Löschen</button>
        </div>


        <div v-else-if="determineUsabilityForLabel('CNummerdefinition')" class="dropdown-menu dropdown-menu-right">
            <button @click="createDto('CNummerdefinition')" class="dropdown-item" type="button"><i class="fa fa-globe"></i>&nbsp;&nbsp;C-Nummerdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;C-Nummerdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('CNummerdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;C-Nummerdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Datumsdefinition')" class="dropdown-menu dropdown-menu-right">
            <button @click="createDto('Datumsdefinition')" class="dropdown-item" type="button"><i class="fa fa-calendar"></i>&nbsp;&nbsp;Datumsdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Datumsdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Datumsdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Datumsdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Innenausstattungsdefinition')" class="dropdown-menu dropdown-menu-right">
            <button @click="createDto('Innenausstattungsdefinition')" class="dropdown-item" type="button"><i class="fa fa-building"></i>&nbsp;&nbsp;Innenausstattungsdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Innenausstattungsdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Innenausstattungsdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Innenausstattungsdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Nummernkreisdefinition')" class="dropdown-menu dropdown-menu-right">
            <button @click="createDto('Nummernkreisdefinition')" class="dropdown-item" type="button"><i class="fa fa-list-ol"></i>&nbsp;&nbsp;Nummernkreisdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Nummernkreisdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Nummernkreisdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Nummernkreisdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Verbauvorschriftdefinition')" class="dropdown-menu dropdown-menu-right">
            <button @click="createDto('Verbauvorschriftdefinition')" class="dropdown-item" type="button"><i class="fa fa-balance-scale"></i>&nbsp;&nbsp;Verbauvorschriftdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Verbauvorschriftdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Verbauvorschriftdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Verbauvorschriftdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Versandartdefinition')" class="dropdown-menu dropdown-menu-right">
            <button @click="createDto('Versandartdefinition')" class="dropdown-item" type="button"><i class="fa fa-envelope-square"></i>&nbsp;&nbsp;Versandartdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Versandartdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Versandartdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Versandartdefinition Löschen</button>
        </div>
        
    </div>
    `,
    data() {
        return {
            cellType: null,
            isLabel: false,
        };
    },
    beforeMount() {
        this.cellType = this.params.data.typ;
        this.isLabel = this.params.data.label;
    },
    methods: {
        refresh(params) {
            this.params = params;
        },

        invokeParentMethod() {
            //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.colId}`)
            this.params.node.setSelected(true, true);
        },

        deleteLabelDto() {
            //this.params.deleteLabelDto(this.params.data);

            //this.params.clicked(this.params.value);
            //var selectedData = this.params.api.getSelectedRows()[0];
            //var res = this.params.api.applyTransaction({ remove: selectedData.varianten });
            //var res = this.params.api.applyTransaction({ remove: [selectedData] });
            //let newRowData = this.$parent.rowData.filter(row => {
            //    return row.typ !== selectedData.typ;
            //});
            //this.$parent.rowData = newRowData;
            this.$parent.$parent.onDeleteLabel(this.params.data);
        },


        deleteDto() {
            var selectedNode = this.params.api.getSelectedNodes()[0];
            if (!selectedNode) {
                console.warn('No nodes selected!');
                return;
            }
            const toRemoved = this.getRowsToRemove(selectedNode);
            this.params.api.applyTransaction({ remove: toRemoved });

            const newRowData = this.$parent.$parent.rowData.filter(item => !toRemoved.includes(item));
            this.$parent.$parent.rowData = newRowData;

            if (this.cellType === "Teilvariante") {
                //this.params.api.setRowData([]);
                //this.params.data.pop();
            }
        },

        getRowsToRemove(node) {
            var res = [];
            for (var i = 0; i < node.childrenAfterGroup.length; i++) {
                res = res.concat(this.getRowsToRemove(node.childrenAfterGroup[i]));
            }
            return node.data ? res.concat([node.data]) : res;
        },

        createDto(type) {
            //const selectedRow = this.params.api.getSelectedRows()[0]; // or raw data
            let addedRow = null;
            const selectedRow = this.params.api.getSelectedNodes()[0];

            // TODO selectedRow null check
            const isTypePresentInGroup = this.isTypePresentInGroup(type, selectedRow);


            if (isTypePresentInGroup == false) {
                // Add Label
                let keyPath = selectedRow.data.produktschluessel.slice();
                addedRow = this.createLabel(type, keyPath.slice());
            } else {
                // add child
                let keyPath = selectedRow.data.produktschluessel.slice();
                // Von Parent Root aus geadded zB F*
                if (keyPath.length == 1) {
                    keyPath.push(this.getPluralTyp(type));
                }
                addedRow = this.createItem(type, keyPath.slice());
            }
            if (addedRow != null) {
                let transaction = this.params.api.applyTransaction({ add: [addedRow] });
                this.$parent.$parent.rowData.push(addedRow);
                if (transaction.add) {
                    console.log(transaction.add[0]);
                    transaction.add[0].setSelected(true, true);
                }
            }
        },
        isTypePresentInGroup(type, selectedNode) {
            let isTypePresent = false;
            for (let i = 0; i < selectedNode.childrenAfterGroup.length; i++) {
                if (selectedNode.childrenAfterGroup[i].data.typ === type) {
                    isTypePresent = true;
                    break;
                }
            }
            if (selectedNode.data.typ === type && selectedNode.data.label) {
                isTypePresent = true;
            }
            return isTypePresent;
        },
        getPluralTyp(type) {
            if (type === "Aussenfarbdefinition")
                return "Aussenfarbdefinitionen";

            if (type === "CNummerdefinition")
                return "C-Nummerdefinitionenen";

            if (type === "Ausstattungsdefinition")
                return "Ausstattungsdefinitionen";

            if (type === "Datumsdefinition")
                return "Datumsdefinitionen";

            if (type === "Innenausstattungsdefinition")
                return "Innenausstattungsdefinitionen";

            if (type === "Nummernkreisdefinition")
                return "Nummernkreisdefinitionen";

            if (type === "Versandartdefinition")
                return "Versandartdefinitionen";

            if (type === "Verbauvorschriftdefinition")
                return "Verbauvorschriftdefinitionen";

        },
        createItem(type, keyArr) {
            if (type === "Aussenfarbdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr,
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    labelName: "Aussenfarbdefinition",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: type,
                    label: false,
                };
            } else if (type === "CNummerdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr,
                    labelName: "C-Nummerdefinition",
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: type,
                    label: false,
                };
            } else if (type === "Ausstattungsdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr,
                    labelName: "Ausstattungsdefinition",
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: type,
                    label: false,
                };
            } else if (type === "Datumsdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr,
                    labelName: "Datumsdefinition",
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: type,
                    label: false,
                };
            } else if (type === "Innenausstattungsdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr,
                    labelName: "Innenausstattungsdefinition",
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: type,
                    label: false,
                };
            } else if (type === "Nummernkreisdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr,
                    labelName: "Nummernkreisdefinition",
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: type,
                    label: false,
                };
            } else if (type === "Versandartdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr,
                    labelName: "Versandartdefinition",
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: type,
                    label: false,
                };
            } else if (type === "Verbauvorschriftdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr,
                    labelName: "Verbauvorschriftdefinition",
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: type,
                    label: false,
                };
            }
        },

        createLabel(type, keyArr) {
            if (type === "Aussenfarbdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr.concat("Aussenfarbdefinitionen"),
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Außenfarbe",
                    motortyp: "Farbtext",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                };
            } else if (type === "CNummerdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr.concat("C-Nummerdefinitionenen"),
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Cnr",
                    motortyp: "Bezeichnung",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                };
            } else if (type === "Ausstattungsdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr.concat("Ausstattungsdefinitionen"),
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Ausstattungsnr",
                    motortyp: "Bezeichnung",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                };
            } else if (type === "Datumsdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr.concat("Datumsdefinitionen"),
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Von",
                    motortyp: "Bis",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                };
            } else if (type === "Innenausstattungsdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr.concat("Innenausstattungsdefinitionen"),
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Code",
                    motortyp: "Bezeichnung",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                };
            } else if (type === "Nummernkreisdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr.concat("Nummernkreisdefinitionen"),
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Von",
                    motortyp: "Bis",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                };
            } else if (type === "Versandartdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr.concat("Versandartdefinitionen"),
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Nummer",
                    motortyp: "Beschreibung",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                };
            } else if (type === "Verbauvorschriftdefinition") {
                return {
                    id: uuidv4(),
                    produktschluessel: keyArr.concat("Verbauvorschriftdefinitionen"),
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Verbauvorschrift",
                    motortyp: "",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                };
            }
        },


        getSelectedRowData() {
            let selectedNodes = this.gridApi.getSelectedNodes();
            let selectedData = selectedNodes.map((node) => node.data);
            return selectedData;
        },


        determineUsabilityForLabel(type) {
            return this.cellType === type && this.isLabel ? true : false;
        },
        determineUsabilityForItem(type) {
            return this.cellType === type && !this.isLabel ? true : false;
        },
    },
    created() {
    },
    computed: {
        determineUsabilityForTeilvariante() {
            return this.cellType === "Teilvariante" ? true : false;
        },
    }
});