<template>
  <div>
    <div id="updateTask" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <span class="modal-header__title">
              Sửa đổi tác vụ
            </span>
            <button type="button" class="close" @click="closeForm()" data-dismiss="modal">&times;</button>  
          </div>
          <div class="modal-body">   
            <form v-on:submit.prevent="updateTask()" class="update-task" style="padding: 0px">
              <div class="form-group">
                <label class="control-label" for="name">{{ $t('tasks.nameMsg') }}</label>
                <input class="form-control" v-model="taskData.name" name="name" v-validate="'required'" type="text">
                <span v-if="errors.has('name')">{{ errors.first('name') }}</span>
              </div>
              <div class="form-group">
                <label class="control-label" for="comment">{{ $t('commentMsg') }}</label>
                <input v-model='taskData.comment' class="form-control" name='comment'>
              </div>
              <div class="form-group">
                <label class="control-label" for='target'>{{ $t('tasks.scanTarget') }}</label>
                <select class="form-control" v-model="taskData.target['-id']">
                  <option class= "choose-target" v-for="t in targets" :key="t['-id']" v-bind:value="t['-id']">{{t.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="control-label" for="alert">{{ $t('tasks.alert') }}</label>
                <select class="form-control" disabled>
                  <option value>Please select one</option>
                </select>
              </div>
              <div class="form-group">
                <label class="control-label" for='schedule'>{{ $t('tasks.schedule') }}</label>
                <select class="form-control" v-model="taskData.schedule['-id']">
                  <option class= "choose-target" v-for="s in schedules" :key="s['-id']" v-bind:value="s['-id']">{{s.name}}</option>
                </select>
              </div>
              <div class="form-group result">
                <label class="control-label" for='in_assets'>{{ $t('tasks.addResult') }}</label>
                <input type="radio" name="in_assets" v-model="taskData.preferences.preference[3].value" value="yes">Có<br>
                <input type="radio" name="in_assets" v-model="taskData.preferences.preference[3].value" style="margin-left: 30px;" value="no">Không<br>
              </div>
              <div class="form-group apply-override">
                <label class="control-label" for='assets_apply_overrides'>{{ $t('tasks.apply') }}</label>
                <input type="radio" name="assets_apply_overrides" v-model="taskData.preferences.preference[4].value" value="yes">Có<br>
                <input type="radio" name="assets_apply_overrides" v-model="taskData.preferences.preference[4].value" style="margin-left: 30px;"  value="no">Không<br>
              </div>
              <div class="form-group assets_min_qod">
                <label class="control-label" for='assets_min_qod'>{{ $t('tasks.minQod') }}</label>
                <input type="number" name="assets_min_qod" v-model="taskData.preferences.preference[5].value"><br>
              </div>
              <div class="form-group alterable-task">
                <label class="control-label" for='alterable'>{{ $t('tasks.alterableTask') }}</label>
                <input type="radio" name="alterable" v-model="taskData.alterable" value="1">Có<br>
                <input type="radio" name="alterable" v-model="taskData.alterable" style="margin-left: 30px;" value="0">Không<br>
              </div>
              <div class="form-group auto-delete">
                <label class="control-label" for='auto_delete'>{{ $t('tasks.delReport.name') }}</label><br>
                <input type="radio" onclick="document.getElementById('dele_data').disabled = true;" name="auto_delete" v-model="taskData.preferences.preference[6].value"  v-bind:value="0" >{{ $t('tasks.delReport.delReport1') }}<br>
                <input type="radio" onclick="document.getElementById('dele_data').disabled = false;" name="auto_delete" v-model="taskData.preferences.preference[6].value"  v-bind:value="1">{{ $t('tasks.delReport.delReport2') }}&nbsp;
                <input type="number" id="dele_data" class="delete-data" v-model="taskData.preferences.preference[7].value" disabled>&nbsp;báo cáo mới nhất<br>
              </div>
              <div class="form-group">
                <label class="control-label" for='scanner'>{{ $t('tasks.scanner') }}</label>
                <select class="form-control" v-model="taskData.scanner['-id']">
                  <option v-bind:value="taskData.scanner['-id']">{{taskData.scanner.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="control-label" for='config'>{{ $t('tasks.scanConfig') }}</label>
                <select class="form-control" v-model="taskData.config['-id']">
                  <option v-bind:value="taskData.config['-id']">{{taskData.config.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="control-label network" for='network'>{{ $t('tasks.networkInterface') }}</label>
                <input type="text" v-model="taskData.preferences.preference[2].value" name="network">
              </div>
              <div class="form-group">
                <label class="control-label" for='hosts_ordering'>{{ $t('tasks.orderTarget') }}</label>
                <select class="form-control" v-model="taskData.hosts_ordering">
                  <option value="sequential">Sequential</option>
                  <option value="random">Random</option>
                  <option value="reverse">Reverse</option>
                </select>
              </div>
              <div class="form-group max_checks">
                <label class="control-label max_checks" for='max_checks'>{{ $t('tasks.maxExecutedNvt') }}</label>
                <input type="number" v-model="taskData.preferences.preference[0].value" name="max_checks"><br>
              </div>
              <div class="form-group max_hosts">
                <label class="control-label max_hosts" for='max_hosts'>{{ $t('tasks.maxScanned') }}</label>
                <input type="number" v-model="taskData.preferences.preference[1].value" name="max_hosts"><br>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" v-if="messageUpdate">{{messageUpdate}}</button>
            <button type="submit" @click="updateTask" class="modal-submit btn btn-primary">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'UpdateTask',
    props: ['taskData'],
    data() {
      return {
        targets: [],
        schedules: [],
        // configs: [],
        messageUpdate: ''
        // // name: '',
        // comment: '',
        // // target: '',
        // alert: '',
        // schedule: '',
        // in_assets: 'yes',
        // assets_apply_overrides: 'yes',
        // assets_min_qod: '70',
        // alterable: '0',
        // auto_delete: 'no',
        // auto_delete_data: '5',
        // scanner: 1,
        // config: 1,
        // network: '',
        // hosts_ordering: 'sequential',
        // max_checks: '4',
        // max_hosts: '20'
      }
    },
    // computed: {
    //   name: {
    //     get() {
    //       return this.task_name
    //     },
    //     set(newValue) {
    //       this.$emit('update:task_name', newValue)
    //     }
    //   }
    // },
    created() {
      this.getTarget()
    },
    mounted() {
      this.getSchedule()
    },
    // beforeMount() {
    //   this.getConfig()
    // },
    methods: {
      getTarget() {
        axios.get('http://112.137.129.225:8088/targets')
        .then(response => {
          this.targets = response.data.get_targets_response.target
        })
      },
      getSchedule() {
        axios.get('http://112.137.129.225:8088/schedules')
        .then(response => {
          this.schedules = response.data.get_schedules_response.schedule
        })
      },
      // beforeCreated() {
      //   this.name = this.taskData.name
      // },
      // computed: {
      //   namee() {
      //     return 'fgdfgfdg'
      //   }
      // },
      // getScanner() {
      //   axios.get('http://localhost:8081/scanners')
      //   .then(response => {
      //     this.scanners = response.data
      //   })
      // },
      // getConfig() {
      //   axios.get('http://localhost:8081/configs')
      //   .then(response => {
      //     this.configs = response.data
      //   })
      // },
      updateTask() {
        this.$validator.validateAll().then(res => {
          if (res) {
            axios({
              method: 'put',
              url: 'http://112.137.129.225:8088/tasks',
              data: {
                task_id: this.taskData['-id'],
                name: this.taskData.name,
                comment: this.taskData.comment,
                target_id: this.taskData.target['-id'],
                // alert: this.taskData.alert,
                schedule_id: this.taskData.schedule['-id'],
                in_assets: this.taskData.in_assets,
                assets_apply_overrides: this.taskData.assets_apply_overrides,
                min_qod: this.taskData.preferences.preference[5].value,
                alterable: this.taskData.alterable,
                auto_delete: this.taskData.preferences.preference[6].value,
                auto_delete_data: this.taskData.preferences.preference[7].value,
                scanner_id: this.taskData.scanner['-id'],
                config_id: this.taskData.config['-id'],
                network: this.taskData.preferences.preference[2].value,
                hosts_ordering: this.taskData.hosts_ordering,
                max_checks: this.taskData.preferences.preference[0].value,
                max_hosts: this.taskData.preferences.preference[1].value
              }
            })
            .then(response => {
              if (response.data.modify_task_response['-status'] === '200') {
                this.messageUpdate = 'Cập nhật tác vụ thành công!'
                location.reload()
              }
            })
          }
        })
      },
      closeForm() {
        this.messageUpdate = ''
      }
    }
  }
</script>
<style>
  #updateTask .form-control{
    display: unset;
    width: 100%;
  } 
  #updateTask .form-group{
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    flex-wrap: wrap;  
  }
  #updateTask label {
    min-width: 125px;
  } 
  #updateTask .modal-body {
    height: 400px;
    overflow: overlay;
    padding: 15px 30px;
    }
    #updateTask .form-group.auto-delete{
      display: unset;
    }
  .result, .apply-override, .alterable-task, .assets_min_qod {
    display: flex;
  }
  .max_checks, .max_hosts, .result label, .apply-override label, .alterable-task label, .network{
    margin-right: 30px;
  }
  .result:last-child, .apply-override input:last-child, .alterable-task input:last-child {
    margin-left: 30px;
  }
</style>
