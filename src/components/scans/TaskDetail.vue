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
            <div class="assets">
              <h3>Assets</h3>
              <span> Add to Assets: {{detail.name}}<br></span>
              <span> Apply to Overrides: {{detail.name}}<br></span>
              <span> Min QoD: {{detail.name}}<br></span>
            </div>
            <div class="scan">
              <h3>Scan</h3>
              <span> Duration of last Scan:  {{detail.name}}<br></span>
              <span> Average Scan duration:  {{detail.name}}<br></span>
              <span> Auto delete Reports:  {{detail.name}}<br></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import axios from 'axios'
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
      axios.get('http://112.137.129.225:9009/tasks/' + id)
      .then(response => {
        this.detail = response.data.get_tasks_response.task
      })
    }
  }
}
</script>

<style>
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.

   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

</style>
