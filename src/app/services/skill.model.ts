import { Iskill } from './skill.interface';

export class Skill implements Iskill {
    id: string;
    naam: string;

constructor(skill: Iskill){
    this.id = skill.id;
    this.naam = skill.naam;
}

}
