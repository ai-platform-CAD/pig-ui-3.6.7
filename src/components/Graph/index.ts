import { Graph, Addon, FunctionExt, Shape } from '@antv/x6';
import './shape';
import graphData from "./data";

export default class FlowGraph {
    public static graph: Graph;
    private static stencil: Addon.Stencil;

    public static init() {
        this.graph = new Graph({
            container: document.getElementById('container')!,
            width: 1000,
            height: 800,
            grid: {
                size: 10,
                visible: true, // 渲染网格背景
                type: 'doubleMesh',
                args: [
                    {
                        color: '#cccccc',
                        thickness: 1,
                    },
                    {
                        color: '#5F95FF',
                        thickness: 1,
                        factor: 4,
                    },
                ],
            },
            //可移动，按住ctrl健
            scroller: {
                enabled: true,
                pageVisible: true,
                pageBreak: true,
                pannable: false,
            },
            mousewheel: {
                enabled: true,
                modifiers: ['ctrl', 'meta'],
                minScale: 0.5,
                maxScale: 2,
            },
            //选中
            selecting: {
                enabled: true,
                multiple: true,
                rubberband: true,
                movable: true,
                showNodeSelectionBox: true,
            },
            //连接点 ConnectionPoint 与锚点 Anchor 共同确定了边的起点或终点
            connecting: {
                anchor: 'center',
                connectionPoint: 'anchor',
                allowBlank: false,
                highlight: true,
                snap: true,
                createEdge() {
                    return new Shape.Edge({
                        attrs: {
                            line: {
                                stroke: '#5F95FF',
                                strokeWidth: 1,
                                targetMarker: {
                                    name: 'classic',
                                    size: 8,
                                },
                            },
                        },
                        router: {
                            name: 'manhattan',
                        },
                    });
                },
                //判断是否连接
                validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
                    if (sourceView === targetView) {
                        return false;
                    }
                    if (!sourceMagnet) {
                        return false;
                    }
                    if (!targetMagnet) {
                        return false;
                    }
                    return true;
                },
            },
            highlighting: {
                magnetAvailable: {
                    name: 'stroke',
                    args: {
                        padding: 4,
                        attrs: {
                            strokeWidth: 4,
                            stroke: 'rgba(223,234,255)',
                        },
                    },
                },
            },
            snapline: true,
            history: true,
            clipboard: {
                enabled: true,
            },
            keyboard: {
                enabled: true,
            },
            //将节点拖入另一个节点
            // embedding: {
            //     enabled: true,
            //     findParent({ node }) {
            //         const bbox = node.getBBox();
            //         return this.getNodes().filter((node) => {
            //             // 只有 data.parent 为 true 的节点才是父节点
            //             const data = node.getData<any>();
            //             if (data && data.parent) {
            //                 const targetBBox = node.getBBox();
            //                 return bbox.isIntersectWithRect(targetBBox);
            //             }
            //             return false;
            //         });
            //     },
            // },
        });
        this.initStencil();
        this.initShape();
        // this.initGraphShape();
        this.initEvent();
        return this.graph;
    }

    private static initStencil() {
        this.stencil = new Addon.Stencil({
            target: this.graph,
            stencilGraphWidth: 280,
            search: { rect: true },
            collapsable: true,
            groups: [
                {
                    name: 'basic',
                    title: '基础节点',
                    graphHeight: 180,
                },
                // {
                //     name: 'combination',
                //     title: '组合节点',
                //     layoutOptions: {
                //         columns: 1,
                //         marginX: 60,
                //     },
                //     graphHeight: 260,
                // },
                // {
                //     name: 'group',
                //     title: '节点组',
                //     graphHeight: 100,
                //     layoutOptions: {
                //         columns: 1,
                //         marginX: 60,
                //     },
                // },
            ],
        });
        const stencilContainer = document.querySelector('#stencil');
        stencilContainer?.appendChild(this.stencil.container);
    }

    private static initShape() {
        const { graph } = this;
        const r1 = graph.createNode({
            shape: 'flow-chart-rect',
            attrs: {
                body: {
                    rx: 24,
                    ry: 24,
                },
                text: {
                    text: 'mnist',
                },
                'edit-container': {
                    "containerImage": 'registry.cn-hangzhou.aliyuncs.com/hrtmiv2xok4kiw/k8s:cpu',
                    "commandName": 'python',
                    "argsName": 'main.py',
                },
                'edit-input': {
                    "name": 'name1',
                    "path": '/app/data',
                    "S3": {
                        "endpoint": 'minio.argo:9000',
                        "bucket": 'sjh-bucket1',
                        "key": 'data',
                    },
                },
                'edit-output': {
                    "name": 'name2',
                    "path": '/app/data/output.pt',
                    "archive": {
                        "none": {}
                    },
                    "S3": {
                        "endpoint": 'minio.argo:9000',
                        "bucket": 'sjh-bucket2',
                        "key": 'output.pt',
                    },
                },
            },
        });
        const r2 = graph.createNode({
            shape: 'flow-chart-rect',
            attrs: {
                text: {
                    "text": 'list',
                },
                'edit-container': {
                    "containerImage": 'alpine:latest',
                    "commandName": 'ls',
                    "argsName": '/data',
                },
                'edit-input': {
                    "name": 'name2',
                    "path": '/data',
                    "S3": {
                        "endpoint": '',
                        "bucket": '',
                        "key": '',
                    },
                },
                'edit-output': {
                    "name": '',
                    "path": '',
                    "archive": {
                        "none": {}
                    },
                    "S3": {
                        "endpoint": '',
                        "bucket": '',
                        "key": '',
                    },
                },
            },
        });
        const r3 = graph.createNode({
            shape: 'flow-chart-rect',
            width: 52,
            height: 52,
            angle: 45,
            attrs: {
                'edit-text': {
                    style: {
                        transform: 'rotate(-45deg)',
                    },
                },
                text: {
                    text: '判断节点',
                    transform: 'rotate(-45deg)',
                },
                'edit-container': {
                    containerImage: 'empty1',
                    commandName: 'empty',
                    argsName: 'empty3',
                },
                'edit-input': {
                    name: 'inputTest1',
                    path: 'inputTest2',
                    S3: {
                        endpoint: 'inTest1',
                        bucket: 'inTest2',
                        key: 'inTest3',
                    },
                },
                'edit-output': {
                    name: 'outputTest1',
                    path: 'outputTest2',
                    archive: {
                        none: {}
                    },
                    S3: {
                        endpoint: 'outTest1',
                        bucket: 'outTest2',
                        key: 'outTest3',
                    },
                },
            },
            ports: {
                groups: {
                    top: {
                        position: {
                            name: 'top',
                            args: {
                                dx: -26,
                            },
                        },
                    },
                    right: {
                        position: {
                            name: 'right',
                            args: {
                                dy: -26,
                            },
                        },
                    },
                    bottom: {
                        position: {
                            name: 'bottom',
                            args: {
                                dx: 26,
                            },
                        },
                    },
                    left: {
                        position: {
                            name: 'left',
                            args: {
                                dy: 26,
                            },
                        },
                    },
                },
            },
        });
        const r4 = graph.createNode({
            shape: 'flow-chart-rect',
            width: 70,
            height: 70,
            attrs: {
                body: {
                    rx: 35,
                    ry: 35,
                },
                text: {
                    text: '节点',
                },
                'edit-container': {
                    containerImage: 'empty1',
                    commandName: 'empty',
                    argsName: 'empty3',
                },
                'edit-input': {
                    name: 'inputTest1',
                    path: 'inputTest2',
                    S3: {
                        endpoint: 'inTest1',
                        bucket: 'inTest2',
                        key: 'inTest3',
                    },
                },
                'edit-output': {
                    name: 'outputTest1',
                    path: 'outputTest2',
                    archive: {
                        none: {}
                    },
                    S3: {
                        endpoint: 'outTest1',
                        bucket: 'outTest2',
                        key: 'outTest3',
                    },
                },
            },
        });

        // const c1 = graph.createNode({
        //     shape: 'flow-chart-image-rect',
        // });
        // const c2 = graph.createNode({
        //     shape: 'flow-chart-title-rect',
        // });
        // const c3 = graph.createNode({
        //     shape: 'flow-chart-animate-text',
        // });

        // const g1 = graph.createNode({
        //     shape: 'groupNode',
        //     attrs: {
        //         text: {
        //             text: 'Group Name',
        //         },
        //     },
        //     data: {
        //         parent: true,
        //     },
        // });
        this.stencil.load([r1, r2, r3, r4], 'basic');
        // this.stencil.load([c1, c2, c3], 'combination');
        // this.stencil.load([g1], 'group');
    }

    //演示实例，节点内容未编辑
    // private static initGraphShape() {
    //     this.graph.fromJSON(graphData as any);
    // }

    private static showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
            ports[i].style.visibility = show ? 'visible' : 'hidden';
        }
    }

    private static initEvent() {
        const { graph } = this;
        const container = document.getElementById('container')!;

        graph.on('node:contextmenu', ({ cell, view }) => {
            console.log(view.container);
            const oldText = cell.attr('text/text') as string;
            cell.attr('text/style/display', 'none');
            const elem = view.container.querySelector('.x6-edit-text') as HTMLElement;
            if (elem) {
                elem.innerText = oldText;
                elem.focus();
            }
            const onBlur = () => {
                cell.attr('text/text', elem.innerText);
            };
            if (elem) {
                elem.addEventListener('blur', () => {
                    onBlur();
                    elem.removeEventListener('blur', onBlur);
                });
            }
        });
        graph.on(
            'node:mouseenter',
            FunctionExt.debounce(() => {
                const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
                this.showPorts(ports, true);
            }),
            500,
        );
        graph.on('node:mouseleave', () => {
            const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
            this.showPorts(ports, false);
        });

        graph.on('node:collapse', ({ node, e }: any) => {
            e.stopPropagation();
            node.toggleCollapse();
            const collapsed = node.isCollapsed();
            const cells = node.getDescendants();
            cells.forEach((n: any) => {
                if (collapsed) {
                    n.hide();
                } else {
                    n.show();
                }
            });
        });
        // backspace
        graph.bindKey('delete', () => {
            const cells = graph.getSelectedCells();
            if (cells.length) {
                graph.removeCells(cells);
            }
        });
    }
}
