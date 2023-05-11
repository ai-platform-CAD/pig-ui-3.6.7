//JSON数据清洗

import FlowGraph from "../Graph";

//
// interface nodes{
//     name:string,
//     container:{
//         image:any,
//         command:any,
//         args:any,
//     },
//     input:{
//         artifacts:[{
//             name:string,
//             path:string,
//             s3:{
//                 endpoint:any,
//                 bucket:any,
//                 key:any,
//             }
//         }
//         ]
//     },
//     output:{
//         artifacts:[{
//             name:string,
//             path:string,
//             archive:{
//                 none:any,
//             }
//             s3:{
//                 endpoint:any,
//                 bucket:any,
//                 key:any,
//             }
//         }
//         ]
//     }
// }
//
// interface edges{
//     source:any,
//     target:any,
// }


export function clearData(){
    const {graph} = FlowGraph;

    const GJson = graph.toJSON();
    // console.log(GJson)
    let i:number;
    const realedge = [];
    const realnode = [];
    //5个节点，标准化节点数据
    for (let j = 0;j<5;j++)
    {
        realnode.push({
            name:null,
            id:null,
            container:{
                image:null,
                command:null,
                args:null,
            },
            input:{
                artifacts:[{
                    name:null,
                    path:null,
                    s3:{
                        endpoint:null,
                        bucket:null,
                        key:null,
                    }
                }
                ]
            },
            output:{
                artifacts:[{
                    name:null,
                    path:null,
                    archive:{
                        none:null,
                    },
                    s3:{
                        endpoint:null,
                        bucket:null,
                        key:null,
                    }
                }
                ]
            }
        })
    }
    //标准化边的数据
    for (let k = 0;k < 10; k++)
    {
        realedge.push({
            source:null,
            target:null,
        })
    }

    // console.log(GJson.cells)
    let n :number;
    n = 0;
    for (i = 0;i<GJson.cells.length;i++){
        if(GJson.cells[i].shape =='flow-chart-rect'){

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            //节点后加上唯一标识符id
            realnode[i].id = GJson.cells[i].id;
            // realnode[i].name = (GJson.cells[i].attrs.text.text)+(GJson.cells[i].id) ;



            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].name = (GJson.cells[i].attrs.text.text) ;
            // console.log(node[i].name);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].container.image = GJson.cells[i].attrs["edit-container"].containerImage;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].container.command = GJson.cells[i].attrs["edit-container"].commandName;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].container.args = GJson.cells[i].attrs["edit-container"].argsName;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].input.artifacts[0].name = GJson.cells[i].attrs["edit-input"].name
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].input.artifacts[0].path = GJson.cells[i].attrs["edit-input"].path
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].input.artifacts[0].s3.endpoint = GJson.cells[i].attrs["edit-input"].S3.endpoint
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].input.artifacts[0].s3.bucket = GJson.cells[i].attrs["edit-input"].S3.bucket
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].input.artifacts[0].s3.key = GJson.cells[i].attrs["edit-input"].S3.key
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].output.artifacts[0].archive.none = GJson.cells[i].attrs["edit-output"].archive.none
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].output.artifacts[0].name = GJson.cells[i].attrs["edit-output"].name
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].output.artifacts[0].path = GJson.cells[i].attrs["edit-output"].path
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].output.artifacts[0].s3.endpoint = GJson.cells[i].attrs["edit-output"].S3.endpoint
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].output.artifacts[0].s3.bucket = GJson.cells[i].attrs["edit-output"].S3.bucket
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            realnode[i].output.artifacts[0].s3.key = GJson.cells[i].attrs["edit-output"].S3.key
            // console.log(node[i])
        }
        else if (GJson.cells[i].shape == 'edge'){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore

            //正常
            // realedge[n].source = GJson.cells[i].source;
            // realedge[n].target = GJson.cells[i].target;

            //例子
            for (let j =0;j<5;j++){
                if (GJson.cells[i].source.cell == realnode[j].id){
                    realedge[n].source = realnode[j].name
                }
                if(GJson.cells[i].target.cell == realnode[j].id){
                    realedge[n].target = realnode[j].name
                }
            }
            // console.log('000000000000');
            // console.log(realedge[n]);
            // console.log('000000000000');
            n ++;
        }
    }
    //可增加一个判断，输出不为空
    const node = [];
    n = 0;
    for(i = 0; i < realnode.length; i++){
        if (realnode[i].name != null)
        {
            node[n] = realnode[i];
            n ++;
        }
    }
    const edge = [];
    n = 0;
    for (i = 0; i<realedge.length;i++){
        if (realedge[i].source != null){
            edge[n] = realedge[i];
            n ++;
        }
    }
    // console.log("............");
    // console.log({node,edge});
    return({node,edge})
}
