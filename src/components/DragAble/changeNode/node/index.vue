<template>
  <el-tabs>
    <el-tab-pane>
      <el-row align="middle">
        <el-col :span="8">name</el-col>
        <el-col :span="14">
          <el-input v-model="tempForm.nodeName" style="width: 100%" @change="onNameChange"></el-input>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>

  <div class="monitorTop">
    <el-tabs>
      <el-space wrap>
        <el-card v-for="i in 1" :key="i" class="box-card" style="width: 250px">
          <div class="card-header">
            <span style="font-size: x-large" >container</span>
          </div>
          <div class="text item" style="line-height: 200%">
            <el-form
                ref="ruleFormRef"
                :model="tempForm"
                status-icon
                :rules="rules"
                class="demo-ruleForm"
            >
              <el-form-item label="image" prop="containerImage">
                <el-input
                    style="width: 100%" v-model="tempForm.containerImage" @change="onContainerChange"
                    autocomplete="off"
                ></el-input>
              </el-form-item>

            </el-form>

          </div>
          <div class="text item" style="line-height: 200%">
            command
            <el-input style="width: 100%" v-model="tempForm.commandName" @change="onCommandChange"></el-input>
          </div>
          <div class="text item" style="line-height: 200%">
            args
            <el-input style="width: 100%" v-model="tempForm.argsName" @change="onArgsChange"></el-input>
          </div>
        </el-card>
      </el-space>
    </el-tabs>
    <el-tabs >
      <el-space wrap>
        <el-card v-for="i in 1" :key="i" class="box-card" style="width: 250px" >
          <div class="card-header">
            <span style="font-size: x-large" >input</span>
          </div>
          <div class="text item" style="line-height: 200%" >
            name
            <el-input style="width: 100%" v-model="tempForm.inputName" @change="onInputName" ></el-input>
          </div>
          <div class="text item" style="line-height: 200%">
            path
            <el-input style="width: 100%" v-model="tempForm.inputPath" @change="onInputPath"></el-input>
          </div>
          <div class="text item" style="line-height: 200%">
            <div class="card-header">
              <span style="font-size: x-large" >S3</span>
            </div>
            <div class="text item" style="line-height: 200%">
              endpoint
              <el-input style="width: 100%" v-model="tempForm.inputS3endpoint" @change="onInputS3endpoint"></el-input>
            </div>
            <div class="text item" style="line-height: 200%">
              bucket
              <el-input style="width: 100%" v-model="tempForm.inputS3bucket" @change="onInputS3buket"></el-input>
            </div>
            <div class="text item" style="line-height: 200%">
              key
              <el-input style="width: 100%" v-model="tempForm.inputS3key" @change="onInputS3key"></el-input>
            </div>
          </div>
        </el-card>
      </el-space>
    </el-tabs>
    <el-tabs>
      <el-space wrap>
        <el-card v-for="i in 1" :key="i" class="box-card" style="width: 250px">
          <div class="card-header">
            <span style="font-size: x-large" >output</span>
          </div>
          <div class="text item" style="line-height: 200%" >
            name
            <el-input style="width: 100%" v-model="tempForm.outputName"  @change="onOutputName"></el-input>
          </div>
          <div class="text item" style="line-height: 200%">
            path
            <el-input style="width: 100%" v-model="tempForm.outputPath" @change="onOutputPath"></el-input>
          </div>
          <div class="text item" style="line-height: 200%">
            archive
            <el-input style="width: 100%" v-model="tempForm.outputArchive" @change="onOutputArchive"></el-input>
          </div>
          <div class="text item" style="line-height: 200%">
            <div class="card-header">
              <span style="font-size: x-large" >S3</span>
            </div>
            <div class="text item" style="line-height: 200%">
              endpoint
              <el-input style="width: 100%" v-model="tempForm.outputS3endpoint" @change="onOutputS3bucket"></el-input>
            </div>
            <div class="text item" style="line-height: 200%">
              bucket
              <el-input style="width: 100%" v-model="tempForm.outputS3bucket" @change="onOutputS3bucket"></el-input>
            </div>
            <div class="text item" style="line-height: 200%">
              key
              <el-input style="width: 100%" v-model="tempForm.outputS3key" @change="onOutputS3key"></el-input>
            </div>
          </div>
        </el-card>
      </el-space>
    </el-tabs>
  </div>


</template>

<script lang="ts">
import { defineComponent, inject, watch , ref, reactive,UnwrapRef} from 'vue';
import { Cell } from '@antv/x6';
import {nodeOpt} from "./method"

interface tempData {
  nodeName: any;
  containerImage:any;
  commandName:any;
  argsName:any;
  inputName:any;
  inputPath:any;
  inputS3endpoint:any;
  inputS3bucket:any;
  inputS3key:any;
  outputName:any;
  outputPath:any;
  outputArchive:any;
  outputS3endpoint:any;
  outputS3bucket:any;
  outputS3key:any;
}

export default defineComponent({
  name: 'inDex',

  setup(props,context) {
    const globalGridAttr: any = inject('globalGridAttr');
    // console.log('111111111111111111111111');
    // console.log(globalGridAttr);
    //
    // console.log('111111111111111111111111');
    const id: any = inject('id');
    // console.log('8888888888',id);
    let curCel: Cell;
    console.log()
    const tempForm:UnwrapRef<tempData> = reactive({
      nodeName:null,
      containerImage:null,
      commandName:null,
      argsName:null,
      inputName:null,
      inputPath:null,
      inputS3endpoint:null,
      inputS3bucket:null,
      inputS3key:null,
      outputName:null,
      outputPath:null,
      outputArchive:null,
      outputS3endpoint:null,
      outputS3bucket:null,
      outputS3key:null,
    })

    //标准化，然后将数据放进去，作为验证表单

    const ruleFormRef = ref(null)
    const rules = reactive({
      containerImage: [
        { required: 'true', message: '不能为空', trigger: 'blur' }
      ]
    });



    watch(
        [() => id.value],
        () => {
          curCel = nodeOpt(id, globalGridAttr);
          tempForm.nodeName = globalGridAttr.nodeName;
          tempForm.containerImage = globalGridAttr.containerImage;
          tempForm.commandName = globalGridAttr.commandName;
          tempForm.argsName = globalGridAttr.argsName;
          tempForm.inputName = globalGridAttr.inputName;
          tempForm.inputPath = globalGridAttr.inputPath;
          tempForm.inputS3endpoint = globalGridAttr.inputS3endpoint;
          tempForm.inputS3bucket = globalGridAttr.inputS3bucket;
          tempForm.inputS3key = globalGridAttr.inputS3key;
          tempForm.outputName = globalGridAttr.outputName;
          tempForm.outputPath = globalGridAttr.outputPath;
          tempForm.outputArchive = globalGridAttr.outputArchive;
          tempForm.outputS3endpoint = globalGridAttr.outputS3endpoint;
          tempForm.outputS3bucket = globalGridAttr.outputS3bucket;
          tempForm.outputS3key = globalGridAttr.outputS3key;
          //

          // console.log(globalGridAttr.nodeName);
          // console.log(globalGridAttr.containerImage);
          // console.log(globalGridAttr.commandName);
          // console.log(globalGridAttr.argsName);
        },
        {
          immediate: true,
          deep: true,
        },
    );



    const onNameChange = () =>{
      const val = tempForm.nodeName;
      console.log(val);
      console.log('8888888888');
      globalGridAttr.nodeName = val;
      curCel?.attr('text/text',val);
    }

    const onContainerChange = () =>{
      const val = tempForm.containerImage;

      globalGridAttr.containerImage = val;
      curCel?.attr('edit-container/containerImage',val);
      console.log(globalGridAttr.containerImage);
      console.log('8888888888');
    }

    const onCommandChange = () =>{
      const val = tempForm.commandName;
      console.log(val);
      console.log('8888888888');
      globalGridAttr.commandName = val;
      curCel?.attr('edit-container/commandName',val);
    }

    const onArgsChange = () =>{
      const val = tempForm.argsName;
      console.log(val);
      console.log('8888888888');
      globalGridAttr.argsName = val;
      curCel?.attr('edit-container/argsName',val);
    }

    const onInputName = () =>{
      const val = tempForm.inputName;
      // console.log(val);
      // console.log('8888888888');
      globalGridAttr.inputName = val;
      curCel?.attr('edit-input/name',val);
    }


    const onInputPath = () =>{
      const val = tempForm.inputPath;
      globalGridAttr.inputPath = val;
      curCel?.attr('edit-input/path',val);
    }

    const onInputS3endpoint = () =>{
      const val = tempForm.inputS3endpoint;
      globalGridAttr.inputinputS3endpointS3 = val;
      curCel?.attr('edit-input/S3/endpoint',val);
    }

    const onInputS3buket = () =>{
      const val = tempForm.inputS3bucket;
      globalGridAttr.inputS3bucket = val;
      curCel?.attr('edit-input/S3/bucket',val);
    }

    const onInputS3key = () =>{
      const val = tempForm.inputS3key;
      globalGridAttr.inputS3key = val;
      curCel?.attr('edit-input/S3/key',val);
    }
    const onOutputName = () =>{
      const val = tempForm.outputName;
      globalGridAttr.outputName = val;
      curCel?.attr('edit-output/name',val);
    }

    const onOutputPath = () =>{
      const val = tempForm.outputPath;
      globalGridAttr.outputPath = val;
      curCel?.attr('edit-output/path',val);
    }

    const onOutputArchive = () =>{
      const val = tempForm.outputArchive;
      globalGridAttr.outputArchive = val;
      curCel?.attr('edit-output/archive/none',val);
    }

    const onOutputS3endpoint = () =>{
      const val = tempForm.outputS3endpoint;
      globalGridAttr.outputS3endpoint = val;
      curCel?.attr('edit-output/S3',val);
    }

    const onOutputS3bucket = () =>{
      const val = tempForm.outputS3bucket;
      globalGridAttr.outputS3bucket = val;
      curCel?.attr('edit-output/S3/bucket',val);
    }

    const onOutputS3key = () =>{
      const val = tempForm.outputS3key;
      globalGridAttr.outputS3key = val;
      curCel?.attr('edit-output/S3/key',val);
    }

    return {
      globalGridAttr,
      onNameChange,
      tempForm,
      onContainerChange,
      onCommandChange,
      onArgsChange,
      onInputName,
      onInputPath,
      onInputS3endpoint,
      onInputS3buket,
      onInputS3key,
      onOutputName,
      onOutputPath,
      onOutputArchive,
      onOutputS3endpoint,
      onOutputS3bucket,
      onOutputS3key,

      ruleFormRef,

      rules,
    };
  },
});
</script>

<style lang="less" scoped>

.monitorTop {
  position: relative;
  /*vw是width of view(port)的缩写；
100vw表示百分之百的视图宽度；
123px是需要减去的宽度；
减号的两边必须都有至少一个空格*/
  height: calc(100% - 123px);
}

.monitorTop .el-tabs__item {
  font-size: 17px !important;
}
</style>
