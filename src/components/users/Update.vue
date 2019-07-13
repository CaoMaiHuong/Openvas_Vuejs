<template>
  <div>
    <div id="updateModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <span class="modal-header__title">
              Tạo mới người dùng
            </span>
            <div>{{userData}}</div>
            <button type="button" @click="closeForm()" class="close" data-dismiss="modal">&times;</button>  
          </div>
          <div class="modal-body">   
              <form v-on:submit.prevent="updateUser(userData.id)" class="create-user" style="padding: 0px">
                <input class="form-control" type="hidden" value="userData.name" name="name">
                <div class="form-group">
                  <label class="control-label" for="name">{{ $t('users.nameMsg') }}</label>
                  <input class="form-control" v-model="userData.name" name="name" v-validate="'required'" type="text">
                  <span v-if="errors.has('name')">{{ errors.first('name') }}</span>
                </div>
                <div class="form-group">
                  <label class="control-label" for="comment">{{ $t('commentMsg') }}</label>
                  <input class="form-control" v-model="userData.comment" name="comment" type="text">
                </div>
                <div class="form-group">
                  <label class="control-label" for='password'>{{ $t('users.passwordMsg') }}</label>
                  <input v-validate="'required|min:6'" v-model="password" name="password" type="password" class="form-control" ref="password">
                  <span v-if="errors.has('password')">{{ errors.first('password') }}</span>
                </div>
                <!-- <div class="form-group">
                  <label class="control-label" for="confirm_password">{{ $t('users.confirmPassword') }}</label>
                  <input v-model='confirm_password' name="confirm_password" v-validate="'required|confirmed:password'" type="password" class="form-control" data-vv-as="password">
                  <span  v-if="errors.has('confirm_password')">{{ errors.first('confirm_password') }}</span>
                </div> -->
                <div class="form-group">
                  <label for='role'>{{ $t('users.roleMsg') }}</label>
                  <select class="form-control" v-model="userData.role['-id']">
                    <option v-for="r in roles" :key="r['-id']" v-bind:value="r['-id']">{{r.name}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="control-label" for="host_allow">{{ $t('users.hostAccessMsg') }}</label>
                  <div class="contentt">
                  <div class="optionn">
                    <input type="radio" name="host_allow" v-model="userData.hosts['-allow']" value="0">{{ $t('users.allowanddeny') }}<br>
                    <input type="radio" name="host_allow" v-model="userData.hosts['-allow']" value="1" style="margin-left: 20px">{{ $t('users.denyandallow') }}<br>
                  </div>
                  <div class="inputcontent">
                    <input v-model="hosts" type="text" name="hosts" class="form-control">
                  </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label" for="iface_allow">{{ $t('users.interface') }}</label>
                  <div class="contentt">
                    <div class="optionn">
                      <input type="radio" name="iface_allow" v-model="userData.ifaces['-allow']" value="0">{{ $t('users.allowanddeny') }}<br>
                      <input type="radio" name="iface_allow" v-model="userData.ifaces['-allow']" value="1" style="margin-left: 20px" >{{ $t('users.denyandallow') }}<br>
                    </div>
                    <div class="inputcontent">
                      <input v-model="ifaces" type="text" name="ifaces" class="form-control">
                    </div>
                  </div>
                </div>
              </form>
          </div>
          <div class="modal-footer">
            <!-- <button class="btn btn-danger" v-if="message">{{message}}</button> -->
            <button class="btn btn-success" v-if="messageUpdate">{{messageUpdate}}</button>
            <button type="submit" @click="updateUser(userData.id)" class="btn btn-primary">Lưu</button>
            <!-- <span v-if="message">{{message}}</span>
            <span v-if="messageUpdate">{{messageUpdate}}</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import config from '../../config'
  export default {
    name: 'Tables',
    props: ['userData', 'oldName'],
    data() {
      return {
        password: '',
        hosts: [],
        ifaces: [],
        roles: [],
        messageUpdate: ''
      }
    },
    created() {
      axios({
        method: 'get',
        url: this.apiUrl + '/roles'
      })
      .then(response => {
        this.roles = response.data.get_roles_response.role
      })
    },
    methods: {
      updateUser(id) {
        this.$validator.validateAll().then(res => {
          if (res) {
            axios({
              method: 'put',
              url: config.apiUrl + '/users',
              data: {
                name: this.oldName,
                new_name: this.userData.name,
                comment: this.userData.comment,
                password: this.password,
                role_ids: this.userData.role['-id'],
                hosts_allow: this.userData.hosts['-allow'],
                hosts: this.hosts,
                ifaces_allow: this.userData.ifaces['-allow'],
                ifaces: this.ifaces
              }
            })
            .then(response => {
              if (response.data.modify_user_response['-status'] === '200') {
                this.messageUpdate = 'Cập nhật thông tin người dùng thành công!'
                this.message = ''
                location.reload()
              }
            })
            .catch((error) => {
              if (error.response.data.Error === 'User with name exists already') {
                this.messageUpdate = 'Tên người dùng đã tồn tại!'
              }
            })
          }
        })
      },
      closeForm() {
        this.message = ''
        this.messageUpdate = ''
      }
    }
  }
</script>
<style>
#updateModal .form-group{
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

#updateModal label{
    min-width: 125px;
}

#updateModal .form-control {
  width: 100%;
}
.optionn {
  display: flex;
}

</style>
