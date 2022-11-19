import './App.css';
import React from 'react';
import LowerPanel from './LowerPanel';
import UpperPanel from './UpperPanel';
import ZingTouch from 'zingtouch';
import wallpapers from './assets/wallpapers/wallpaper';
import song1 from './assets/Songs/Song1/song1';
import song2 from './assets/Songs/Song2/song2';
import song3 from './assets/Songs/Song3/song3';
import aw from './assets/artistsPics/alanWalker.jpg';
import kp from './assets/artistsPics/katyPerry.jpg';
import mt from './assets/artistsPics/monoirThrace.jpg';
/* 

It is the main component of the app where state is defined..


*/
class App extends React.Component {
  constructor(){
    super();
    this.rotableRef = React.createRef();  // captured the dom element of the white circle in ipod app.
    this.myRegion = undefined;      // these two variable are going to be initialized using z touch.
    this.rotateGesture = undefined; 
    this.onscreen = this.onscreen.bind(this); // this function is run when middle circle button is tapped
    this.offscreen = this.offscreen.bind(this); // this function is run when menu button is tapped
    this.changeWallpaper = this.changeWallpaper.bind(this); // this function is run when change wallpaper option is tapped
    this.openSong = this.openSong.bind(this); // this function is run when all song option is tapped
    this.forward = this.forward.bind(this);   // this function is run when forward button is tapped
    this.backward = this.backward.bind(this); // this function is run when backward button is tapped
    this.openAlbums = this.openAlbums.bind(this); // this function is run when album option is tapped
    this.openArtists = this.openArtists.bind(this); // this function is run when artist button is tapped
    this.state={
      optionIndex:0,        // to check which option in menu or submenu is currently selected
      isMenuVisible: false, //is menu is currently opened
      isSettingsVisible: false, //is setting menu is currently visible 
      isMusicVisible: false,  //is music menu is currently visible
      isMainMenuVisible: true, // is main menu is currently visible
      wallpaper:wallpapers.wallpaper2, // which wallpaper is currently selected
      wallpapersIndex:2,         // index of wallpaper in the array
      isScreen:{
        isDesktop:true,     // is Main screen is currently visible
        isSong: false,      // is song screen is currently visible
        isAlbum: false,     // is album screen is currently visible
        isArtist: false,    // is artist screen is currently visible
        isGame: false,      // is game screen is currently visible
        isCoverFlow: false  // is coverflow screen is currently visible
      },
      albums:{ // all album's album arts and albumIndex to see which is currently selected
        arts:[song1.albumArt,song2.albumArt,song3.albumArt],
        albumIndex: 0
      },
      artists:{ // all artist's images and artistIndex to see which is currently selected
        arts:[aw,kp,mt],
        artistIndex: 0
      },
      song:{ // complete information about songs
        songFiles:[song1.song,song2.song,song3.song], // all song files
        albumArts:[song1.albumArt,song2.albumArt,song3.albumArt], // all song's album arts
        songIndex: 0, //which song is selscted
        songNames:['Faded','Sugar & Brownies','Harleys In Hawaii'], // name of song
        isPlaying: false, // currently is song is playing or not
        songElement: undefined // it will contain audio element of current song
      }
    };

  }
  componentDidMount(){ // on mounting phase rotation gesture is activated using zing touch library
    this.myRegion = new ZingTouch.Region(this.rotableRef.current);
    this.rotateGesture = new ZingTouch.Rotate();
    this.rotation();
  }
  offscreen(){



    let {
      isMenuVisible,
      isSettingsVisible,
      isMusicVisible,
      isMainMenuVisible,
      isScreen,song
    } = this.state;
    if(song.isPlaying){
      song.songElement.pause();
      song.isPlaying = false;
      this.setState({song});
      this.setState({
        isScreen:{
          isDesktop:true,
          isSong: false,
          isAlbum: false,
          isArtist: false,
          isGame: false,
          isCoverFlow: false
        }
      })
      return;
    }
    if(isScreen.isSong){
      if(song.isPlaying)this.onscreen();
      this.setState({
        isScreen:{
          isDesktop:true,
          isSong: false,
          isAlbum: false,
          isArtist: false,
          isGame: false,
          isCoverFlow: false
        }
      })
      return;
    }

    if(isScreen.isArtist || isScreen.isAlbum || isScreen.isGame || isScreen.isCoverFlow) {
      this.setState({
        isScreen:{
          isDesktop:true,
          isSong: false,
          isAlbum: false,
          isArtist: false,
          isGame: false,
          isCoverFlow: false
        }
      })
      return;
    }

    if(isMenuVisible && !isSettingsVisible && !isMusicVisible){
      isMenuVisible = !isMenuVisible;
    }else if(isMenuVisible && isSettingsVisible && !isMusicVisible){
      isSettingsVisible = !isSettingsVisible;
    }else if(isMenuVisible && !isSettingsVisible && isMusicVisible){
      isMusicVisible = !isMusicVisible;
    }else{
      isMenuVisible = !isMenuVisible;
    }

    if(!isSettingsVisible && !isMusicVisible){
      isMainMenuVisible = true;
    }

    this.setState({
      isMenuVisible,
      isSettingsVisible,
      isMusicVisible,
      isMainMenuVisible,song
    });

  }

  changeWallpaper(){
    let {wallpaper,wallpaperIndex} = this.state;
    if(wallpaper==wallpapers.wallpaper1){
      wallpaper = wallpapers.wallpaper2;
      wallpaperIndex = 2;
    }
    else if(wallpaper==wallpapers.wallpaper2){
      wallpaper = wallpapers.wallpaper3;
      wallpaperIndex = 3;
    }
    else if(wallpaper==wallpapers.wallpaper3){
      wallpaper = wallpapers.wallpaper4;
      wallpaperIndex = 4;
    }
    else if(wallpaper==wallpapers.wallpaper4){
      wallpaper = wallpapers.wallpaper1;
      wallpaperIndex = 1;
    }
    this.setState({wallpaper,wallpaperIndex});
  }

  changeTheme(){
    console.log('Theme Changed');
  }
  rotation(){
    let optionIndex = 0;
    let self = this;
    this.myRegion.bind(this.rotableRef.current, this.rotateGesture, function(e){
      let angle = e.detail.angle;
      if(angle >=0 && angle <90){
        optionIndex = 1;
      }else if(angle>=90 && angle<180){
        optionIndex = 4;
      }else if(angle>=180 && angle<270){
        optionIndex = 3;
      }else if(angle>=270 && angle<359){
        optionIndex = 2;
      }else if(angle>=-90 && angle<0){
        optionIndex = 2;
      }else if(angle>=-180 && angle<-90){
        optionIndex = 3;
      }else if(angle>=-270 && angle<-180){
        optionIndex = 4;
      }else if(angle>=-350 && angle<-270){
        optionIndex = 1;
      }
      self.setState({optionIndex});
    });
  }

  openSong(){
    let {song} = this.state;
    var songToplay = new Audio(song.songFiles[song.songIndex]);
    songToplay.play();
    song.isPlaying = true;
    song.songElement = songToplay;
    this.setState({
      isPlaying: true,
      isScreen:{
        isDesktop: false,
        isSong: true,
      },
      song
    });
  }

  openArtists(){
    this.setState({
      isScreen:{
        isDesktop:false,
        isSong: false,
        isAlbum: false,
        isArtist: true,
        isGame: false,
        isCoverFlow: false
      }
    })
  }

  openAlbums(){
    this.setState({
      isScreen:{
        isDesktop:false,
        isSong: false,
        isAlbum: true,
        isArtist: false,
        isGame: false,
        isCoverFlow: false
      }
    })
  }

  openGame(){
    this.setState({
      isScreen:{
        isDesktop:false,
        isSong: false,
        isAlbum: false,
        isArtist: false,
        isGame: true,
        isCoverFlow: false
      }
    })
  }

  openCoverFlow(){
    this.setState({
      isScreen:{
        isDesktop:false,
        isSong: false,
        isAlbum: false,
        isArtist: false,
        isGame: false,
        isCoverFlow: true
      }
    })
  }

  onscreen(){
    let {
      optionIndex,
      isMenuVisible,
      isSettingsVisible,
      isMusicVisible,
      isMainMenuVisible,
      isScreen,song
    } = this.state;
    if(isScreen.isSong){
      if(song.songElement){
        if(song.songElement.paused){
          song.songElement.play();
          song.isPlaying = true;
        }else{
          song.songElement.pause();
          song.isPlaying = false;
        }
        this.setState({song});
        return;
      }
    }
    if(isMenuVisible){
      if(isSettingsVisible){
        if(optionIndex==1){
          this.changeWallpaper();
          this.setState({
            isMenuVisible,
            isSettingsVisible,
            isMusicVisible,
            isMainMenuVisible
          });
          return;
        }
        if(optionIndex==2){
          this.changeTheme();
          this.setState({
            isMenuVisible,
            isSettingsVisible,
            isMusicVisible,
            isMainMenuVisible
          });
          return ;
        }
      }

      if(isMusicVisible){
        if(optionIndex==1){
          isMenuVisible = !isMenuVisible;
          isMusicVisible = !isMusicVisible;
          this.openSong();
          this.setState({
            isMenuVisible,
            isSettingsVisible,
            isMusicVisible,
            isMainMenuVisible
          });
          return;
        }
        else if(optionIndex==2){
          isMenuVisible = !isMenuVisible;
          isMusicVisible = !isMusicVisible;
          this.openArtists();
          this.setState({
            isMenuVisible,
            isSettingsVisible,
            isMusicVisible,
            isMainMenuVisible
          });
          return;
        }
        else if(optionIndex==3){
          isMenuVisible = !isMenuVisible;
          isMusicVisible = !isMusicVisible;
          this.openAlbums();
          this.setState({
            isMenuVisible,
            isSettingsVisible,
            isMusicVisible,
            isMainMenuVisible
          });
          return;
        }
      }

      if(optionIndex==4){
        if(!isSettingsVisible){
          isSettingsVisible = !isSettingsVisible;
        }
      }
      else if(optionIndex== 2){
        if(!isMusicVisible){
          isMusicVisible = !isMusicVisible;
        }
      }
      else if(optionIndex== 3){
        isMenuVisible = !isMenuVisible;  
        isMainMenuVisible = true;
        this.openGame();
        this.setState({
          isMenuVisible,
          isSettingsVisible,
          isMusicVisible,
          isMainMenuVisible
        });
      } 

      else if(optionIndex==1){
        isMenuVisible = !isMenuVisible;
        this.openCoverFlow();
        this.setState({
          isMenuVisible,
          isSettingsVisible,
          isMusicVisible,
          isMainMenuVisible
        });
      }
    }else{
      isMenuVisible = false;
    }
    if(isSettingsVisible || isMusicVisible){
      isMainMenuVisible = false;
    }
    this.setState({
      isMenuVisible,
      isSettingsVisible,
      isMusicVisible,
      isMainMenuVisible
    });
  }

  forward(){
    let {isScreen,song,albums,artists} = this.state;
    if(isScreen.isSong){
      song.songIndex++;
      song.songIndex = song.songIndex% song.songFiles.length;
      if(song.songElement)song.songElement.pause();
      this.openSong();
    }else if(isScreen.isAlbum){
      albums.albumIndex++;
      albums.albumIndex = albums.albumIndex% albums.arts.length;
      this.openAlbums();
    }else if(isScreen.isArtist){
      artists.artistIndex++;
      artists.artistIndex = artists.artistIndex% artists.arts.length;
      this.openArtists();
    }

  }
  backward(){
    let {isScreen,song,albums,artists} = this.state;
    if(isScreen.isSong){
      song.songIndex--;
      if(song.songIndex<0)song.songIndex =song.songFiles.length-1;
      if(song.songElement)song.songElement.pause();
      this.openSong();
    }else if(isScreen.isAlbum){
      albums.albumIndex--;
      if(albums.albumIndex<0)albums.albumIndex = albums.arts.length-1;
      this.openAlbums();
    }else if(isScreen.isArtist){
      artists.artistIndex--;
      if(artists.artistIndex<0)artists.artistIndex = artists.arts.length-1;
      this.openArtists();
    }
  }

  render(){
      var {
        optionIndex,
        isMenuVisible,
        isSettingsVisible,
        isMusicVisible,
        isMainMenuVisible,
        wallpaper,isScreen,song,albums,artists
      } = this.state;
      return (
        <>
        <div className="directions">
          <p>Directions(how to use this app):</p>
          <ul>
            <li>Click on menu to open menu</li>
            <li>Click grey button on center to select an option</li>
            <li>Click and drag on white circle clockwise or anti clockwise round th radius to navigate</li>
          </ul>
        </div>
        <div className="App">
          <UpperPanel optionIndex={optionIndex}
           isMenuVisible={isMenuVisible} 
           isSettingsVisible={isSettingsVisible} 
           isMusicVisible={isMusicVisible} 
           isMainMenuVisible={isMainMenuVisible}
           wallpaper={wallpaper}
           isScreen = {isScreen}
           song={song}
           albums={albums}
           artists={artists}/>
          <LowerPanel rotableRef={this.rotableRef} 
          onscreen={this.onscreen} 
          offscreen={this.offscreen}
          pushedforward={this.forward}
          pushedbackward={this.backward}/>
        </div>
        </>
      );
  }
}

export default App;
