
import React, {useRef, useState} from 'react'

type Props = {
    placeholder: string;
    defaultValue: string;
}

type WeatherData = {
    temp: number;
    country: string;
    name: string;
    description: string;
    icon: string;
  };

export const Search = (props : Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [cidade, setCidade] = useState<string>("");
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);



    const searchInput = async (e: any) => {
        e.preventDefault();
    if (inputRef.current) {
      let currentValue = inputRef.current.value;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;
      fetch(url)
      .then(response => response.json())
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            if (data.weather && data.weather.length > 0) {
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0].icon}.svg`;

                const weatherInfo: WeatherData = {
                    temp: data.main.temp,
                    country: data.sys.country,
                    name: data.name,
                    description: data.weather[0].description,
                    icon: icon,
                  };
        
                  setWeatherData(weatherInfo);
            }

          } catch (error) {
            console.log('Ocorreu um erro:', error);
          }
      

    }
    }
    
  return (
    <div>
        <div className='bg-blue-500 p-10 text-center'>
        <h2 className='text-white md:p-20 pb-3 md:text-6xl text-2xl'>Digite a cidade que você quer saber a previsão... 😎</h2>
        <form action="" onSubmit={(e) => searchInput(e)}>
        <input type="text"  
        className=' md:w-[80%] md:h-[60px] pl-10 outline-none rounded-full h-12'
        placeholder={props.placeholder}
         ref={inputRef}
         defaultValue={props.defaultValue}/>
         <br />

         <input type="submit" value="Pesquisar por cidade" 
         className='p-3 bg-red-600 rounded-full text-white mt-5  ml-2 cursor-pointer hover:bg-red-700 border-none outline-none 
          w-60 md:w-[900px]'/>
         </form>
    </div>

    <div>
    {weatherData && (
        <div className='text-center justify-center'>
          <p className='border-b border-b-=[#ccc] p-4 md:p-5 mx-12 md:mx-96'>Temperatura:  <span className='font-bold'>
            {weatherData.temp}</span></p>

          <p className='border-b border-b-=[#ccc] p-3 md:p-5 mx-12 md:mx-96'>País: <span className='font-bold'>
            {weatherData.country}</span></p>

          <p className='border-b border-b-=[#ccc] p-3 md:p-5 mx-12 md:mx-96'>Cidade: <span className='font-bold'>
            {weatherData.name}</span></p>

          <p className='border-b border-b-=[#ccc] p-3 md:p-5 mx-12 md:mx-96'>Descrição: <span className='font-bold'>
            {weatherData.description}</span></p>
            
          <img src={weatherData.icon} alt="Weather Icon" 
          className='md:ml-[749px]  ml-36'/>
        </div>
      )}

      {!weatherData && (
        <div className="p-10 text-center text-2xl">
          <p>Pesquise por alguma cidade acima☝️</p>
        </div>
      )} 
    </div>
    </div>


  )
}
