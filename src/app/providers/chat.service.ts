import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';
// Login
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable()
// NOTA: UN SERVICIO SE EJECUTA EN EL MOMENTO QUE ES INYECTADO - IMPORTANTE POR ESO CREAMOS EL METODO CREARMENSAJE PARA OCUPARLO VARIAS VECES
export class ChatService {
  // Lo ocupamos para leer una coleccion en particular
  private itemsCollection: AngularFirestoreCollection<any>;
  // Lo trabajamos con arreglo
  public chats: any = [];
  // Obtenemos la informacion de la autenticacion con esta variable
  public usuario: any = {};

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {
    // Nos suscribimos a un observable, de esta forma escuchamos cualquier cambio que suceda en el estado de la autenticacion
    this.afAuth.authState.subscribe( user => {
      //si es la primera vez puede ser nulo sino deberia de obtener informacion mas adelante
      console.log('Estado del usuario: ',user);
      if (!user) { // Sino existe el usuario que haga un return para que no reviente el condigo
        return;
      }
      // Obtenemos las propiedades del usuario autenticado y las guardamos en nuestro objeto creado arriba usuario
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  cargarMensajes() {
    // Recibe un tipo any y el nodo del chat
    // Mandamos un query a partir del ref para ordenar los chat en este caso por fecha y enviamos el desc para orderarlos descendentes
    // Ocupamos limit para cargar los ultimos 5 mensajes porque no es viable si hay mas de 1000 mensajes
    this.itemsCollection = this.afs.collection<any>('chats', ref => ref.orderBy('fecha', 'desc')
      .limit(5));
    // Con esto estamos pendientes de lo que suceda en ese nodo en este caso 'chats'.
    // usamos map para trabajar con un observable y transformar y regresar algo en el cual nosotros nos suscribimos
    return this.itemsCollection.valueChanges().pipe(map( mensaje => {
      console.log(mensaje);
      // limpiamos los chats
      this.chats = [];
      //barremos los elementos del array
      for (let msj of mensaje) {
        // lo insertamos en la primera posicion siempre para ordenarlos
        this.chats.unshift(msj);
      }
      // this.chats = mensaje; // Ahora con el chats podemos trabaja en el HTML
    }));
  }

  //Recibimos el texto que deseamos enviar
  agregarMensaje(texto :string) {
    // Necesitamos enviar el objeto a firebase para grabarlo, NOS FALTA EL UID DEL USUARIO
    let mensaje: Mensaje = {
      nombre : this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };
    // Guardamos la informacion en firebase
    return this.itemsCollection.add(mensaje);

  }

  login(proveedor:string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

}
