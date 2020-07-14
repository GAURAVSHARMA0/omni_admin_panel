import {Input,InputGroup,InputGroupText,
    DropdownItem,DropdownMenu,DropdownToggle,Dropdown
  } from 'reactstrap';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck } from '@fortawesome/free-solid-svg-icons';
  import React,{useState}  from 'react';
  const APIField=(props)=>{
    const [fieldsMethodOpen, setDropdownOpenMethod] = useState(false);
    const [fieldsOpenData, setDropdownOpenData] = useState(false);
    const toggleFieldsData = () => setDropdownOpenData(prevState => !prevState); 
    const toggleFieldsMethod = () => setDropdownOpenMethod(prevState => !prevState); 
    var selectedUrl=(typeof props.selectedUrl!="undefined")?props.selectedUrl:"";
    var selectedData=(typeof props.selectedData!="undefined")?props.selectedData:"";
    var selectedMethod=(typeof props.selectedMethod!="undefined")?props.selectedMethod:"";
    var validated=(selectedUrl.length==0||selectedData.length==0||selectedMethod.length==0);
  // var validated=true; 
   return(
    <React.Fragment>
        <InputGroup>
            <InputGroupText style={{width:"20%"}}>
                {props.heading}
                <Input addon type="checkbox" name={props.field_name+"_enabled"} onClick={props.onChange} value={1} defaultChecked={props.isEnabled}/>
            </InputGroupText>
           <Input name={props.field_name+"_url"} onChange={props.onChange} placeholder="Path" value={selectedUrl}/>
            <Dropdown    isOpen={fieldsMethodOpen} toggle={toggleFieldsMethod} >
                <DropdownToggle  caret >
                    {selectedMethod?selectedMethod:"Method"}  
                </DropdownToggle>
                <DropdownMenu >
                    <DropdownItem name={props.field_name+"_method"} onClick={props.onChange} value="GET" >GET</DropdownItem>
                    <DropdownItem name={props.field_name+"_method"} onClick={props.onChange} value="POST">POST</DropdownItem>
                    <DropdownItem name={props.field_name+"_method"} onClick={props.onChange} value="DELETE">DELETE</DropdownItem>
                    
                </DropdownMenu>
            </Dropdown>
            <Dropdown    isOpen={fieldsOpenData} toggle={toggleFieldsData}>
                <DropdownToggle  caret >
                    {selectedData?selectedData:"Data In"}  
                </DropdownToggle>
                <DropdownMenu >
                    <DropdownItem name={props.field_name+"_data"} onClick={props.onChange} value="Body" >Body</DropdownItem>
                    <DropdownItem name={props.field_name+"_data"} onClick={props.onChange} value="Param">Param</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </InputGroup>
       {
         props.isEnabled?<span style={validated?{fontSize:"10px",color:"red"}:{fontSize:"10px",color:"green"}}>
             {validated?"Required field":<FontAwesomeIcon icon={faCheck}/>}
         </span>:""   
       }   
        </React.Fragment>
    );
  }
  export default APIField;