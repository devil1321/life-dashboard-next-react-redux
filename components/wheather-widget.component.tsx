import { WheatherWidgetProps } from '../interfaces'

const WheatherWidget:React.FC<WheatherWidgetProps> = ({data}) => {
  const { city, visibility, wind } = data
  const { temp, feels_like, humidity, pressure } = data.main
  const { icon,main,description } = data.weather[0]
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    return (
        <div className="WheatherMainItem">
            <div className="wheatherMainItem__main-item" id="main-item">
                <img  src={iconURL}/>
                <h1>{city} </h1>
                <div className="wheatherMainItem__wheather">
                    <h3>{main}</h3>
                    <h3>/</h3>
                    <h3>Temp {(temp - 273.15).toFixed(2)} °C</h3>
                </div>
                <div className="wheatherMainItem__wheather-info">
                    <p>{capitalizeFirstLetter(description)}</p>
                    <p>Feels Like {(feels_like - 273.15).toFixed(2)} °C</p>
                    <p>Pressure {pressure} hPa</p>
                    <p>Humidity {humidity} %</p>
                    <p>Visibility {visibility}</p>
                    <p>Wind Speed {wind.speed} km/h</p>
                </div>
            </div>
        </div>
    )
}

export default WheatherWidget
