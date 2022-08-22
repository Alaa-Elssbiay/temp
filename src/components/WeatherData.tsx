import { memo, useCallback, useEffect, useState } from 'react';
 const WeatherData = () => {
const [search, setSearch] = useState('')
const [city, setCity] = useState<{date: string, city: string,temp_c: string, condition: string,region:string}[]>([{
  date:"",
  city: "",
  temp_c: "",
  condition:"",
  region:""
 }]);
const [temp, setTemp] = useState({
    "date": "",
    "city":"",
    "region":"",
    "temp_c":"",
    "condition":"",
  });
const url=`http://api.weatherapi.com/v1/current.json?key=8c4a7915572546d5ae2180714221608&q=${search}&aqi=yes`;
const fetchApi=useCallback(async(url:string)=>{
const response=await fetch(url);
const weather=await response.json(); 
setTemp({
    "date": weather.location.localtime,
    "city": weather.location.country,
    "region": weather.location.region,
    "temp_c": weather.current.temp_c,
    "condition": weather.current.condition.text
  })
  setCity([...city, {
    "date": weather.location.localtime,
    "city":weather.location.country,
    "region": weather.location.region,
    "temp_c": weather.current.temp_c,
    "condition":weather.current.condition.text,
  }])
  setSearch("")
},[search])
const handelChanage=useCallback((e:{target:{value:string}})=>{
    setSearch(e.target.value)
},[search])
const handelClick=useCallback(()=>{
     search.length <= 3?(alert('The city must be greater than three letters')):(fetchApi(url))
   setSearch('')
},[search]) 
const country =localStorage.getItem('searchHistory')
useEffect(()=>{
  (country) ? (setCity(JSON.parse(country))) : (setCity([]));
    },[search])
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(city));
  }, [city, setCity])
const deleteItem = useCallback((item: string ) => {
  setCity(city.filter((items: {date: string}) => 
  items.date !== item))
}, [city]);
  return (
    <>
      <div className="itemSearch">
      <input onChange={handelChanage} value={search} type="text" placeholder="Type a city"/>
      <button onClick={handelClick} className='btnInfo'>Search</button>
      </div>
      <div className='info'>
        <h2>{temp.city} {temp.region}</h2>
        <p>{temp.date}</p>
        <h3>{temp.temp_c}</h3>
        <p>{temp.condition}</p>
      </div>
      <div className='searchH1'>
            <h3>Search History</h3>
        </div>
        <table>
            <thead>
                <th>Date</th>
                <th>City</th>
                <th>Weather</th>
                <th>Action</th>
            </thead>
            <tbody>
                {city.map((item:{
                    temp_c: string,
                    date:string,
                    city:string,
                    region:string,
                    condition:string
                }) => {
                    return (
                        <tr key={item.region}>
                            <td>{item.date}</td>
                            <td>{item.city} [{item.region}]</td>
                            <td>{item.temp_c} [{item.condition}]</td>
                            <td><button className='btn' onClick={() => { deleteItem(item.date); } }>Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>
  )
}
export default memo(WeatherData) 