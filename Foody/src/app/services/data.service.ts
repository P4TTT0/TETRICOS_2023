import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { addDoc, collection, Firestore, getDoc, getDocs, updateDoc, collectionData, doc, query, where, orderBy, setDoc, onSnapshot, Timestamp } from
'@angular/fire/firestore';
import { QuerySnapshot, deleteDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // ||====|| Constructor ||====||
  constructor(private firestore : Firestore) { }

  // ||====|| Funciones ||====||

  /**
   * The function retrieves a collection of user data from Firestore and maps the document data into an
   * array.
   */
  public async getUsers()
  {
    const imageCollection = collection(this.firestore, 'User');
    const querySnapshot = await getDocs(imageCollection);
    const images = querySnapshot.docs.map(doc => doc.data());
  }

  public async getUserByUserName(userName : string)
  {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];
    return userDoc.data();
  }


  public async getUserTokenByUserName(userName : string)
  {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) 
    {
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
  
    if (userData && userData['token']) {
      return userData['token'];
    } else {
      return '';
    }
  }

  /**
   * The function saves user information to a Firestore database.
   * @param {string} userUID - The userUID parameter is a string that represents the unique identifier
   * for the user. It is used to identify the specific user document in the User collection in the
   * Firestore database.
   * @param {string} userName - The `userName` parameter is a string that represents the name of the
   * user.
   * @param {string} email - The email parameter is a string that represents the email address of the
   * user.
   */
  public async SaveUser(userUID : string, userData : any)
  {
    const userCollection = collection(this.firestore, 'User');
    const docRef = doc(userCollection, userUID);

    userData['JoinDate'] = new Date();

    await setDoc(docRef, userData);
  }

  /**
   * The function `UpdateValidationUser` updates the `Validated` field of a user document in the
   * Firestore database.
   * @param {string} userUID - The userUID parameter is a string that represents the unique identifier
   * of the user whose validation status needs to be updated.
   * @param {boolean} validated - A boolean value indicating whether the user is validated or not.
   */
  public async UpdateValidationUser(userUID: string, validated : boolean): Promise<void> {
    const userCollection = collection(this.firestore, 'User');
    const docRef = doc(userCollection, userUID);

    await updateDoc(docRef, 
    {
      Validated: validated,
    });
  }

  /**
   * The function `GetUserEmailByUserName` retrieves the email of a user based on their username from a
   * Firestore database.
   * @param {string} userName - The `userName` parameter is a string that represents the username of
   * the user whose email we want to retrieve.
   * @returns a Promise that resolves to a string or null.
   */
  public async GetUserEmailByUserName(userName: string): Promise<string | null> {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) 
    {
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
  
    if (userData && userData['Email']) {
      console.log(userData['Email']);
      return userData['Email'];
    } else {
      return null;
    }
  }

  public async GetUserUIDByUserName(userName: string): Promise<string | null> {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    return userDoc.id;
  }

 /**
  * The function `GetUsersNotAccepted` retrieves a list of users from a Firestore collection where the
  * `Validated` field is set to `false`.
  * @returns an array of user objects who have not been accepted.
  */
  public async GetUsersNotAccepted(): Promise<any | null> {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('Validated', '==', null));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) 
    {
      return null;
    }

    const users = querySnapshot.docs.map(doc => doc.data());

    return users;
  }

 /**
  * The function checks if a user with a given username exists in the "User" collection in Firestore.
  * @param {string} userName - The parameter `userName` is a string that represents the username of a
  * user.
  * @returns a boolean value. It returns true if a user with the given username exists in the 'User'
  * collection, and false otherwise.
  */
  public async userExist(userName : string)
  {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) 
    {
      return false;
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
  
    if (userData['UserName'] == userName) 
    {
      return true;
    } 
    else 
    {
      return false;
    }
  }

  /**
   * The function `getUserNameByUID` retrieves the username of a user given their UID from a Firestore
   * collection.
   * @param {string} UIDUser - The parameter `UIDUser` is a string that represents the unique
   * identifier of a user.
   * @returns the value of the 'UserName' field from the user document if it exists. If the user
   * document does not exist, it returns an empty string.
   */
  public async getUserNameByUID(UIDUser: string)
  {
    try
    {
      const userCollection = collection(this.firestore, 'User');
      const userDoc = doc(userCollection, UIDUser);
      const userDocSnapshot = await getDoc(userDoc);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        return userData['UserName'];
      } 
      else 
      {
        console.log('User not found');
        return '';
      }
    }
    catch(error : any)
    {
      console.log('Error: ' + error);
    }
  }

  public async getValidationStateByUID(UIDUser: string)
  {
    try
    {
      const userCollection = collection(this.firestore, 'User');
      const userDoc = doc(userCollection, UIDUser);
      const userDocSnapshot = await getDoc(userDoc);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        return userData['Validated'];
      } 
      else 
      {
        console.log('User not found');
        return '';
      }
    }
    catch(error : any)
    {
      console.log('Error: ' + error);
    }
  }

  public async getUIDByUserName(userName: string)
  {
    const userCollection = collection(this.firestore, 'User');
    const querySnapshot = await getDocs(query(userCollection, where('UserName', '==', userName)));
    
    if (querySnapshot.size === 0) {
      return null;
    }
    
    const userDoc = querySnapshot.docs[0];
    const userUID = userDoc.id;
    return userUID;
  }

  public async getCategorys()
  {
    const categoryCollection = collection(this.firestore, 'Category');
    const querySnapshot = await getDocs(categoryCollection);
    const categorys = querySnapshot.docs.map(doc => doc.data());
    return categorys;
  }

  public async getProductByCategory(category : string)
  {
    const userCollection = collection(this.firestore, 'Product');
    const q = query(userCollection, where('Category', '==', category), orderBy('Price', 'asc'));
    const querySnapshot = await getDocs(q);
    const products =  querySnapshot.docs.map(doc => doc.data());
    return products;
  }

  public async getMozosTokens() {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('Rol', '==', 'Mozo'));
    const querySnapshot = await getDocs(q);
    const mozosTokens = querySnapshot.docs.map(doc => doc.data()['token']);
  
    return mozosTokens;
  }

  public async getAdminTokens() {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('Rol', '==', 'Admin'));
    const querySnapshot = await getDocs(q);
    const mozosTokens = querySnapshot.docs.map(doc => doc.data()['token']);
  
    return mozosTokens;
  }

  public async getMetreTokens() {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('Rol', '==', 'Metre'));
    const querySnapshot = await getDocs(q);
    const mozosTokens = querySnapshot.docs.map(doc => doc.data()['token']);
  
    return mozosTokens;
  }

  public async getCocineroBaristasTokens() {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('Rol', '==', 'Cocinero'), where('Rol', '==', 'Barista'));
    const querySnapshot = await getDocs(q);
    const mozosTokens = querySnapshot.docs.map(doc => doc.data()['token']);
  
    return mozosTokens;
  }

  public async getProductByProductName(productName : string) {
    const userCollection = collection(this.firestore, 'Product');
    const q = query(userCollection, where('Name', '==', productName));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) 
    {
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    return userData;
  }

  public async sendMessage(message : string, userName : string, mesa : number)
  {
    const messageCollection = collection(this.firestore, 'Message');
    const timestamp = new Date();
    await addDoc(messageCollection, 
      {
        Message: message,
        UserName: userName,
        Timestamp: timestamp,
        Mesa: mesa
      });
  }
  
  public subscribeToMessages(mesa : any): Observable<any[]> {
    const messageCollection = collection(this.firestore, 'Message');
    const q = query(messageCollection, orderBy('Timestamp', 'asc'), where('Mesa', '==', mesa));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => doc.data());
        observer.next(messages);
      });

      return () => unsubscribe();
    });
  }
  
  public async saveUserWaitingList(userUID : any, userData : any)
  {
    const userCollection = collection(this.firestore, 'UsersOnLocal');
    const docRef = doc(userCollection, userUID);

    userData.Timestamp = Timestamp.now().toDate();

    await setDoc(docRef, userData);
  }

  public async saveProducto(producto : any)
  {
    const userCollection = collection(this.firestore, 'Product');
    const docRef = doc(userCollection);

    await setDoc(docRef, producto);
  }
 
  public getUsersWaitingList(): Observable<any[]> {
    const userCollection = collection(this.firestore,"UsersOnLocal");
    const q = query(userCollection, orderBy('Timestamp', 'desc'));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => doc.data());
        observer.next(users);
      });

      return () => unsubscribe();
    });
  }

  public getPedidoProductosByUserName(userName : string): Observable<any[]> {
    const userCollection = collection(this.firestore,"Pedido");
    console.log(userName);
    const q = query(userCollection, where('PedidoDe', '==', userName));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => doc.data());
        observer.next(users);
      });

      return () => unsubscribe();
    });
  }

  public async saveProductoOnPedido(pedido : any)
  {
    const userCollection = collection(this.firestore, 'Pedido');
    const docRef = doc(userCollection);
    await setDoc(docRef, pedido);
  }

  public async updateEstadoPedidoByUserName(userName : string)
  {
    const EstadoPedidoCollection = collection(this.firestore, 'EstadoPedido');
    const querySnapshot = await getDocs(query(EstadoPedidoCollection, where('PedidoDe', '==', userName)));
    const userDoc = querySnapshot.docs[0];
    const pedidoID = userDoc.id;
    const userCollection = collection(this.firestore, 'EstadoPedido');
    const docRef = doc(userCollection, pedidoID);
    await updateDoc(docRef, 
    {
      Estado: 'aceptado'
    });
  }

  public async updateMesaAsignadaByUserName(userName : string, mesa : any)
  {
    const EstadoPedidoCollection = collection(this.firestore, 'User');
    const querySnapshot = await getDocs(query(EstadoPedidoCollection, where('UserName', '==', userName)));
    const userDoc = querySnapshot.docs[0];
    const pedidoID = userDoc.id;
    const userCollection = collection(this.firestore, 'User');
    const docRef = doc(userCollection, pedidoID);
    await updateDoc(docRef, 
    {
      MesaAsignada: mesa
    });
  }

  public async entregarPedidoByUserName(userName : string)
  {
    const EstadoPedidoCollection = collection(this.firestore, 'EstadoPedido');
    const querySnapshot = await getDocs(query(EstadoPedidoCollection, where('PedidoDe', '==', userName)));
    const userDoc = querySnapshot.docs[0];
    const pedidoID = userDoc.id;
    const userCollection = collection(this.firestore, 'EstadoPedido');
    const docRef = doc(userCollection, pedidoID);
    await updateDoc(docRef, 
    {
      Estado: 'entregado'
    });
  }

  public getPedidosSolicitados(): Observable<any[]> {
    const userCollection = collection(this.firestore,"EstadoPedido");
    const q = query(userCollection, where('Estado', '==', 'solicitado'));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => doc.data());
        observer.next(users);
      });

      return () => unsubscribe();
    });
  } 

  public getPedidosAceptados(): Observable<any[]> {
    const userCollection = collection(this.firestore,"EstadoPedido");
    const q = query(userCollection, where('Estado', '==', 'aceptado'));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => doc.data());
        observer.next(users);
      });

      return () => unsubscribe();
    });
  } 

  public getEstadoPedidoByUsername(userName : string): Observable<any[]> {
    const userCollection = collection(this.firestore,"EstadoPedido");
    const q = query(userCollection, where('Estado', '==', 'aceptado'), where('PedidoDe', '==', userName));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => doc.data());
        observer.next(users);
      });

      return () => unsubscribe();
    });
  } 

  public getEstadoPedidoByUsername2(userName : string): Observable<any[]> {
    const userCollection = collection(this.firestore,"EstadoPedido");
    const q = query(userCollection, where('PedidoDe', '==', userName));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => doc.data());
        observer.next(users);
      });

      return () => unsubscribe();
    });
  } 

  public async saveEstadoPedido(pedido : any)
  {
    const userCollection = collection(this.firestore, 'EstadoPedido');
    const docRef = doc(userCollection);
    await setDoc(docRef, pedido);
  }

  public async getUserOnLocalByUserName(userName : string)
  {
    const userCollection = collection(this.firestore, 'UsersOnLocal');
    const q = query(userCollection, where('name', '==', userName));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];
    const user = {
      data : userDoc.data,
      UID : userDoc.id
    }
    return user;
  }

  public async UpdateWaitingUser(userName: string, assigned : boolean): Promise<void> {
    const userCollection = collection(this.firestore, 'UsersOnLocal');
    let userUID = (await this.getUserOnLocalByUserName(userName)).UID;
    const docRef = doc(userCollection, userUID);

    if(assigned)
    {
      await updateDoc(docRef,
      {
        state : 'assigned'
      })
    }
    else
    {
      await deleteDoc(docRef);
    }
  }

  public  getUserWaitingStatus(userName : string): Observable<any[]> {
    const userCollection = collection(this.firestore,"UsersOnLocal");
    const q = query(userCollection, where('name','==',userName));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => doc.data());
        observer.next(users);
      });

      return () => unsubscribe();
    });
  }

  public getMesas(): Observable<any[]> {
    const mesasCollection = collection(this.firestore,"Mesas");
    const q = query(mesasCollection, orderBy('numeroMesa', 'asc'));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const mesas = querySnapshot.docs.map((doc) => doc.data());
        observer.next(mesas);
      });

      return () => unsubscribe();
    });
  }
  
  public async GetUserRolByUserName(userName: string): Promise<string | null> {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) 
    {
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
  
    if (userData && userData['Rol']) {
      console.log(userData['Rol']);
      return userData['Rol'];
    } else {
      return null;
    }
  }

  public async GetUserMesaByUserName(userName: string): Promise<number | null> {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) 
    {
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
  
    if (userData && userData['MesaAsignada']) {
      console.log(userData['MesaAsignada']);
      return userData['MesaAsignada'];
    } else {
      return null;
    }
  }

  public async setMesa(userName: string, mesa : number): Promise<void> 
  {
    const userCollection = collection(this.firestore, 'UsersOnLocal');
    let userUID = (await this.getUserOnLocalByUserName(userName)).UID;
    const docRef = doc(userCollection, userUID);
    
    await updateDoc(docRef,
    {
      mesa : mesa
    })    
  }


  public async saveEncuesta(encuestaData : any)
  {
    const encuestaCollection = collection(this.firestore, 'encuestas');
    const docRef = await addDoc(encuestaCollection, encuestaData);  

    return docRef.id;
  }

  async getVotosComida(): Promise<number[]> {
    const encuestaCollection = collection(this.firestore, 'encuestas');
    
    // Realizar la consulta para obtener los datos de la colección 'encuestas'
    const q = query(encuestaCollection, where('comida', '>=', 1), where('comida', '<=', 5));
    const querySnapshot: QuerySnapshot<any> = await getDocs(q);

    // Inicializar un array para contar los votos en cada categoría (1 al 5)
    const conteoVotos = [0, 0, 0, 0, 0];

    // Contar los votos en cada categoría
    querySnapshot.forEach(doc => {
      const voto = doc.data().comida;
      if (voto >= 1 && voto <= 5) {
        conteoVotos[voto - 1]++;
      }
    });

    return conteoVotos;
  }

  async getVotosAtencion(){
    const encuestaCollection = collection(this.firestore, 'encuestas');
    
    // Realizar la consulta para obtener los datos de la colección 'encuestas'
    const q = query(encuestaCollection, where('atencion', '>=', 1), where('atencion', '<=', 5));
    const querySnapshot: QuerySnapshot<any> = await getDocs(q);

    // Inicializar un array para contar los votos en cada categoría (1 al 5)
    const conteoVotos = [{name: "1", value: 0}, {name: "2", value: 0}, {name: "3", value: 0}, {name: "4", value: 0}, {name: "5", value: 0}];

    // Contar los votos en cada categoría
    querySnapshot.forEach(doc => {
      const voto = doc.data().atencion;
      if (voto >= 1 && voto <= 5) {
        conteoVotos[voto - 1]["value"]++;
      }
    });

    const votosFiltrados = conteoVotos.filter(voto => voto.value > 0);

    return votosFiltrados;
  }

  async getVotosGeneral(): Promise<number[]> {
    const encuestaCollection = collection(this.firestore, 'encuestas');
    
    // Realizar la consulta para obtener los datos de la colección 'encuestas'
    const q = query(encuestaCollection, where('general', '>=', 1), where('general', '<=', 5));
    const querySnapshot: QuerySnapshot<any> = await getDocs(q);

    // Inicializar un array para contar los votos en cada categoría (1 al 5)
    const conteoVotos = [0, 0, 0, 0, 0];

    // Contar los votos en cada categoría
    querySnapshot.forEach(doc => {
      const voto = doc.data().general;
      if (voto >= 1 && voto <= 5) {
        conteoVotos[voto - 1]++;
      }
    });

    return conteoVotos;
  }

  public async getUserFromMesa(numeroMesa : string)
  {
    const userCollection = collection(this.firestore, 'UsersOnLocal');
    const q = query(userCollection, where('mesa', '==', numeroMesa));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];
    return userDoc.data();
  }

  public async getPedidosFromUser(userName : string, sector : string) : Promise<any | null>
  {
    const userCollection = collection(this.firestore, 'Pedido');
    const q = query(userCollection, where('PedidoDe', '==', userName), where('Sector', '==', sector));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) 
    {
      return null;
    }

    const pedidos = querySnapshot.docs.map(doc => doc.data());

    return pedidos;
  }

  public async updateEstadoSectorByUserName(userName : string, sector : string)
  {
    const EstadoPedidoCollection = collection(this.firestore, 'EstadoPedido');
    const querySnapshot = await getDocs(query(EstadoPedidoCollection, where('PedidoDe', '==', userName)));
    const userDoc = querySnapshot.docs[0];
    const pedidoID = userDoc.id;
    const userCollection = collection(this.firestore, 'EstadoPedido');
    const docRef = doc(userCollection, pedidoID);
    await updateDoc(docRef, 
    {
      [sector]: true
    });
  }
  
  public async changeOrderStatus(userName : string, status : string)
  {
    const EstadoPedidoCollection = collection(this.firestore, 'UsersOnLocal');
    const querySnapshot = await getDocs(query(EstadoPedidoCollection, where('name', '==', userName)));
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, 
    {
      orderStatus: status
    });
  }


  public getOrderStatusByUsername(userName : string): Observable<any[]> {
    const userCollection = collection(this.firestore,"UsersOnLocal");
    const q = query(userCollection, where('name', '==', userName));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => doc.data());
        observer.next(users);
      });

      return () => unsubscribe();
    });
  } 

}
