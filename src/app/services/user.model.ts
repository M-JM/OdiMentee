import { Timestamp } from 'rxjs';


export interface User {
key: string;
created: Timestamp<number>;
firstName: string;
hasCompletedIntro: boolean;
lastName: string;
permissions: Array<string>;
role: string;
}
