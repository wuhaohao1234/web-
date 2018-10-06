// function greeter(person:string) {
//     return "Hello, " + person;
// }
//
// let user = "Jane User";
//
// // let user = [0,1,2,4]
//
// document.body.innerHTML = greeter(user);
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);
