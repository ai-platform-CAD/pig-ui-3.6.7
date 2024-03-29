export const tableOption = {
    align: "center",
    index: true,
    border: true,
    column: [{
        prop: "imageId",
        type: "input",
        label: "镜像ID",
        width: 200,
        addDisplay: false,
        editDisabled: true,
        overHidden: true
    }, {
        prop: "tag",
        type: "input",
        label: "镜像TAG",
        width: 200,
        addDisplay: true,
        editDisabled: false
    }, {
        prop: "size",
        type: "input",
        label: "镜像大小",
        addDisplay: false,
        editDisabled: true,
        overHidden: true
    }],
    gutter: 0,
    stripe: true,
    menuBtn: true,
    emptyBtn: true,
    emptyText: "清空",
    menuAlign: "center",
    submitBtn: true,
    indexLabel: "序号",
    indexWidth: 100,
    labelWidth: 100,
    submitText: "提交",
    labelSuffix: "：",
    menuPosition: "center",
    labelPosition: "left",
    searchMenuSpan: 6
}