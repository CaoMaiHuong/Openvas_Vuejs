<template>
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <div class="cve-list">
                <h4><router-link :to="{name: 'Cpes'}"><i class="fa fa-list"><span  style="margin-left:5px">{{ $t('cpes.cpeListMsg') }}</span></i></router-link></h4>
            </div>
          </div>
          <div class="box-body">
            <div class="cpe-infomation">
              <h3>{{detail[0].name}}</h3>
                <span>ID: {{detail[0]['-id']}}</span><br>
                <span v-if='detail[0].cpe.title'>{{ $t('cpes.titleMsg') }}: {{detail[0].cpe.title}} <br></span>
                <span v-if='detail[0].cpe.nvd_id!="(null)"'>NVD ID: {{detail[0].cpe.nvd_id}}<br></span>
                <span>{{ $t('createMsg') }}: {{detail[0].creation_time}}</span> <br>
                <span>Last updated: {{detail[0].update_time}}</span><br>
                <span v-if='detail[0].cpe.status!=""'>{{ $t('statusMsg') }}: {{detail[0].cpe.status}} <br></span>
                <span v-if='detail[0].cpe.max_cvss!="(null)"'>{{ $t('severityMsg') }}: {{detail[0].cpe.max_cvss}}</span>
            </div>
            <div class="cpe">
              
              <div>
                <h3>{{ $t('cpes.reportVul') }}</h3>
                <div v-if='reportedVulnerabilites != null'>
                  <div class="col-sm-12 table-responsive">
                    <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                      <thead>
                        <tr role="row">
                          <th style="width: 13%" colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('cpes.nameMsg') }}</th>
                          <th style="width: 7%" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >{{ $t('severityMsg') }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="odd" role="row" v-for="rp in dt.reportedVulnerabilites" :key="rp.cve">
                          <td class="sorting_1">
                            <router-link :to="{ name: 'Chi tiết CVE', params: {name: rp.cve }}">{{rp.cve}}</router-link></td>
                          <td>{{rp.severity}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-else>None</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import config from '../../config'
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
    this.getCpe(this.id)
  },
  methods: {
    getCpe(id) {
      axios.get(config.apiUrl + '/infos?type_info=CPE&name=' + id)
      .then(response => {
        this.detail = response.data.get_info_response.info
        // this.cpeDetail = this.detail.cpe;
      })
    }
  }
}
</script>

<style>

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

</style>
