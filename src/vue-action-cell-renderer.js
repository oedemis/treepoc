import Vue from 'vue';
import {
    flattenChildrenRecursively,
} from "../varianten.js";

export default Vue.extend({
    template: `
    <div style="width: 100%" class="btn-group"">
        <button type="button" class="btn btn-default" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" >
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
            <button class="dropdown-item" type="button"><i class="fa fa-cube"></i>&nbsp;&nbsp;Ausstattungsdefinition Anlegen</button>
            <button @click="deleteLabelDto()" class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Ausstattungsdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Ausstattungsdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Ausstattungsdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Aussenfarbdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-pencil"></i>&nbsp;&nbsp;Außenfarbdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Außenfarbdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Aussenfarbdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Außenfarbdefinition Löschen</button>
        </div>


        <div v-else-if="determineUsabilityForLabel('CNummerdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-globe"></i>&nbsp;&nbsp;C-Nummerdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;C-Nummerdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('CNummerdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;C-Nummerdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Datumsdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-calendar"></i>&nbsp;&nbsp;Datumsdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Datumsdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Datumsdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Datumsdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Innenausstattungsdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-building"></i>&nbsp;&nbsp;Innenausstattungsdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Innenausstattungsdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Innenausstattungsdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Innenausstattungsdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Nummernkreisdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-list-ol"></i>&nbsp;&nbsp;Nummernkreisdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Nummernkreisdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Nummernkreisdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Nummernkreisdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Verbauvorschriftdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-balance-scale"></i>&nbsp;&nbsp;Verbauvorschriftdefinition Anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Verbauvorschriftdefinition Löschen</button>
        </div>
        <div v-else-if="determineUsabilityForItem('Verbauvorschriftdefinition')" class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Verbauvorschriftdefinition Löschen</button>
        </div>

        <div v-else-if="determineUsabilityForLabel('Versandartdefinition')" class="dropdown-menu dropdown-menu-right">
        <button class="dropdown-item" type="button"><i class="fa fa-envelope-square"></i>&nbsp;&nbsp;Versandartdefinition Anlegen</button>
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
            //this.setMood(params);
        },

        setMood(params) {
            // this.mood = params.value;
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
            //const items = this.getRowsToRemove(selectedNode);
            //this.params.api.applyTransaction({ remove: items });

            var selectedData = this.params.api.getSelectedRows()[0];
            var res = this.params.api.applyTransaction({ remove: selectedData.varianten });
            var res = this.params.api.applyTransaction({ remove: [selectedData] });

            console.log(this.$parent.rowData);

            let newRowData = this.$parent.rowData.filter(row => {
                return row !== selectedData;
            });
            this.$parent.rowData = newRowData;

            //this.params.api.refreshCells();

            //this.$emit('delete', 'deleted :)');
            //selectedData[0].parent = selectedData[0].parent.varianten.filter(element => element.id === selectedData[0].id)

            //this.params.data.find(element => element.typ == type);

            //const item = this.params.data.varianten.find(element => element.typ == type);
            // if teilvariante delete all childs 
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
            /**
               * If Teilvariante einfach adden
               * Ansonsten suche die Dto und adde es zu den Label
               */

            // Optimieren für unterpunkte
            //type = this.cellType;

            const item = this.params.data.varianten.find(element => element.typ == type);
            let addedRow = null;
            // root
            if (item === null || item === undefined) {
                addedRow = this.createLabel(type);
                //this.params.data.varianten.push(addedRow);
            } else {
                addedRow = this.createItem(type);
                //item.varianten.push(addedRow);
            }
            this.$parent.$parent.onCreateDto(addedRow);
            //console.log([this.params.data]);
            // this.params.api.applyTransaction({ add: flattenChildrenRecursively([this.params.data]) });
        },

        createItem(type) {
            if (type === "Aussenfarbdefinition") {
                return {
                    produktschluessel: type,
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: type,
                    label: false,
                    varianten: [],
                };
            } else if (type === "CNummerdefinition") {
                return {
                    produktschluessel: "C-Nummerdefinition",
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: "CNummerdefinition",
                    label: false,
                    varianten: [],
                };
            } else if (type === "Ausstattungsdefinition") {
                return {
                    produktschluessel: type,
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: "CNummerdefinition",
                    label: false,
                    varianten: [],
                };
            } else if (type === "Datumsdefinition") {
                return {
                    produktschluessel: type,
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: "Datumsdefinition",
                    label: false,
                    varianten: [],
                };
            } else if (type === "Innenausstattungsdefinition") {
                return {
                    produktschluessel: type,
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: "Innenausstattungsdefinition",
                    label: false,
                    varianten: [],
                };
            } else if (type === "Nummernkreisdefinition") {
                return {
                    produktschluessel: type,
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: "Nummernkreisdefinition",
                    label: false,
                    varianten: [],
                };
            } else if (type === "Versandartdefinition") {
                return {
                    produktschluessel: type,
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: "Versandartdefinition",
                    label: false,
                    varianten: [],
                };
            } else if (type === "Verbauvorschriftdefinition") {
                return {
                    produktschluessel: type,
                    vonmodelljahr: "+ (enthält)",
                    bismodelljahr: "",
                    motortyp: "",
                    getriebetyp: "und",
                    typ: "Verbauvorschriftdefinition",
                    label: false,
                    varianten: [],
                };
            }
        },

        createLabel(type) {
            if (type === "Aussenfarbdefinition") {
                return {
                    produktschluessel: "Aussenfarbdefinitionen",
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Außenfarbe",
                    motortyp: "Farbtext",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                    varianten: [],
                };
            } else if (type === "CNummerdefinition") {
                return {
                    produktschluessel: "C-Nummerdefinitionen",
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Cnr",
                    motortyp: "Bezeichnung",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                    varianten: [],
                };
            } else if (type === "Ausstattungsdefinition") {
                return {
                    produktschluessel: "Ausstattungsdefinitionen",
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Ausstattungsnr",
                    motortyp: "Bezeichnung",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                    varianten: [],
                };
            } else if (type === "Datumsdefinition") {
                return {
                    produktschluessel: "Datumsdefinitionen",
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Von",
                    motortyp: "Bis",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                    varianten: [],
                };
            } else if (type === "Innenausstattungsdefinition") {
                return {
                    produktschluessel: "Innenausstattungsdefinitionen",
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Code",
                    motortyp: "Bezeichnung",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                    varianten: [],
                };
            } else if (type === "Nummernkreisdefinition") {
                return {
                    produktschluessel: "Nummernkreisdefinitionen",
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Von",
                    motortyp: "Bis",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                    varianten: [],
                };
            } else if (type === "Versandartdefinition") {
                return {
                    produktschluessel: "Versandartdefinitionen",
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Nummer",
                    motortyp: "Beschreibung",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                    varianten: [],
                };
            } else if (type === "Verbauvorschriftdefinition") {
                return {
                    produktschluessel: "Verbauvorschriftdefinitionen",
                    vonmodelljahr: "Operator",
                    bismodelljahr: "Verbauvorschrift",
                    motortyp: "",
                    getriebetyp: "Verknüpfung",
                    typ: type,
                    label: true,
                    varianten: [],
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
        //this.setMood(this.params);
    },
    computed: {
        determineUsabilityForTeilvariante() {
            return this.cellType === "Teilvariante" ? true : false;
        },
        isDisabled: function () {
            return !this.farbeRoot;
        }
    }
});