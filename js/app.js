Vue.component('camera', {
  props: {
    validation : Boolean,
    selected:{
      type: Array
    },
    camera: {
      type: Object,
    },
    warning: {
      type : Object,
      default: function(){
        var i = _.findIndex(this.selected, (cameraSelected)=>cameraSelected.uid == this.camera.uid.toString() );
        if (i>-1) {
          console.log('Time:',this.selected[i].end_services)
          var d = new Date(this.selected[i].end_services*1000);
          var date = d.getDate();
          var month = d.getMonth() + 1;
          var year = d.getFullYear();
          var t = date + "."+ month + "." + year;
          console.log(t);
          return {
            description: this.selected[i].description,
            end_services: t,
            next_service_id: this.selected[i].next_service_id,
            days: this.selected[i].days,
          }
        }
        else return {};
      }
    }
  },
  methods: {
    isUsedCamera(){
      return -1 < _.findIndex(this.selected, (cameraSelected)=>cameraSelected.uid == this.camera.uid.toString() );
    },
    isWarning(){
      if (this.isUsedCamera()) {
        return {color: 'red'};
      } else {
        return {};
      }
    }
  },
  template: '#camera',
});
var app = new Vue({
  el: '#app',
  data(){
    return {
      message: "Hello. It is start =)"
    }
  },
  methods: {
  },
  created() {
  },
})