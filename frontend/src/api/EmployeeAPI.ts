const BASE_URL = 'http://localhost:5106/api/Employees';

interface ResponseType {
    token: string;
}

export async function getEmployeeById(id: number) {
    const url = `${BASE_URL}/${id}`;
        const responseDataString = localStorage.getItem('ResponseData');
        if (responseDataString) {
            const responseData: ResponseType = JSON.parse(responseDataString);
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${responseData.token}`
                }
            });
           return res
        } 
    
    return null
}


const EMP_URL = 'http://localhost:5106/api/Employees/employee';

export async function getMangerRelatedEmployee(id:number){
    const url = `${EMP_URL}/${id}`;
    const responseDataString = localStorage.getItem('ResponseData');
    if (responseDataString) {
        const responseData: ResponseType = JSON.parse(responseDataString);
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${responseData.token}`
            }
        });
       return res
    } 

return null
}