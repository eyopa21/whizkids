export default function() {

    const selectedd = ref([])

    function select(selected, checkBox, selectAllCheckBox, datas, theData, key) {
        console.log("selecting from composble")


        if (checkBox[key].checked && !selected.includes(theData)) {
            selected.push(theData)
            if (selected.length == datas.length) selectAllCheckBox.checked = true

        } else if (checkBox[key].checked == false && selected.includes(theData)) {
            selectAllCheckBox.checked = false
            selected = selected.filter(data => data !== theData)


        }

        selectedd.value = selected
    }
    const selectAll = (selected, checkBox, selectAllCheckBox, datas) => {
        console.log("select all from composble", arguments)


        if (selectAllCheckBox.checked) {
            //console.log(checkBox.value[4])

            selected.length = 0
            checkBox.forEach((checkBoxx, key) => {

                checkBoxx.checked = true
                selected.push(datas[key].id)
            })
        } else if (!selectAllCheckBox.checked) {
            checkBox.forEach(checkBoxx => {
                checkBoxx.checked = false
            })
            selectedd.value = []
        }
    }
    return {
        selected: selectedd,
        select,
        selectAll
    }
}