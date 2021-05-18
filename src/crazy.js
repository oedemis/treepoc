updateAllChildrens(teilvariante, newKey, oldKey) {
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
}