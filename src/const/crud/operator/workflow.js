export const tableOption = {
    align: "center",
    index: true,
    border: true,
    column: [{
        prop: "workflowId",
        type: "input",
        label: "工作流ID",
        width: 400,
        addDisplay: false,
        editDisabled: true,
        overHidden: true
    }, {
        prop: "workflowName",
        type: "input",
        label: "工作流名称",
        width: 300,
        addDisplay: true,
        editDisabled: false
    }, {
        prop: "data",
        type: "input",
        label: "DATA数据",
        addDisplay: true,
        editDisabled: false,
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