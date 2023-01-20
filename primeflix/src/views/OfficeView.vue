<template>
    <div id="office">
      <div class="container-fluid">
        <div class="row">
          <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar">
            <div class="position-sticky pt-3 pannel sidebar-sticky">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <span class="nav-link" @click="setComponent('Dashboard')">
                    <font-awesome-icon icon="fa-solid fa-house" />
                    Dashboard
                  </span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" @click="setComponent('Orders')">
                    <font-awesome-icon icon="fa-solid fa-file" />
                    Orders
                  </span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" @click="setComponent('Promotions')">
                    <font-awesome-icon icon="fa-solid fa-rectangle-ad" />
                    Promotions
                  </span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" @click="setComponent('Products')">
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                    Products
                  </span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" @click="setComponent('Stocks')">
                    <font-awesome-icon icon="fa-solid fa-cubes-stacked" />
                    Stocks
                  </span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" @click="setComponent('Customers')">
                    <font-awesome-icon icon="fa-solid fa-user" />
                    Customers
                  </span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" @click="setComponent('Employees')">
                    <font-awesome-icon icon="fa-solid fa-user" />
                    Employees
                  </span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" @click="logOut">
                    <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                    Sign out
                  </span>
                </li>
              </ul>
            </div>
          </nav>

          <main class="col-md-9 pannel ms-sm-auto col-lg-10 px-md-4">
            <div class="d-flex  justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1>{{ selectedComponent }}</h1>
            </div>
            <div>
              <DashboardComp v-if="selectedComponent == 'Dashboard'"/>
              <OrdersComp v-if="selectedComponent == 'Orders'"/>
              <PromotionsComp v-if="selectedComponent == 'Promotions'"/>
              <ProductsComp v-if="selectedComponent == 'Products'"/>
              <StocksComp v-if="selectedComponent == 'Stocks'"/>
              <CustomersComp v-if="selectedComponent == 'Customers'"/>
              <EmployeesComp v-if="selectedComponent == 'Employees'"/>
            </div>
          </main>
        </div>
      </div>
    </div>
  </template>
  
  <script>

    import DashboardComp from '@/components/office/DashboardComponent'
    import OrdersComp from '@/components/office/OrdersComponent'
    import PromotionsComp from '@/components/office/PromotionsComponent'
    import ProductsComp from '@/components/office/ProductsComponent'
    import StocksComp from '@/components/office/StocksComponent'
    import CustomersComp from '@/components/office/CustomersComponent'
    import EmployeesComp from '@/components/office/EmployeesComponent'

    import { mapState } from 'vuex';

    export default {
      name: 'Office',
      components: {
        DashboardComp,
        OrdersComp,
        PromotionsComp,
        ProductsComp,
        StocksComp,
        CustomersComp,
        EmployeesComp
      },
      data(){
        return {
          selectedComponent: 'Dashboard',
        }
      },
      mounted() {
        if(this.status != 'logged' || this.user.role != 'admin' ) this.$router.push('/office/login');
      },
      computed: {
        ...mapState(["status"]),
        user(){
          return this.$store.getters.getUser;
        }
      },
      methods: {
        logOut(){
          this.$store.commit('logOut');
          this.$router.push('/office/login');
        },
        setComponent(name) {
          this.selectedComponent = name;
          this.$emit('setComponent', this.selectedComponent);
        }
      }    
    }
  
  </script>