"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Student extends Person {
    constructor(name, age, course) {
        super(name, age);
        this.course = course;
    }
    showInfo() {
        console.log(`Student name: ${this.name}`);
        console.log(`Student age: ${this.age}`);
        console.log(`Student course: ${this.course}`);
    }
}
let student = new Student("John Wick", 49, "Science Computing");
student.showInfo();
