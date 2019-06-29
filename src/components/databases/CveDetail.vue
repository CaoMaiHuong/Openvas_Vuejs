<template>
  <div class="row">
    <div class="col-md-12">
      <div class="box">
        <div class="box-header">
          <div class="cve-list">
              <h4><router-link :to="{name: 'Cves'}"><i class="fa fa-list"><span  style="margin-left:5px">{{ $t('cves.cveListMsg') }}</span></i></router-link></h4>
          </div> 
        </div>
        <div class="box-body">
          <div class="cve-name">
            <h3>{{detail[0].name}}</h3>
              <span>ID: {{detail[0]['-id']}}</span><br>
              <span>{{ $t('publishMsg') }}: {{detail[0].creation_time}}</span> <br>
              <span>{{ $t('modifyMsg') }}: {{detail[0].modification_time}}</span><br>
              <span>{{ $t('lastUpdate') }}: {{detail[0].update_time}}</span><br>
          </div>
          <div class="cve-infomation">
            <div class="cve-description">
              <h3>{{ $t('cves.descripMsg') }}</h3>
              <div>{{detail[0].cve.description}}</div>
            </div>
            <div class="cvss">
              <h3>CVSS</h3>
              <span v-if="cvss != ''"> {{ $t('cves.baseScoreMsg') }}:  {{cvss.score}}</span>
              <span v-else> {{ $t('cves.baseScoreMsg') }}: N/A</span>
              <div v-if="cvss != ''">
                <div><span>Access Vector: {{cvss['access-vector']}}</span></div>
                <div><span>Access Complexity: {{cvss['access-complexity']}}</span></div>
                <div><span>{{ $t('cves.authenticationMsg') }}: {{cvss.authentication}}</span></div>
                <div><span>{{ $t('cves.confidentialityImpactMsg') }}: {{cvss['confidentiality-impact']}}</span></div>
                <div><span>{{ $t('cves.integrityImpactMsg') }}: {{cvss['integrity-impact']}}</span></div>
                <div><span>{{ $t('cves.availabilityImpactMsg') }}: {{cvss['availability-impact']}}</span></div>
              </div>
            </div>
            <div class="references">
              <h3>{{ $t('cves.referMsg')}}</h3>
              <div v-if="refer.length >=2">
                <div v-for="rf in refer" :key="rf.reference['#content']">
                  <span>{{rf.source}} <a v-bind:href="rf.reference['-href']" target="_blank">{{rf.reference['-href']}}</a></span>
                </div>
              </div>
              <div v-else>
                <span>{{refer.source}} <a v-bind:href="refer.reference['-href']" target="_blank">{{refer.reference['-href']}}</a></span>
              </div>
            </div>
            <!-- <div v-if='dt.product != ""'>
              <h3>Vulnerable Products</h3>
              <div><router-link v-for="pr in dt.product" :key="pr" :to="{ name: 'Cve Detail', params: {name: cve }}">{{pr}}<br></router-link></div>
            </div> -->
            <div >
              <!-- <h1>{{vulerableProducts}}</h1> -->
              <div v-if='vulerableProducts != ""'>
                <h3>{{ $t('cves.vulProductMsg') }}</h3>
                <div v-for="(x,index) in vulerableProducts" :key="index">
                  <router-link :to="{ name: 'Chi tiết CPE', params: {id: x}}">{{x}}</router-link>
                </div>
              </div>
              <!-- <div v-if='dt.vulnerableProduct == null'>Không</div> -->
            </div>
            <div class="nvt" v-if="detail[0].cve.nvts != ''">
            <h3>{{ $t('cves.nvtAddressMsg') }}</h3>
            <div v-for="n in detail[0].cve.nvts.nvt" :key="n['-oid']">
              <router-link :to="{ name: 'Chi tiết NVT', params: {id: n['-oid']}}">{{n.name}}<br></router-link></div>
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
  props: ['name'],
  data() {
    return {
      detail: [],
      cvss: [],
      refer: [],
      vulerableProducts: []
    }
  },
  mounted() {
    this.getCve(this.name)
  },
  methods: {
    getCve(name) {
      axios.get('http://112.137.129.225:8088/infos/cve/' + name)
      .then(response => {
        this.detail = response.data.get_info_response.info
        this.refer = response.data.get_info_response.info[0].cve.raw_data.entry.references
        this.vulerableProducts = response.data.get_info_response.info[0].cve.raw_data.entry['vulnerable-software-list'].product
        this.cvss = response.data.get_info_response.info[0].cve.raw_data.entry.cvss.base_metrics
        console.log(this.cvss)
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
