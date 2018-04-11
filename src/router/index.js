import Vue from "vue";
import Router from "vue-router";
import Quote from "@/components/Quote";
import Space from "@/components/Space";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Quote",
      component: Quote
    },
    {
      path: "/space",
      name: "Space",
      component: Space
    }
  ]
});
