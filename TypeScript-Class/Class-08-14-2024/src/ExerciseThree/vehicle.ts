class Person{
    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

}

class Student extends Person{
    course: string;

    constructor(name:string, age: number, course: string){
        super(name, age);
        this.course = course;
    }

    showInfo(): void {
        console.log(`Student name: ${this.name}`);
        console.log(`Student age: ${this.age}`);
        console.log(`Student course: ${this.course}`);
    }
}

let student: Student = new Student("John Wick", 49, "Science Computing");

student.showInfo().