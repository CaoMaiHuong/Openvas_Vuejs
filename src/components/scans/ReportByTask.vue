<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <!-- <th style="width: 30px" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0">Id</th> -->
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('tasks.date') }}</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('tasks.status') }}</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0">Task</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('tasks.severity') }}</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0" style="background:rgb(216, 0, 0)">High</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0" style="background:rgb(255, 165, 0)">Medium</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0" style="background:rgb(135, 206, 235)">Low</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0" style="background:rgb(221, 221, 221)">Log</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0" style="background:rgb(192, 192, 192)">False Pos.</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >{{ $t('action.nameMsg') }}</th>
                        <!-- <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0"></th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="odd" role="row" v-for="(report, index) in reports" :key="index">
                        <!-- <td class="sorting_1">{{user.ID}}</td> -->
                        <td><router-link :to="{ name: 'Báo cáo', params: {id: report['-id'], date:report.report.timestamp}}">{{report.report.timestamp}}</router-link></td>
                        <td>{{report.report.scan_run_status}}</td>
                        <td><router-link :to="{ name: 'Chi tiết tác vụ', params: {id: report.task['-id']}}">{{report.task.name}}</router-link></td>                        
                        <td v-if="report.report.severity.filtered < 0">Error</td>
                        <td v-else>{{report.report.severity.filtered}}</td>
                        <td>{{report.report.result_count.hole.filtered}}</td>
                        <td>{{report.report.result_count.warning.filtered}}</td>
                        <td>{{report.report.result_count.info.filtered}}</td>
                        <td>{{report.report.result_count.log.filtered}}</td>
                        <td>{{report.report.result_count.false_positive.filtered}}</td>
                        <td class="action-edit">
                          <a @click="deleteReport(report['-id'], index)" class="action-delete"> <i class="fa fa-trash" style="margin-right: 5px"></i>{{ $t('action.deleteMsg') }}</a>
                        </td>
                      </tr>
                    </tbody>
                    
                    <tfoot>
                      
                    </tfoot>
                  </table>
                  <div class="pagination">
                    <button class="btn btn-primary" v-on:click="fetchPaginate(1)" :disabled="pagination.page == 1"><i class="fa fa-angle-double-left"></i></button>
                    <button class="btn btn-primary" v-on:click="fetchPaginate(pagination.prev_page)" :disabled="pagination.page == 1"><i class="fa fa-angle-left"></i></button>
                    <span>Trang {{ pagination.page }} / {{ pagination.total_page }} </span>
                    <button class="btn btn-primary" v-on:click="fetchPaginate(pagination.next_page)" :disabled="pagination.page == pagination.total_page"><i class="fa fa-angle-right"></i></button>
                    <button class="btn btn-primary" v-on:click="fetchPaginate(pagination.total_page)" :disabled="pagination.page == pagination.total_page"><i class="fa fa-angle-double-right"></i></button>
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
  props: ['id'],
  data() {
    return {
      reports: [],
      pagination: [],
      page: 1,
      isModalVisible: false
    }
  },
  mounted() {
    this.getReport(this.id)
  },
  methods: {
    getReport(id) {
      axios.get(config.apiUrl + '/reports?filter=task_id=' + id)
      .then(response => {
        // let $this = this
        this.reports = response.data.get_reports_response.report
        // $this.makePagination(response.data)
      })
    },
    deleteReport(id, index) {
      if (confirm('Bạn có chắc chắn muốn xóa?')) {
        axios.delete(config.apiUrl + '/reports/' + id)
        .then(response => {
          this.tasks.splice(index, 1)
        })
      }
    },
    showModal() {
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
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
      this.getReport(page, this.id)
    },
    openModal () {

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
</style>
