<template>
  <div class="row">
    <div class="col-md-12">
      <div class="box">
        <div class="box-header">
          <div class="target-list">
              <h4><router-link :to="{name: 'Tác vụ'}"><i class="fa fa-list"><span style="margin-left:5px">{{ $t('tasks.taskListMsg') }}</span></i></router-link></h4>
          </div>
        </div>
        <div class="box-body">
          <div class="task-name">
            <h3>Tác vụ: {{detail.name}}</h3>
            <span>ID: {{detail['-id']}}</span><br>
            <span>{{ $t('createMsg') }}: {{detail.creation_time}}</span> <br>
            <span>{{ $t('modifyMsg') }}: {{detail.modification_time}}</span><br>
            <span>Owner: {{detail.owner.name}}</span><br>
          </div>
          <br><br>
          <div class="task-infomation">
            <div>
              <span> {{ $t('tasks.nameMsg') }}:  {{detail.name}}<br></span>
              <span> {{ $t('commentMsg') }}:  {{detail.comment}}<br></span>
              <span v-if='detail.alterable === "0"'> {{ $t('tasks.alterableTask') }}: No<br></span>
              <span v-else> {{ $t('tasks.alterableTask') }}: Yes<br></span>
              <span> {{ $t('statusMsg') }}: {{detail.status}}<br></span>
            </div>
            <div class="target">
              <h3>Target</h3>
              <span><router-link :to="{ name: 'Chi tiết Target', params: {id: detail.target['-id']}}">{{detail.target.name}}</router-link></span>
            </div>
            <div class="scannerr">
              <h3>Scanner</h3>
              <span> Name: {{detail.scanner.name}}<br></span>
              <span> Type: {{detail.name}}<br></span>
              <span> Scan Config: {{detail.config.name}}<br></span>
              <span> Order for target hosts: {{detail.hosts_ordering}}<br></span>
              <span> Network Source Interface: {{detail.preferences.preference[2].value}}<br></span>
            </div>
            <div class="assets">
              <h3>Assets</h3>
              <span v-if="detail.preferences.preference[3].value === 'yes'"> Add to Assets: Có<br></span>
              <span v-else> Add to Assets: Không<br></span>
              <span v-if="detail.preferences.preference[4].value === 'yes'"> Apply to Overrides: Có<br></span>
              <span v-else> Apply to Overrides: Không<br></span>
              <span> Min QoD: {{detail.preferences.preference[5].value}}<br></span>
            </div>
            <div class="schedulee">
              <h3>Schedule</h3>
              <span> Name:  {{detail.schedule.name}}<br></span>
              <span> Next:  {{detail.schedule.next_time}}<br></span>
            </div>
            <!-- <div class="scan">
              <h3>Scan</h3>
              <span> Duration of last Scan:  {{detail.name}}<br></span>
              <span> Average Scan duration:  {{detail.name}}<br></span>
              <span> Auto delete Reports:  {{detail.preferences.preference[2].value}}<br></span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import axios from 'axios'
import config from '../../config'
// Require needed datatables modules

export default {
  name: 'Tables',
  props: ['id'],
  data() {
    return {
      detail: []
    }
  },
  mounted() {
    this.getTarget(this.id)
  },
  methods: {
    getTarget(id) {
      axios.get(config.apiUrl + '/tasks/' + id)
      .then(response => {
        this.detail = response.data.get_tasks_response.task
      })
    }
  }
}
</script>

<style>

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

</style>
