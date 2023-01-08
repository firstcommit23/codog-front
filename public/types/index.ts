/* 
[
        {
            "response": {
                "id": 1,
                "githubId": "hyo-jin-jeong",
                "totalCount": 4,
                "monthTotalCount": 4,
                "continuousCount": 0,
                "month": 11,
                "dayStamp": {
                    "1": "4",
                    "2": "1",
                    "3": "1",
                    "4": "3",
                    "12": "2"
                },
                "createdAt": "2022-11-1T06:39:45.000Z",
                "today": 12
            }
        }
]


*/

export interface dayStampProps {
    '1' : number;
    '2' : number;
    '3' : number;
    '4' : number;
    '5' : number;
    '6' : number;
    '7' : number;
    '8' : number;
    '9' : number;
    '10' : number;
    '11' : number;
    '12' : number;
    '13' : number;
    '14' : number;
    '15' : number;
    '16' : number;
    '17' : number;
    '18' : number;
    '19' : number;
    '20' : number;
    '21' : number;
    '22' : number;
    '23' : number;
    '24' : number;
    '25' : number;
    '26' : number;
    '27' : number;
    '28' : number;
    '29' : number;
    '30' : number;
    '31' : number;
}
export interface infoProps {
    footprintId: number;
    githubId: string;
    totalCount: number;
    thisMonthTotalCount: number ;
    continuousCount : number;
    createdAt: string;
    dayStamp: dayStampProps[];
    today: number;
};
