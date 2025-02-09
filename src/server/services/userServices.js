import supabase from "../supabase";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

class UserServices {
  async signUpWithEmailPassword(data) {
    await supabase.auth
      .signUp({
        email: data.Email,
        password: data.Password,
      })
      .then(async (res) => {
        console.log(res);
        const docRefUser = doc(
          db,
          "users",
          (await supabase.auth.getUser()).data.user.id
        );
        const docSnap = await getDoc(docRefUser);
        if (docSnap.exists()) {
          updateDoc(docRefUser, data);
        } else {
          setDoc(docRefUser, data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async signInWithEmailPassword(data) {
    await supabase.auth
      .signInWithPassword({
        email: data.Email,
        password: data.Password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async signOut() {
    await supabase.auth
      .signOut()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getUser(id) {
    const docRefUser = doc(db, "users", id);
    const docSnap = await getDoc(docRefUser);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
}

const services = new UserServices();
export default services;
