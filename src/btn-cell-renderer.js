/*class ButtonCellEditor {
    init(params) {
        //<i className="fa fa-reply reply-button"/>

        this.container = document.createElement("<button><i class='fa fa-ellipsis-v'></i></button>");
        this._createTable(params);
        this._registerApplyListener();
        this.params = params;
    }

}*/


function BtnCellRenderer() { }

BtnCellRenderer.prototype.init = function (params) {
    this.params = params;

    this.eGui = document.createElement("div");
    this.eGui.innerHTML = "<i class='fa fa-ellipsis-v'></i>";

    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.eGui.addEventListener('click', this.btnClickedHandler);
}

BtnCellRenderer.prototype.getGui = function () {
    return this.eGui;
}

BtnCellRenderer.prototype.isPopup = function () {
    return true;
}

BtnCellRenderer.prototype.destroy = function () {
    this.eGui.removeEventListener('click', this.btnClickedHandler);
}

BtnCellRenderer.prototype.btnClickedHandler = function (event) {
    this.params.clicked(this.params.value);
}

export default BtnCellRenderer;


/*
import Vue from "vue";

export default Vue.extend({
    template: `
        <button @click="btnClickedHandler()><i class='fa fa-ellipsis-v'></i></button>
      `,
    methods: {
        btnClickedHandler() {
            this.params.clicked(this.params.value);
        }
    },
});
*/


import Vue from 'vue';

export default Vue.extend({
    template: '<img width="20px" :src="imgForMood" />',
    data() {
        return {
            mood: 'Happy',
            imgForMood: null,
        };
    },
    methods: {
        refresh(params) {
            this.params = params;
            this.setMood(params);
        },

        setMood(params) {
            this.mood = params.value;
            this.imgForMood =
                'https://www.ag-grid.com/example-assets/smileys/' +
                (this.mood === 'Happy' ? 'happy.png' : 'sad.png');
        },
    },
    created() {
        this.setMood(this.params);
    },
});