<template>
  <div class="private-room">
    <!-- user -->
    <div class="profile flex-grow">
      <h2 class="profile__title">Profile Settings</h2>
      <!-- profile settings -->
      <form class="profile__form" @submit.prevent="submitUserForm" autocomplete="off">
        <div class="profile__form-photo">
          <!-- photo of user-->
          <img class="photo-user" :src="userImage" alt="photo" >
          <!-- links -->
          <div class="photo-buttons-block">
            <label for="update" class="update-label">Upload</label>
            <input id="update" class="update-photo" type="file" @change="changeAvatar($event)" />
            <input class="delete-photo" type="button" value="Delete" @click="delAvatar" />
          </div>
        </div>
        <!-- inputs -->
        <div class="profile__form-data">
          <!-- name -->
          <div class="form-block">
            <span class="form-block__name">Name</span>
            <input class="form-block__input"
                   :class="{'error-input': $v.name.$error}"
                   @blur="$v.name.$touch()"
                   v-model="name"
                   type="text"
                   name="name" />
          </div>
          <div class="form-buttons-block">
            <button type="submit" class="save-button">Save</button>
            <div class="form-buttons-block__drop" appShow>
              <button class="delete-account" @click="delAccount">Delete Your Account</button>
              <div class="confirmation">
                <span class="confirmation__title">Are you sure?</span>
                <div class="confirmation__buttons">
                  <button class="confirmation__buttons-item">yes</button>
                  <button class="confirmation__buttons-item">no</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required} from 'vuelidate/lib/validators';
  import { eventChangedProfile } from '../main.js'
  import { firestore } from '../main.js'
  import firebase from 'firebase';
  export default {
    data(){
      return{
        name: '',
      }
    },
    computed: {
      userName() {
        return this.$store.state.userName;
      },
      userImage() {
        console.log('this.$store.state.userImage', this.$store.state.userImage);
        return this.$store.state.userImage;
      },
    },
    validations:{
      name: {
        required,
      },
    },
    methods:{
      changeAvatar(event){
        const ref = firebase.storage().ref();
        const metadata = {
          contentType: event.target.files[0].type
        };
        const task = ref.child(event.target.files[0].name).put(event.target.files[0], metadata);
        task
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then((url) => {
            this.$store.state.userImage = url;
          })
          .catch(console.error);
      },
      delAvatar(){
        this.$store.state.userImage = '';
      },
      delAccount(){
        const user = firebase.auth().currentUser;
        const path = `users/${user.uid}`;
        user.delete().catch(function(error) {
          console.log(error);
        });
        this.$router.push('/');
      },
      submitUserForm(){
        console.log('this.$store.state.user', this.$store.state.userProfile);
        this.$store.state.userProfile.updateProfile({
          displayName: this.name,
          photoURL: this.$store.state.userImage
        }).catch(error => console.log(error));
        eventChangedProfile.$emit('updateProfile', {userName: this.name});
      }
    },
    created: function (){
      this.name = this.$store.state.userName;
    }
  }
</script>


<style lang="scss">
  .profile{
    padding: 45px 0 93px 50px;
    &__title{
      font-size: 36px;
      font-weight: 500;
      color: #000000;
    }
    &__form{
      display: flex;
    }
    &__form-photo{
      width: 12%;
    }
    &__form-data {
      margin-top: 47px;
      padding-left: 43px;
      width: 70.6%;
    }
  }

  .photo-user{
    display: block;
    margin-top: 51px;
    margin-bottom: 4px;
    margin-left: auto;
    margin-right: auto;
    height: 80px;
    width: 80px;
    background-color: #D8D8D8;
    border-radius: 50%;
  }

  .update-photo{
    position: absolute;
    left: -99999px;
  }

  .update-label{
    display: inline-block;
    font-size: 10px;
    font-weight: 500;
    color: #E84F3C;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .delete-photo{
    margin-right: 4px;
    display: inline-block;
    font-size: 10px;
    font-weight: 500;
    color: #000000;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .form-block{
    margin-bottom: 21px;
    width: 100%;
    &__name{
      margin-bottom: 10px;
      display: block;
      font-size: 18px;
      color: #000000;
      font-weight: 500;
    }
    &__input{
      padding-left: 10px;
      width: 100%;
      height: 40px;
      border: 1px solid #000000;
      border-radius: 3px;
    }
  }

  .form-buttons-block{
    margin-top: 43px;
    display: flex;
    justify-content: space-between;
  }

  .form-buttons-block__drop{
    position: relative;
  }

  .confirmation{
    opacity: 0;
    overflow: hidden;
  }

  .open{
    .confirmation{
      position: absolute;
      top: 45px;
      padding: 10px;
      width: 105px;
      text-align: center;
      background-color: rgba(232, 79, 60, 0.75);
      border-radius: 2px;
      opacity: 1;
      overflow: visible;
      transition: all .3s ease;
      &:after{
        content: " ";
        margin-left: 8px;
        position: absolute;
        bottom: 100%;
        left: 50%;
        height: 0;
        width: 0;
        border: solid transparent;
        border-color: rgba(136, 183, 213, 0);
        border-bottom-color: rgba(232, 79, 60, 0.75);
        border-width: 17px;
        pointer-events: none;
      }
    }
  }


  .confirmation__title{
    font-size: 12px;
    color: #fff;
  }

  .confirmation__buttons{
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: center;
  }

  .confirmation__buttons-item{
    width: 25px;
    height: 15px;
    border: 1px solid #fff;
    border-radius: 3px;
    font-size: 10px;
    color: #fff;
    transition: all .3s ease;
    &:hover{
      border-color: black;
      color: black;
      transition: all .3s ease;
    }
  }

  .save-button {
    margin-left: -7px;
    width: 100px;
    height: 25px;
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
    text-align: center;
    line-height: 25px;
    border-radius: 20px;
    background-color: #E84F3C;
    transition: all .5s ease;
    &:hover{
      text-decoration: underline;
    }
  }

  .delete-account{
    width: 100px;
    height: 25px;
    border: 1px solid #979797;
    border-radius: 20px;
    font-size: 7px;
    font-weight: 500;
    color: #BDBBBD;
    transition: all .5s ease;
    &:hover{
      background-color: #E84F3C;
      color: #FFFFFF;
      transition: all .5s ease;
      border-color: #fff ;
    }
  }

  .photo-buttons-block{
    margin-top: 10px;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1250px) {
    .photo-buttons-block{
      padding: 0;
    }
  }

  @media (max-width: 768px) {

    .photo-buttons-block{
      margin-top: 20px;
    }

    .update-label{
      font-size: 18px;
    }

    .delete-photo{
      font-size: 18px;
    }

    .profile__form{
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .profile{
      padding-left: 0;
    }

    .profile__form-photo{
      width: 30%;
    }

    .profile__title{
      text-align: center;
    }

    .profile__form-data{
      padding-left: 0;
      width: 90%;
    }
  }

  @media (max-width: 480px) {
    .profile__form-photo{
      width: 40%;
    }

  }
</style>
