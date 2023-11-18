import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence
} from "firebase/auth";
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  // ||====|| Variables ||====||
  public logueado : boolean = false;
  public userName : string = "";
  public validationState : boolean | null = null;
  public rol : string = "";
  public encuesta : boolean = false;

  // ||====|| Constructor ||====||
  constructor(public ngFireAuth : AngularFireAuth, private data : DataService) { }

  // ||====|| Funciones ||====||

  
  /**
   * The logIn function takes an email or username and password as parameters, attempts to sign in with
   * the provided credentials, and returns the authentication credential if successful.
   * @param {string} emailOrUsername - A string representing either an email address or a username.
   * @param {string} password - The password parameter is a string that represents the user's password.
   * @returns the credential object if the login is successful, and null if there is an error.
   */
  public async logIn(emailOrUsername: string, password: string) {
    try {
      let userEmail = emailOrUsername;
      
      if (!emailOrUsername.includes('@')) {
        userEmail = await this.data.GetUserEmailByUserName(emailOrUsername) || '';
      }
  
      const credential = await this.ngFireAuth.signInWithEmailAndPassword(userEmail, password);
      const uid = await this.getUserUid() || '';
      this.userName = await this.data.getUserNameByUID(uid);
      this.validationState = await this.data.getValidationStateByUID(uid);
      this.rol = await this.data.GetUserRolByUserName(this.userName) || '';
      this.logueado = true;
      return credential;
    } catch (error) {
      return null;
    }
  }



  /**
   * The logOut function logs the user out by setting the logueado variable to false, clearing the
   * userName variable, and calling the signOut method from ngFireAuth.
   * @returns The `logOut` function is returning a promise that resolves to the result of calling the
   * `signOut` method of `ngFireAuth`.
   */
  public async logOut()
  {
    this.logueado = false;
    this.userName = '';
    this.rol = '';
    return await this.ngFireAuth.signOut();
  }

  /**
   * The function registers a new user by checking if the username already exists, creating a new user
   * with the provided email and password, logging in the user, saving the user's information, and
   * returning true if successful or false if the username already exists.
   * @param {string} email - The email parameter is a string that represents the email address of the
   * user who wants to register.
   * @param {string} password - The "password" parameter is a string that represents the password for
   * the user being registered.
   * @param {string} userName - The `userName` parameter is a string that represents the desired
   * username for the user being registered.
   * @returns a boolean value. If the user does not exist, it returns true after creating a new user,
   * logging in, saving user information, and returning the user's UID. If the user already exists, it
   * returns false.
   */
  public async register(userData : any, password : string)
  {
    const userExist = await this.data.userExist(userData['UserName']);
    if(!userExist)
    {
      await this.ngFireAuth.createUserWithEmailAndPassword(userData['Email'], password);
      await this.logIn(userData['Email'], password);
      const userUID = await this.getUserUid() || '';
      this.sendMailVerification();
      await this.data.SaveUser(userUID, userData);
      return true;
    }
    return false;
  }  

  /**
   * The function sends a verification email to the current user.
   * @returns The sendEmailVerification() method is being returned.
   */
  public async sendMailVerification()
  {
    return (await this.ngFireAuth.currentUser)?.sendEmailVerification();
  }

  /**
   * The function `getUserUid` returns a promise that resolves to the UID of the authenticated user or
   * null if there is no authenticated user.
   * @returns a Promise that resolves to a string or null.
   */
  public async getUserUid()
  {
    return new Promise<string | null>((resolve, reject) => 
    {
      this.ngFireAuth.authState.subscribe(user => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null); 
        }
      });
    });
  }

  /**
   * The reLogin function retrieves the user's UID, gets the user's name using the UID, and sets the
   * logueado variable to true.
   */
  public async reLogin() 
  {
    const uid = await this.getUserUid() || '';
    this.userName = await this.data.getUserNameByUID(uid);
    this.logueado = true;
    this.rol = await this.data.GetUserRolByUserName(this.userName) || ''; 
  }

  public async anonLogin() {
    try {
      await this.ngFireAuth.signInAnonymously();
      this.logueado = true;
      this.validationState = true;
      const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Genera un número aleatorio de 4 dígitos
      this.userName = `anon${randomNumbers}`;
      this.rol = "Anon";
    } catch (error) {      
      console.error('Error during anonymous login:', error);    
    }
  }
}
