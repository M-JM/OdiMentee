import { Timestamp } from 'rxjs';


export interface User {
uid: string;
created: Timestamp<number>;
firstName: string;
hasCompletedIntro: boolean;
lastName: string;
permissions: Array<string>;
role: string;
}
