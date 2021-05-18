import Vue from 'vue';

export default Vue.extend({
    template: `
        <div>
            <span>{{ value }}</span>
        </div>
    `,
    data() {
        return {
            value: '',
        };
    },
    beforeMount() {
        this.value = (this.params.data && this.params.data.labelName ?
            this.params.data.labelName : this.params.value);
    },
    methods: {
        refresh(params) {
            this.params = params;
            return false;
        },
    },
});