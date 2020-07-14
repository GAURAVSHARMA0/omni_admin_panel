import {Input,InputGroupButtonDropdown,InputGroup,
    DropdownItem,DropdownMenu,DropdownToggle, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
const APIParam=(props)=>{
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropDown = () => setDropdownOpen(prevState => !prevState); 
    return (
        <React.Fragment>
        <InputGroup  style={{padding:"1px"}}>
            <Input name={"param_name_"+props.id} onChange={props.updateParam}  placeholder="Field name" value={props.selectedName}/>
            <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown} >
                <DropdownToggle caret>
                    {props.selectedType?props.selectedType:"Field Type"}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem name={"param_type_"+props.id} onClick={props.updateParam} value="Text">Text</DropdownItem>
                    <DropdownItem name={"param_type_"+props.id} onClick={props.updateParam} value="Password">Password</DropdownItem>
                </DropdownMenu>
            </InputGroupButtonDropdown>
            <Button color="danger" name={"remove_param_"+props.id} onClick={props.removeParam}>X</Button>
        </InputGroup>
        {
       <span style={ (props.selectedType.length==0 || props.selectedName.length==0)?{fontSize:"10px",color:"red"}:{fontSize:"10px",color:"green"}}>{ (props.selectedType.length==0 || props.selectedName.length==0)?"Required field":<FontAwesomeIcon icon={faCheck}/>}</span>
        }
        </React.Fragment>

    )

}
export default APIParam
