import {Card,CardHeader,CardBody,CardFooter,CardText,Row,Col,Button} from 'reactstrap';
import { faPencilAlt, faTrashAlt, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const CardCom=(props)=>{
    const loggedInUser=localStorage.getItem("SA_USER");

    function arrayBufferToBase64(logo) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(logo.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        var imageStr= window.btoa(binary);
        var base64Flag = 'data:'+logo.contentType+';base64,';
        return (base64Flag + imageStr);
    };
    function format_date(mongoDate){
        const date=new Date(mongoDate);
        const date_now=new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
        var date_formatted="";
        if(date.getFullYear()==date_now.getFullYear()){
            if(date.getMonth()==date_now.getMonth()){
                if(date.getDate()==date_now.getDate()){
                    date_formatted=date.getHours()+":"+date.getMinutes(); 
                }
                else{
                    if(date_now.getDate()-date.getDate()==1){
                        date_formatted="Yesterday"; 
                    }
                    else
                    {
                        date_formatted=date_now.getDate()-date.getDate()+" days ago"; 
                    }
                    //date_formatted=date.getDate()+" "+monthNames[date.getMonth()];  
                }
            }
            else{
                date_formatted=date.getDate()+" "+monthNames[date.getMonth()];    
            }
        }
        else{
            date_formatted=date.getDate()+" "+monthNames[date.getMonth()]+" "+date.getFullYear();
        }
        return date_formatted;
    }
    
    return (
        <Card style={{marginTop: "33px",minHeight: "230px"}}>
            <CardHeader>{props.postData.app_name}</CardHeader>
            <CardBody >
                {/* <CardText style={{fontSize:"14px",height:"150px",overflow:"auto"}}> */}
                <Row>
                    <Col xs="6" sm="6" md="6" lg="3">
                        {props.postData.logo?<img src={arrayBufferToBase64(props.postData.logo)} style={{width:"70px",height:"70px"}}/>:""}
                    </Col>
                    <Col xs="6" sm="6" md="6" lg="9">
                        {props.postData.description.length<30?props.postData.description:props.postData.description.substring(0,30)+"..."}
                    </Col>
                </Row>
                {/* </CardText> */}
            </CardBody>
            <CardFooter style={{padding:".35rem 1.25rem"}}>
                <Button color="primary" size="sm" onClick={()=>props.viewData(props.id)} style={{fontSize:"12px",float:"right",margin:"1px"}}>
                <FontAwesomeIcon icon={faArrowRight}/>
                </Button>
            </CardFooter> 
        </Card>
    );
}
export default CardCom;