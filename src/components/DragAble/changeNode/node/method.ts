import FlowGraph from "../../../Graph";
export function nodeOpt(id: any, globalGridAttr: any) {
    let curCel: any = null;
    if (id.value) {
        const { graph } = FlowGraph;
        const cell = graph.getCellById(id.value);
        if (!cell || !cell.isNode()) {
            return;
        }
        curCel = cell;
        // console.log('888888888888888888888888888888888888');
        // console.log(cell);
        // console.log('888888888888888888888888888888888888');
        globalGridAttr.nodeName = cell.attr('text/text');
        globalGridAttr.containerImage = cell.attr('edit-container/containerImage');
        globalGridAttr.commandName = cell.attr('edit-container/commandName');
        globalGridAttr.argsName = cell.attr('edit-container/argsName');
        globalGridAttr.inputName = cell.attr('edit-input/name');
        globalGridAttr.inputPath = cell.attr('edit-input/path');
        globalGridAttr.inputS3endpoint = cell.attr('edit-input/S3/endpoint');
        globalGridAttr.inputS3bucket = cell.attr('edit-input/S3/bucket');
        globalGridAttr.inputS3key = cell.attr('edit-input/S3/key');
        globalGridAttr.outputName = cell.attr('edit-output/name');
        globalGridAttr.outputPath = cell.attr('edit-output/path');
        globalGridAttr.outputArchive = cell.attr('edit-output/archive/none');
        globalGridAttr.outputS3endpoint = cell.attr('edit-output/S3/endpoint');
        globalGridAttr.outputS3bucket = cell.attr('edit-output/S3/bucket');
        globalGridAttr.outputS3key = cell.attr('edit-output/S3/key');


        // globalGridAttr.nodeStroke = cell.attr('body/stroke');
        // globalGridAttr.nodeStrokeWidth = cell.attr('body/strokeWidth');
        // globalGridAttr.nodeFill = cell.attr('body/fill');
        // globalGridAttr.nodeFontSize = cell.attr('text/fontSize');
        // globalGridAttr.nodeColor = cell.attr('text/fill');
        // globalGridAttr.nodeUsers = cell.attr('approve/users');
    }
    return curCel;
}
