export const weather = async (city)=>{
    try{
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=db1c5d8fc9a24cdda15163249252905&q=${city}&aqi=no`)
        const weatherData = await res.json();
        return weatherData;
    } catch{
        console.error("Not found");
        return null;
    }
};