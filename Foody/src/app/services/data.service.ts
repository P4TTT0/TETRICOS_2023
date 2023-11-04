import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDoc, getDocs, updateDoc, collectionData, doc, query, where, orderBy, setDoc, onSnapshot } from
'@angular/fire/firestore';
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
}
