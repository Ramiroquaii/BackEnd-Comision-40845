class Usuario {
    static cantidadUsuarios = 0; //Probando variables de clase.

    constructor(nm,lnm){
        this.name = nm;
        this.lastName = lnm;
        this.books = [];
        this.pets = [];
        Usuario.cantidadUsuarios = ++Usuario.cantidadUsuarios;
    }
    getFullName(){
        return (`${this.name} ${this.lastName}`);
    }
    addPet(pet){
        this.pets.push(pet);
    }
    showPets(){
        return (this.pets);
    }
    countPets(){
        return (this.pets.length);
    }
    addBook(tit,aut){
        this.books.push({ title: tit, author: aut });
    }
    showBooks(){
        return (this.books);
    }
    countBooks(){
        return (this.books.length);
    }
    getBooksNames(){
        let booksNames = [];
        this.books.forEach((book) => {
            booksNames.push(book.title);
        });
        return (booksNames);
    }
}

const user = new Usuario('Ramiro', 'Vechiola');
const user2 = new Usuario('Rafael', 'Ochoa');
const user3 = new Usuario('Ezequiel', 'Chamarez');

user.addPet('Perro');
user.addPet('Gato');
user.addPet('Pajaro');

user.addBook('Principito', 'Escritor Anonimo');
user.addBook('Templo Perdido', 'Indiana Jones');

console.log(user.getFullName());

console.log(`El usuario tiene: ${user.countPets()} mascotas y ${user.countBooks()} libros.`);

console.log('MASCOTAS:');
console.log(user.showPets());

console.log('LIBROS:');
console.log(user.showBooks());

console.log('TITULOS DE LIBROS:');
console.log(user.getBooksNames());

console.log(`INSTANCIAS GENERADAS DE CLASE: ${Usuario.cantidadUsuarios}`);
