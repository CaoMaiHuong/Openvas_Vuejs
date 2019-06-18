<template>
  <div class="row">
    <div class="col-md-12">
      <div class="box">
        <div class="box-header">
          <div class="target-list">
              <h4><router-link :to="{name: 'Targets'}"><i class="fa fa-list"><span style="margin-left:5px">{{ $t('targets.targetListMsg') }}</span></i></router-link></h4>
          </div>
        </div>
        <div class="box-body">
          <div class="target-name">
            <h3>{{detail.name}}</h3>
            <span>ID: {{detail['-id']}}</span><br>
            <span>{{ $t('createMsg') }}: {{detail.creation_time}}</span> <br>
            <span>{{ $t('modifyMsg') }}: {{detail.modification_time}}</span><br>
          </div>
          <div class="target-infomation">
            <div class="host">
              <h3>Host</h3>
              <span> {{ $t('targets.includedMsg') }}:  {{detail.hosts}}<br></span>
              <span> {{ $t('targets.max_hosts') }}:  {{detail.max_hosts}}<br></span>
              <span v-if='detail.reverse_lookup_only === "0"'> {{ $t('targets.rlOnlyMsg') }}: No<br></span>
              <span v-else> {{ $t('targets.rlOnlyMsg') }}: Yes<br></span>
              <span v-if='detail.reverse_lookup_unify === "0"'> {{ $t('targets.rlUnifyMsg') }}: No<br></span>
              <span v-else> {{ $t('targets.rlUnifyMsg') }}: Yes<br></span>
              <span> {{ $t('targets.aliveTestMsg') }}: {{detail.alive_tests}}<br></span>
              <span> {{ $t('targets.portMsg') }}: {{detail.port_list.name}}</span>
            </div>
            <!-- <div class="tasks-using">
              <h3>{{ $t('targets.tasksMsg') }}</h3>
              <div v-if='dt.task != null'>
                <router-link v-for="t in dt.task" :key="t.id" :to="{ name: 'Task Detail', params: {id: t.id }}">{{t.name}}<br>
                </router-link>
              </div>
              <div v-if='dt.task == null'>None</div>
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
      axios.get('http://112.137.129.225:9009/target/' + id)
      .then(response => {
        this.detail = response.data.get_targets_response.target
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
