import React, {useReducer, useEffect} from "react";
import { validate } from "./util/validators";
import './Input.css'

const inputReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val,action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

export default function Input({id, type, placeholder, onInput, initialValue, initialValid, errorText, validators}) {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || '', 
        isTouched: false, 
        isValid: initialValid || false
    });

    const {value, isValid} = inputState;

    useEffect(() => {
        onInput(id,value,isValid);
    },[id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value, validators: validators});
    }

    const touchHandler = () => {
        dispatch({type: 'TOUCH'});
    }

    return (
        <div>
            <input className={!inputState.isValid && inputState.isTouched && `form-control--invalid`}
                id = {id}
                type = {type} 
                placeholder={placeholder} 
                onInput={onInput} 
                onChange={changeHandler} 
                onBlur={touchHandler}
            />
            {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
        </div>
        
    )
}
