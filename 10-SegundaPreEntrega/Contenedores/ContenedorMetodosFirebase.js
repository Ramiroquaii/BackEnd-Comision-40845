import { optionsFireBase } from '../config/config.js';

//import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
//import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getFirestore, collection, doc, addDoc, getDocs } from 'firebase/firestore';

const app = initializeApp(optionsFireBase);

// getDocs(collection(getFirestore(), 'productos')).then((item) => {
//     const arrayItems = item.docs.map((doc) => ({id: doc.id, ...doc.data()}));
//     console.log(arrayItems);
// } );

async function read() {
    const querySnapshot = await getDocs(collection(getFirestore(),'productos'));

    if (querySnapshot.empty) {
        console.log('Coleccion Vacia');
    } else {
        querySnapshot.forEach(doc => {
            console.log(doc.data());
        });
    }
};

async function create() {
    const query = collection(getFirestore(),'productos');

    await Promise.all([
        addDoc(collection(getFirestore(), "productos"),{ name:'AGREGADO',precio:22,stock:33,foto:"https://foto",descripcion:"Un producto Nuevo"})
    ]);
    console.log('CREATE DONE');
};


read();
create();

//app.delete();


class firebaseContainer {

    constructor(route){
        this.route = route;

    }

    read = async () => {
        const db = getFirestore();
        const query = db.collection('productos');
    
        const querySnapshot = await query.get();
    
        if (querySnapshot.empty) {
            console.log('coleccion vacia');
        } else {
            querySnapshot.forEach(doc => {
                console.log(JSON.stringify(doc.data()), null, 2);
            });
        }
    };
    
    create = async () => {
        const db = admin.firestore();
        const query = db.collection('products');
    
        await Promise.all([
            query.doc('bolso').set({ name:'bolso'})
        ]);
        console.log('create done');
    };
    
    
    update = async () => {
        const db = admin.firestore();
        const query = db.collection('products');
    
        await query.doc('bolso').set({ newName: 'bolso de vuelo'}, {merge: true});
    
    };
    
    deleteProduct = async () => {
        const db = admin.firestore();
        const query = db.collection('products');
    
        await query.doc('bolso').delete();
    
    };
};