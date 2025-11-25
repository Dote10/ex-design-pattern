interface Obj{
    name : string;
    getName() : string
}


function main(obj:Obj) {}

//오류 발생
/* main({
    name : "test-name",
    xyz : 'abc'
}) */

const obj = {
    name : "test-name",
    xyz : 'abc',
    getName() {
        return this.name;
    }
}

main(obj)

/* abstract class AC{
    private name: string;
    constructor(name:string){
        this.name = name;
    }
} */


/* abstract class AC{
    private name: string;
    public hello: string;

    constructor(name:string,hello:string){
        this.name = name;
        this.hello = hello;
    }
}
 */

abstract class AC{
    public hello: string;

    constructor(hello:string){
        this.hello = hello;
    }
}

interface AC2{
    hello : string
}

const ac: AC = {
    hello:'world'
}

function main2(obj: AC){}

main2({
    hello : 'world'
})

interface Runable{
    run(): void;
}

interface Walkable{
    walk(): void;
}

class A implements Runable,Walkable{
    run(){}
    walk(): void {
        
    }
}

abstract class ACC {}

//오류 발생
//추상 클래스는 다중 상속 불가능 
/* class A extends AC,ACC{

}
 */

//interface 사용불가에 대한 대안
class Runable {
	run(){
		throw new Error('하위 클래스에서 구현해주세요')
	}
}
class Walkable {
	walk(){
		throw new Error('하위 클래스에서 구현해주세요')
	}
}

class RunAndWalkable extends Walkable {
	run(){
		throw new Error('하위 클래스에서 구현해주세요')
	}
}

class B extends RunAndWalkable {
	override walk() {};
	override run() {};
}
