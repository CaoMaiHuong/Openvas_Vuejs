<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <div class="cve-list">
                <h4><router-link :to="{name: 'Nvts'}"><i class="fa fa-list"><span  style="margin-left:5px">{{ $t('nvts.nvtListMsg') }}</span></i></router-link></h4>
            </div>
          </div>
          <div class="box-body">
            <div class="nvt-name">
              <h3>NVT: {{detail[0].nvt.name}}</h3>
                <span>ID: {{detail[0].nvt['-oid']}}</span><br>
                <span>{{ $t('publishMsg') }}: {{detail[0].nvt.creation_time}}</span> <br>
                <span>{{ $t('lastUpdate') }}: {{detail[0].nvt.modification_time}}</span><br>
            </div>
            <div class="nvt-infomation">
              <div class="nvt-summary" v-if='tagItem.summary!=null'>
                <h3>{{ $t('nvts.summaryMsg') }}</h3>
                <div>{{tagItem.summary}}</div>
              </div>
              <div class="scoring">
                  <h3>{{ $t('nvts.scoring.name') }}</h3>
                  <span> {{ $t('nvts.scoring.base') }}:  {{detail[0].nvt.cvss_base}}<br></span>
                  <span v-if='tagItem.cvss_vector!=null'> {{ $t('nvts.scoring.baseVector') }}: {{tagItem.cvss_vector}}</span>
              </div>
              <div class="insight" v-if='tagItem.insight!=null'>
                  <h3>{{ $t('nvts.insightMsg') }}</h3>
                  <span> {{tagItem.insight}}</span>
              </div>
              <div class="detection" v-if='tagItem.vuldetect!=null'>
                  <h3>{{ $t('nvts.detecMsg.name') }}</h3>
                  <div>{{tagItem.vuldetect}}</div>
                  <span> {{ $t('nvts.detecMsg.qod') }}:  {{tagItem.qod_type}}&nbsp;({{detail[0].nvt.qod.value}})</span>
              </div>
              <div class="affected" v-if='tagItem.affected!=null'>
                  <h3>{{ $t('nvts.affectMsg') }}</h3>
                  <span> {{tagItem.affected}}</span>
              </div>
              <div class="impact" v-if='tagItem.impact!=null'>
                  <h3>{{ $t('nvts.impactMsg') }}</h3>
                  <span> {{tagItem.impact}}</span>
              </div>
              <div class="solution" v-if='tagItem.solution!=null || tagItem.solution_type!=null'>
                  <h3>{{ $t('nvts.solutionMsg') }}</h3>
                  <span v-if='tagItem.solution_type!=null'> {{ $t('nvts.solutionType') }}: {{tagItem.solution_type}}<br></span>
                  <span> {{tagItem.solution}}</span>
              </div>
              <div class="family">
                  <h3>{{ $t('nvts.familyMsg') }}</h3>
                  <span> {{detail[0].nvt.family}}</span>
              </div>
              <div class="references">
                <h3>{{ $t('nvts.refer') }}</h3>
                <div v-if='cve_id != null'>
                  <span>CVE</span><br>
                  <router-link v-for="(c,index) in cve_id" :key="index" :to="{ name: 'Chi tiết CVE', params: {name: c }}">{{c}}<br>
                  </router-link>
                </div>
                <div v-if='xrefs != null'>
                  <span>{{ $t('nvts.otherMsg') }}</span>
                  <div> 
                    <div v-for="(x,index) in xrefs" :key="index"> 
                      <a v-bind:href=x target="_blank">{{x}}<br></a>
                    </div>
                  </div>
                </div>
              </div>
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
      detail: [],
      tags: [],
      tagItem: [
        {
          summary: '',
          cvss_vector: '',
          qod_type: '',
          vuldetect: '',
          insight: '',
          impact: '',
          affected: '',
          solution: '',
          solution_type: ''
        }
      ],
      xrefs: [],
      cve_id: []
    }
  },
  mounted() {
    this.getNvt(this.id)
  },
  methods: {
    getNvt(id) {
      axios.get('http://112.137.129.225:8088/infos/nvt/' + id)
      .then(response => {
        this.detail = response.data.get_info_response.info
        this.tags = response.data.get_info_response.info[0].nvt.tags.split('|')
        for (var k = 0; k < this.tags.length; k++) {
          var subinfo = this.tags[k].split('=')
          if (subinfo[0] === 'qod_type') {
            this.tagItem.qod_type = subinfo[1]
          }
          switch (subinfo[0]) {
            case 'qod_type':
              this.tagItem.qod_type = subinfo[1]
              break
            case 'cvss_base_vector':
              this.tagItem.cvss_vector = subinfo[1]
              break
            case 'summary':
              this.tagItem.summary = subinfo[1]
              break
            case 'vuldetect':
              this.tagItem.vuldetect = subinfo[1]
              break
            case 'insight':
              this.tagItem.insight = subinfo[1]
              break
            case 'impact':
              this.tagItem.impact = subinfo[1]
              break
            case 'affected':
              this.tagItem.affected = subinfo[1]
              break
            case 'solution':
              this.tagItem.solution = subinfo[1]
              break
            case 'solution_type':
              this.tagItem.solution_type = subinfo[1]
              break
          }
        }
        this.xrefs = response.data.get_info_response.info[0].nvt.xrefs.split(',')
        for (var i = 0; i < this.xrefs.length; i++) {
          this.xrefs[i] = this.xrefs[i].trim()
          this.xrefs[i] = this.xrefs[i].replace('URL:', '')
        }
        this.cve_id = response.data.get_info_response.info[0].nvt.cve_id.split(',')
        if (response.data.get_info_response.info[0].nvt.cve_id === 'NOCVE') {
          this.cve_id = null
        }
        // for (var j = 0; j < this.cve_id.length; j++) {
        //   if (this.cve_id[i] === 'NOCVE') {
        //     this.cve_id[i] = null
        //   }
        // }
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
