<template>
  <div>
    <div id="myModal" class="modal fade create-target" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <span class="modal-header__title">
              Tạo mới target
            </span>
            <button type="button" class="close" data-dismiss="modal" @click="closeForm()">&times;</button>  
          </div>
          <div class="modal-body">   
              <form v-on:submit.prevent="createTarget" class="create-user" style="padding: 0px">
                <div class="form-group">
                  <label class="control-label" for="name">{{ $t('targets.nameMsg') }}</label>
                  <input class="form-control modal-input" v-model="name" name="name" v-validate="'required'" type="text">
                  <span v-if="errors.has('name')" style="display: block">{{ errors.first('name') }}</span>
                </div>
                
                <div class="form-group">
                  <label class="control-label" for="comment">{{ $t('commentMsg') }}</label>
                  <input v-model='comment' class="form-control" name='comment'>
                </div>
                <div class="form-group">
                  <label class="control-label" for='password'>{{ $t('targets.hostMsg') }}</label>
                  <input v-model='hosts' class="form-control" name='host' v-validate="'required'" type="text">
                  <span v-if="errors.has('name')" style="display: block">{{ errors.first('host') }}</span>
                </div>
                <!-- <div class="form-group">
                  <label class="control-label" for="port-list">{{ $t('targets.portMsg') }}</label>
                  <select class="form-control" v-model="port_list_id">
                    <option v-for="p in port" :key="p.id" v-bind:value="p.id">{{p.name}}</option>
                  </select>
                </div> -->
                <div class="form-group">
                  <label class="control-label" for='alivetest'>{{ $t('targets.aliveTestMsg') }}</label>
                  <select class="form-control" v-model="alive_tests">
                    <option>Scan Config Default</option>
                    <option>TCP-ACK Service Ping</option>
                    <option>TCP-SYN Service Ping</option>
                    <option>ARP Ping</option>
                    <option>ICMP & TCP-ACK Service Ping</option>
                    <option> ICMP & ARP Ping</option>
                    <option>TCP-ACK Service & ARP Ping</option>
                    <option>ICMP, TCP-ACK Service & ARP Ping</option>
                    <option>Consider Alive</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="control-label" for='rlonly' style="margin-right: 30px;">{{ $t('targets.rlOnlyMsg') }}</label>
                  <input type="radio" name="reverse-only" v-model="reverse_lookup_only" value = true >Có<br>
                  <input type="radio" name="reverse-only" v-model="reverse_lookup_only" value = false checked style="margin-left: 30px;">Không<br>
                </div>
                <div class="form-group">
                  <label class="control-label" for='rlunify' style="margin-right: 30px;">{{ $t('targets.rlUnifyMsg') }}</label>
                  <input type="radio" name="reverse-unify" v-model="reverse_lookup_unify" value = true >Có<br>
                  <input type="radio" name="reverse-unify" v-model="reverse_lookup_unify" value = false checked style="margin-left: 30px;">Không<br>
                </div>
                
              </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" v-if="messageCreate">{{messageCreate}}</button>
           <button type="submit" @click="createTarget()" class="btn btn-primary button-save">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  // import $ from 'jquery'
  export default {
    name: 'Tables',
    data() {
      return {
        // port: [],
        name: '',
        comment: '',
        hosts: [],
        // port_list_id: '1',
        alive_tests: '',
        reverse_lookup_only: false,
        reverse_lookup_unify: false,
        messageCreate: ''
      }
    },
    // mounted() {
    //   this.getPortList()
    // },
    methods: {
      // getPortList() {
      //   axios.get('http://localhost:8081/portlist')
      //   .then(response => {
      //     this.port = response.data
      //   })
      // },
      createTarget() {
        this.$validator.validateAll().then(res => {
          if (res) {
            axios({
              method: 'post',
              url: 'http://112.137.129.225:9009/targets',
              data: {
                name: this.name,
                comment: this.comment,
                hosts: [this.hosts],
                // port_list_id: 'fd591a34-56fd-11e1-9f27-406186ea4fc5',
                alive_tests: this.alive_tests,
                reverse_lookup_only: this.reverse_lookup_only,
                reverse_lookup_unify: this.reverse_lookup_unify
              }
            })
            .then(response => {
              if (response.data.create_target_response['-status'] === '201') {
                this.messageCreate = 'Tạo target thành công!'
                location.reload()
              }
            })
            .catch((error) => {
              if (error.response.data.Error === 'Target exists already') {
                this.messageCreate = 'Target đã tồn tại!'
              }
            })
          }
        })
      },
      closeForm() {
        this.messageCreate = ''
      }
    }
  }
</script>
<style>
/* .create-target{
  display: flex;
  align-items: center;
} */


.create-target .form-group{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.modal .form-group span{
    color: red;
}
#myModal label{
    min-width: 125px;
}
.modal-header__title{
  font-size: 17px;
  font-weight: 600;
}
</style>
