import {Input,Row, Container, Col, Modal,ModalBody,ModalHeader,InputGroup,InputGroupAddon,InputGroupText, CardDeck} from 'reactstrap';
import CardCom from './cardCom';
import AppDetails from './appDetails';
import SpinnerCom from './spinner';
import AlertCom from './alertCom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class AppManager extends React.Component{
  constructor(props){
    super(props);
    this.state={
        setting:null,
        postData:[] ,
        selectedID:false,
        detailsModal:false,
        loading: true,  
        searchText: "",
    } 
  }

  /*componentWillMount(){
    console.log('In component appManager - componentWillMount method with state',this.state);
  }
  componentDidMount(){
    console.log('In component appManager - componentDidMount method with state',this.state);
  }
  shouldComponentUpdate(nextProps, nextState){
      console.log('In component appManager - shouldComponentUpdate with state',this.state);
      console.log('In component appManager - shouldComponentUpdate with nextProps',nextProps);
      console.log('In component appManager - shouldComponentUpdate with nextState',nextState);
      return true;
  }*/
 
  componentDidMount(){
    this.fetchAll("");
  }

  toggleDetails = () => this.setState({detailsModal:!this.state.detailsModal});
  viewData=async(dataID)=>{
     this.setState({selectedID:dataID});
    // this.toggleDetails();
  }
  closeView=async(dataID)=>{
    this.setState({selectedID:false});
    //this.toggleDetails();
 }

fetchAll = async (filter) => {
  const url="http://"+process.env.API_DOMAIN+"/app/list" ;
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache',
    credentials:'include', // *default, no-cache, reload, force-cache, only-if-cached
    //Origin:"http://app.cz-tuts.com",
   headers: {
      'Content-Type': 'application/json',
      //'Origin':"http://app.cz-tuts.com"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: "", // body data type must match "Content-Type" header

  });
 
  const jsonResponse=await response.json();
 
  if(response.status==200){
    this.setState({
      setting: jsonResponse.setting,
      postData:jsonResponse.data,
      loading: false,
    });
  }
}

updateAppManager = (appId, installed,  enabled, app_setting) => {
  const postDataCopy = [...this.state.postData];
  console.log('In component appManager - updateAppManager method with stateCopy postData',postDataCopy, ' and installed',installed, 'and enabled', enabled);
  const appIndex = postDataCopy.findIndex(app => app._id === appId);
  const objState = {};
  if(appIndex !== -1){
    if(installed !== ''){
      postDataCopy[appIndex].installed = installed;
    }
    if(enabled !== ''){
      postDataCopy[appIndex].enabled = enabled;
    }

    objState.postData = postDataCopy;

    if(app_setting){
      const settingCopy = {...this.state.setting};
      settingCopy[app_setting.key] = app_setting.value;
      objState.setting = settingCopy;
    }
    
    this.setState(objState,console.log('In component appManager - updateAppManager method with state',this.state));
    
  }else{
    console.log('In component appManager - updateAppManager method', 'App not found');
  }
 
}

handleSearchInput = (event) => {
  this.setState({searchText: event.target.value});
}

render(){
  const filteredAppData = this.state.postData.filter(item =>{
    const serachBase = `${item.app_name} ${item.app_category}`; 
    return serachBase.toLowerCase().includes(this.state.searchText.toLowerCase());
  });
  const appData = filteredAppData.map((data, idx) => {
      return (
        <React.Fragment key={"post_"+idx}>
        <Col xs="6" sm="4">
        <CardCom  viewData={this.viewData} editForm={this.editForm} delPost={this.deletePost} postData={data} id={idx} />
        </Col>
        </React.Fragment>
      )
  });

  return (
    <>
      <div className="d-flex" style={{background: "#0c82da"}}>
        <div className="p-2 flex-grow-1">
          <h5 className="mb-0 mt-1 text-white">{this.state.selectedID===false?<span>Marketplace</span>:<span onClick={this.closeView}><a href="" style={{color:"#fff"}} onClick={this.closeView}>Marketplace</a>{"/"+this.state.postData[this.state.selectedID].app_name}</span>}</h5>
        </div>
        <div className="p-2">
          {
            this.state.selectedID===false?<>
            <InputGroup>
              <Input type="text" className="border-right-0" placeholder="Search for apps" defaultValue={this.state.searchText} style={{boxShadow:"none !important"}} onChange={this.handleSearchInput} />
              <InputGroupAddon addonType="append">
                <InputGroupText><FontAwesomeIcon icon={faSearch}/></InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            </>:
            <FontAwesomeIcon onClick={this.closeView} style={{color:"#fff"}} icon={faArrowLeft}/>
          }           
        </div>      
        </div>
        <Container>
          {this.state.loading===true? 
          <Row style={{marginTop: "18%"}} key="spinner">
            <Col sm="12" md={{ size: 6, offset: 4 }}>
              <SpinnerCom />
            </Col>
          </Row>:
          <Row key="posts_0">
              {this.state.selectedID===false?
                appData:<AppDetails data={this.state.postData[this.state.selectedID]} setting={this.state.setting} updateParent={this.updateAppManager} />
              }
          </Row>
        }
        </Container> 
      </>
    );
  }
}
export default AppManager; 
	
