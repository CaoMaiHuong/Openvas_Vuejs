<template>
  <!-- Main content -->
  <section class="content">
    <!-- GitHub hint -->
    <div class="row">
      <!-- Info boxes -->
      <router-link to="/nvts">
      <div class="col-md-4 col-sm-6 col-xs-12">
        <info-box color-class="bg-aqua"
                  title="NVT"
                  text="NVTs"
                  :number = nvttotal></info-box>
      </div>
      </router-link>
      <!-- /.col -->
      <router-link to="/cves">
      <div class="col-md-4 col-sm-6 col-xs-12">
        <info-box color-class="bg-red"
                  title="CVE"
                  text="CVES"
                  :number= cvetotal></info-box>
      </div>
      </router-link>
      <!-- /.col -->
      <!-- fix for small devices only -->
      <div class="clearfix visible-sm-block"></div>
      <router-link to="/cpes">
      <div class="col-md-4 col-sm-6 col-xs-12">
        <info-box color-class="bg-green"
                  title="CPE"
                  text="CPES"
                  :number= cpetotal></info-box>
      </div>
      </router-link>
      <!-- /.col -->
      <!-- <router-link to="/users">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-yellow"
                  :icon-classes="['ion', 'ion-ios-people-outline']"
                  text="New Members"
                  :number="userNumbers"></info-box>
      </div>
      </router-link> -->
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <div class="col-xs-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title"></h3>
          <div class="box-body">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>NVTs theo độ nghiêm trọng (Tổng: {{nvttotal}})</strong>
              </p>
              <canvas id="nvtbyseverity"></canvas>
            </div>
            <hr class="visible-xs-block">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>CVEs theo độ nghiêm trọng (Tổng: {{cvetotal}})</strong>
              </p>
              <canvas id="cvebyseverity"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- Main row -->
    <!-- /.row -->
  </section>
  <!-- /.content -->
</template>

<script>
// import Chart from 'chart.js'
import Alert from '../widgets/Alert'
import InfoBox from '../widgets/InfoBox'
import ProcessInfoBox from '../widgets/ProcessInfoBox'
import axios from 'axios'
import config from '../../config'
export default {
  name: 'Dashboard',
  components: {
    Alert,
    InfoBox,
    ProcessInfoBox
  },
  data () {
    return {
      users: [],
      dashboards: [],
      cvetotal: 0,
      nvttotal: 0,
      cpetotal: 0,
      // high: '',
      // medium: '',
      // low: '',
      generateRandomNumbers (numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      }
    }
  },
  beforeCreate() {
    axios
    .get(config.apiUrl + '/infos?type_info=cpe')
    .then(response => {
      this.cpetotal = response.data.get_info_response.info_count['#content']
      // return this.dashboards
    })
  },
  beforeMount() {
    axios
    .get(config.apiUrl + '/infos?type_info=nvt')
    .then(response => {
      this.nvttotal = response.data.get_info_response.info_count['#content']
      // this.$nextTick(() => {
      //   var pieChartCanvas = document.getElementById('nvtbyseverity').getContext('2d')
      //   var pieConfig = {
      //     type: 'pie',
      //     data: {
      //       labels: ['Cao', 'Trung bình', 'Thấp', 'Đã lưu vết', 'N/A'],
      //       datasets: [{
      //         data: [response.data.high.Int64, response.data.medium.Int64, response.data.low.Int64, response.data.log.Int64, response.data.na.Int64],
      //         backgroundColor: ['rgb(216, 0, 0)', 'rgb(255, 165, 0)', 'rgb(135, 206, 235)', 'rgb(192, 192, 192)', 'rgb(119, 111, 110)'],
      //         hoverBackgroundColor: ['rgb(216, 0, 0)', 'rgb(255, 165, 0)', 'rgb(135, 206, 235)', 'rgb(192, 192, 192)', 'rgb(119, 111, 110)']
      //       }]
      //     },
      //     options: {
      //       responsive: true,
      //       maintainAspectRatio: !this.isMobile,
      //       legend: {
      //         position: 'bottom',
      //         display: true
      //       }
      //     }
      //   }
      //   new Chart(pieChartCanvas, pieConfig) // eslint-disable-line no-new
      // })
    })
  },
  computed: {
    coPilotNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    personalNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    isMobile () {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    },
    userNumbers () {
      return this.users
    }
  },
  mounted () {
    axios
    .get(config.apiUrl + '/infos?type_info=cve')
    .then(response => {
      this.cvetotal = response.data.get_info_response.info_count['#content']
      // this.$nextTick(() => {
      //   var pieChartCanvas = document.getElementById('cvebyseverity').getContext('2d')
      //   var pieConfig = {
      //     type: 'pie',
      //     data: {
      //       labels: ['Cao', 'Trung bình', 'Thấp', 'Đã lưu vết', 'N/A'],
      //       datasets: [{
      //         data: [response.data.high.Int64, response.data.medium.Int64, response.data.low.Int64, response.data.log.Int64, response.data.na.Int64],
      //         backgroundColor: ['rgb(216, 0, 0)', 'rgb(255, 165, 0)', 'rgb(135, 206, 235)', 'rgb(192, 192, 192)', 'rgb(119, 111, 110)'],
      //         hoverBackgroundColor: ['rgb(216, 0, 0)', 'rgb(255, 165, 0)', 'rgb(135, 206, 235)', 'rgb(192, 192, 192)', 'rgb(119, 111, 110)']
      //       }]
      //     },
      //     options: {
      //       responsive: true,
      //       maintainAspectRatio: !this.isMobile,
      //       legend: {
      //         position: 'bottom',
      //         display: true
      //       }
      //     }
      //   }

      //   new Chart(pieChartCanvas, pieConfig) // eslint-disable-line no-new
      // })
    })
  }
}
</script>
<style>
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.info-box-number {
  font-size: 30px;
}
.info-box-title{
  margin-top: .67em;
  font-weight: 600;
}
.fullCanvas {
  width: 100%;
}
body{
  font-size: 15px;
}
</style>
