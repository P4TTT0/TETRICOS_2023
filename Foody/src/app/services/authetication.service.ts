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

  constructor(public ngFireAuth : AngularFireAuth, private data : DataService) { 

  }

  public logueado : boolean = false;
  public userName : string = "";

  public async logIn(emailOrUsername: string, password: string) {
    try {
      let userEmail = emailOrUsername;
      
      if (!emailOrUsername.includes('@')) {
        userEmail = await this.data.GetUserEmailByUserName(emailOrUsername) || '';
      }
  
      const credential = await this.ngFireAuth.signInWithEmailAndPassword(userEmail, password);
      const uid = await this.getUserUid() || '';
      this.userName = await this.data.getUserNameByUID(uid);
      this.logueado = true;
      return credential;
    } catch (error) {
      return null;
    }
  }

  public async logOut()
  {
    this.logueado = false;
    this.userName = '';
    localStorage.removeItem('userToken');
    return await this.ngFireAuth.signOut();
  }

  public async register(email : string, password : string, userName : string)
  {
    const userExist = await this.data.userExist(userName);
    if(!userExist)
    {
      await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
      await this.logIn(email, password);
      const userUID = await this.getUserUid() || '';
      await this.data.SaveUser(userUID, userName, email);
      return true;
    }
    return false;
  }

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

  public async reLogin() 
  {
    const uid = await this.getUserUid() || '';
    this.userName = await this.data.getUserNameByUID(uid);
    this.logueado = true;
  }
}
