<template>
  <div class="container">
    <h1>Client</h1>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="message.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      //{{message.text}}
    </b-alert>

    <form @submit.prevent="editClient(clientEdit)" v-if="edit">
      <h3>Edit client</h3>
      <input type="text" class="form-control my-2" placeholder="First Name" v-model="clientEdit.firstName">
      <input type="text" class="form-control my-2" placeholder="Last Name" v-model="clientEdit.lastName">
      <input type="text" class="form-control my-2" placeholder="Email" v-model="clientEdit.email">
      <input type="text" class="form-control my-2" placeholder="Phone Number" v-model="clientEdit.phoneNumber">
      <input type="text" class="form-control my-2" placeholder="Address" v-model="clientEdit.address">
      <b-button class="btn-warning my-2 mx-2" type="submit">Edit</b-button>
      <b-button class="my-2" type="submit" @click="edit = false">Cancel</b-button>
    </form>

    <form @submit.prevent="addClient()" v-if="!edit">
      <h3>Add new client</h3>
      <input type="text" class="form-control my-2" placeholder="First Name" v-model="client.firstName">
      <input type="text" class="form-control my-2" placeholder="Last Name" v-model="client.lastName">
      <input type="text" class="form-control my-2" placeholder="Email" v-model="client.email">
      <input type="text" class="form-control my-2" placeholder="Phone Number" v-model="client.phoneNumber">
      <input type="text" class="form-control my-2" placeholder="Address" v-model="client.address">
      <b-button class="btn-success my-2 btn-block" type="submit">Add</b-button>
    </form>

    <hr>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">firstName</th>
          <th scope="col">lastName</th>
          <th scope="col">email</th>
          <th scope="col">phoneNumber</th>
          <th scope="col">address</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in clients" :key="index">
          <th scope="row">{{item._id}}</th>
          <td>{{item.firstName}}</td>
          <td>{{item.lastName}}</td>
          <td>{{item.email}}</td>
          <td>{{item.phoneNumber}}</td>
          <td>{{item.address}}</td>
          <td>
            <b-button @click="deleteClient(item._id)" 
              class="btn-danger btn-sm mx-2">Delete
            </b-button>
            <b-button @click="editAct(item._id)" 
              class="btn-warning btn-sm">Edit
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clients: [],
      dismissSecs: 5,
      dismissCountDown: 0,
      message: {color: '', text: ''},
      client: { firstName: '', 
                lastName: '',
                email: '',
                phoneNumber: '',
                address: ''
                },
      edit: false,
      clientEdit: {}
    }
  },
  created(){
    this.listClients();
  },
  methods: {
    alert(){
      this.message.color = 'danger';
      this.message.text = 'testing alert';
      this.showAlert();
    },
    listClients(){
      this.axios.get('/client')
        .then(res => {
          console.log(res.data);
          this.clients = res.data;
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    addClient(){
      this.axios.post('/new-client', this.client)
        .then(res => {
          this.clients.push(res.data)
          this.client.firstName = ''; 
          this.client.lastName = '';         
          this.client.email = ''; 
          this.client.phoneNumber = '';
          this.client.address = '';
          this.message.color = 'success';
          this.message.text = 'Client added successfully';
          this.showAlert();
          console.log(this.client)
        })
        .catch(e => {
          console.log(e.response);
          if(e.response.data.error.errors.firstName.message){
            this.message.text = e.response.data.error.errors.firstName.message
          }else{
            this.message.text = 'System Error';
          }
          this.message.color = 'danger';
          this.showAlert()
        })
    },
    deleteClient(id){
      console.log(id);
      this.axios.delete(`/client/${id}`)
        .then(res => {
          const index = this.clients.findIndex(item => item._id === res.data._id);
          this.clients.splice(index, 1);
          this.message.color = 'success';
          this.message.text = 'Client Deleted';
          this.showAlert();
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    editAct(id){
      this.edit = true;
      console.log(id);
      this.axios.get(`/client/${id}`)
        .then(res => {
          this.clientEdit = res.data;
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    editClient(item){
      this.axios.put(`/client/${item._id}`, item)
        .then(res => {
          const index = this.clients.findIndex(n => n._id === res.data._id);
          this.clients[index].firstName = res.data.firstName;
          this.clients[index].lastName = res.data.lastName;
          this.clients[index].email = res.data.email;
          this.clients[index].phoneNumber = res.data.phoneNumber;
          this.clients[index].address = res.data.address;
          this.message.color = 'success';
          this.message.text = 'Client edited successfully';
          this.showAlert();
          this.edit = false;
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>