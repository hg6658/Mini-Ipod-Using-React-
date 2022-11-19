import './UpperPanel.css';
import SubMenu from './SubMenu';
import game from './assets/images/gameBackground.jpg';
import coverflow from './assets/images/coverflowBackground.png';

function UpperPanel(props){
    let {
        optionIndex,
        isMenuVisible,
        isSettingsVisible,
        isMusicVisible,
        isMainMenuVisible,
        wallpaper,
        isScreen,song,albums,artists
    } = props;
    return(
        <div className="upperPanel">
            <div className="menu" style={{display: isMenuVisible? 'grid':'none'}}>
                <div id="heading"><strong><i>Mini Ipod</i></strong></div>
                <SubMenu optionIndex={optionIndex} isSettingsVisible={isSettingsVisible} isMusicVisible={isMusicVisible} isMainMenuVisible={isMainMenuVisible}/>
            </div>
            <div className="desktop" style={{display: isScreen.isDesktop? 'block':'none'}}>
                <img src={wallpaper} alt="wallpaper" id="wallpaper"/>
            </div>
            <div className="songScreen" style={{display: isScreen.isSong? 'flex':'none'}}>
                <img src={song.albumArts[song.songIndex]} alt="wallpaper" id="albumArt"/>
                <p>{song.songNames[song.songIndex]}</p>
            </div>
            <div className="songScreen" style={{display: isScreen.isArtist? 'flex':'none'}}>
                <img src={artists.arts[artists.artistIndex]} alt="wallpaper" id="wallpaper"/>
            </div>
            <div className="songScreen" style={{display: isScreen.isAlbum? 'flex':'none'}}>
                <img src={albums.arts[albums.albumIndex]} alt="wallpaper" id="wallpaper"/>
            </div>
            <div className="songScreen" style={{display: isScreen.isGame? 'flex':'none'}}>
                <img src={game} alt="wallpaper" id="wallpaper"/>
            </div>
            <div className="songScreen" style={{display: isScreen.isCoverFlow? 'flex':'none'}}>
                <img src={coverflow} alt="wallpaper" id="wallpaper"/>
            </div>
        </div>
    );
}

export default UpperPanel;