<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <!-- <div class="box-header">
            <router-link to="/createuser"><i class="fa fa-user-plus" style="margin-right: 3px"></i> CREATE</router-link>
          </div> -->
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>
              <div class="search">
                <form v-on:submit.prevent="searchCves(1)" class="search-form">
                  <input style="width:250px" class="search-content form-control" v-model="search" type="text" name="search" v-validate="'required'" placeholder="Tìm kiếm theo tên">
                  <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                </form>
              </div>
              <div v-if="message" class="not-found">
                {{message}}
                <div>
                  <br>
                  <button @click="returnList" class="btn btn-primary">Xem danh sách CVE</button>
                </div>
              </div>
              <div class="row" v-if="!message">  
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th style="width: 15%" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('cves.nameMsg') }}</th>
                        <th style="width: 11%" colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('cves.vectorMsg') }}</th>
                        <th style="width: 11%" colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('cves.complexityMsg') }}</th>
                        <th style="width: 11%" colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('cves.authenticationMsg') }}</th>
                        <th style="width: 11%" colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('cves.confidentialityImpactMsg') }}</th>
                        <th style="width: 11%" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >{{ $t('cves.integrityImpactMsg') }}</th>
                        <th style="width: 11%" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >{{ $t('cves.availabilityImpactMsg') }}</th>
                        <th style="width: 11%" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >{{ $t('publishMsg') }}</th>
                        <th style="width: 11%" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >{{ $t('severityMsg') }}</th>
                        <!-- <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0"></th> -->
                      </tr>
                    </thead>
                    <tbody v-for="(c,index) in cves" :key="index">
                      <tr class="odd" role="row">
                        <td class="sorting_1" rowspan = "2">
                          <router-link :to="{ name: 'Chi tiết CVE', params: {name: c['-id'] }}">{{c.name}}</router-link>
                        </td>
                         <td>{{c.cve ? c.cve.vector : "N/A"}}</td>
                         <td>{{c.cve ? c.cve.complexity : "N/A"}}</td>
                        <td>{{c.cve ? c.cve.authentication : "N/A"}}</td>
                        <td>{{c.cve ? c.cve.confidentiality_impact : "N/A"}}</td>
                        <td>{{c.cve ? c.cve.integrity_impact : "N/A"}}</td>
                        <td>{{c.cve ? c.cve.availability_impact : "N/A"}}</td>
                        <td>{{c.creation_time}}</td>
                        <td>{{c.cve ? c.cve.cvss : "N/A"}}</td>
                      </tr>
                      <tr class="cve-description" role="row" >
                        <td colspan = "8">{{c.cve ? c.cve.description : "N/A"}}</td>
                      </tr>
                    </tbody>
                    
                    <tfoot>
                      
                    </tfoot>
                  </table>
                  <div class="pagination" v-if="!this.searching">
                    <button class="btn btn-primary" v-on:click="fetchPaginate(1)" :disabled="pagination.page == 1"><i class="fa fa-angle-double-left"></i></button>
                    <button class="btn btn-primary" v-on:click="fetchPaginate(pagination.prev_page)" :disabled="pagination.page == 1"><i class="fa fa-angle-left"></i></button>
                    <span>Trang {{ pagination.page }} / {{ pagination.total_page }} </span>
                    <button class="btn btn-primary" v-on:click="fetchPaginate(pagination.next_page)" :disabled="pagination.page == pagination.total_page"><i class="fa fa-angle-right"></i></button>
                    <button class="btn btn-primary" v-on:click="fetchPaginate(pagination.total_page)" :disabled="pagination.page == pagination.total_page"><i class="fa fa-angle-double-right"></i></button>
                  </div>
                  <div class="pagination" v-if="this.searching">
                    <button class="btn btn-primary" v-on:click="fetchPaginate2(1)" :disabled="pagination.page == 1"><i class="fa fa-angle-double-left"></i></button>
                    <button class="btn btn-primary" v-on:click="fetchPaginate2(pagination.prev_page)" :disabled="pagination.page == 1"><i class="fa fa-angle-left"></i></button>
                    <span>Trang {{ pagination.page }} / {{ pagination.total_page }} </span>
                    <button class="btn btn-primary" v-on:click="fetchPaginate2(pagination.next_page)" :disabled="pagination.page == pagination.total_page"><i class="fa fa-angle-right"></i></button>
                    <button class="btn btn-primary" v-on:click="fetchPaginate2(pagination.total_page)" :disabled="pagination.page == pagination.total_page"><i class="fa fa-angle-double-right"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import $ from 'jquery'
import axios from 'axios'
import config from '../../config'
// Require needed datatables modules
require('datatables.net')
require('datatables.net-bs')

export default {
  name: 'Tables',
  data() {
    return {
      cves: [],
      pagination: [],
      page: 1,
      search: '',
      searching: false,
      message: ''
    }
  },
  mounted() {
    this.getCve()
  },

  methods: {
    getCve() {
      axios.get(config.apiUrl + '/infos?type_info=cve')
      .then(response => {
        this.cves = response.data.get_info_response.info
      })
    },
    searchCves(page) {
      this.$validator.validateAll().then(res => {
        if (res) {
          axios({
            method: 'get',
            url: 'http://localhost:8081/cves/page/' + page + '/search/' + this.search,
            data: {
              search: this.search
            }
          })
          .then(response => {
            if (response.data.records === null) {
              this.message = 'Không tìm thấy kết quả!'
            } else {
              this.message = ''
              let $this = this
              this.cves = response.data.records
              this.searching = true
              $this.makePagination(response.data)
            }
          })
        } else {
          this.getCve(this.page)
        }
      })
    },
    returnList() {
      this.message = ''
      this.getCve(this.page)
      this.search = ''
      this.searching = false
    },
    makePagination(data) {
      let pagination = {
        page: data.page,
        total_page: data.total_page,
        prev_page: data.prev_page,
        next_page: data.next_page
      }
      this.pagination = pagination
    },
    fetchPaginate(page) {
      this.getCve(page)
    },
    fetchPaginate2(page) {
      this.searchCves(page)
    }
  }
}
</script>

<style>

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: '\f0dc';
}

table.dataTable thead .sorting_asc:after {
  content: '\f0dd';
}

table.dataTable thead .sorting_desc:after {
  content: '\f0de'
}
.pagination{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px
}
.pagination span{
  margin: 0px 10px
}
.cve-description {
  background-color: #f9f9f9;
}
</style>
