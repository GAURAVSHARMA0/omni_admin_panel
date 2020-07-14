import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLaptop} from  '@fortawesome/free-solid-svg-icons';
import {Button}  from 'reactstrap';
const BreakOverlay=(props)=>(
    
    <div className={props.breakState?"AgentUI__Break-div":"AgentUI__Break-div-hidden"} >
		<Button onClick={props.breakHandler} className="bg-light AgentUI__Unbreak-btn text-muted" style={{marginTop:"45vh"}}><FontAwesomeIcon style={{marginBottom:".5rem"}} icon={faLaptop} size="3x" /><br/>Back to Work Station</Button>
	</div>
    )
export default BreakOverlay