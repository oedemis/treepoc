
function ActionCellRenderer() { }

ActionCellRenderer.prototype.init = function (params) {
    this.params = params;

    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `
    <div class="dropdown">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" >
            <i class="fa fa-ellipsis-v"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-right">
            <li><a href='#'>Außenfarbdefinition anlegen</a></li>
            <li><a href='#'">Ausstattungsdefinition anlegen</a></li>
            <li><a href='#'>C-Nummerdefinition anlegen</a></li>
        </ul>
    </div>
            `;

    //this.btnClickedHandler = this.btnClickedHandler.bind(this);
    //this.actionsButton.addEventListener('click', this.btnClickedHandler);
}

ActionCellRenderer.prototype.isPopup = function () {
    return true;
}

ActionCellRenderer.prototype.getGui = function () {
    return this.eGui;
}

ActionCellRenderer.prototype.isPopup = function () {
    return false;
}

ActionCellRenderer.prototype.destroy = function () {
    //this.eGui.removeEventListener('click', this.btnClickedHandler);
    $(this.eGui).remove();
}


ActionCellRenderer.prototype.refresh = function () {
    return true;
    //this.eGui.removeEventListener('click', this.btnClickedHandler);
}

/*
ActionCellRenderer.prototype.btnClickedHandler = function (event) {
    //this.params.clicked(this.params.value);
}
*/

export default ActionCellRenderer;