import './SubMenu.css';

function SubMenu(props) {
    var {
        optionIndex,
        isSettingsVisible,
        isMusicVisible,
        isMainMenuVisible
    } = props;
    return(
        <div id="subMenu">
            <div id="subMenu1" style={{display: isMainMenuVisible? 'grid': 'none'}}>
                <div id="row1" style={{background: optionIndex ==1 ? '#00BFFF': 'white'}}>Cover Flow</div>
                <div id="row2" style={{background: optionIndex ==2 ? '#00BFFF': 'white'}}>Music</div>
                <div id="row3" style={{background: optionIndex ==3 ? '#00BFFF': 'white'}}>Games</div>
                <div id="row4" style={{background: optionIndex ==4 ? '#00BFFF': 'white'}}>Settings</div>
            </div>
            <div id="subMenu2" style={{display: isMusicVisible? 'grid': 'none'}}>
                <div id="row1" style={{background: optionIndex ==1 ? '#00BFFF': 'white'}}>All songs</div>
                <div id="row2" style={{background: optionIndex ==2 ? '#00BFFF': 'white'}}>Artists</div>
                <div id="row3" style={{background: optionIndex ==3 ? '#00BFFF': 'white'}}>Albums</div>
            </div>
            <div id="subMenu3" style={{ display: isSettingsVisible? 'grid': 'none' }}>
                <div id="row1" style={{background: optionIndex ==1 ? '#00BFFF': 'white'}}>Change Wallpaper</div>
                <div id="row2" style={{background: optionIndex ==2 ? '#00BFFF': 'white'}}>Change Theme</div>
            </div>
        </div>
    );
}

export default SubMenu;