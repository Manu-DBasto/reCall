import { db } from "../database";
import { getDoc, doc, query, collection, onSnapshot } from "firebase/firestore";

export async function GetUsers() {
    const users = [];
    const unsubscribe = onSnapshot(
        query(collection(db, "users")),
        (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            console.log(users);
        }
    );

    return users;
    // Este codigo igual obtiene la data, pero con onSnapshot en teoria se hace una nueva solicitud en automatico si se detecta que hay nuevos datos en db. Habria que probar pero aja
    // const res = await getDocs(query(collection(db, "users")));
    // const users = res.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    // }));
    // return users;
}

/**
 * Aun estoy trabajando en esta funcion. Funciona pero tengo que proveer un ID y no estoy seguro aun mediante que dato basarlo para obtener un usuario especifico.
 */
export async function GetUserByEmail() {
    const docRef = doc(db, "users", "aHrkLo4sIiVHVSgGwj5h2pKHlZ93");
    const document = await getDoc(docRef);
    console.log(document.data());
}
