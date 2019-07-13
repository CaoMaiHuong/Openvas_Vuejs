<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <button data-toggle="modal" class="btn btn-primary" data-target="#createUser" @click="showModal"><i class="fa fa-plus" style="margin-right: 3px"></i> {{ $t('action.createMsg') }}</button>
            <modal
              v-show="isModalVisible"
            />
          </div>
          <!-- /.box-header -->
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
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('users.nameMsg') }}</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('users.roleMsg') }}</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('users.hostAccessMsg') }}</th>
                        <th  colspan="1" rowspan="1" aria-controls="example1" tabindex="0">{{ $t('users.authMsg') }}</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >{{ $t('action.nameMsg') }}</th>
                        <!-- <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0"></th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="length > 1">
                        <tr v-for="(us,index) in users" :key="index">
                          <td>{{us.name}}</td>
                          <td>{{us.role ? us.role.name: ''}}</td>
                          <td v-if="us.hosts && us.hosts['-allow'] === '0'">Allow all</td>
                          <td v-else>Deny all</td>
                          <!-- <td>{{us.ifaces ? us.ifaces['-allow']: 'N/A'}}</td> -->
                          <td v-if="us.ifaces && us.ifaces['-allow'] === '0'">Local</td>
                          <td class="action-edit">
                            <updatemodal v-show="isModalVisible" :userData="modalData" :oldName="oldName" />                    
                            <a data-toggle="modal" data-target="#updateModal" @click="showUpdateModal(us)" style="margin-right: 20px"><i class="fa fa-pencil" style="margin-right: 5px"></i>{{ $t('action.editMsg') }}</a>
                            <a @click="deleteUser(us['-id'], index)" class="action-delete"> <i class="fa fa-trash" style="margin-right: 5px"></i>{{ $t('action.deleteMsg') }}</a>
                          </td>
                        </tr>
                      </template>
                      <tr v-else>
                        <td>{{users.name}}</td>
                        <td>{{users.role ? users.role.name: ''}}</td>
                        <td v-if="users.hosts && users.hosts['-allow'] === '0'">Allow all</td>
                        <td v-else>Deny all</td>
                        <td v-if="users.ifaces && users.ifaces['-allow'] === '0'">Local</td>
                        <!-- <td>{{users.ifaces ? users.ifaces['-allow']: 'N/A'}}</td> -->
                        <td class="action-edit">
                          <updatemodal v-show="isModalVisible" :userData="modalData" :oldName="oldName" />                    
                          <a data-toggle="modal" data-target="#updateModal" @click="showUpdateModal(users)" style="margin-right: 20px"><i class="fa fa-pencil" style="margin-right: 5px"></i>{{ $t('action.editMsg') }}</a>
                          <a @click="deleteUser(users['-id'], index)" class="action-delete"> <i class="fa fa-trash" style="margin-right: 5px"></i>{{ $t('action.deleteMsg') }}</a>
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
import modal from './Create.vue'
import updatemodal from './Update.vue'
import axios from 'axios'
import config from '../../config'
// Require needed datatables modules
require('datatables.net')
require('datatables.net-bs')

export default {
  name: 'Tables',
  components: {
    modal,
    updatemodal
  },
  data() {
    return {
      users: [],
      length: 0,
      pagination: [],
      page: 1,
      isModalVisible: false,
      modalData: null
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      axios.get(config.apiUrl + '/users')
      .then(response => {
        this.users = response.data.get_users_response.user
        this.length = response.data.get_users_response.user.length
        console.log(Object.keys(this.users).length)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    showModal() {
      this.isModalVisible = true
    },
    showUpdateModal(item) {
      this.isModalVisible = true
      this.modalData = item
      this.oldName = item.name
    },
    deleteUser: function(id, index) {
      if (confirm('Bạn có chắc chắn muốn xóa?')) {
        axios.delete(config.apiUrl + '/users', {data: {user_id: id}})
        .then(response => {
          this.users.splice(index, 1)
        })
      }
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
      this.getUser(page)
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
.pagination button {
  border-radius: 0px;
  margin: 2px;
  background: none;
  border:1px solid blue;
  color: blue;
  font-size: 16px;
  width: 37px;
  font-weight: bold;

}
</style>
