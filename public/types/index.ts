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

export type infoType = {
    id: number;
    githubId: string;
    totalCount: number;
    monthTotalCount: number;
    continuousCount : number;
    month: number;
    createdAt: Date;
    today: number;
};