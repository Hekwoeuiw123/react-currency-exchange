import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dropdown from './components/Dropdown'
import useFetch from './hooks/useFetch'
import InputBox from './components/InputBox'

function App() {
  const [amount, setAmount] = useState(0)
  const [from_Country, setFrom_Country] = useState("USD")
  const [to_Country, setTo_Country] = useState("INR")
  const [convertresult, setConvertResult] = useState(0)
  const [Loading, setIsLoading] = useState(false)
  const { data, isLoading, error } = useFetch()
  
  // const { data, fetchData, isLoading, error } = useFetch(url)

  const handleFrom_Dropdown = (e) => {
    setFrom_Country(e.target.value)
    // console.log("from country",from_Country)
  }

  const handleTo_Dropdown = (e) => {
    setTo_Country(e.target.value)
    // console.log("to country",to_Country)
  }

  const handleFromInput = (e) => {
    setAmount(Number(e.target.value))
  }

  // const handleToInput = (e)=>{
  //    setAmount(Number(e.target.value))
  // }

  const swapCurrency = () => {
    // console.log(from_Country , to_Country)
  const temp = from_Country
  setFrom_Country(to_Country)
  setTo_Country(temp)
  // console.log(from_Country , to_Country)

  }

  const handleResult = useCallback(async () => {
        setIsLoading(true);
        try {
          // console.log(from_Country , to_Country)
            const url = `https://v6.exchangerate-api.com/v6/d336b54a7f3a1fe937ed26c7/pair/${from_Country}/${to_Country}/${amount}`
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const json = await res.json();
            console.log(json)
            // setData(json);
            setConvertResult(json["conversion_result"])
        } catch (err) {
            console.log(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [amount , from_Country , to_Country])


  return <div className='form-container'>
    <div className='row'>
      <InputBox amount={amount} lable="From" handleAmount={handleFromInput} />
      <Dropdown handleDropdown={handleFrom_Dropdown} data ={data} isLoading={isLoading} error={error} value={from_Country}/>
    </div>
    <button className="swap-btn" onClick={swapCurrency}>Swap</button>
    <div className='row'>
      <InputBox amount={convertresult} lable="To" isDisabled={true} />
      <Dropdown handleDropdown={handleTo_Dropdown} data ={data} isLoading={isLoading} error={error} value={to_Country}/>
    </div>
    <button className="convert-btn" onClick={handleResult}>
      {Loading ? "Converting..." : `Convert ${from_Country} to ${to_Country}`}
    </button>
  </div>
}

export default App
