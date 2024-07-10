import { v4 as uuidv4 } from 'uuid';
import { IconType } from 'react-icons';

interface ComboBoxProps {
    id: string;
    style?: string;
    name?: string;
    value: string;
    required?: boolean;
    list:  {[key: string]: string };
    icon?: IconType;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    styleOption: string;
    defaultOption: string;
}

const ComboBox: React.FC<ComboBoxProps> = (props) => {
    console.log(props.list)
    return (
        <div className='w-full' >
           <select 
                name={props.name} 
                onChange={props.onChange} 
                value={props.value} 
                id={props.id}
                className={`${props.style} w-full text-base py-2 px-4 outline-none`}
                style={{ height:'42px', }}
            >   
                <option value="default" selected>
                    {props.defaultOption}
                </option>
                {Object.entries(props.list).map(([key, value]) => (
                    
                    <option 
                        key={uuidv4()}
                        value={key}
                        className={props.styleOption}
                    >
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ComboBox;

