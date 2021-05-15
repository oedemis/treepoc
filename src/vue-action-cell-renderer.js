import Vue from 'vue';

export default Vue.extend({
    template: `
    <div class="btn-group"">
        <button type="button" class="btn btn-default" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" >
            <i class="fa fa-ellipsis-v"></i>
        </button>
        <div class="dropdown-menu dropdown-menu-right">
            <button v-show="determineUsabilityForTeilvariante" class="dropdown-item" type="button"><i class="fa fa-trash"></i>&nbsp;&nbsp;Fahrzeugdefinition löschen</button>
            <div v-show="determineUsabilityForTeilvariante" class="dropdown-divider"></div>
            <button class="dropdown-item" type="button"><i class="fa fa-pencil"></i>&nbsp;&nbsp;Außenfarbdefinition anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-cube"></i>&nbsp;&nbsp;Ausstattungsdefinition anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-globe"></i>&nbsp;&nbsp;C-Nummerdefinition anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-calendar"></i>&nbsp;&nbsp;Datumsdefinition anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-building"></i>&nbsp;&nbsp;Innenausstattungsdefinition anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-list-ol"></i>&nbsp;&nbsp;Nummernkreisdefinition anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-balance-scale"></i>&nbsp;&nbsp;Verbauvorschriftdefinition anlegen</button>
            <button class="dropdown-item" type="button"><i class="fa fa-envelope-square"></i>&nbsp;&nbsp;Versandartdefinition anlegen</button>
        </div>
    </div>
    `,
    data() {
        return {
            cellType: null,
            isLabel: false,
            isShown: false,
        };
    },
    beforeMount() {
        // this.params contains the cell & row information and is made available to this component at creation time
        // see ICellRendererParams below for more details
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
    },
    created() {
        //this.setMood(this.params);
    },
    computed: {
        determineUsabilityForTeilvariante() {
            return this.cellType === "Teilvariante" ? true : false;
        },
    }
});