import React,{ useState } from 'react';
import {Modal,ModalBody,ModalFooter,ModalHeader, Nav, NavItem,NavLink,TabContent,TabPane, Input, Button, Badge } from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

//import { faTrashAlt, faDownload, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

class AppDetails extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            activeTab:'description',
            openModal:false,
            installed:(typeof props.data.installed!="undefined")?props.data.installed:false,
            enabled:(typeof props.data.enabled!="undefined")?props.data.enabled:false
        };
    }
    /*componentWillMount(){
        console.log('In component appDetails - componentWillMount method with state',this.state);
    }
    componentDidMount(){
        console.log('In component appDetails - componentDidMount method with state',this.state);
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log('In component appDetails - shouldComponentUpdate method with state',this.state);
        console.log('In component appDetails - shouldComponentUpdate method with nextProps',nextProps);
        console.log('In component appDetails - shouldComponentUpdate method with nextState',nextState);
        return true;
    }*/
    
    formatDate=(date)=>{
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      var format_date=new Date(date);
      var date_final=format_date.getDate()+" "+monthNames[format_date.getMonth()]+" "+format_date.getFullYear();
      return date_final;
    }
    toggleDetails= ()=>this.setState({openModal:!this.state.openModal}); 
    toggle = (tab) => {
        this.setState({
            activeTab:tab
        })
    };
      
    arrayBufferToBase64 = (logo) => {
    //arrayBufferToBase64(logo) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(logo.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        var imageStr= window.btoa(binary);
        var base64Flag = 'data:'+logo.contentType+';base64,';
        return (base64Flag + imageStr);
    }
    changeHandler = () => {
    //changeHandler=()=>{
        this.setState({[event.target.name]:event.target.value});
    }
    submitHandler = async () => {
    //async submitHandler(){
        var base_url=(typeof this.props.data.base_url!="undefined")?this.props.data.base_url:"";
       if(this.props.data.auth_type=="Basic Auth"){
        var username=(typeof this.props.data.auth_details.auth_params.auth_username!="undefined")?this.props.data.auth_details.auth_params.auth_username:"";
        var password=(typeof this.props.data.auth_details.auth_params.auth_password!="undefined")?this.props.data.auth_details.auth_params.auth_password:"";
        }
        else if(this.props.data.auth_type=="API Key"){
        var auth_key=(typeof this.props.data.auth_details.auth_params.auth_key!="undefined")?this.props.data.auth_details.auth_params.auth_key:"";
        var auth_value=(typeof this.props.data.auth_details.auth_params.auth_value!="undefined")?this.props.data.auth_details.auth_params.auth_value:"";
        }
        var integration_param_local=this.props.data.integration_param;
        var auth_details={};
        this.props.data.integration_param.map((param,idx)=>{
            integration_param_local[idx].value=this.state[param.name];
           base_url= base_url.replace("[["+[param.name]+"]]",this.state[param.name]);
            if(this.props.data.auth_type=="Basic Auth"){
                username= username.replace("[["+[param.name]+"]]",this.state[param.name]);
                password= password.replace("[["+[param.name]+"]]",this.state[param.name]);
            }
            else if(this.props.data.auth_type=="API Key"){
                auth_key= auth_key.replace("[["+[param.name]+"]]",this.state[param.name]);
                auth_value= auth_value.replace("[["+[param.name]+"]]",this.state[param.name]);
            }

        });
        if(this.props.data.auth_type=="Basic Auth"){
            auth_details= { "auth_type" : "Basic Auth", "auth_params" : { "auth_username" : username, "auth_password" : password } } ;
        }
        else if(this.props.data.auth_type=="API Key"){
            auth_details= { "auth_type" : "API Key", "auth_params" : { "auth_key" : auth_key, "auth_value" : auth_value} };
        }
        const url="http://"+process.env.API_DOMAIN+"/app/install" ;
        var postData={appID:this.props.data._id,auth_details:auth_details,base_url:base_url,integration_param:integration_param_local};
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache',
            credentials:'include', // *default, no-cache, reload, force-cache, only-if-cached
            //Origin:"http://app.cz-tuts.com",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData), // body data type must match "Content-Type" header
        });
        var resp=await response.json();
       
        if(response.status==200){
            if(resp.err==0){
                this.toggleDetails();
                this.setState({
                    installed:true,
                    enabled:true,
                },
                alert(resp.msg)
                );
                this.props.updateParent(this.props.data._id,true,true,{key:this.props.data.app_category,value:true});
            }
            else{
                alert(resp.msg);
            }   
        }
        else{
            alert(resp.msg);
        }
       
    }

    unsubscribe = async (app_category) => {
   // async unsubscribe(){
        const url="http://"+process.env.API_DOMAIN+"/app/uninstall" ;
        var postData={appID:this.props.data._id,app_category:app_category};
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache',
            credentials:'include', // *default, no-cache, reload, force-cache, only-if-cached
            //Origin:"http://app.cz-tuts.com",
            headers: {
                'Content-Type': 'application/json',
               
            },
            body: JSON.stringify(postData), // body data type must match "Content-Type" header

        });
        var resp=await response.json();    
        if(response.status==200){
            if(resp.err==0){
                this.setState({
                    installed:false,
                    enabled:false,
                },alert(resp.msg));
                this.props.updateParent(this.props.data._id,false,false,{key:app_category,value:false});
            }
            else{
                alert(resp.msg);
            }
        }
        else{
            alert(resp.msg);
        }
    }
    enable = async () => {
        const url="http://"+process.env.API_DOMAIN+"/app/enable" ;
        var postData={appID:this.props.data._id};
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials:'include',
            //Origin:"http://app.cz-tuts.com",
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(postData), 
        });
        var resp=await response.json();    
        if(response.status==200){
            if(resp.err==0){
                this.setState({
                    enabled:true,
                },alert(resp.msg));
                this.props.updateParent(this.props.data._id,'',true);
            }
            else{
                alert(resp.msg);
            }
        }
        else{
            alert(resp.msg);
        }
    }
    disable = async () => {
        const url="http://"+process.env.API_DOMAIN+"/app/disable" ;
        var postData={appID:this.props.data._id};
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache',
            credentials:'include', // *default, no-cache, reload, force-cache, only-if-cached
            //Origin:"http://app.cz-tuts.com",
            headers: {
                'Content-Type': 'application/json',
               
            },
            body: JSON.stringify(postData), // body data type must match "Content-Type" header

        });
        var resp=await response.json();    
        if(response.status==200){
            if(resp.err==0){
                this.setState({
                    enabled:false,
                },alert(resp.msg));
                this.props.updateParent(this.props.data._id,'',false);
            }
            else{
                alert(resp.msg);
            }
        }
        else{
            alert(resp.msg);
        }
    }
    render(){
        const {data,setting} = this.props;
        const disable_flag = setting[data.app_category]?setting[data.app_category]:false;
        
        return(
            <React.Fragment>
                <div className="d-flex">
                    <div className="p-2">
                        <div className="border p-2" style={{width: "200px", borderBottom:"0px !important"}}>
                        <img src={this.arrayBufferToBase64(this.props.data.logo)} style={{width:"100px",height:"100px"}}/>
                        </div>
                         {this.state.installed==false?
                         <div className="border p-2" style={{display: "inline-block",width: "200px",textAlign: "center" }}>
                         {/* <img src="/img/install-ICON.png" alt="Install" style={{maxHeight:"30px",maxWidth:"30px"}} onClick={this.toggleDetails} /> */}
                         <Button color="success" onClick={this.toggleDetails} style={{padding:"2px 12px"}} disabled={disable_flag}>Install</Button>
                         </div> 
                         :
                         <div className="border p-2" style={{width: "200px",flexDirection: "row"}}>
                            {/* <img src="/img/uninstall-ICON.png" alt="Uninstall" style={{maxHeight:"30px",maxWidth:"30px",marginRight:"21px"}} onClick={this.unsubscribe}/> */}
                            <Button color="danger" onClick={() => this.unsubscribe(this.props.data.app_category)} style={{padding:"2px 12px"}}>Uninstall</Button>
                            { this.state.enabled==false ?
                            <>
                             <img src="/img/disable-ICON.png" alt="Disabled" style={{maxHeight:"30px",maxWidth:"30px",float:"right"}} onClick={this.enable} />
                            </>
                            :
                            <>
                            <img src="/img/enable-ICON.png" alt="Enabled" style={{maxHeight:"30px",maxWidth:"30px",float:"right"}} onClick={this.disable} />
                            </>
                            }
                         </div>
                        }
                    </div>
                    
                    <div className="p-2 flex-grow-1">
                        <h3 className="text-primary">{this.props.data.app_name}</h3>
                        <div className="">
                            <p className="mb-0">Published by <b>{this.props.data.publisher_name}</b> on {this.formatDate(this.props.data.created_on)}</p>
                            <p>In <b className="text-primary">{this.props.data.app_category} category</b></p>
                        </div> 
                        <p>{this.props.data.description}</p>
                    </div>
                    
                </div>
                <div className="">
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === 'description' })} onClick={() => this.toggle('description')}>Overview</NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className={classnames({ active: this.state.activeTab === 'installation' })} onClick={()=>this.toggle('installation')}>Installation</NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className={classnames({ active: this.state.activeTab === 'publisher' })} onClick={()=>this.toggle('publisher') }>Publisher</NavLink>
                        </NavItem>
                    </Nav>
                   
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="description" ><br/>
                           {(typeof this.props.data.detailed_description!="undefined")?this.props.data.detailed_description.split("\n").map((item,idx)=>( <span key={idx}>{item}<br/></span>)
                                ):""}
                        </TabPane>
                        <TabPane tabId="installation" ><br/>
                             {(typeof this.props.data.installation_instruction!="undefined")?this.props.data.installation_instruction.split("\n").map((item,idx)=>( <span key={idx}>{item}<br/></span>)
                                ):""}
                        </TabPane>
                        <TabPane tabId="publisher" ><br/>
                             {(typeof this.props.data.publisher_details!="undefined")?this.props.data.publisher_details.split("\n").map((item,idx)=>( <span key={idx}>{item}<br/></span>)
                                ):""}
                        </TabPane>
                    </TabContent>
                </div>
                <Modal isOpen={this.state.openModal} toggle={this.toggleDetails} fade={true} id="details-search-modal" scrollable={true} centered={true} size="lg">
                    <ModalHeader>
                        Configuration
                    </ModalHeader>
                    <ModalBody>
                        {
                            this.props.data.integration_param.length?this.props.data.integration_param.map((param,idx) =>
                            <React.Fragment key={idx}>
                            <Input name={param.name} type={param.type} placeholder={param.name} key={idx} onChange={this.changeHandler}/>
                            <br/>
                            </React.Fragment>):<span>All set, click on save to install the app...</span>
                        }
                    </ModalBody>
                    <ModalFooter>
                            <Button color="secondary"  onClick={this.toggleDetails}>Cancel</Button>
                            <Button color="primary" onClick={this.submitHandler}>Save</Button>
                    </ModalFooter>
                  </Modal>
            </React.Fragment>
            )
    }
    
}
export default AppDetails;
