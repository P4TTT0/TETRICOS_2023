import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'validar-usuario',
    loadChildren: () => import('./pages/admin/validar-usuario/validar-usuario.module').then( m => m.ValidarUsuarioPageModule)
  },
  {
    path: 'validate-mail',
    loadChildren: () => import('./pages/validate-mail/validate-mail.module').then( m => m.ValidateMailPageModule)
  },
  {
    path: 'lista-espera',
    loadChildren: () => import('./pages/metre/lista-espera/lista-espera.module').then( m => m.ListaEsperaPageModule)

  },   
  {
    path: 'encuesta',
    loadChildren: () => import('./pages/encuesta/encuesta.module').then( m => m.EncuestaPageModule)
  },
  {
    path: 'mesa',
    loadChildren: () => import('./pages/mesa/mesa.module').then( m => m.MesaPageModule)
  },
  {
    path: 'categorys/:category',
    loadChildren: () => import('./pages/cateogrys/cateogrys.module').then( m => m.CateogrysPageModule)
  },
  {
    path: 'product/:product',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'mesa-general',
    loadChildren: () => import('./pages/mesa-general/mesa-general.module').then( m => m.MesaGeneralPageModule)
  },
  {
    path: 'chat-mozo/:mesa',
    loadChildren: () => import('./pages/chat-mozo/chat-mozo.module').then( m => m.ChatMozoPageModule)
  },
  {
    path: 'detalle',
    loadChildren: () => import('./pages/detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/mozo/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'pedidosAceptados',
    loadChildren: () => import('./pages/mozo/pedidos-aceptados/pedidos-aceptados.module').then( m => m.PedidosAceptadosPageModule)
  },
  {
    path:'pedido/:parametro',
    loadChildren: () => import('./pages/cocina/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'pedidos-aceptados',
    loadChildren: () => import('./pages/mozo/pedidos-aceptados/pedidos-aceptados.module').then( m => m.PedidosAceptadosPageModule)
  },
  {
    path: 'mi-pedido',
    loadChildren: () => import('./pages/mi-pedido/mi-pedido.module').then( m => m.MiPedidoPageModule)
  
  },
  {
    path: 'graficos',
    loadChildren: () => import('./pages/graficos/graficos.module').then( m => m.GraficosPageModule)
  },
  {
    path: 'pedidosAceptados',
    loadChildren: () => import('./pages/mozo/pedidos-aceptados/pedidos-aceptados.module').then( m => m.PedidosAceptadosPageModule)
  },
  {
    path:'pedido/:parametro',
    loadChildren: () => import('./pages/cocina/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'pedidos-aceptados',
    loadChildren: () => import('./pages/mozo/pedidos-aceptados/pedidos-aceptados.module').then( m => m.PedidosAceptadosPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./pages/chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'alta-producto',
    loadChildren: () => import('./pages/alta-producto/alta-producto.module').then( m => m.AltaProductoPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },  {
    path: 'pagos',
    loadChildren: () => import('./pages/pagos/pagos.module').then( m => m.PagosPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
