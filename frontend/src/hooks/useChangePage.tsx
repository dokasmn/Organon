import {useState} from 'react'

const useChangeDirection: (maxValue: number) => [number, (direction: string) => void] = (maxValue) => {

    const [changeValue, setChangeValue] = useState<number>(1) 

    function changeValueFunct(direction: string) {
        if(direction === 'right'){
            setChangeValue((prevCount) => prevCount + 1)
            if(changeValue >= maxValue){
                setChangeValue(1)
            }
        }else{
            setChangeValue((prevCount) => prevCount - 1)
            if(changeValue === 2){
                setChangeValue(maxValue)
            }
        }
    }
    return [changeValue, changeValueFunct]
}
 
export default useChangeDirection