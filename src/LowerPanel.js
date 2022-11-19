import './LowerPanel.css';
import rewind from './assets/images/icons8-rewind-90.png';
import forward from './assets/images/icons8-fast-forward-90.png';
import play from './assets/images/icons8-play-button-circled-100.png';
function LowerPanel(props){
    const {rotableRef,offscreen,onscreen,pushedforward,pushedbackward} = props;
    return(
        <div className="lowerPanel">
            <div ref ={rotableRef} className="player">
                <div id="menuButton" onClick={()=>{offscreen()}}><button ><strong>Menu</strong></button></div>
                <div id="rewind"><button><img alt="rewind" src={rewind} onClick={()=>{pushedbackward()}}/></button></div>
                <div id ="middle" onClick={()=>(onscreen())}></div>
                <div id="forward"><button><img alt="forward" src={forward} onClick={()=>{pushedforward()}}/></button></div>
                <div id="play"><button><img alt="play" src={play}/></button></div>
            </div>
        </div>
    );
}

export default LowerPanel;